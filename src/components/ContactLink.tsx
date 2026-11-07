"use client";
export function ContactLink(){return <a href="#contact" onClick={(e)=>{e.preventDefault();const address=["lemon.design","mail.ru"].join("@");window.location.href="mailto:"+address;}}>Контакты</a>}
