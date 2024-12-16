import "./citiesBlock.css";
import "animate.css";
import { BodyBlock, MainHeader } from "../../common/bodyBlock/bodyBlock";
import { useGetAdminPlacesQuery } from "../../../../api/placeApiSlice";
import { Highlight } from "../../../components/highlight/highlight";
import { useTrail, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import { useTranslation, Trans } from "react-i18next";
import { Spinner } from "../../../components/spinner/spinner";

export function CitiesBlock() {
  const { t } = useTranslation('visitor');
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
    delay: 100,
  });

  return (
    <BodyBlock className="cities__block">
      <div className="cities__top g-64 mb-64" ref={ref}>
        {trails.map((props) => (
          <animated.div style={props}>
            <MainHeader>{t("homePage.citiesIntro.header")}</MainHeader>
          </animated.div>
        ))}
        {isLoading ? (
          <Spinner fixed={false} />
        ): (
          <p className="tx-xl tx-lightGray mt-auto">
          <Trans
          i18nKey="homePage.citiesIntro.text"
          ns="visitor"
          values={{ number: data?.length }}
          components={{
            1: <Highlight>{data?.length}</Highlight>
          }}
        >
        </Trans>
        </p>
        )}
        
        
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
