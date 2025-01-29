import { VisitorLayout } from "../../ui/common/layout/layout";
import { Features } from "./features/features";
import { AppSteps } from "./steps/appSteps";
//import { AppBanner } from "./appBanner/appBanner";


export default function AboutApp() {
    return(
        <VisitorLayout>
            
           <Features/>
           <AppSteps/>
        </VisitorLayout>
       
    )
}