import { Banner } from "../../../ui/blocks/banner/banner";
import { EventSearchBlock } from "../../../ui/blocks/eventSearch/eventSearch";
import { VisitorLayout } from "../visitorLayout";


export function UdalostiPage(){

    return(
        <VisitorLayout menuVariant='sec'>
            <Banner/>
            <EventSearchBlock/>
            
        </VisitorLayout>
    );
};