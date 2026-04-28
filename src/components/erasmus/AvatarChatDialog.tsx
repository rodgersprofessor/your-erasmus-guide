import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Send, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Avatar, sharedQuestions } from "./avatars";

type Message = { role: "user" | "assistant"; content: string };

interface Props {
  avatar: Avatar | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AvatarChatDialog = ({ avatar, open, onOpenChange }: Props) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset on avatar change / open
  useEffect(() => {
    if (avatar && open) {
      setMessages([{ role: "assistant", content: avatar.greeting }]);
      if (voiceOn) speak(avatar.greeting);
    }
    if (!open) {
      window.speechSynthesis?.cancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar?.id, open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const speak = (text: string) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.95;
    u.pitch = 1;
    window.speechSynthesis.speak(u);
  };

  const send = async (text: string) => {
    if (!avatar || !text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("chat-avatar", {
        body: { messages: next, avatar },
      });
      if (error) throw error;
      const reply = (data as any)?.reply ?? "…";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      if (voiceOn) speak(reply);
    } catch (e: any) {
      console.error(e);
      toast({
        title: "Couldn't reach the guide",
        description: e?.message ?? "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleVoice = () => {
    setVoiceOn((v) => {
      if (v) window.speechSynthesis?.cancel();
      return !v;
    });
  };

  if (!avatar) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-card border-gold/40">
        <DialogTitle className="sr-only">Chat with {avatar.name}</DialogTitle>
        <DialogDescription className="sr-only">
          Conversational interface with {avatar.name}, {avatar.role}.
        </DialogDescription>

        {/* Header */}
        <div className="bg-curtain text-primary-foreground px-6 py-5 flex items-center gap-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gold-grad rounded-full opacity-60 blur-md animate-flicker" />
            <img
              src={avatar.image}
              alt={avatar.name}
              width={64}
              height={64}
              className="relative w-16 h-16 object-cover rounded-full border-2 border-gold"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-2xl text-gold leading-tight truncate">
              {avatar.name}
            </h3>
            <p className="font-body italic text-sm opacity-90 truncate">
              {avatar.role} · {avatar.origin}
            </p>
          </div>
          <button
            onClick={toggleVoice}
            aria-label={voiceOn ? "Mute voice" : "Enable voice"}
            className="p-2 rounded-sm border border-gold/40 hover:bg-burgundy/40 transition-colors"
          >
            {voiceOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>

        {/* Conversation */}
        <div ref={scrollRef} className="h-[400px] overflow-y-auto p-6 space-y-3 bg-parchment">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] px-4 py-3 rounded-sm font-body text-base leading-snug shadow-card-soft ${
                m.role === "assistant"
                  ? "mr-auto bg-card text-foreground border border-border"
                  : "ml-auto bg-burgundy text-primary-foreground"
              }`}
            >
              {m.content}
            </div>
          ))}
          {loading && (
            <div className="mr-auto bg-card border border-border px-4 py-3 rounded-sm flex items-center gap-2 text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="font-body italic text-sm">{avatar.name.split(" ")[0]} is thinking…</span>
            </div>
          )}
        </div>

        {/* Suggested questions */}
        <div className="px-6 py-3 border-t border-border bg-card">
          <div className="flex flex-wrap gap-2 mb-3">
            {sharedQuestions.slice(0, 4).map((q, i) => (
              <button
                key={i}
                onClick={() => send(q.q)}
                disabled={loading}
                className="font-body text-xs md:text-sm px-3 py-1.5 bg-secondary border border-border hover:border-gold hover:text-burgundy transition-colors rounded-sm disabled:opacity-50"
              >
                {q.q}
              </button>
            ))}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask ${avatar.name.split(" ")[0]} a question…`}
              className="flex-1 font-body text-base px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none rounded-sm"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 bg-gold-grad text-foreground rounded-sm hover:shadow-gold transition-shadow disabled:opacity-50"
              aria-label="Send"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
