import { VisitorLayout } from "../visitorLayout";
import { Banner } from "../../../ui/blocks/common/banner/banner";
import { IntroBlock } from "../../../ui/blocks/domuPage/intro/intro";
import { UpcomingBlock } from "../../../ui/blocks/domuPage/upcoming/upcoming";
import { CallToActionBlock } from "../../../ui/blocks/domuPage/callToAction/callToActionBlock";
import { GalleryIntro } from "../../../ui/blocks/domuPage/galleryIntro/galleryIntro";
import { CitiesBlock } from "../../../ui/blocks/domuPage/citiesBlock/citiesBlock";

export function Domu(){

    return(
        <VisitorLayout menuVariant='sec'>
            <Banner/>
            <CitiesBlock/>
            <IntroBlock/>
            <UpcomingBlock/>
            <CallToActionBlock/>
            <GalleryIntro/>
        </VisitorLayout>
    );
};