export default function PulseRings() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <span className="absolute w-24 h-24 rounded-full border-2 border-signal animate-pulse1" />
      <span className="absolute w-24 h-24 rounded-full border-2 border-signal animate-pulse1 [animation-delay:1.05s]" />
      <span className="absolute w-24 h-24 rounded-full border-2 border-signal animate-pulse1 [animation-delay:2.1s]" />
      <span className="absolute w-3 h-3 rounded-full bg-signal" />
    </div>
  );
}
