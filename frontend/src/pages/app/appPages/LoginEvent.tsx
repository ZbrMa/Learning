import {
  useGetFilteredEventsQuery,
  useLoginEventMutation,
  useGetEventDatesQuery,
} from "../../../api/eventApiSlice";
import { useGetPlacesQuery } from "../../../api/filtersApiSlice";
import { BodyBlock } from "../../../ui/blocks/bodyBlock/bodyBlock";
import { EventSearchBlock } from "../../../ui/blocks/eventSearch/eventSearch";
import { VisitorLayout } from "../../visitor/visitorLayout";
import { Dropdown } from "../../../ui/components/select/select";
import { useState, useEffect } from "react";
import { IEventFilter } from "../../../types/filtersTypes";
import { endOfMonth, endOfWeek, format, parseISO, addDays } from "date-fns";
import { GroupedDropdown } from "../../../ui/components/groupedDropdown/groupedDropdown";
import { Calendar } from "../../../ui/components/calendar/calendar";
import { LoginEventCard } from "../../../ui/components/loginEventCard/loginEventCard";
import { Spinner } from "../../../ui/components/spinner/spinner";
import { useSearchParams } from "react-router-dom";
import { Schedule } from "../../../ui/components/schedule/schedule";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/userStore";
import { useAlert } from "../../../context/alertContext";
import { Alert } from "../../../ui/components/alert/alert";
import { cs } from "date-fns/locale";
import { IPlace } from "../../../types/filtersTypes";

export function LoginEvent() {
  const { data: eventDates } = useGetEventDatesQuery({ checked: false });
  const { id: userId } = useSelector((root: RootState) => root.auth);
  const { data: places } = useGetPlacesQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const [range, setRange] = useState<{ from: Date; to: Date }>({
    from: searchParams.get("from")
      ? parseISO(searchParams.get("from")!)
      : new Date(),
    to: searchParams.get("to")
      ? parseISO(searchParams.get("to")!)
      : (endOfWeek(new Date(),{locale:cs})),
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

  const [loginEvent] = useLoginEventMutation();

  const {showAlert} = useAlert();

  const handleLoginSpot = async (event:number) => {
    const response = await loginEvent({ id: event, userId: userId });

    if (response.data) {
      if (response.data.success) {
        showAlert(<Alert type="positive">{response.data.message}</Alert>);
      } else {
        showAlert(<Alert type="negative">{response.data.message}</Alert>);
      }
    } else if (response.error) {
      showAlert(
        <Alert type="negative">Chyba serveru, zkuste to později.</Alert>
      );
    }
  };

  const handleSelect = (type: keyof IEventFilter, values: number[]) => {
    setFilters({
      ...filters,
      [type]: values,
    });
  };

  useEffect(() => {
    const places = searchParams.get("places")?.split(",").map(Number) || [0];
    const arts = searchParams.get("arts")?.split(",").map(Number) || [];
    const from = searchParams.get("from")
      ? parseISO(searchParams.get("from")!)
      : new Date();
    const to = searchParams.get("to")
      ? parseISO(searchParams.get("to")!)
      : addDays(endOfWeek(new Date()),1);

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
    <VisitorLayout>
      <BodyBlock style={{ marginTop: "0" }}>
            {places && (
              <GroupedDropdown<IPlace>
                placeholder="Místo..."
                style={{width:'340px',marginInline:'auto'}}
                className="mb-32"
                options={places}
                optionLabel={"spot"}
                groupKey={"city"}
                multiSelect={false}
                defaultValue={places[0]}
                returnSelected={(e) =>
                  handleSelect(
                    "places",
                    e.map((place) => place.id)
                  )
                }
              />
            )}
        <Schedule
          events={events}
          returnInterval={(e)=>setRange({from:e,to:(endOfWeek(e,{locale:cs}))})}
          eventClick={handleLoginSpot}
          buttonText="Booknout"
        />
      </BodyBlock>
    </VisitorLayout>
  );
}
