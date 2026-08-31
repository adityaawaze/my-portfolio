/**
 * Subtle ambient layer — film grain + soft vignette only.
 * No grids, orbs, or gradient blobs.
 */
export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
      <div className="absolute inset-0 film-grain opacity-[0.35]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, var(--portfolio-surface) 100%)',
          opacity: 0.5,
        }}
      />
    </div>
  );
}
