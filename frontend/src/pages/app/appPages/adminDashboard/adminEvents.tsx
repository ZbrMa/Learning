import {
  useGetAdminEventsQuery,
} from "../../../../api/eventApiSlice";
import { useGetPlacesQuery } from "../../../../api/filtersApiSlice";
import { useState, useEffect } from "react";
import { IEventFilter } from "../../../../types/filtersTypes";
import { endOfWeek, format, parseISO, addDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { Schedule } from "../../../../ui/components/schedule/schedule";
import { cs } from "date-fns/locale";
import { IPlace } from "../../../../types/filtersTypes";
import { Spinner } from "../../../../ui/components/spinner/spinner";
import { GroupedSelect } from "../../../../ui/components/groupedSelect/groupedSelect";
import { AdminDashboard } from "./adminDashboard";
import { AdminNewPlaceModal } from "../../../../ui/modals/adminPlaceModal";
import { Button } from "../../../../ui/components/button/button";
import { IoAddOutline } from "react-icons/io5";
import { useContext } from "react";
import { ModalContext } from "../../../../context/modalContext";

export function AdminEvents() {
  const { data: places, isLoading: placesLoading } = useGetPlacesQuery();
  const {setModal} = useContext(ModalContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [range, setRange] = useState<{ from: Date; to: Date }>({
    from: searchParams.get("from")
      ? parseISO(searchParams.get("from")!)
      : new Date(),
    to: searchParams.get("to")
      ? parseISO(searchParams.get("to")!)
      : endOfWeek(new Date(), { locale: cs }),
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
  } = useGetAdminEventsQuery(
    {
      from: format(range.from, "yyyy-MM-dd"),
      places:filters.places,
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
    const places = searchParams.get("places")?.split(",").map(Number) || [0];
    const arts = searchParams.get("arts")?.split(",").map(Number) || [];
    const from = searchParams.get("from")
      ? parseISO(searchParams.get("from")!)
      : new Date();
    const to = searchParams.get("to")
      ? parseISO(searchParams.get("to")!)
      : addDays(endOfWeek(new Date()), 1);

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
  <>
    <AdminDashboard>
    <div className="flex g-32 mb-32">
          <h2 className="h-lg xbold">Termíny</h2>
          <Button
            variant="ternary"
            style={{ fontSize: "1rem", padding: "8px" }}
            onClick={() => setModal("newEventModal")}
          >
            <IoAddOutline />
            Nový termín
          </Button>
        </div>
      {placesLoading ? (
        <Spinner fixed={false} />
      ) : (
        places && (
          <GroupedSelect<IPlace>
            placeholder="Místo..."
            style={{ minWidth: "350px", marginInline: "auto", width:'fit-content' }}
            className="mb-16"
            options={places}
            optionLabel={"spot"}
            groupKey={"city"}
            multiSelect={false}
            defaultValue={places[0]}
            returnSelected={(e) =>
              handleSelect(
                "places",
                [e.id]
              )
            }
          />
        )
      )}
      <Schedule
        events={events}
        returnInterval={(e) =>
          setRange({ from: e, to: endOfWeek(e, { locale: cs }) })
        }
        eventClick={()=>(console.log('ahoj'))}
        buttonText="Smazat"
        isAdmin
      />
    </AdminDashboard>
    <AdminNewPlaceModal/>
    </>
  );
}
