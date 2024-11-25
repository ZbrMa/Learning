import './referenceCard.css';


type ReferenceCardProps = {
    children:React.ReactNode,
    title:string,
    image:string,
}

export function ReferenceCard({children,title,image}:ReferenceCardProps){

    return(
        <div className="reference__card">
            <img src={image} alt={title+image} className='reference--img'/>
            <div className="reference__content tx-black tx-md">
                <h2 className="h-md xbold mb-16">{title}</h2>
                ''{children}''
            </div>
        </div>
    );
};