import './infoCard.css';

type InfoCardProps = {
    children:React.ReactNode,
    name:string,
};

export function InfoCard({children,name}:InfoCardProps){

    return(
        <div className="info__card p-16">
            <p className="info__card--data h-top thick">{children}</p>
            <p className="info__card--name tx-lg">{name}</p>
        </div>
    )
};