import { useContext, useState } from "react";
import { useGetPlacesQuery } from "../../../api/filtersApiSlice";
import { GroupedDropdown } from "../../components/groupedDropdown/groupedDropdown";
import { IRepeatEvent } from "../../../types/events";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import { useCreateRepeatEventsMutation } from "../../../api/eventApiSlice";
import { useAlert } from "../../../context/alertContext";
import { Alert } from "../../components/alert/alert";
import { ModalContext } from "../../../context/modalContext";
import { format, addDays } from "date-fns";
import { MySelect } from "../../components/select/select";

const intervalOptions = [
  {
    value: 7,
    label: "7 dní",
  },
  {
    value: 14,
    label: "14 dní",
  },
  {
    value: 28,
    label: "28 dní",
  },
];

export function NewEventRepeatForm() {
  const { data: places } = useGetPlacesQuery();
  const [start, setStart] = useState(
    format(addDays(new Date(), 1), "yyyy-MM-dd")
  );
  const [newEvent, setNewEvent] = useState<IRepeatEvent>({
    weekDay: 0,
    interval: 7,
    period: { start: "", end: "" },
    start: "",
    end:"",
    place: 0,
  });
  const [createEvent] = useCreateRepeatEventsMutation();
  const { showAlert } = useAlert();
  const { setModal } = useContext(ModalContext);

  const handleSetNewEvent = (key: keyof IRepeatEvent, value: any) => {
    setNewEvent({
      ...newEvent,
      [key]: value,
    });
  };

  const hnadleSetPeriod = (
    key: keyof IRepeatEvent["period"],
    value: string
  ) => {
    setNewEvent({
      ...newEvent,
      period: {
        ...newEvent.period,
        [key]: value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newEvent.place === undefined || newEvent.place === 0) {
      showAlert(<Alert type="neutral">Vyberte místo</Alert>);
    } else if (newEvent.start === undefined || newEvent.start === "" || newEvent.end === undefined || newEvent.end === "") {
      showAlert(<Alert type="neutral">Vyberte čas</Alert>);
    } else {
      const response = await createEvent(newEvent);

      if (response.error) {
        showAlert(<Alert type="negative">Při vytváření nastala chyba.</Alert>);
      } else if (response.data.success) {
        setModal(null);
        showAlert(<Alert type="positive">{response.data.message}</Alert>);
      }
    }
  };

  return (
    <form className="grid-2 g-16" onSubmit={(e) => handleSubmit(e)}>
      {places && (
        <GroupedDropdown
          options={places}
          groupKey="city"
          returnSelected={(e) => handleSetNewEvent("place", e[0]?.id)}
          placeholder="Místo"
          optionLabel="spot"
          multiSelect={false}
          label="Místo"
        />
      )}
      <MySelect
        label="Interval"
        options={intervalOptions}
        returnSelected={(e) => handleSetNewEvent("interval", e)}
        placeholder="Vyberte interval"
        defaultValue={intervalOptions[0].value}
      />
      <Input
        type="date"
        onChange={(e) => {
          hnadleSetPeriod("start", e.target.value);
          setStart(e.target.value);
        }}
        label="Počáteční den"
        labelPosition="out"
        min={format(addDays(new Date(), 1), "yyyy-MM-dd")}
      />
      <Input
        type="date"
        onChange={(e) => hnadleSetPeriod("end", e.target.value)}
        label="Poslední den"
        labelPosition="out"
        min={start}
      />
      <Input
        type="time"
        onChange={(e) => handleSetNewEvent("start", e.target.value)}
        label="Začátek"
        labelPosition="out"
      />
      <Input
        type="time"
        onChange={(e) => handleSetNewEvent("end", e.target.value)}
        label="Konec"
        labelPosition="out"
      />
      <Button type="submit" style={{ gridColumn: "span 2" }}>
        Vytvořit
      </Button>
    </form>
  );
}
