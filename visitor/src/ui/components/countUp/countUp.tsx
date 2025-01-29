import './countUp.css';
import { useEffect, useState, useRef } from "react";

type CountUpProps = {
    min?: number;
    max: number;
    duration: number;
    step: number;
};

export function CountUp({ min = 0, max, step, duration }: CountUpProps) {
    const [current, setCurrent] = useState(min);
    const [isInViewport, setIsInViewport] = useState(false);
    const countUpRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const countUp = countUpRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInViewport(true);
                }
            },
            { threshold: 0.1 }
        );

        if (countUp) {
            observer.observe(countUp);
        }

        return () => {
            if (countUp) {
                observer.unobserve(countUp);
            }
        };
    }, []);

    useEffect(() => {
        if (!isInViewport) return;

        const steps = Math.floor((max - min) / step);
        const intervalDuration = duration / steps;

        const counterInterval = setInterval(() => {
            setCurrent((prev) => {
                if (prev + step >= max) {
                    clearInterval(counterInterval);
                    return max;
                }
                return prev + step;
            });
        }, intervalDuration);

        return () => clearInterval(counterInterval);
    }, [isInViewport, min, max, step, duration]);

    return <span ref={countUpRef} className="inherit counter">{current}</span>;
}
