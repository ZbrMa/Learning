import { HTMLAttributes } from "react";
import './cityCard.css';

interface BigCardProps extends HTMLAttributes<HTMLElement>{
    children?: React.ReactNode;
    title: string;
    image: string;
    variant?:'left' | 'right';
  };

export function CityCard({ children, title, image,variant='left',...props }: BigCardProps){

        if(variant === 'left'){
            return(
                <div className={`city__card left grid-2 g-64`} {...props}>
                <img src={image} alt={title} className="city__card--img"/>
                
                <div className="city__card__content tx-white flex-col g-16 items-center">
                    <h3 className="h-lg xbold tx-white city--name p-8">{title}</h3>
                    <p className="tx-white city--desc p-8">{children}</p>
                </div>
                
            </div>
            )
        }
        return(
            <div className={`city__card right grid-2 g-64`} {...props}>
                
                <div className="city__card__content tx-white flex-col g-16 items-center">
                    <h3 className="h-lg xbold tx-white city--name p-8">{title}</h3>
                    <p className="tx-white city--desc p-8">{children}</p>
                </div>
                <img src={image} alt={title} className="city__card--img"/>
                
                
            </div>
        );
};