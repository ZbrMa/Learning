import { useState } from "react";
import { Calendar } from "../../components/calendar/calendar";
import { BodyBlock } from "../bodyBlock/bodyBlock";
import { useGetEventDatesQuery, useGetFilteredEventsQuery } from "../../../api/eventApiSlice";
import { endOfMonth, format } from "date-fns";
import { Dropdown } from "../../components/select/select";
import {
  useGetArtsQuery,
  useGetPlacesQuery,
} from "../../../api/filtersApiSlice";
import { IEventFilter } from "../../../types/filtersTypes";
import { GroupedDropdown } from "../../components/groupedDropdown/groupedDropdown";
import { EventsGridBlock } from "../eventsGrid/eventsGrid";
import { Input } from "../../components/input/input";
import './eventSearch.css';


export function EventSearchBlock() {
  const [range, setRange] = useState<{ from: Date; to: Date }>({
    from: new Date(),
    to: endOfMonth(new Date()),
  });
  const [filters, setFilters] = useState<IEventFilter>({ places: [], arts: [] });
  const { data: events,isLoading:eventsLoading,isFetching:eventsFetching } = useGetFilteredEventsQuery({range:{from:format(range.from,'yyyy-MM-dd'),to:format(range.to,'yyyy-MM-dd')},filters:filters,checked:true},{refetchOnMountOrArgChange:true});
  const {data:eventDates} = useGetEventDatesQuery({checked:true});
  const { data: places } = useGetPlacesQuery();
  const { data: arts } = useGetArtsQuery();

  const handleSelect = (type: keyof IEventFilter, values: number[]) => {
    setFilters({
      ...filters,
      [type]: values,
    });
  };

  return (
    <>
    <BodyBlock style={{marginTop:'0'}}>
      <div className="event__search grid-2 g-128">
        <div className="flex-col g-32">
            <h2 className="h-md xbold">Vyber oblast zájmu</h2>
            <Input label="Hledej..."/>
          {places && (
            <GroupedDropdown
              placeholder="Místo..."
              options={places}
              optionLabel={'spot'}
              groupKey={'city'}
              returnSelected={(e)=>handleSelect('places',e.map((place=>place.id)))}
            />
          )}
          {arts && (
            <Dropdown
              placeholder="Druh..."
              options={arts?.map((option) => ({
                value: option.id,
                label: option.name,
              }))}
              returnSelected={(e)=>handleSelect('arts',e as number[])}
            />
          )}
        </div>
        <div className="flex-col g-32">
            <h2 className="h-md xbold">Vyber obobí, které tě zajímá</h2>
            <Calendar returnRange={setRange} events={eventDates} /> 
        </div>
      </div>
    </BodyBlock>
        <EventsGridBlock events={events} loading={eventsLoading || eventsFetching}/>
    </>
  );
}
