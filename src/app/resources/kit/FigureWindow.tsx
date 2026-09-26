import k from "./kit.module.css";

/**
 * The AI Ask's figure window: the course's window chrome (globals .mod-win, traffic lights,
 * figure_N_N title), then the number, the one sentence the figure proves, the chart, the caption.
 * The title is static text beside the chart, so a crawler and a PDF read the finding (DOCTRINE).
 */
export default function FigureWindow({ id, n, title, caption, tools, children }: { id: string; n: string; title: string; caption: string; tools?: React.ReactNode; children: React.ReactNode }) {
  return (
    <figure className={`mod-win ${k.fig}`} id={id}>
      <div className="mod-winbar">
        <span className="mod-lights">
          <i />
          <i />
          <i />
        </span>
        <span className="mod-wintitle">figure_{n.replace(/\./g, "_")}</span>
        {tools ? <span className={k.figTools}>{tools}</span> : null}
      </div>
      <div className={k.figBody}>
        <span className={k.figN}>Figure {n}</span>
        <p className={k.figTitle}>{title}</p>
        {children}
        <figcaption className={k.figCap}>{caption}</figcaption>
      </div>
    </figure>
  );
}
