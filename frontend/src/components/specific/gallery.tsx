import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import './styles/gallery.css';

type ImageProps = {
    source:string,
    opened:boolean,
    onClose: () => void,
}

export function DetailImage({source,opened,onClose}:ImageProps){

    return(
        <div className={`image-container ${opened? 'opened':''}`}>
            <div className='image-detail'>
                <div className='image-detail-inner'>
                    
                    <img src={source}></img>
                    <div className='image-desc'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</div>
                </div>
            </div>
            <button className="close-button" onClick={onClose}><IoClose></IoClose></button>
        </div>
    )
};

export function Gallery(){
    const [selectedImage,setSelectedImage] = useState<string>('');

    const images = [
        "assets/static/uploaded_imgs/band.jpg",
            "assets/static/uploaded_imgs/buskers1.jpg",
            "assets/static/uploaded_imgs/jasenka.jpg",
            "assets/static/uploaded_imgs/orchestr.jpg",
            "assets/static/uploaded_imgs/stram.jpg",
            "assets/static/uploaded_imgs/vojta_dyk.png",
            "assets/imgs/bezky.jpg",
            "assets/imgs/buskers1.jpg",
            "assets/imgs/folklor1.jpg",
            "assets/imgs/krasnopivo.jpg",
            "assets/static/uploaded_imgs/band.jpg",
            "assets/static/uploaded_imgs/buskers1.jpg",
            "assets/static/uploaded_imgs/jasenka.jpg",
            "assets/static/uploaded_imgs/orchestr.jpg",
            "assets/static/uploaded_imgs/stram.jpg",
            "assets/static/uploaded_imgs/vojta_dyk.png",
            "assets/imgs/bezky.jpg",
            "assets/imgs/buskers1.jpg",
            "assets/imgs/folklor1.jpg",
            "assets/imgs/krasnopivo.jpg",
            "assets/static/uploaded_imgs/band.jpg",
            "assets/static/uploaded_imgs/buskers1.jpg",
            "assets/static/uploaded_imgs/jasenka.jpg",
            "assets/static/uploaded_imgs/orchestr.jpg",
            "assets/static/uploaded_imgs/stram.jpg",
            "assets/static/uploaded_imgs/vojta_dyk.png",
            "assets/imgs/bezky.jpg",
            "assets/imgs/buskers1.jpg",
            "assets/imgs/folklor1.jpg",
            "assets/imgs/krasnopivo.jpg",
            "assets/static/uploaded_imgs/band.jpg",
            "assets/static/uploaded_imgs/buskers1.jpg",
            "assets/static/uploaded_imgs/jasenka.jpg",
            "assets/static/uploaded_imgs/orchestr.jpg",
            "assets/static/uploaded_imgs/stram.jpg",
            "assets/static/uploaded_imgs/vojta_dyk.png",
            "assets/imgs/bezky.jpg",
            "assets/imgs/buskers1.jpg",
            "assets/imgs/folklor1.jpg",
            "assets/imgs/krasnopivo.jpg",
            "assets/static/uploaded_imgs/band.jpg",
            "assets/static/uploaded_imgs/buskers1.jpg",
            "assets/static/uploaded_imgs/jasenka.jpg",
            "assets/static/uploaded_imgs/orchestr.jpg",
            "assets/static/uploaded_imgs/stram.jpg",
            "assets/static/uploaded_imgs/vojta_dyk.png",
            "assets/imgs/bezky.jpg",
            "assets/imgs/buskers1.jpg",
            "assets/imgs/folklor1.jpg",
            "assets/imgs/krasnopivo.jpg",
            "assets/static/uploaded_imgs/band.jpg",
            "assets/static/uploaded_imgs/buskers1.jpg",
            "assets/static/uploaded_imgs/jasenka.jpg",
            "assets/static/uploaded_imgs/orchestr.jpg",
            "assets/static/uploaded_imgs/stram.jpg",
            "assets/static/uploaded_imgs/vojta_dyk.png",
            "assets/imgs/bezky.jpg",
            "assets/imgs/buskers1.jpg",
            "assets/imgs/folklor1.jpg",
            "assets/imgs/krasnopivo.jpg",
    ];

    const handleShow = (source: string) => {
        setSelectedImage(source);
    };
    
    const handleClose = () => {
        setSelectedImage('');
    };

    return(
        <div className="gallery">
            <DetailImage source={selectedImage} opened={!!selectedImage} onClose={handleClose} />
            <div className="gallery-grid">
                {images.map((src, index) => (
                    <div key={index} className="grid-item">
                        <img src={src} alt={`Gallery item ${index + 1}`} onClick={() => handleShow(src)} />
                    </div>
                ))}
            </div>
        </div>

    );

}