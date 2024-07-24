import { IBanner } from "../../types/types";
import React, { useState, useEffect } from 'react';
import './styles/banner.css'

type Props = {
    banners: IBanner[],
}

export function Banner({banners} : Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentBanner, setCurrentBanner] = useState<IBanner>(banners[currentIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 5000);
    
        return () => clearInterval(interval);
        
      }, [banners.length]);

    useEffect(() => {
        setCurrentBanner(banners[currentIndex]);
    },[currentIndex]);

    return (
        <div className="banner">
            <div className="banner-img" style={{ backgroundImage: `url(${currentBanner.image})` }}>
                <div className="banner-shadow"></div>   
                <div className="banner-info">
                    <div className="banner-title">{currentBanner.title}</div>
                    <div className="banner-text">{currentBanner.text}</div>
                </div>
            </div>
        </div>
    );
}