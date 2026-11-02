import type { Metadata,Viewport } from 'next';
import './globals.css';
export const metadata:Metadata={title:'하연이의 아틀리에',description:'마음껏 상상하고, 나만의 속도로 만드는 미술 시간',manifest:'/manifest.webmanifest',icons:{apple:'/icon-180.png'},appleWebApp:{capable:true,title:'하연 아틀리에'}};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#f7f5ef'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body>{children}</body></html>}
