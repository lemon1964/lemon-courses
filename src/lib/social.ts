import type {Metadata} from "next";
import {siteUrl} from "@/lib/site";
export const socialImage = `${siteUrl}/og-lemon-courses.jpg`;
export function socialMetadata(title:string, description:string, path:string, type:"website"|"article"="website"):Pick<Metadata,"openGraph"|"twitter">{
  const socialTitle = title;
  return {
    openGraph:{type,siteName:"Lemon Courses",title:socialTitle,description,url:`${siteUrl}${path}`,images:[{url:socialImage,width:1200,height:630,alt:"Web-приложения на курсах Stepik"}]},
    twitter:{card:"summary_large_image",title:socialTitle,description,images:[socialImage]},
  };
}
