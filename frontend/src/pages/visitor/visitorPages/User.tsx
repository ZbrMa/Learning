import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { VisitorLayout } from "../visitorLayout";
import { UserProfile } from "../../../ui/blocks/userPage/userPage";

export function UserPage() {
    let {userId} = useParams();

    return(
        <VisitorLayout>
            {userId ? (   
                <UserProfile userId={parseInt(userId)}/>
            ):( 
                <div>Neznámý hrdina</div>
            )}
        </VisitorLayout>
    );
};