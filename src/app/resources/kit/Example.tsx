import k from "./kit.module.css";

/** The Example tag. Shown beside anything with example: true, every time, on every page. */
export default function Example({ on = true }: { on?: boolean }) {
  return on ? <span className={k.ex}>Example</span> : null;
}
