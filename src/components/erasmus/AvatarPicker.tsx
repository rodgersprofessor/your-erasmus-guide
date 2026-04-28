import { Avatar, avatars } from "./avatars";

interface Props {
  selected: Avatar;
  onSelect: (a: Avatar) => void;
}

export const AvatarPicker = ({ selected, onSelect }: Props) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
      {avatars.map((a) => {
        const active = a.id === selected.id;
        return (
          <button
            key={a.id}
            onClick={() => onSelect(a)}
            className={`group flex flex-col items-center gap-2 p-2 rounded-sm transition-all ${
              active ? "bg-secondary" : "hover:bg-secondary/50"
            }`}
            aria-pressed={active}
          >
            <div
              className={`relative w-full aspect-square rounded-full overflow-hidden border-2 transition-all ${
                active
                  ? "border-gold shadow-gold scale-105"
                  : "border-border group-hover:border-gold/60"
              }`}
            >
              <img
                src={a.image}
                alt={a.name}
                width={512}
                height={512}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className={`font-display text-sm md:text-base leading-tight ${active ? "text-burgundy" : ""}`}>
                {a.name.split(" ")[0]}
              </p>
              <p className="font-sans-ui text-[10px] uppercase tracking-wider text-muted-foreground">
                {a.origin}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};
