import { memo, useContext } from "react";
import { TabsContext, TabsContextProvider } from "./tabsContext";
import './tabs.css';

type TabsProps = {
    children:React.ReactNode,
    defaultTab:string,
}

export const Tabs = memo(function Tabs({children,defaultTab}:TabsProps){

    return(
        <TabsContextProvider defaultTab={defaultTab}>
            <div className="tabs__container flex-col g-32">
                {children}
            </div>
        </TabsContextProvider>
    );  
});

type TabItemProps = {
    children:React.ReactNode,
    value:string,
};

export const TabItem = memo(function TabMember({children,value}:TabItemProps){
    const {active} = useContext(TabsContext);

    if (active === value){
        return(
            <div className="tab__item">
                {children}
            </div>
        );
    }   
    return null;
    
});
type TabBodyProps = {
    children:React.ReactNode,
};

export const TabBody = memo(function TabBody({children}:TabBodyProps){

        return(
            <div className="tab__body">
                {children}
            </div>
        )
    
});

type TabsHeaderProps = {
    children:React.ReactNode,
};

export const TabsHeader = memo(function TabsHeader({children}:TabsHeaderProps){
    return(
        <div className="tabs__header flex p-16">
            {children}
        </div>
    );
});

type TabsHeaderItemProps = {
    children:React.ReactNode,
    value:string,
};

export const TabsHeaderItem = memo(function TabsHeaderItem({children,value}:TabsHeaderItemProps){
    const {active,setActive} = useContext(TabsContext);

    return(
        <div className={`tabs__header--item tx-sm ${active === value ? 'active':''}`} onClick={()=>setActive(value)}>
            {children}
        </div>
    );
});