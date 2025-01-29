import "./card.css";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLElement>{
  children?: React.ReactNode;
  title: string;
  subtitle?:string;
  image: string;
  button?: React.ReactNode;
  variant?:'left' | 'right'
};

export function Card({ children, title,subtitle, image, button, variant='left',...props }: CardProps) {

  return (
    <div className={`card__container ${variant}`} {...props}>
      <div className="big__card--overlay gradient"></div>
      <img className="big__card--img" src={image} alt="obrazek" />
      <div className="card__content p-64 box">
        <h1 className="h-xl tx-white xbold mb-8">{title}</h1>
        {subtitle &&<h3 className="h-xs tx-white xbold mb-8">{subtitle}</h3>}
        {children && <div className="card__text tx-white tx-md">{children}</div>}
        {button}
      </div>
    </div>
  );
}
