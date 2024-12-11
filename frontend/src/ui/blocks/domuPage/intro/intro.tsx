import { BodyBlock, MainHeader } from "../../common/bodyBlock/bodyBlock";
import { Button } from "../../../components/button/button";
import { Highlight } from "../../../components/highlight/highlight";
import "./intro.css";
import { useTrail, animated, useSpring, useScroll } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";

export function IntroBlock() {
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
            if (!imgInView) return 'translateY(192px)';
            return `translateY(${192 - y * 192 * 1.5}px)`;
        }),
        config: { tension: 100, friction: 30 },
    });

  return (
    <BodyBlock variant="full" color="grey" id="intro">
      <div className="grid-2 g-64 h-full" ref={ref}>
        <div className="w-full h-full relative intro--img">
        <animated.img
          src="/images/busking.jpg"
          ref={imgRef}
          className="w-full absolute"
          style={{
            ...styles,
        }}
        />
        </div>
        
        {/*<div className="flex-col content-space">
            <h2 className="cities--header h-top thick cities--title mb-32">Úvod</h2>
            <p>Naším cílem je podpořit pouliční umělce a propojit je s diváky. Díky našemu projektu mohou umělci snadno najít místa pro svá vystoupení, zatímco návštěvníci mohou objevovat nové talenty a užít si kulturu přímo na ulicích.</p>
          </div>*/}
        <div className="flex-col g-32 intro__right h-full">
          {trails.map((props) => (
            <animated.div style={props}>
              <MainHeader>
              Poznej město jinak
              </MainHeader>
            </animated.div>
          ))}
          <p className="tx-xl tx-lightGray mt-auto">Užij si <Highlight>živé umění</Highlight> v pulzujících <Highlight>ulicích města</Highlight>. Podpoř umělce a staň se součástí <Highlight>scény</Highlight>.</p>
          <Button variant='ternary'><Link to={'/about'} className="flex items-center g-8">Více o projektu <MdArrowForward/></Link></Button>
        </div>
      </div>
    </BodyBlock>
  );
}
