import { NavLink } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import './styles/button.css';

type Props = {
    click?:any,
    children?:any,
    variant?:'default' | 'grey' | 'link' | 'close',
    url?:string,
}

export function Button({click,children = '',variant='default',url}:Props){

    return (
        <>
            {variant === 'default' &&(
                <button className="button-default" onClick={click}>
                    {url? <NavLink style={{width:'100%',height:'100%'}} to={url}></NavLink>:<></>}    
                    {children}
                </button>
            )}

            {variant === 'grey' &&(
                <button className="button-grey" onClick={click}>
                    {url? <NavLink to={url}></NavLink>:<></>} 
                    {children}
                </button>
            )}

            {variant === 'link' &&(
                <button className="button-link" onClick={click}>
                    <NavLink to={url? url: '/'}></NavLink>
                    {children}
                </button>
            )} 

            {variant === 'close' &&(
                <button className="button-close" onClick={click}>
                    <IoClose></IoClose>
                </button>
            )} 
        </>
    )
}