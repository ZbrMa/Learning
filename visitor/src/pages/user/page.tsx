import { useParams } from "react-router-dom";
import { VisitorLayout } from "../../ui/common/layout/layout";
import { UserProfile } from "./userProfile/userProfile";

export function UserPage() {
    let {userId} = useParams();

    return(
        <VisitorLayout>
            {userId ? (   
                <UserProfile userId={parseInt(userId)}/>
            ):( 
                <div className="pt-128">Neznámý hrdina</div>
            )}
        </VisitorLayout>
    );
};