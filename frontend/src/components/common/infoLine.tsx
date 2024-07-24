import './styles/infoLine.css';
import { IoHelpCircleOutline } from 'react-icons/io5';

type Props = {
    name:string,
    data:string | React.ReactElement,
    variant?: 'default' | 'tooltip',
}

export function InfoLine({name,data, variant = 'default'}:Props){

    return (
        <div className="info-line">
            <div className="info-rect"></div>
            <div className='info-text'>
                <div className='info-name'>{name}
                    {variant === 'tooltip' && <IoHelpCircleOutline></IoHelpCircleOutline>}
                </div>
                <div className='info-content'>{data}</div>
            </div>
        </div>
    );
}