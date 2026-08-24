const ITEMS = [
  "Digital Marketing",
  "Graphic Designing",
  "Web Development",
  "Performance Marketing",
  "Event Management",
];

export default function Ticker() {
  const items = [...ITEMS, ...ITEMS];
  return (
    <div className="bg-ink text-paper overflow-hidden border-b border-ink">
      <div className="flex whitespace-nowrap animate-marquee py-2.5">
        {items.map((item, i) => (
          <span key={i} className="flex items-center font-mono text-[11px] uppercase tracking-[0.18em] px-6">
            {item}
            <span className="ml-6 w-1.5 h-1.5 rounded-full bg-signal" />
          </span>
        ))}
      </div>
    </div>
  );
}
