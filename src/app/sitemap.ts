import type {MetadataRoute} from "next";import {siteUrl,indexable} from "@/lib/site";import {articles} from "@/lib/data";
export default function sitemap():MetadataRoute.Sitemap{return indexable?["/","/articles",...articles.map(a=>`/articles/${a.slug}`),"/privacy"].map(path=>({url:`${siteUrl}${path}`,changeFrequency:"monthly" as const,priority:path==="/"?1:0.65})):[];}
