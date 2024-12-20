import { useState } from "react";
import { Calendar } from "../../../components/calendar/calendar";
import { BodyBlock } from "../../common/bodyBlock/bodyBlock";
import { useGetEventDatesQuery, useGetFilteredEventsQuery } from "../../../../api/eventApiSlice";
import { endOfMonth, format } from "date-fns";
import { Dropdown } from "../../../components/select/select";
import {
  useGetArtsQuery,
  useGetPlacesQuery,
} from "../../../../api/filtersApiSlice";
import { IEventFilter } from "../../../../types/filtersTypes";
import { GroupedDropdown } from "../../../components/groupedDropdown/groupedDropdown";
import { Input } from "../../../components/input/input";
import './eventSearch.css';


import { IEvent } from "../../../../types/events";
import { SmallEventCard } from "../../../components/smallEventCard/smallEventCard";
import { Spinner } from "../../../components/spinner/spinner";
import { useTranslation } from "react-i18next";


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

  const { t } = useTranslation(['visitor','common']);

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
            <h2 className="h-md xbold">{t('eventsPage.filters')}</h2>
            <Input label={t('common:label.find')}/>
          {places && (
            <GroupedDropdown
              placeholder={t('common:label.spot')}
              options={places}
              optionLabel={'spot'}
              groupKey={'city'}
              returnSelected={(e)=>handleSelect('places',e.map((place=>place.id)))}
            />
          )}
          {arts && (
            <Dropdown
              placeholder={t('common:label.art')}
              options={arts?.map((option) => ({
                value: option.id,
                label: option.name,
              }))}
              returnSelected={(e)=>handleSelect('arts',e as number[])}
            />
          )}
        </div>
        <div className="flex-col g-32">
            <h2 className="h-md xbold">{t('visitor:eventsPage.calendar')}</h2>
            <Calendar returnRange={setRange} events={eventDates} /> 
        </div>
      </div>
    </BodyBlock>
        <EventsGridBlock events={events} loading={eventsLoading || eventsFetching}/>
    </>
  );
}

type EventGridProps = {
  events: IEvent[] | undefined;
  loading: boolean;
};

export function EventsGridBlock({ events, loading }: EventGridProps) {
  const { t } = useTranslation('visitor');

  return (
    <BodyBlock title={t('eventsPage.events')}>
      <div className="grid-3 g-64 relative">
        {loading ? (
          <Spinner fixed={false}/>
        ) : (
          events ? (
            events.map((event, index) => (
              <SmallEventCard
                event={event}
                key={"eventCard" + String(event.id) + index}
                square
              />
            ))
          ):(
            <span>{t('eventsPage.eventsError')}</span>
          )
          
        )}
      </div>
    </BodyBlock>
  );
}
