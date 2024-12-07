import './citiesBlock.css';
import { BodyBlock } from "../bodyBlock/bodyBlock";
import { Button } from '../../components/button/button';
import { IoMapOutline } from 'react-icons/io5';
import { useGetAdminPlacesQuery } from '../../../api/placeApiSlice';
import { useEffect, useState } from 'react';

export function CitiesBlock() {
    const { data, isLoading } = useGetAdminPlacesQuery();
    const [active, setActive] = useState(0);
    const [fadeClass, setFadeClass] = useState<string>();
    const [imageCache, setImageCache] = useState<{ [key: number]: HTMLImageElement }>({});

    const loadImage = (src: string) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = (err) => reject(err);
        });
    };

    useEffect(() => {
        if (data) {
            const newImageCache: { [key: number]: HTMLImageElement } = {};

            Promise.all(
                data.map((item, index) => loadImage(item.image))
            ).then((loadedImages) => {
                loadedImages.forEach((img, index) => {
                    newImageCache[index] = img;
                });
                setImageCache(newImageCache);
            }).catch((err) => {
                console.error("Error loading images:", err);
            });
        }
    }, [data]);

    useEffect(() => {
        let placeTimeout: NodeJS.Timeout | undefined;

        if (data) {
            placeTimeout = setTimeout(() => {
                setFadeClass('animated');
                setActive((prev) => (prev < data.length - 1 ? prev + 1 : 0));

                setTimeout(() => {
                    setFadeClass(undefined);
                }, 9000);
            }, 10000);
        }

        return () => {
            if (placeTimeout) {
                clearTimeout(placeTimeout);
            }
        };
    }, [data, active]);

    return (
        <BodyBlock variant='full' color='grey'>
            {data && (
                <div className="cities__block">
                    <div className='cities__text'>
                        <h2 className="cities--header h-top thick cities--title mb-32">Jevištěm se stává celé město</h2>
                        <div className={`city__content flex-col g-32 ${fadeClass}`}>
                            <p className='h-top thick tx-white'>{active + 1} <span className='h-xl thick '>{data[active].spot}</span></p>
                            <p className='tx-lightGray'>{data[active].about}</p>
                            <a target='_blank' href={`http://www.google.com/maps/place/${data[active].longitude},${data[active].latitude}`}>
                                <Button variant='link' style={{ color: 'var(--white)', padding: '0' }} size='small'><IoMapOutline />Ukázat na mapě</Button>
                            </a>
                        </div>
                    </div>
                    <img className='city--img' src={imageCache[active]?.src} alt={data[active].spot} />
                </div>
            )}           
        </BodyBlock>
    );
};
