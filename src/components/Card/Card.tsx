import type { ReactNode } from 'react';
import './Card.css';
export function Card({children,className=''}:{children:ReactNode;className?:string}){return <section className={`card ${className}`}>{children}</section>;}
