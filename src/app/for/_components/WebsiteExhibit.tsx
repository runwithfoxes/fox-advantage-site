"use client";

// The website exhibit: the client's site rebuilt, shown live inside a browser
// frame, with the honest caption about how fast and rough the rebuild was,
// the issues found while building it, and what it runs on. The strongest
// exhibit in the old template, formalised. The iframe src is a real rebuilt
// page; never a screenshot pretending to be one.

import "./website-exhibit.css";

export default function WebsiteExhibit({
  url,
  src,
  caption,
  issues,
  uses,
  feeds,
}: {
  url: string; // what the address bar shows
  src: string; // the actual iframe src (the rebuilt site)
  caption: string; // the honesty line
  issues?: { title: string; items: string[] }; // real, verified findings only
  uses?: string[]; // chip list: what it runs on
  feeds?: string[]; // chip list: what it powers downstream
}) {
  return (
    <div className="ppwx-wrap">
      <div className="ppwx-browser">
        <div className="ppwx-bar">
          <span className="ppwx-dots">
            <i className="r" />
            <i className="a" />
            <i className="g" />
          </span>
          <span className="ppwx-url">{url}</span>
          <span className="ppwx-live">live</span>
        </div>
        <iframe
          className="ppwx-frame"
          src={src}
          title={`Rebuild of ${url}`}
          loading="lazy"
        />
      </div>
      <p className="ppwx-caption">{caption}</p>
      {(issues || uses) && (
        <div className="ppwx-strip">
          {issues && (
            <div>
              <p className="ppwx-label">{issues.title}</p>
              <ul>
                {issues.items.map((it, i) => (
                  <li key={i}>{it}</li>
                ))}
              </ul>
            </div>
          )}
          <div>
            {uses && (
              <>
                <p className="ppwx-label">What it uses</p>
                <div className="ppwx-chips">
                  {uses.map((u) => (
                    <span key={u}>{u}</span>
                  ))}
                </div>
              </>
            )}
            {feeds && (
              <>
                <p className="ppwx-label" style={{ marginTop: 18 }}>
                  What it feeds
                </p>
                <div className="ppwx-chips">
                  {feeds.map((f) => (
                    <span key={f}>{f}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
