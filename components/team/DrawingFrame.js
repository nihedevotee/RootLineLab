/**
 * Drafting-sheet frame: hairline border with crop marks on each corner and an optional caption row.
 * Wraps a portrait when one exists, otherwise a RootMark.
 */
export default function DrawingFrame({ children, caption, meta, tone = 'ink', className = '' }) {
  return (
    <figure className={`drawing-frame drawing-frame--${tone} ${className}`}>
      <span className="crop crop--tl" aria-hidden="true" />
      <span className="crop crop--tr" aria-hidden="true" />
      <span className="crop crop--bl" aria-hidden="true" />
      <span className="crop crop--br" aria-hidden="true" />
      <div className="drawing-frame__plate">{children}</div>
      {(caption || meta) && (
        <figcaption className="drawing-frame__caption">
          <span>{caption}</span>
          {meta && <span>{meta}</span>}
        </figcaption>
      )}
    </figure>
  );
}
