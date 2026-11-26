export default function Spinner({ full = false, label = 'Loading' }) {
  const ring = (
    <div className="flex items-center gap-3 text-sm text-muted" role="status">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-powder border-t-navy" />
      {label}
    </div>
  );
  if (!full) return ring;
  return <div className="grid min-h-[60vh] place-items-center">{ring}</div>;
}
