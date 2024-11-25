import {
  useGetFilteredEventsQuery,
  useLoginEventMutation,
  useGetEventDatesQuery,
} from "../api/eventApiSlice";
import { useGetPlacesQuery } from "../api/filtersApiSlice";
import { BodyBlock } from "../ui/blocks/bodyBlock/bodyBlock";
import { EventSearchBlock } from "../ui/blocks/eventSearch/eventSearch";
import { Layout } from "./layout";
import { Dropdown } from "../ui/components/select/select";
import { useState, useEffect } from "react";
import { IEventFilter } from "../types/filtersTypes";
import { endOfMonth, format, parseISO } from "date-fns";
import { GroupedDropdown } from "../ui/components/groupedDropdown/groupedDropdown";
import { Calendar } from "../ui/components/calendar/calendar";
import { LoginEventCard } from "../ui/components/loginEventCard/loginEventCard";
import { Spinner } from "../ui/components/spinner/spinner";
import { useSearchParams } from "react-router-dom";

export function LoginEvent() {
  const { data: eventDates } = useGetEventDatesQuery({ checked: false });
  const { data: places } = useGetPlacesQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const [range, setRange] = useState<{ from: Date; to: Date }>({
    from: searchParams.get("from")
      ? parseISO(searchParams.get("from")!)
      : new Date(),
    to: searchParams.get("to")
      ? parseISO(searchParams.get("to")!)
      : endOfMonth(new Date()),
  });
  const [filters, setFilters] = useState<IEventFilter>({
    places: searchParams.get("places")
      ? searchParams.get("places")!.split(",").map(Number)
      : [],
    arts: searchParams.get("arts")
      ? searchParams.get("arts")!.split(",").map(Number)
      : [],
  });
  const {
    data: events,
    isLoading: eventsLoading,
    isFetching: eventsFetching,
  } = useGetFilteredEventsQuery(
    {
      range: {
        from: format(range.from, "yyyy-MM-dd"),
        to: format(range.to, "yyyy-MM-dd"),
      },
      filters,
      checked: false,
    },
    { refetchOnMountOrArgChange: true }
  );

  const handleSelect = (type: keyof IEventFilter, values: number[]) => {
    setFilters({
      ...filters,
      [type]: values,
    });
  };

  useEffect(() => {
    const places = searchParams.get("places")?.split(",").map(Number) || [];
    const arts = searchParams.get("arts")?.split(",").map(Number) || [];
    const from = searchParams.get("from")
      ? parseISO(searchParams.get("from")!)
      : new Date();
    const to = searchParams.get("to")
      ? parseISO(searchParams.get("to")!)
      : endOfMonth(new Date());

    setFilters({ places, arts });
    setRange({ from, to });
  }, [searchParams]);

  useEffect(() => {
    const params: any = {};
    if (filters.places.length) params.places = filters.places.join(",");
    if (filters.arts.length) params.arts = filters.arts.join(",");
    params.from = format(range.from, "yyyy-MM-dd");
    params.to = format(range.to, "yyyy-MM-dd");

    setSearchParams(params);
  }, [filters, range, setSearchParams]);

  return (
    <Layout>
      <BodyBlock style={{ marginTop: "0" }}>
        <div className="event__search grid-2 g-128">
          <div className="flex-col g-32">
            <h2 className="h-md xbold">Vyber, co tě zajímá</h2>
            {places && (
              <GroupedDropdown
                placeholder="Místo..."
                options={places}
                optionLabel={"spot"}
                groupKey={"city"}
                returnSelected={(e) =>
                  handleSelect(
                    "places",
                    e.map((place) => place.id)
                  )
                }
              />
            )}
          </div>
          <div className="flex-col g-32">
            <h2 className="h-md xbold">Vyber obobí, které tě zajímá</h2>
            <Calendar
              returnRange={setRange}
              events={eventDates}
              defaultRange={range}
            />
          </div>
        </div>
      </BodyBlock>
      <BodyBlock title="Volná místa">
        <div className="flex-col g-16 relative">
          {eventsFetching || eventsLoading ? (
            <Spinner fixed={false} />
          ) : (
            events?.map((event, index) => (
              <LoginEventCard event={event} key={event.nick + index} />
            ))
          )}
        </div>
      </BodyBlock>
    </Layout>
  );
}
