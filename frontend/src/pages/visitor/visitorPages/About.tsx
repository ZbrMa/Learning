import { useGetAdminPlacesQuery } from "../../../api/placeApiSlice";
import { AboutCitiesBlock } from "../../../ui/blocks/aboutPage/aboutCities/aboutCitites";
import { BodyBlock, MainHeader } from "../../../ui/blocks/common/bodyBlock/bodyBlock";
import Map from "../../../ui/components/map/map";
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
        <AboutCitiesBlock places={places} />
        <BodyBlock style={{minHeight:'100vh'}}>
          <MainHeader>Mapa míst</MainHeader>
            <Map
                points={places?.map((place) => ({
                  clong: place.longitude,
                  clat: place.latitude,
                }))}
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
