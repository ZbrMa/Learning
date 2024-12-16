import { useParams } from "react-router-dom";
import { VisitorLayout } from "../visitorLayout";
import { UserProfile } from "../../../ui/blocks/userPage/userPage";

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