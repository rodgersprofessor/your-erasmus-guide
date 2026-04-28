import { useState } from "react";
import heroStage from "@/assets/hero-stage.jpg";
import { avatars, Avatar } from "@/components/erasmus/avatars";
import { AvatarPicker } from "@/components/erasmus/AvatarPicker";
import { AvatarChatDialog } from "@/components/erasmus/AvatarChatDialog";

const stats = [
  { value: "150+", label: "Students" },
  { value: "30", label: "Countries" },
  { value: "2", label: "Months" },
  { value: "1", label: "Stage — Craiova" },
];

const pillars = [
  {
    title: "Creative Workshops",
    body: "Intensive workshops in acting, set design, playwriting, and directing — led by invited festival artists, where Shakespeare becomes a starting point for experimentation.",
  },
  {
    title: "Research Labs",
    body: "Interdisciplinary labs exploring Shakespeare through contemporary lenses — cultural studies, performance, new technologies, and emerging forms of expression.",
  },
  {
    title: "Collaborative Projects",
    body: "International teams develop original artistic projects over two months and present them to the public during the festival — an authentic multicultural dialogue.",
  },
  {
    title: "Professional Development",
    body: "Individual mentoring, networking sessions, and direct access to the international creative process. Most students join the festival team itself.",
  },
];

const Index = () => {
  const [selected, setSelected] = useState<Avatar>(avatars[0]);
  const [chatOpen, setChatOpen] = useState(false);

  const pickAvatar = (a: Avatar) => {
    setSelected(a);
    setChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroStage}
            alt="Theatrical stage with red velvet curtains"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/30 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
        </div>

        <nav className="relative z-10 max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="font-display text-xl text-primary-foreground drop-shadow-lg">
            ✦ Erasmus + Shakespeare
          </div>
          <a
            href="https://shakespearefestival.online/en/sectiuni/erasmus/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans-ui text-xs uppercase tracking-widest text-primary-foreground/90 hover:text-gold transition-colors"
          >
            Festival Site →
          </a>
        </nav>

        <div className="relative z-10 max-w-4xl mx-auto px-6 pt-20 pb-32 md:pt-32 md:pb-48 text-center">
          <p className="font-sans-ui text-xs md:text-sm uppercase tracking-[0.4em] text-gold mb-6 animate-flicker">
            International Platform · Creation & Research
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-[1.05] mb-6">
            Where Shakespeare
            <br />
            <em className="text-gold font-normal">becomes a meeting place.</em>
          </h1>
          <p className="font-body text-xl md:text-2xl text-primary-foreground/85 max-w-2xl mx-auto leading-relaxed">
            Two months in Craiova. Over 150 students. Around 30 countries. One Bard, reimagined
            through every voice that gathers around him.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#meet"
              className="font-sans-ui text-sm uppercase tracking-widest px-8 py-4 bg-gold-grad text-foreground hover:shadow-gold transition-shadow rounded-sm"
            >
              Meet your guide
            </a>
            <a
              href="#programme"
              className="font-sans-ui text-sm uppercase tracking-widest px-8 py-4 border border-gold/60 text-primary-foreground hover:bg-burgundy/40 transition-colors rounded-sm"
            >
              The Programme
            </a>
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="border-y border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-4xl md:text-5xl text-burgundy">{s.value}</p>
              <p className="font-sans-ui text-[11px] uppercase tracking-widest text-muted-foreground mt-2">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MEET YOUR AVATAR */}
      <section id="meet" className="py-20 md:py-28 bg-parchment">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="ornament font-sans-ui text-xs uppercase tracking-[0.4em] text-burgundy mb-4">
              Act I
            </p>
            <h2 className="font-display text-4xl md:text-6xl mb-4">
              Choose <em className="text-burgundy">your</em> guide
            </h2>
            <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
              Six voices from the programme — each carrying their own culture, craft, and curiosity.
              Tap one to open a private conversation — they'll speak back, too.
            </p>
          </div>

          <div className="mb-6">
            <AvatarPicker selected={selected} onSelect={pickAvatar} />
          </div>
          <p className="text-center font-sans-ui text-xs uppercase tracking-widest text-muted-foreground">
            Click any guide to begin
          </p>
        </div>
      </section>

      <AvatarChatDialog
        avatar={selected}
        open={chatOpen}
        onOpenChange={setChatOpen}
      />

      {/* PROGRAMME PILLARS */}
      <section id="programme" className="py-20 md:py-28 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="ornament font-sans-ui text-xs uppercase tracking-[0.4em] text-burgundy mb-4">
              Act II
            </p>
            <h2 className="font-display text-4xl md:text-6xl mb-4">The Programme</h2>
            <p className="font-body text-xl text-muted-foreground max-w-2xl mx-auto">
              Workshops, labs, collaborative projects — Shakespeare as a starting point for
              contemporary dialogue.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <article
                key={p.title}
                className="group relative bg-card border border-border p-8 rounded-sm hover:border-gold transition-colors shadow-card-soft"
              >
                <span className="font-display italic text-7xl text-gold/30 absolute top-4 right-6 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-burgundy mb-4 relative">
                  {p.title}
                </h3>
                <p className="font-body text-lg leading-relaxed text-foreground/85 relative">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SHAKESPEARE AS STARTING POINT */}
      <section className="py-20 md:py-28 bg-curtain text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 font-display text-9xl">"</div>
          <div className="absolute bottom-10 right-10 font-display text-9xl rotate-180">"</div>
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <p className="ornament font-sans-ui text-xs uppercase tracking-[0.4em] text-gold mb-6">
            Act III
          </p>
          <h2 className="font-display text-4xl md:text-6xl mb-8">
            Shakespeare, through <em className="text-gold">every</em> voice.
          </h2>
          <p className="font-body text-xl md:text-2xl leading-relaxed opacity-90">
            From the symbolism of Indian traditions, to the emotional intensity of Argentine
            perspectives, the depth of Ukrainian approaches, the energy and community spirit of
            African influences, and Tunisian creativity that moves beyond the stage into street art —
            Shakespeare becomes a universal language, reinterpreted through diverse identities.
          </p>
          <p className="font-display italic text-2xl md:text-3xl text-gold mt-10">
            "All the world's a stage" — and every culture, a player.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-parchment">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            The full programme is <em className="text-burgundy">coming soon.</em>
          </h2>
          <p className="font-body text-xl text-muted-foreground mb-10">
            Stay tuned for announcements about artists, dates, and applications. In the meantime —
            our guides are here to answer your questions.
          </p>
          <a
            href="#meet"
            className="inline-block font-sans-ui text-sm uppercase tracking-widest px-10 py-4 bg-burgundy text-primary-foreground hover:bg-gold-grad hover:text-foreground transition-all rounded-sm shadow-card-soft"
          >
            Talk to a guide
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-burgundy text-primary-foreground py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-lg">✦ Erasmus + Shakespeare</p>
          <p className="font-sans-ui text-xs uppercase tracking-widest opacity-70">
            University of Craiova × Shakespeare Festival
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
