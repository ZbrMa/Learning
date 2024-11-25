import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "./layout";
import { UserProfile } from "../ui/blocks/userPage/userPage";

export function UserPage() {
    let {userId} = useParams();

    return(
        <Layout>
            {userId ? (   
                <UserProfile userId={parseInt(userId)}/>
            ):( 
                <div>Neznámý hrdina</div>
            )}
        </Layout>
    );
};