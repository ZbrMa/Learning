import { Button } from "../../components/button/button";
import { RandomGrid } from "../../components/randomGrid/randomGrid";
import { BodyBlock } from "../bodyBlock/bodyBlock";
import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";

const images = [
    '/images/profilovy.jpg',
    '/images/busking.jpg',
    '/images/praha.jpg',
    '/images/brno.jpg',
    '/images/olomouc.jpg',
    '/images/profilovy.jpg',
    '/images/busking.jpg',
    '/images/praha.jpg',
    '/images/brno.jpg',
    '/images/olomouc.jpg',
    '/images/profilovy.jpg',
    '/images/busking.jpg',
    '/images/praha.jpg',
    '/images/brno.jpg',
]

export function GalleryIntro() {

    return(
        <BodyBlock>
            <div className="gallery__intro">
                <div className="gallery__intro__top mb-32 flex content-space">
                <h1 className="h-xl xbold">#busking</h1>
                <Button variant='ternary' size="small"><Link to={'/galerie'} className="flex items-center g-8">Galerie <MdArrowForward/></Link></Button>
                </div>
                
            <RandomGrid
                images={images}
            />
            
        </div>
        </BodyBlock>
        
    );
};