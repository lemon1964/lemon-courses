"use client";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { TrackEvent } from "@/lib/tracking-events";
type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {href: string; event: TrackEvent; src: string; children: ReactNode};
export function TrackedLink({href, event, src, children, ...props}: Props) {
  function track() {
    try {
      const data = JSON.stringify({ event, src });
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track", new Blob([data], {type: "application/json"}));
      } else {
        void fetch("/api/track", {method: "POST", headers: {"content-type": "application/json"}, body: data, keepalive: true}).catch(() => {});
      }
    } catch { /* Навигация не зависит от аналитики. */ }
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" onClick={track} {...props}>{children}</a>;
}
