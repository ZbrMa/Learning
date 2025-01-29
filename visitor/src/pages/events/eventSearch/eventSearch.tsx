"use client";
import { useCallback, useState } from "react";
import { Calendar } from "../../../ui/components/calendar/calendar";
import { BodyBlock } from "../../../ui/common/bodyBlock/bodyBlock";
import { useGetEventDatesQuery, useGetFilteredEventsQuery, useGetPlacesQuery, useGetArtsQuery } from "../../../api/apiSlicer";
import { endOfMonth, format } from "date-fns";
import { Dropdown } from "../../../ui/components/select/select";
import './eventSearch.css';
import { IEvent } from "../../../types/event";
import { SmallEventCard } from "../../../ui/components/smallEventCard/smallEventCard";
import { Spinner } from "../../../ui/components/spinner/spinner";
import { useTranslation } from "react-i18next";
import { IEventFilter } from "../../../types/filtersTypes";
import { Input } from "../../../ui/components/input/input";
import { GroupedDropdown } from "../../../ui/components/groupedDropdown/groupedDropdown";

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

  const {t} = useTranslation("events");

  const handleSelect = useCallback((type: keyof IEventFilter, values: number[]) => {
    setFilters({
      ...filters,
      [type]: values,
    });
  },[setFilters,filters]);

  return (
    <>
    <BodyBlock style={{marginTop:'0'}}>
      <div className="event__search grid-2 g-128">
        <div className="flex-col g-32">
            <h2 className="h-md xbold">{t('filters.filters')}</h2>
            <Input label={t('filters.search')}/>
          {places && (
            <GroupedDropdown
              placeholder={t('filters.places')}
              options={places}
              optionLabel={'spot'}
              groupKey={'city'}
              returnSelected={(e)=>handleSelect('places',e.map((place=>place.id)))}
            />
          )}
          {arts && (
            <Dropdown
              placeholder={t('filters.genre')}
              options={arts?.map((option) => ({
                value: option.id,
                label: option.name,
              }))}
              returnSelected={(e)=>handleSelect('arts',e as number[])}
            />
          )}
        </div>
        <div className="flex-col g-32">
            <h2 className="h-md xbold">{t('filters.calendar')}</h2>
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
  const  { t } = useTranslation('events');

  return (
    <BodyBlock title={t('filters.events')}>
      <div className="grid-3 g-64 relative">
        {loading ? (
          <Spinner fixed={false}/>
        ) : (
          events ? (
            events.map((event) => (
              <SmallEventCard
                event={event}
                key={"eventCard" + String(event.id) + event.day}
                square
              />
            ))
          ):(
            <span>{t('filters.eventsError')}</span>
          )
          
        )}
      </div>
    </BodyBlock>
  );
}
