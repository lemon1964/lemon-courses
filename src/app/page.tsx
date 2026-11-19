import {socialMetadata} from "@/lib/social";
import { TRACK_EVENTS, courseSource, projectSource } from "@/lib/tracking-events";
import Link from "next/link";
import type { ReactNode } from "react";
import { courses, articles, reviews, proof } from "@/lib/data";
import { stepikHref } from "@/lib/tracking";
import { TrackedLink } from "@/components/TrackedLink";
import "./home.css";
export const metadata={alternates:{canonical:"/"},...socialMetadata("Курсы разработки на Next.js, Django и AI","Учебные проекты, примеры и статьи для разработчиков.","/")};

const tracks=[
  {key:"ai",name:"AI + Django",title:"Своё AI-приложение: от чата до оплаты",fit:"Подойдёт фронтендерам, которые хотят освоить Django, бэкендерам, которым нужны React и Next.js, и новичкам: первый курс собран из готовых блоков кода."},
  {key:"next",name:"Next.js",title:"Next.js: от первого маршрута до сайта в поиске",fit:"Подойдёт, если вы знаете JavaScript и React, но Next.js пока кажется сложным."},
] as const;

// Layers of a real web app and the courses that build each one (course ids).
const layers=[
  {name:"Интерфейс",tech:"Next.js, React, TypeScript",ids:[1,4,5]},
  {name:"Поиск и языки",tech:"SEO, sitemap, /ru и /en",ids:[6]},
  {name:"Сервер и API",tech:"Django REST, авторизация",ids:[2,4]},
  {name:"Нейросети",tech:"LLM, голос, картинки",ids:[2,3]},
  {name:"Оплата",tech:"ЮKassa, доступ после оплаты",ids:[3]},
];
// shortcut: names as text wordmarks; swap in official SVG logos once you have the right to use them.
const places=["Сбер","Яндекс","МФТИ","МГТУ им. Н. Э. Баумана","МАДИ"];
const byId=(id:number)=>courses.find(c=>c.id===id)!;
const rub=(n:number)=>`${n.toLocaleString("ru-RU")} ₽`;
const lessons=courses.reduce((s,c)=>s+c.lessons,0);
const tagName=(id:number)=>{const c=byId(id);return `${c.line==="ai"?"AI":"Next"} ${c.step}`};

const Icon=({children}:{children:ReactNode})=><svg className="h-icon" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>;
const how=[
  {title:"Учитесь в своём темпе",text:"Уроки открываются сразу, без расписания и дедлайнов.",icon:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>},
  {title:"Задания с автопроверкой",text:"От 15 до 82 заданий на курс, ответ проверяется сразу.",icon:<><rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8.5 12 2.5 2.5 4.5-5"/></>},
  {title:"Свой проект в конце",text:"Код остаётся у вас: выкладываете в интернет и показываете.",icon:<><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/></>},
  {title:"Сертификат Stepik",text:"Выдаётся автоматически, когда решены задания.",icon:<><circle cx="12" cy="9" r="5"/><path d="m9 13.5-1.5 7 4.5-2.5 4.5 2.5-1.5-7"/></>},
];
const Stars=({n}:{n:number})=><span className="h-stars" aria-label={`Оценка ${n} из 5`}>{"★".repeat(n)}<span aria-hidden>{"★".repeat(5-n)}</span></span>;

function Marquee({className,label,children}:{className:string;label:string;children:ReactNode}){
  // The second copy only makes the loop seamless; screen readers get the first.
  return <div className={`h-marquee ${className}`} role="region" aria-label={label}><div className="h-marquee-track"><div className="h-marquee-set">{children}</div><div className="h-marquee-set" aria-hidden>{children}</div></div></div>;
}

export default function Home(){return <main className="home">
<section className="h-hero container">
  <div className="h-hero-text">
    <h1>От первой строки кода до первого платежа</h1>
    <p className="h-lead">Соберите своё приложение целиком: интерфейс, сервер, нейросеть и оплату. Выложите его в интернет и покажите тем, кто будет им пользоваться и платить: работодателю, клиенту или первым пользователям.</p>
    <div className="h-actions"><Link className="button h-cta" href="#courses">Выбрать свой курс</Link><Link className="button button-muted" href="#reviews">Почитать отзывы</Link></div>
    <dl className="h-proof">
      <div><dt>учеников на Stepik</dt><dd>{proof.learners}</dd></div>
      <div><dt>средняя оценка, {proof.reviewsCount} отзывов</dt><dd>{proof.rating} <span aria-hidden>★</span></dd></div>
      <div><dt>уроков в шести курсах</dt><dd>{lessons}</dd></div>
    </dl>
  </div>
  <figure className="h-stack" aria-labelledby="stack-caption">
    <figcaption id="stack-caption">Один запрос пользователя проходит через всё приложение. Каждую часть вы соберёте сами.</figcaption>
    <div className="h-flow"><span className="h-pulse" aria-hidden/><ol>
      {layers.map(l=><li key={l.name}><div><b>{l.name}</b><span>{l.tech}</span></div><div className="h-stack-tags">{l.ids.map(id=><a key={id} href={`#course-${id}`} className={`h-tag h-tag-${byId(id).line} t-${id}`} aria-label={byId(id).title}>{tagName(id)}</a>)}</div></li>)}
    </ol></div>
  </figure>
</section>

<section className="h-places" aria-labelledby="places-title">
  <p id="places-title" className="container">Среди наших учеников — сотрудники и студенты</p>
  <Marquee className="h-places-marquee" label="Компании и вузы учеников">{places.map(p=><span className="h-place" key={p}>{p}</span>)}</Marquee>
</section>

<section className="h-how container" aria-label="Как проходит обучение">
  {how.map(h=><div key={h.title}><Icon>{h.icon}</Icon><p><b>{h.title}</b>{h.text}</p></div>)}
</section>

<section className="h-courses" id="courses"><div className="container">
  <h2>Две линейки курсов</h2>
  <p className="h-section-lead">Курсы в линейке идут по порядку: каждый продолжает проект или навыки предыдущего. Начать можно с любого, если вы уже знаете то, что нужно на входе.</p>
  {tracks.map(t=><div className={`h-track h-track-${t.key}`} key={t.key}>
    <header className="h-track-head"><span className="h-track-name">{t.name}</span><h3>{t.title}</h3><p>{t.fit}</p></header>
    <ol className="h-rail">{courses.filter(c=>c.line===t.key).map(c=><li className="h-course" id={`course-${c.id}`} key={c.id}>
      <span className="h-node" aria-hidden>{c.step}</span>
      <div className="h-course-main">
        <h4>{c.title}</h4>
        <p>{c.summary}</p>
        <p className="h-learn-title">Вы научитесь</p>
        <ul>{c.skills.map(s=><li key={s}>{s}</li>)}</ul>
        <p className="h-needs"><b>Нужно знать заранее:</b> {c.needs}</p>
      </div>
      <aside className="h-course-side">
        <p className="h-project">Проект курса<b>{c.demoName}</b><TrackedLink className="text-link" href={c.demo} event={TRACK_EVENTS.homeDemo} src={projectSource(c.id)}>Открыть демо</TrackedLink></p>
        <dl><div><dt>Уроков</dt><dd>{c.lessons}</dd></div><div><dt>Заданий</dt><dd>{c.quizzes}</dd></div></dl>
        <TrackedLink className="button h-cta h-course-cta" href={stepikHref(c.stepik,courseSource(c.id))} event={TRACK_EVENTS.homeStepik} src={courseSource(c.id)}>Начать за {rub(c.price)}</TrackedLink>
        <span className="h-cta-note">Откроется страница курса на Stepik</span>
      </aside>
    </li>)}</ol>
  </div>)}
</div></section>

<section className="h-reviews" id="reviews" aria-labelledby="reviews-title">
  <div className="container"><h2 id="reviews-title">Что говорят ученики</h2><p className="h-section-lead">Отзывы со страниц курсов на Stepik, без правок. Средняя оценка {proof.rating} из 5.</p></div>
  <Marquee className="h-reviews-marquee" label="Отзывы учеников">{reviews.map(r=><figure className="h-review" key={r.name}><Stars n={r.score}/><blockquote>{r.text}</blockquote><figcaption><b>{r.name}</b>{byId(r.courseId).title}</figcaption></figure>)}</Marquee>
</section>

<section className="h-dream"><div className="container">
  <h2>После курсов у вас будет своё приложение в интернете</h2>
  <ul>
    <li><b>Работающий продукт</b>Свой адрес в интернете, вход для пользователей, нейросеть внутри и приём оплаты.</li>
    <li><b>Портфолио, которое открывают</b>Живые демо и код на GitHub вместо строчки «знаю React» в резюме.</li>
    <li><b>Навык фулстека</b>Понимание, как фронтенд, бэкенд и внешние сервисы работают вместе.</li>
  </ul>
  <div className="h-actions">
    <a className="button h-cta" href="#course-1">Начать с AI-линейки за {rub(byId(1).price)}</a>
    <a className="button h-cta-ghost" href="#course-4">Начать с Next.js за {rub(byId(4).price)}</a>
  </div>
</div></section>

<section className="h-articles container" id="articles">
  <div className="h-articles-head"><div><h2>Бесплатные разборы</h2><p className="h-section-lead">Статьи по задачам из курсов: API, платежи, SEO, авторизация и ошибки, на которых застревают.</p></div><Link className="text-link" href="/articles">Все статьи ({articles.length})</Link></div>
  <div className="article-list">{articles.slice(-6).reverse().map(a=><Link href={`/articles/${a.slug}`} className="article-row h-article" key={a.slug}><span><b>{a.title}</b><small>{a.description}</small></span><span className="h-reading">{a.reading}</span></Link>)}</div>
</section>
</main>}
