import { Banner } from "../../../ui/blocks/common/banner/banner";
import { EventSearchBlock } from "../../../ui/blocks/eventPage/eventSearch/eventSearch";
import { VisitorLayout } from "../visitorLayout";


export function UdalostiPage(){

    return(
        <VisitorLayout menuVariant='sec'>
            <Banner/>
            <EventSearchBlock/>
            
        </VisitorLayout>
    );
};