import { RandomGrid } from "../../../components/randomGrid/randomGrid";
import { BodyBlock } from "../../common/bodyBlock/bodyBlock";

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
                </div>
                
            <RandomGrid
                images={images}
            />
            
        </div>
        </BodyBlock>
        
    );
};