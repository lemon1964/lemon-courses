import type { Metadata, Viewport } from "next";
import Link from "next/link";
import Image from "next/image";
import {ContactLink} from "@/components/ContactLink";
import { siteUrl, indexable } from "@/lib/site";
import {socialMetadata} from "@/lib/social";
import "./globals.css";
export const viewport:Viewport={width:"device-width",initialScale:1};
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:"Курсы разработки на Next.js, Django и AI",template:"%s"},description:"Учебные проекты, примеры и статьи для разработчиков.",robots:{index:indexable,follow:indexable},...socialMetadata("Курсы разработки на Next.js, Django и AI","Учебные проекты, примеры и статьи для разработчиков.","/"),verification:{google:process.env.GOOGLE_SITE_VERIFICATION, yandex:process.env.YANDEX_VERIFICATION}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ru" data-scroll-behavior="smooth"><body><header className="site-header"><div className="container header-inner"><Link className="brand" href="/" aria-label="Lemon Courses — главная"><Image className="brand-logo" src="/logo.svg" alt="" width={34} height={34} priority/><span>Lemon <strong>Courses</strong></span></Link><nav aria-label="Основная навигация"><Link href="/#courses">Курсы</Link><Link href="/articles">Статьи</Link></nav><Link className="header-cta" href="/#courses">Выбрать курс</Link></div></header>{children}<footer className="footer"><div className="container footer-inner"><span>© {new Date().getFullYear()} Lemon Courses</span><span><Link href="/privacy">Конфиденциальность</Link><ContactLink/></span></div></footer></body></html>}
