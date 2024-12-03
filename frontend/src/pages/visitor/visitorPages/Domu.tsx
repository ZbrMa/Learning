import { VisitorLayout } from "../visitorLayout";
import { Banner } from "../../../ui/blocks/banner/banner";
import { IntroBlock } from "../../../ui/blocks/intro/intro";
import { UpcomingBlock } from "../../../ui/blocks/upcoming/upcoming";
import { CallToActionBlock } from "../../../ui/blocks/callToAction/callToActionBlock";
import { GalleryIntro } from "../../../ui/blocks/galleryIntro/galleryIntro";
import { CitiesBlock } from "../../../ui/blocks/citiesBlock/citiesBlock";

export function Domu(){

    return(
        <VisitorLayout menuVariant='sec'>
            <Banner/>
            <IntroBlock/>
            <CitiesBlock/>
            <UpcomingBlock/>
            <CallToActionBlock/>
            <GalleryIntro/>
        </VisitorLayout>
    );
};