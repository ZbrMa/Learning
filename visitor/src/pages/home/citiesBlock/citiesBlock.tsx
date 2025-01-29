import "./citiesBlock.css";
import { BodyBlock,MainHeader } from "../../../ui/common/bodyBlock/bodyBlock";
import { useGetPlacesQuery } from "../../../api/apiSlicer";
import { Spinner } from "../../../ui/components/spinner/spinner";
import { CityCard } from "../../../ui/components/cityCard/cityCard";
import { useTranslation,Trans } from "react-i18next";
import { Highlight } from "../../../ui/components/highlight/highlight";

export function CitiesBlock() {
  const { data, isLoading } = useGetPlacesQuery();
  const {t} = useTranslation('home');

  return (
    <BodyBlock id="cities">
      {isLoading ? (
        <Spinner fixed={false} />
      ) : (
        <>
          <div className="cities__text">
            <MainHeader>{t("cities.header")}</MainHeader>
            <p className="tx-lg tx-lightGray mt-16">
            <Trans
                i18nKey="cities.text"
                ns="home"
                values={{ number: data?.length }}
                components={{
                  1: <Highlight>{data?.length}</Highlight>,
                }}
              ></Trans>
            </p>
          </div>
          <div className="cities__grid mt-64">
            {data?.map((place, index) => (
              <CityCard
                place={place}
                index={index + 1}
                key={place.city + place.spot}
              />
            ))}
          </div>
        </>
      )}
    </BodyBlock>
  );
}
