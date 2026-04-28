import { useEffect, useRef, useState } from "react";
import { Avatar, sharedQuestions } from "./avatars";

type Message = { from: "user" | "avatar"; text: string };

interface Props {
  avatar: Avatar;
}

export const AvatarChat = ({ avatar }: Props) => {
  const [messages, setMessages] = useState<Message[]>([
    { from: "avatar", text: avatar.greeting },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{ from: "avatar", text: avatar.greeting }]);
  }, [avatar.id, avatar.greeting]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const askQuestion = (q: typeof sharedQuestions[number]) => {
    setMessages((m) => [...m, { from: "user", text: q.q }]);
    setTimeout(() => {
      setMessages((m) => [...m, { from: "avatar", text: q.a(avatar) }]);
    }, 450);
  };

  return (
    <div className="grid md:grid-cols-[280px_1fr] gap-6 bg-card border border-border rounded-sm shadow-card-soft overflow-hidden">
      {/* Avatar pane */}
      <div className="bg-curtain p-6 flex flex-col items-center text-center text-primary-foreground">
        <div className="relative mb-4">
          <div className="absolute -inset-2 bg-gold-grad rounded-full opacity-60 blur-md animate-flicker" />
          <img
            src={avatar.image}
            alt={`${avatar.name} portrait`}
            width={512}
            height={512}
            loading="lazy"
            className="relative w-40 h-40 object-cover rounded-full border-2 border-gold shadow-gold"
          />
        </div>
        <h3 className="font-display text-2xl text-gold">{avatar.name}</h3>
        <p className="font-body italic text-base opacity-90 mt-1">{avatar.role}</p>
        <p className="font-sans-ui text-xs uppercase tracking-widest mt-3 opacity-70">
          From {avatar.origin}
        </p>
      </div>

      {/* Conversation */}
      <div className="flex flex-col h-[480px]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] ${
                m.from === "avatar"
                  ? "mr-auto bg-secondary text-secondary-foreground"
                  : "ml-auto bg-burgundy text-primary-foreground"
              } px-4 py-3 rounded-sm font-body text-lg leading-snug shadow-card-soft`}
            >
              {m.text}
            </div>
          ))}
        </div>
        <div className="border-t border-border bg-parchment p-4">
          <p className="font-sans-ui text-[11px] uppercase tracking-widest text-muted-foreground mb-3">
            Ask {avatar.name.split(" ")[0]} a question
          </p>
          <div className="flex flex-wrap gap-2">
            {sharedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => askQuestion(q)}
                className="font-body text-sm md:text-base px-3 py-1.5 bg-card border border-border hover:border-gold hover:text-burgundy hover:bg-secondary transition-colors rounded-sm"
              >
                {q.q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
