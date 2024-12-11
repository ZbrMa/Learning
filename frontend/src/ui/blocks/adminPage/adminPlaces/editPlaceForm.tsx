import './editPlaceForm.css';
import { useContext, useEffect, useState } from "react";
import { useGetPlacesQuery } from "../../../../api/filtersApiSlice";
import { GroupedDropdown } from "../../../components/groupedDropdown/groupedDropdown";
import { IPlace, INewPlace } from "../../../../types/places";
import { Input } from "../../../components/input/input";
import { Button } from "../../../components/button/button";
import { useEditPlaceMutation } from "../../../../api/placeApiSlice";
import { useAlert } from "../../../../context/alertContext";
import { Alert } from "../../../components/alert/alert";
import { ModalContext } from "../../../../context/modalContext";
import { format, addDays } from "date-fns";
import { Textarea } from "../../../components/textarea/textarea";
import { ImageInput } from "../../../components/imageInput/imageInput";

type EditPlaceForm = {
  place: IPlace;
};

export function EditPlaceForm({ place }: EditPlaceForm) {
  const [newPlace, setNewPlace] = useState<IPlace>(place);
  const [newImage,setNewImage] = useState<File>();
  const [defaultPlace, setDefaultPlace] = useState(place);
  const [createPlace] = useEditPlaceMutation();
  const { showAlert } = useAlert();
  const { setModal } = useContext(ModalContext);

  const handleSetNewPlace = (key: keyof IPlace, value: any) => {
    setNewPlace({
      ...newPlace,
      [key]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({place:newPlace,image:newImage});
    const response = await createPlace({place:newPlace,image:newImage});

    if (response.error) {
      showAlert(<Alert type="negative">Při úpravě nastala chyba.</Alert>);
    } else if (response.data.success) {
      setModal(null);
      showAlert(<Alert type="positive">{response.data.message}</Alert>);
    } else {
      setModal(null);
      showAlert(<Alert type="negative">{response.data.message}</Alert>);
    }
  };

  return (
    <form className="flex-col g-16 place__form" onSubmit={handleSubmit}>
      
      <div className="grid-2 g-16">
      <ImageInput
        img={defaultPlace.image}
        returnFile={setNewImage}
        style={{maxWidth:'300px', maxHeight:'300px'}}
      />
      <Textarea
          onChange={(e) =>
            handleSetNewPlace("about", e.target.value)
          }
          label="Popis (max.250 znaků)"
          labelPosition="out"
          defaultValue={defaultPlace.about}
          maxLength={250}
        />
        <Input
          type="text"
          onChange={(e) => handleSetNewPlace("city", e.target.value)}
          label="Město"
          labelPosition="out"
          defaultValue={defaultPlace.city}
          required
        />
        <Input
          type="text"
          onChange={(e) => handleSetNewPlace("spot", e.target.value)}
          label="Místo"
          labelPosition="out"
          defaultValue={defaultPlace.spot}
          required
        />
        <Input
          type="number"
          step={0.0000000000000001}
          onChange={(e) =>
            handleSetNewPlace("longitude", e.target.value)
          }
          label="Zem. délka"
          labelPosition="out"
          defaultValue={defaultPlace.longitude}
          required
        />
        <Input
          type="number"
          step={0.0000000000000001}
          onChange={(e) =>
            handleSetNewPlace("latitude", e.target.value)
          }
          label="Zem. šířka"
          labelPosition="out"
          defaultValue={defaultPlace.latitude}
          required
        />
      </div>
      <Button type="submit">
        Upravit
      </Button>
    </form>
  );
}
