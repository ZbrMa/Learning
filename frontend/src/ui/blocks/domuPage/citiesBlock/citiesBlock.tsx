import "./citiesBlock.css";
import "animate.css";
import { BodyBlock, MainHeader } from "../../common/bodyBlock/bodyBlock";
import { useGetAdminPlacesQuery } from "../../../../api/placeApiSlice";
import { Highlight } from "../../../components/highlight/highlight";
import { useTrail, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

export function CitiesBlock() {
  const { data, isLoading } = useGetAdminPlacesQuery();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const trails = useTrail(1, {
    config: { mass: 5, tension: 2000, friction: 1000 },
    opacity: inView ? 1 : 0,
    x: inView ? 0 : 100,
    from: { opacity: 0, x: 100 },
    delay:100,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <BodyBlock  className="cities__block">
      <div className="cities__top flex g-64  mb-64" ref={ref}>
        {trails.map((props) => (
          <animated.div style={props}>
            <MainHeader>
              Jevištěm se stává celé město
            </MainHeader>
          </animated.div>
        ))}

        <p className="tx-xl tx-lightGray mt-auto mb-16">
          Momentálně spravujeme <Highlight>{data?.length} míst</Highlight> a
          další neustále přibývají.
        </p>
      </div>

      <div className="slider">
        <div className="slide-track">
          {data?.map((city, index) => (
            <div key={index} className="slide">
              <p className="city-name tx-lightGray xbold  h-xl">{city.spot}</p>
            </div>
          ))}
          {data?.map((city, index) => (
            <div key={`duplicate-${index}`} className="slide">
              <p className="city-name tx-lightGray xbold  h-xl">{city.spot}</p>
            </div>
          ))}
        </div>
      </div>
    </BodyBlock>
  );
}
