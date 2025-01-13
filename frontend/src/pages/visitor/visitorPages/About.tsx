import { useGetAdminPlacesQuery } from "../../../api/placeApiSlice";
import { AboutCitiesBlock } from "../../../ui/blocks/aboutPage/aboutCities/aboutCitites";
import { BodyBlock, MainHeader } from "../../../ui/blocks/common/bodyBlock/bodyBlock";
import Map from "../../../ui/components/map/map";
import { SpotPopup } from "../../../ui/components/map/mapPopups";
import { Spinner } from "../../../ui/components/spinner/spinner";
import { VisitorLayout } from "../visitorLayout";

export function AboutPage() {
  const { data: places, isLoading } = useGetAdminPlacesQuery(undefined);

  if (isLoading) {
    return (
      <VisitorLayout>
        <BodyBlock>
          <Spinner fixed={false} />
        </BodyBlock>
      </VisitorLayout>
    );
  } else if (places) {
    return (
      <VisitorLayout>
        <BodyBlock style={{minHeight:'100vh'}}>
          <MainHeader>Mapa míst</MainHeader>
            <Map
                points={places}
              />
              
        </BodyBlock>
      </VisitorLayout>
    );
  }
  return (
    <VisitorLayout>
        <BodyBlock>
          Někde se stala chyba
        </BodyBlock>
      </VisitorLayout>
  )
}
