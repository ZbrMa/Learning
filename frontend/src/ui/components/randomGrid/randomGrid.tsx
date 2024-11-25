import './randomGrid.css';


type RandomGridProps = {
    images:string[],
}

export function RandomGrid({images}:RandomGridProps){
    
    return(
        <div className="random__grid">
            {images.map((image,index)=>(
                <img src={image} alt={image+index} key={image+index}/>
            ))}
        </div>
    );
};