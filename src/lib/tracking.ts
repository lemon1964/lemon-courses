export function stepikHref(url: string, src: string, articleSlug?: string) {
  const next = new URL(url);
  if (next.hostname !== "stepik.org" || !/^\/a\/\d+\/?$/.test(next.pathname)) {
    throw new Error("Expected a Stepik /a/{id} URL");
  }
  next.searchParams.set("utm_source", "lemon-courses");
  next.searchParams.set("utm_medium", articleSlug ? "article" : "site");
  next.searchParams.set("utm_campaign", articleSlug || "lemon-courses");
  next.searchParams.set("utm_content", src);
  return next.toString();
}
