import { TRACK_EVENTS, articleCourseSource, articleProjectSource } from "@/lib/tracking-events";
import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {articles,courses} from "@/lib/data";
import {stepikHref} from "@/lib/tracking";
import {TrackedLink} from "@/components/TrackedLink";
import {ArticleBody} from "@/components/ArticleBody";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return articles.map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const a=articles.find(a=>a.slug===slug);if(!a)return {};return {title:a.title,description:a.description,alternates:{canonical:`/articles/${slug}`},openGraph:{title:a.title,description:a.description,type:"article"}};}
export default async function Article({params}:Props){const {slug}=await params;const a=articles.find(a=>a.slug===slug);if(!a)notFound();const c=courses.find(c=>c.id===a.courseId)!;return <main className="container article-page"><nav className="breadcrumbs" aria-label="Навигация"><Link href="/">Главная</Link><span>/</span><Link href="/articles">Статьи</Link></nav><header className="article-header"><p className="overline">ПРАКТИЧЕСКИЙ РАЗБОР · {a.reading}</p><h1>{a.title}</h1><p className="page-lead">{a.description}</p></header><div className="article-layout"><article className="prose"><ArticleBody slug={slug}/><aside className="article-cta"><span className="overline">ПРАКТИКА В КУРСЕ</span><h2>{c.title}</h2><p>Этот курс разбирает соответствующие технологии на учебном проекте {c.outcome}. Приведённые в статье схемы объясняют архитектуру, но не подтверждают текущую конфигурацию онлайн-демо.</p><div className="hero-actions"><TrackedLink className="button" href={stepikHref(c.stepik,articleCourseSource(a.src,c.id))} event={TRACK_EVENTS.articleStepik} src={articleCourseSource(a.src,c.id)}>Курс на Stepik ↗</TrackedLink><TrackedLink className="button button-muted" href={c.demo} event={TRACK_EVENTS.articleDemo} src={articleProjectSource(a.src,c.id)}>Демо проекта ↗</TrackedLink></div></aside></article><aside className="article-aside"><div className="aside-card"><b>В этой статье</b><p>Проблема, архитектура, проверка результата и частые ошибки.</p><Link href="/articles">← Все статьи</Link></div></aside></div></main>}
