import './infoLine.css';

type InfoLineProps  ={
    title:string,
    children:React.ReactNode,
};

export function InfoLine({title,children}:InfoLineProps){

    return(
        <div className="info__line">
            <span className="info--title">{title}:</span>
            <span className="info--data">{children}</span>
        </div>
    );
};