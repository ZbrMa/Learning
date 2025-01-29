import { VisitorLayout } from "../../ui/common/layout/layout";
import { Banner } from "../../ui/common/banner/banner";
import { IntroBlock } from "./intro/intro";
import { CitiesBlock } from "./citiesBlock/citiesBlock";
import { CallToActionBlock } from "./callToAction/callToActionBlock";
import { TryApp } from "./tryApp/tryApp";
import { GalleryIntro } from "./galleryIntro/galleryIntro";

export default function HomePage(){

    return(
        <VisitorLayout menuVariant='sec'>
            <Banner/>
            <IntroBlock/>
            <CitiesBlock/>
            <CallToActionBlock/>
            <TryApp/>
            <GalleryIntro/>
        </VisitorLayout>
    );
};