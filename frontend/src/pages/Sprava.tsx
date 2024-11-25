import { AdminEvents } from "../ui/blocks/adminEvents/adminEvents";
import { AdminUsers } from "../ui/blocks/adminUsers/adminUsers";
import { BodyBlock } from "../ui/blocks/bodyBlock/bodyBlock";
import { TabBody, TabItem, Tabs, TabsHeader, TabsHeaderItem } from "../ui/components/tabs/tabs";
import { Layout } from "./layout";


export function SpravaPage(){

    return(
        <Layout>
            <BodyBlock style={{paddingTop:'0'}}>
                <Tabs defaultTab="dates">
                    <TabsHeader>
                        <TabsHeaderItem value="dates">Termíny</TabsHeaderItem>
                        <TabsHeaderItem value="users">Uživatelé</TabsHeaderItem>
                        <TabsHeaderItem value="places">Místa</TabsHeaderItem>
                    </TabsHeader>
                    <TabBody>
                        <TabItem value="dates">
                            <AdminEvents/>
                        </TabItem>
                        <TabItem value="users">
                            <AdminUsers/>
                        </TabItem>
                        <TabItem value="places">
                            Místa
                        </TabItem>
                    </TabBody>
                </Tabs>
            </BodyBlock>
        </Layout>
    );
};