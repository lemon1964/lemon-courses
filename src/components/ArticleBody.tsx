import {Pair08ArticleBody} from "@/components/Pair08ArticleBody";
import {Pair07ArticleBody} from "@/components/Pair07ArticleBody";
import {Pair06ArticleBody} from "@/components/Pair06ArticleBody";
import {Pair05ArticleBody} from "@/components/Pair05ArticleBody";
import {Pair04ArticleBody} from "@/components/Pair04ArticleBody";
import {Pair03ArticleBody} from "@/components/Pair03ArticleBody";
import { Pair02ArticleBody } from "@/components/Pair02ArticleBody";
import { ApprovedArticleBody } from "@/components/ApprovedArticleBody";
export function ArticleBody({slug}:{slug:string}){if(slug==="choose-ai-api-provider" || slug==="supabase-backend-nextjs-database") return <Pair08ArticleBody slug={slug}/>;if(slug==="ai-generated-app-to-working-product" || slug==="nextjs-url-search-filters") return <Pair07ArticleBody slug={slug}/>;if(slug==="openrouter-free-models-guide" || slug==="playwright-nextjs-first-test") return <Pair06ArticleBody slug={slug}/>;if(slug==="react-useeffect-runs-twice" || slug==="openrouter-api-key-secure") return <Pair05ArticleBody slug={slug}/>;if(slug==="supabase-auth-nextjs-login" || slug==="create-api-django-rest-framework") return <Pair04ArticleBody slug={slug}/>;if(slug==="jwt-access-refresh-api" || slug==="vitest-nextjs-first-tests") return <Pair03ArticleBody slug={slug}/>;if(slug==="accept-payments-on-website" || slug==="react-typescript-props-data") return <Pair02ArticleBody slug={slug}/>;if(slug==="free-llm-api-for-app" || slug==="react-hook-form-zod-validation") return <ApprovedArticleBody slug={slug}/>;if(slug==="seo-nextjs-app-router")return <>
<h2>Что именно должна обеспечить техническая SEO-основа</h2><p>Поисковому роботу нужны доступные HTML-страницы, понятные URL и согласованные указания об индексации. В App Router Next.js эти задачи распределены между метаданными маршрутов, специальными файлами sitemap и robots и серверным рендерингом. Наличие тегов само по себе не гарантирует индексацию или позиции.</p>
<h2>1. Начните с карты маршрутов</h2><p>Для проекта с несколькими языками сначала перечислите индексируемые страницы, затем определите канонический адрес каждой. Например, русская карточка события должна иметь собственный URL, язык и фильтры не следует неявно смешивать с адресом канонической страницы.</p><pre><code>{`app/
  [locale]/
    page.tsx
    events/[slug]/page.tsx
  sitemap.ts
  robots.ts`}</code></pre><p>Основной инвариант: сервер может отдать нужный контент по прямому запросу к URL.</p>
<h2>2. Metadata и canonical</h2><p>У каждой значимой страницы нужен отдельный заголовок, описание и адрес canonical. Для динамических страниц используйте <code>generateMetadata</code>. Canonical должен указывать на выбранный индексируемый URL, а не механически на главную.</p><pre><code>{`export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  return {
    title: 'Событие — EventMap',
    alternates: { canonical: 'https://example.com/' + locale + '/events/' + slug }
  };
}`}</code></pre><p>В рабочем приложении нужно кодировать slug, учитывать язык и базовый домен, код выше, фрагмент для объяснения, не готовая реализация.</p>
<h2>3. Sitemap и robots, разные задачи</h2><p><code>sitemap.xml</code> перечисляет желательные для обхода URL. <code>robots.txt</code> указывает роботу, какие области разрешено обходить. Эти файлы не заменяют друг друга и не гарантируют включения страниц в индекс.</p><pre><code>{`// app/robots.ts (пример)
export default function robots() {
  return { rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://example.com/sitemap.xml' };
}`}</code></pre><p>Черновые или тестовые версии сайта не должны случайно индексироваться. Проверьте, что robots, canonical и sitemap принадлежат именно production-домену.</p>
<h2>4. Языковые адреса и hreflang</h2><p>При наличии нескольких языков полезны явные альтернативы между эквивалентными страницами. Важно сопоставлять действительно соответствующие материалы: перевод страницы события на другой язык, а не произвольный URL из той же категории.</p>
<h2>5. Проверка результата</h2><ul><li>Откройте URL напрямую и изучите исходный HTML без выполнения клиентского JavaScript.</li><li>Проверьте уникальные title, description и canonical для каждой страницы.</li><li>Запросите <code>/robots.txt</code> и <code>/sitemap.xml</code>, найдите в sitemap только правильные индексируемые адреса.</li><li>Проверьте языковые альтернативы и отсутствие конфликтов между ними.</li><li>После деплоя используйте инструменты проверки URL Google и Яндекса, не заменяя их визуальной проверкой браузера.</li></ul><p>На курсе Next.js III эти принципы рассматриваются в контексте EventMap.</p>
</>;
return <>
<h2>Как разделяются обязанности</h2><p>Next.js отвечает за интерфейс, маршруты и пользовательские взаимодействия. Django REST Framework предоставляет API, работает с данными и бизнес-правилами. HTTP-запрос связывает эти части, браузер не должен знать секретные ключи Django или внешних AI-провайдеров.</p>
<h2>1. Опишите контракт API прежде, чем писать форму</h2><p>Начните с метода, URL, JSON-полей и ошибок. Например, отправка текстового сообщения может выглядеть так:</p><pre><code>{`POST /api/messages/
Content-Type: application/json

{ "text": "Привет" }

HTTP/1.1 201 Created
{ "id": 42, "text": "Привет" }`}</code></pre><p>Это упрощённый пример контракта API для текстового сообщения.</p>
<h2>2. Django, сериализатор и представление</h2><p>Сериализатор проверяет входные данные и преобразует их в представление, доступное API. View выбирает действие и HTTP-статус. Для продакшн-приложения здесь также необходимы права доступа и ограничения запросов.</p><pre><code>{`# Упрощённая иллюстрация DRF
from rest_framework import serializers

class MessageSerializer(serializers.Serializer):
    text = serializers.CharField(max_length=4000)`}</code></pre><p>Пример специально не имитирует хранение сообщения, авторизацию или обращение к модели, эти функции требуют отдельного проектирования.</p>
<h2>3. Next.js, вызывайте API на правильной границе</h2><p>Когда данные нужны серверному компоненту, запрос может выполнять сервер Next.js. Интерактивная форма обычно инициирует запрос по действию пользователя. Выбор зависит от того, где находятся токены, cookie и данные, допустимые к передаче браузеру.</p><pre><code>{`async function sendMessage(text: string) {
  const response = await fetch('/api/messages/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  if (!response.ok) throw new Error('Ошибка API');
  return response.json();
}`}</code></pre><p>Относительный путь здесь предполагает настроенный прокси или API на том же origin. Если Django работает на другом домене, потребуются корректный абсолютный адрес, политика CORS и схема авторизации.</p>
<h2>4. Авторизация, CORS и обработка ошибок</h2><ul><li><b>Авторизация:</b> согласуйте, передаются ли cookie, bearer-token или иной механизм, не храните секретные ключи в клиентском коде.</li><li><b>CORS:</b> настройте список доверенных origin при прямом браузерном запросе на Django, CORS не заменяет проверку прав доступа.</li><li><b>Ошибки:</b> обрабатывайте 400, 401, 403, 429 и 5xx отдельно от сетевого отказа.</li><li><b>Таймауты:</b> предусмотрите понятный интерфейс ожидания и повторный запрос там, где повторение безопасно.</li></ul>
<h2>5. Как проверить интеграцию</h2><p>Убедитесь, что браузер действительно получает ожидаемый ответ, что сервер валидирует входные данные и что ошибки не превращаются в молчаливое зависание UI. Проверяйте сценарии без авторизации, с неправильным JSON и с недоступным Django-сервером. Только после этого подключайте AI-провайдера.</p><p>В линейке AI на Django и Next.js вторая часть посвящена бэкенду и связи его с фронтендом. Примеры показывают базовую интеграцию фронтенда с API.</p>
</>}
