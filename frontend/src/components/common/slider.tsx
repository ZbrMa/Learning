import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { EventCard } from "./card";
import './styles/slider.css';
import { IEvent } from "../../types/types";
import { useRef, useState, useEffect } from "react";

type Props = {
    slidedObject: IEvent[] | null;
}

export function Slider({ slidedObject }: Props) {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [currentPosition, setCurrentPosition] = useState(0);
    const [cardWidth, setCardWidth] = useState(0);
    const [steps,setSteps] = useState(0);
    const [maxSteps,setMaxSteps] = useState(5);

    const getVisibleCards = () =>{
        let visibleCards:number;
            if (window.innerWidth >= 1220) {
                visibleCards = 4;
                setMaxSteps(2);
            } else if (window.innerWidth >= 900) {
                visibleCards = 3;
                setMaxSteps(3);
            } else if (window.innerWidth >= 768) {
                visibleCards = 2;
                setMaxSteps(4);
            } else {visibleCards = 1; setMaxSteps(5)};
        return visibleCards;
    }

    const updateSizes = () => {
        const carousel = carouselRef.current;
        if (carousel) {
            let visibleCards = getVisibleCards();
            const cardWidth = carousel.offsetWidth / visibleCards;
            setCardWidth(cardWidth);
            setCurrentPosition((prevPosition) => {
                const maxMove = -(cardWidth * (slidedObject ? slidedObject.length - visibleCards : 0));
                const currMove = -(cardWidth * steps);
                return Math.max(currMove, maxMove);
            });
        }
    };

    useEffect(() => {
        updateSizes();
        window.addEventListener('resize', updateSizes);

        return () => {
            window.removeEventListener('resize', updateSizes);
        };
    }, [slidedObject,steps]);

    useEffect(()=>{
        if(steps === maxSteps){
            setSteps((prevSteps) => prevSteps - 1);
        }
    },[maxSteps])

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.style.transform = `translateX(${currentPosition}px)`;
        }
    }, [currentPosition, cardWidth]);

    const moveLeft = () => {
        if (carouselRef.current) {
            const newPosition = Math.min(currentPosition + cardWidth, 0);
            if (newPosition !== currentPosition) {
                setCurrentPosition(newPosition);
                if (currentPosition !== 0 && steps-1>=0) {
                    setSteps((prevSteps) => prevSteps - 1);
                }
            }
        }
    };
    
    const moveRight = () => {
        if (carouselRef.current && slidedObject) {
            let visibleCards = getVisibleCards();
            const maxMove = -(cardWidth * (slidedObject ? slidedObject.length - visibleCards : 0));
            const newPosition = Math.max(currentPosition - cardWidth, maxMove);
            if (newPosition !== currentPosition) {
                setCurrentPosition(newPosition);
                if (newPosition <= maxMove || steps <=maxSteps) {
                    setSteps((prevSteps) => prevSteps + 1);
                }
            }
        }
    };
    
    return (
        <div className="slider">
            <button className="slider-btn back" onClick={moveLeft}><IoChevronBack /></button>
            <div className="slider-carousel">
                <div className="carousel-moving" ref={carouselRef}>
                    {slidedObject?.map((event, index) => (
                        <EventCard key={index} input={event} cardType="slider" />
                    ))}
                </div>
            </div>
            <button className="slider-btn next" onClick={moveRight}><IoChevronForward /></button>
        </div>
    );
}