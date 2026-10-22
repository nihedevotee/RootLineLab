/** Section header in the drawing-set language: sheet reference, title, and a hairline that draws in. */
export default function SheetRule({ id, sheet, title, note, tone = 'paper' }) {
  return (
    <header className={`sheet-rule sheet-rule--${tone}`}>
      <div className="flex items-end justify-between gap-6">
        <h2 id={id} className="team-section-title sd-mask">
          <span>{title}</span>
        </h2>
        <span className="team-meta pb-2">{sheet}</span>
      </div>
      <span className="sheet-rule__line sd-draw" aria-hidden="true" />
      {note && <p className="sheet-rule__note">{note}</p>}
    </header>
  );
}
