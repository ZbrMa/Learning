import './styles/input.css';
import { useState } from 'react';

type Props = {
    type:string,
    placeholder?:string,
    initialValue? : any,
    variant?:'default' | 'outbox' | 'checkbox' | 'edit',
    size?:'default' | 'small',
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export function Input({type,placeholder,initialValue='', variant='default',size='default', onChange}:Props){

    const [value, setValue] = useState<any>(initialValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        if (onChange) {
            onChange(event);
        }
    };

    return(
        <>
        {variant === 'default' &&
            <input className={`input ${size === 'default'? 'default':'small'}`} type={type} placeholder={placeholder? placeholder: ''} onChange={handleChange} value={value}></input>
        }
        {variant === 'edit' &&
            <input className={`input-edit ${size === 'default'? 'default':'small'}`} type={type} onChange={handleChange} value={value}></input>
        }
        {variant === 'outbox' &&
            <div className='input-container' style={{fontSize:size === 'default'? '20px': '16px'}}>
                <div className='input-placeholder'>{placeholder}:</div>
                <input className={`input ${size === 'default'? 'default':'small'}`} type={type} onChange={handleChange} value={value}></input>
            </div>
        }
        {variant === 'checkbox' &&
            <div className='input-container' style={{fontSize:size === 'default'? '20px': '16px'}}>
                <div className='input-placeholder'>{placeholder}:</div>
                <input className={`input ${size === 'default'? 'default':'small'}`} type={type} onChange={handleChange}></input>
            </div>
        }
        </>
    );
};