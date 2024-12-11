import { useGetUpcomingEventsQuery } from "../../../../api/eventApiSlice";
import { BodyBlock, MainHeader } from "../../common/bodyBlock/bodyBlock";
import { SmallEventCard } from "../../../components/smallEventCard/smallEventCard";
import { Carousel } from "../../../components/carousel/carousel";
import { Button } from "../../../components/button/button";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";
import "./upcoming.css";
import { useTrail, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

export function UpcomingBlock() {
  const { data: events, isFetching: eventsLoading } =
    useGetUpcomingEventsQuery();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const trails = useTrail(1, {
    config: { mass: 5, tension: 2000, friction: 2000 },
    opacity: inView ? 1 : 0,
    x: inView ? 0 : 100,
    from: { opacity: 0, x: 100 },
    delay: 100,
  });

  return (
    <BodyBlock>
      <div className="flex content-space mb-64 upcom__events" ref={ref}>
        {trails.map((props) => (
          <animated.div style={props}>
            <MainHeader>Co se chystá?</MainHeader>
          </animated.div>
        ))}
        <Button
          variant="ternary"
          style={{ height: "fit-content", marginBlock: "auto" }}
        >
          <Link to={"/events"} className="flex items-center g-8">
            Události <MdArrowForward />
          </Link>
        </Button>
      </div>
      <Carousel
        smallDev={1}
        midDev={2}
        largeDev={3}
        extraDev={4}
        variant="arrowLeft"
        style={{ gridTemplateColumns: "auto auto" }}
      >
        {events?.map((event, index) => (
          <SmallEventCard event={event} key={event.nick + event.day} />
        ))}
      </Carousel>
    </BodyBlock>
  );
}
