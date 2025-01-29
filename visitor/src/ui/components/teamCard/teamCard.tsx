import './teamCard.css';


type TeamCardProps = {
    img:string,
    name:string,
    role:string,
}


export function TeamCard({img,name,role}:TeamCardProps){

    return(
        <div className="team__card relative flex g-16 items-center">
            <img className='team--card--img' src={img} alt={name+role}/>
            <div className="team__card__text relative">
                <h3 className='h-md xbold tx-white'>{name}</h3>
                <p className='tx-md tx-gray'>{role}</p>
            </div>
            
        </div>
    );
};