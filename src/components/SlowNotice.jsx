/** Friendly note shown when the first load is slow (the API may be waking up). */
export default function SlowNotice({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl bg-ice px-4 py-3 text-sm text-navy ${className}`} role="status">
      <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-powder border-t-navy" />
      Loading the latest properties — the first visit can take up to a minute. Thanks for waiting.
    </div>
  );
}
