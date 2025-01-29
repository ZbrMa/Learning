import Map from "../../ui/components/map/map";
import { Spinner } from "../../ui/components/spinner/spinner";
import { BodyBlock,MainHeader } from "../../ui/common/bodyBlock/bodyBlock";
import { useGetPlacesQuery } from "../../api/apiSlicer";

export function PlacesMap(){

    const { data: places, isLoading } = useGetPlacesQuery(undefined);

    return (
        <BodyBlock style={{minHeight:'100vh'}}>
          <MainHeader>Mapa míst</MainHeader>
            {isLoading ? (
              <Spinner fixed={false} />
              ):(
                <Map
                  points={places}
                />
              )}
              
        </BodyBlock>
    )
};