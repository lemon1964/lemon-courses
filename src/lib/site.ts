// Set SITE_URL to the confirmed primary production domain before publishing.
export const siteUrl = (process.env.SITE_URL || "https://lemon-courses.vercel.app").replace(/\/$/, "");
// Vercel previews and local builds are never indexable. In production only.
export const indexable = process.env.VERCEL_ENV === "production";
export const canonical = (path: string) => siteUrl + path;
