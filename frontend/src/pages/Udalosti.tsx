import { Banner } from "../ui/blocks/banner/banner";
import { EventSearchBlock } from "../ui/blocks/eventSearch/eventSearch";
import { Layout } from "./layout";


export function UdalostiPage(){

    return(
        <Layout menuVariant='sec'>
            <Banner/>
            <EventSearchBlock/>
            
        </Layout>
    );
};