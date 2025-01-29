import { Button } from '../button/button';
import './community.css';

type GetNewUserActionBlockProps ={
    children:React.ReactNode,
    header:string,
    variant?:'left' | 'right',
    watermark:string,
    btn?:React.ReactNode,
} 

export function GetNewUserActionBlock({children,header,variant='left',watermark,btn}:GetNewUserActionBlockProps){



    return (
        <div className={`get__user__action__block flex relative w-full ${variant}`}>
            <span className="watermark tx-white thick">{watermark}</span>
            <div className="user__action__text">
                    <div className='flex g-16 items-center mb-16 user__action__head'>
                        <span className='arrow'></span>
                        <h3 className="tc-red thick h-top">{header}</h3>
                    </div>
                <p className="tx-gray tx-lg">{children} {btn && (<Button variant='link' color='red'>{btn}</Button>)}</p>
            </div>
        </div>
    )
};