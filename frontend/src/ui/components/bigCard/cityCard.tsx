import { HTMLAttributes } from "react";
import './cityCard.css';

interface BigCardProps extends HTMLAttributes<HTMLElement>{
    children?: React.ReactNode;
    title: string;
    image: string;
  };

export function CityCard({ children, title, image,...props }: BigCardProps){

        return(
            <div className={`city__card flex`} {...props}>
                <img src={image} alt={title} className="city__card--img"/>
                <span className="city__card--overlay"></span>
                <div className="city__card__content tx-white flex-col g-16 items-center">
                    <h3 className="h-lg xbold tx-white city--name p-8">{title}</h3>
                    <p className="tx-white city--desc p-8">{children}</p>
                </div>
                
            </div>
        );
};