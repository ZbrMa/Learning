import { useRef, useState, useEffect,memo, forwardRef, useImperativeHandle, HTMLAttributes } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import "./carousel.css";
import React from "react";

interface CarouselProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  smallDev: number;
  midDev: number;
  largeDev: number;
  extraDev: number;
  variant?: "arrowLeft" | "arrowRight" | "arrowSided";
  title?:string,
};

export function Carousel({
  children,
  smallDev,
  midDev,
  largeDev,
  extraDev,
  variant = "arrowSided",
  ...props
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [maxStep, setMaxStep] = useState(0);
  const [step, setStep] = useState(0);
  const [position, setPosition] = useState(0);
  const [childWidth, setChildWidth] = useState(0);
  const [carouselWidth, setCarouselWidth] = useState("");

  const updateSizes = () => {
    if (carouselRef.current) {
      const carouselWidth = carouselRef.current.offsetWidth;
      setChildWidth(carouselWidth / carouselRef.current.childElementCount);
      getVisibleCards();
    }
    setPosition(0);
  };

  const getVisibleCards = () => {
    let visibleCard = 0;
    if (carouselRef.current) {
      let calc: number;
      if (window.innerWidth >= 1200) {
        setMaxStep(carouselRef.current.childElementCount - extraDev);
        visibleCard = extraDev;
        calc = 100 / extraDev;
      } else if (window.innerWidth >= 992) {
        setMaxStep(carouselRef.current.childElementCount - largeDev);
        visibleCard = largeDev;
        calc = 100 / largeDev;
      } else if (window.innerWidth >= 768) {
        setMaxStep(carouselRef.current.childElementCount - midDev);
        visibleCard = midDev;
        calc = 100 / midDev;
      } else {
        setMaxStep(carouselRef.current.childElementCount - smallDev);
        visibleCard = smallDev;
        calc = 100 / smallDev;
      }

      setCarouselWidth(
        "calc( " + carouselRef.current.childElementCount + " * " + calc + "% )"
      );
    }

    return visibleCard;
  };

  useEffect(() => {
    getVisibleCards();
    window.addEventListener("resize", getVisibleCards);

    return () => {
      window.removeEventListener("resize", getVisibleCards);
    };
  }, [children]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${position}px)`;
    }
  }, [position, childWidth]);

  const moveLeft = () => {
    if (carouselRef.current) {
      const newPosition = Math.min(position + childWidth, 0);
      if (newPosition !== position) {
        setPosition(newPosition);
        if (position !== 0 && step - 1 >= 0) {
          setStep((prevStep) => prevStep - 1);
        }
      }
    }
  };

  const moveRight = () => {
    if (carouselRef.current && children) {
      const carouselChildNum = carouselRef.current.childElementCount;
      let visibleCards = getVisibleCards();
      const maxMove = -(
        childWidth * (children ? carouselChildNum - visibleCards : 0)
      );
      const newPosition = Math.max(position - childWidth, maxMove);
      if (newPosition !== position) {
        setPosition(newPosition);
        if (newPosition <= maxMove || step <= maxStep) {
          setStep((prevStep) => prevStep + 1);
        }
      }
    }
  };

  useEffect(()=>{
    updateSizes();
  },[carouselWidth]);

  if (variant === "arrowLeft") {
    return (
      <div className="carousel__container left g-64" {...props}>
        <CarouselSide
          moveLeft={moveLeft}
          moveRight={moveRight}
          step={step}
          maxStep={maxStep}
        />
        <CarouselCore
          width={carouselWidth}
          ref={carouselRef}
        >
          {children}
        </CarouselCore>
      </div>
    );
  } 
  else if (variant === "arrowRight") {
    return (
      <div className="carousel__container right">
        <CarouselCore
          width={carouselWidth}
          ref={carouselRef}
        >
          {children}
        </CarouselCore>
        <CarouselSide
          moveLeft={moveLeft}
          moveRight={moveRight}
          step={step}
          maxStep={maxStep}
        />
      </div>
    );
  } 
  else {
    return (
      <div className="carousel__container centered g-64">
        <button onClick={moveLeft}>
          <IoChevronBack></IoChevronBack>
        </button>
        <CarouselCore
          width={carouselWidth}
          ref={carouselRef}
        >
          {children}
        </CarouselCore>
        <button onClick={moveRight}>
          <IoChevronForward></IoChevronForward>
        </button>
      </div>
    );
  }
};


interface CarouselSideProps extends HTMLAttributes<HTMLElement> {
  moveLeft:()=>void,
  moveRight:()=>void,
  step:number,
  maxStep:number,
};

const CarouselSide = memo(function CraouselSide({moveLeft,moveRight,step,maxStep,...props}:CarouselSideProps){
  return(
  <div className="carousel__side" {...props}>
          <div className="carousel__buttons g-16">
            <IoChevronBack onClick={moveLeft} style={{color:`${step === 0 ? 'var(--lightGrayHover)' : 'var(--black)'}`}}/>
            <IoChevronForward onClick={moveRight} style={{color:`${step === maxStep ? 'var(--lightGrayHover)' : 'var(--black)'}`}}/>
          </div>
        </div>
  );
});

type CaroselCoreProps = {
  width:string,
  children:React.ReactNode,
};

const CarouselCore = memo(forwardRef<HTMLDivElement,CaroselCoreProps>(function CarouselCore({width,children}:CaroselCoreProps,ref){
  const internalRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => internalRef.current!);
  return(
    <div className="outer-carousel">
          <div
            className="slider-moving g-16"
            ref={internalRef}
            id="carousel"
            style={{
              width: `${width}`,
              gridTemplateColumns: `repeat(${internalRef.current?.childElementCount},1fr)`,
            }}
          >
            {children}
          </div>
        </div>
  );
}));
