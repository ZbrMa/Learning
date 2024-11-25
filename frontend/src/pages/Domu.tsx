import { Layout } from "./layout";
import { Banner } from "../ui/blocks/banner/banner";
import { IntroBlock } from "../ui/blocks/intro/intro";
import { UpcomingBlock } from "../ui/blocks/upcoming/upcoming";
import { CallToActionBlock } from "../ui/blocks/callToAction/callToActionBlock";
import { GalleryIntro } from "../ui/blocks/galleryIntro/galleryIntro";

export function Domu(){

    return(
        <Layout menuVariant='sec'>
            <Banner/>
            <IntroBlock/>
            <UpcomingBlock/>
            <CallToActionBlock/>
            <GalleryIntro/>
        </Layout>
    );
};