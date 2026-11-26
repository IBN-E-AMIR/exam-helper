/* Pure CSS synthwave scene (stars, sun, mountains, moving perspective grid). Visible only in Neon theme. */
export default function NeonBackdrop() {
  return (
    <div className="synth" aria-hidden="true">
      <div className="stars" />
      <div className="sun" />
      <div className="mountains" />
      <div className="floor" />
    </div>
  );
}
