export function Loading() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center">
        <div className="inline-block w-6 h-6 border-2 border-[var(--wb-line)] border-t-[var(--wb-yellow)] rounded-full animate-spin" />
        <p className="mono text-[11px] uppercase text-[var(--wb-chalk-soft)] tracking-widest mt-4">
          Loading...
        </p>
      </div>
    </div>
  );
}
