import { articles, courses } from "@/lib/data";

// PythonAnywhere accepts e (event) and src (source). The source identifies
// both the origin and the exact clicked destination.
export const TRACK_EVENTS = {
  homeStepik: "главная_степик",
  homeDemo: "главная_проект",
  articleStepik: "статья_степик",
  articleDemo: "статья_проект",
} as const;

export type TrackEvent = (typeof TRACK_EVENTS)[keyof typeof TRACK_EVENTS];
export const courseSource = (id: number) => `курс_${String(id).padStart(2, "0")}`;
export const projectSource = (id: number) => `проект_${String(id).padStart(2, "0")}`;
export const articleCourseSource = (article: string, id: number) => `${article}__${courseSource(id)}`;
export const articleProjectSource = (article: string, id: number) => `${article}__${projectSource(id)}`;

export const allowedSources: Readonly<Record<TrackEvent, ReadonlySet<string>>> = {
  [TRACK_EVENTS.homeStepik]: new Set(courses.map((c) => courseSource(c.id))),
  [TRACK_EVENTS.homeDemo]: new Set(courses.map((c) => projectSource(c.id))),
  [TRACK_EVENTS.articleStepik]: new Set(articles.map((a) => articleCourseSource(a.src, a.courseId))),
  [TRACK_EVENTS.articleDemo]: new Set(articles.map((a) => articleProjectSource(a.src, a.courseId))),
};

export function validTrackingPair(event: unknown, src: unknown): event is TrackEvent {
  return typeof event === "string" && typeof src === "string" &&
    Object.prototype.hasOwnProperty.call(allowedSources, event) &&
    allowedSources[event as TrackEvent].has(src);
}
