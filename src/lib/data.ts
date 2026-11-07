export type Course = { id:number; title:string; description:string; outcome:string; stepik:string; demo:string; demoName:string; line:"ai"|"next" };
export const courses:Course[] = [
{id:1,line:"ai",title:"AI на Django и Next I",description:"Фронтенд AI-чата: Next.js, компоненты, состояние, локализация и интерфейс",outcome:"AI-Chat UI",stepik:"https://stepik.org/a/250212",demo:"https://lemon1964.github.io/ai-chat-pages/",demoName:"AI-Chat UI"},
{id:2,line:"ai",title:"AI на Django и Next II",description:"Django REST Framework, API, авторизация и подключение AI-сервисов к фронтенду",outcome:"AI-Chat",stepik:"https://stepik.org/a/250427",demo:"https://ai-chat-frontend-wy6h.onrender.com/",demoName:"AI-Chat"},
{id:3,line:"ai",title:"LLM-Chat + Mermaid + ЮKassa",description:"Практическая связка фронтенда, Django API, платежей и ограничений доступа",outcome:"Микро-SaaS",stepik:"https://stepik.org/a/253246",demo:"https://ai-chat-frontend-wy6h.onrender.com/",demoName:"Микро-SaaS"},
{id:4,line:"next",title:"Next.js I: JavaScript 2026",description:"App Router, загрузка данных, маршруты, URL-фильтры и деплой",outcome:"Goods Finder",stepik:"https://stepik.org/a/272213",demo:"https://goods-finder-js.vercel.app/",demoName:"Goods Finder"},
{id:5,line:"next",title:"Next.js II: TypeScript 2026",description:"Типы, формы, Server Actions и структура растущего приложения",outcome:"Workbench Notes",stepik:"https://stepik.org/a/275811",demo:"https://workbench-ts.onrender.com/",demoName:"Workbench Notes"},
{id:6,line:"next",title:"Next.js III: SEO, i18n 2026",description:"Локализованные URL, metadata, SSR, sitemap, robots и тесты",outcome:"EventMap",stepik:"https://stepik.org/a/286841",demo:"https://eventmap-seo.vercel.app/ru",demoName:"EventMap"},
];
export const articles = [
{slug:"seo-nextjs-app-router",src:"статья_сео_nextjs",title:"SEO в Next.js App Router: sitemap, robots, canonical и языковые URL",description:"Схема технической индексации в Next.js на примере архитектуры EventMap",courseId:6,reading:"8 минут"},
{slug:"django-drf-nextjs-api",src:"статья_drf_nextjs",title:"Django REST Framework + Next.js: как связать фронтенд с API",description:"Разбираем запрос, сериализатор, ответ и границу между Next.js и Django на примере AI-Chat",courseId:2,reading:"7 минут"},
] as const;
export type Article = (typeof articles)[number];
