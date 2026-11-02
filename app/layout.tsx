import type { Metadata,Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
const posterFont=localFont({src:'../public/fonts/BlackHanSans.woff',variable:'--font-poster',display:'swap',preload:false});
const cutoutFont=localFont({src:'../public/fonts/KirangHaerang.woff',variable:'--font-cutout',display:'swap',preload:false});
const noteFont=localFont({src:'../public/fonts/Gaegu.woff',variable:'--font-note',display:'swap',preload:false});
export const metadata:Metadata={title:'하연이의 아틀리에',description:'마음껏 상상하고, 나만의 속도로 만드는 미술 시간',manifest:'/manifest.webmanifest',icons:{apple:'/icon-180.png'},appleWebApp:{capable:true,title:'하연 아틀리에'}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#f7f5ef'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko" className={`${posterFont.variable} ${cutoutFont.variable} ${noteFont.variable}`}><body>{children}</body></html>}
