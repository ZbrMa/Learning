import { PlacesMap } from "./placesMap";
import { Team } from "./team/team";
import { VisitorLayout } from "../../ui/common/layout/layout";

export default function AboutPage() {
  


  return (
    <VisitorLayout>
      <Team/>
      <PlacesMap/>
    </VisitorLayout>
  );
}
