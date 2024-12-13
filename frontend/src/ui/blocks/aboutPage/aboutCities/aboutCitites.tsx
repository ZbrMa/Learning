import './aboutCities.css';
import { IPlace } from "../../../../types/places";
import { BodyBlock, MainHeader } from "../../common/bodyBlock/bodyBlock";
import { useTrail, animated, useSpring, useScroll } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

type AboutCitiesProps = {
  places: IPlace[];
};

export function AboutCitiesBlock({ places }: AboutCitiesProps) {
  return (
    <BodyBlock>
        <div className='flex-col g-64'>

        
      {places.map((place, index) => (
        <CityContainer
          place={place}
          index={index + 1}
          key={place.city + place.id}
        />
      ))}
      </div>
    </BodyBlock>
  );
}

type CityCOntainerProps = {
  place: IPlace;
  index: number;
};

function CityContainer({ place, index }: CityCOntainerProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const trails = useTrail(1, {
    config: { mass: 5, tension: 2000, friction: 1000 },
    opacity: inView ? 1 : 0,
    x: inView ? 0 : 100,
    from: { opacity: 0, x: 100 },
    delay: 100,
  });

  const { scrollYProgress } = useScroll();

  const [imgRef, imgInView] = useInView({
    threshold: 0,
  });

  const styles = useSpring({
    transform: scrollYProgress.to((y) => {
      if (!imgInView) return "translateY(80px)";
      return `translateY(${80 - y * 80 * 0.5}px)`;
    }),
    config: { tension: 100, friction: 30 },
  });

  return (
      <div className="grid-2 g-64 h-full city__container" ref={ref}>
        <div className="w-full h-full relative city--img">
          <animated.img
            src={place.image}
            ref={imgRef}
            className="w-full absolute"
            style={{
              ...styles,
            }}
          />
        </div>
        <div className="flex-col g-32 intro__right h-full city__text">
          {trails.map((props) => (
            <animated.div style={props}>
              <MainHeader>
                <span className='tc-red'>{index}.</span> {place.spot}
              </MainHeader>
            </animated.div>
          ))}
          <p className="tx-xl tx-lightGray mt-auto">{place.about}</p>
        </div>
      </div>
  );
}
