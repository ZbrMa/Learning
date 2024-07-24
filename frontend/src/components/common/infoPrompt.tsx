import { IoAlertCircleOutline, IoCheckmarkCircleOutline, IoHelpCircleOutline } from "react-icons/io5";
import './styles/infoPrompt.css';

type Props = {
    variant: 'positive' | 'negative' | 'informative',
    text: string,
}

export function InfoPrompt({variant,text}:Props){

    return(
        <>
        {variant === 'positive' &&
            <div className="info-prompt positive">
                <IoCheckmarkCircleOutline></IoCheckmarkCircleOutline>
                {text}
            </div>
        }
        
        {variant === 'negative' &&
            <div className="info-prompt negative">
                <IoAlertCircleOutline></IoAlertCircleOutline>
                {text}
            </div>
        }

        {variant === 'informative' &&
            <div className="info-prompt informative">
                <IoHelpCircleOutline></IoHelpCircleOutline>
                {text}
            </div>
        }
        </>
    );   
}