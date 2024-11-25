import './badge.css';

type BadgeProps = {
    children:React.ReactNode,
    variant?:'def' | 'sec',
};

export function Badge({children,variant='def'}:BadgeProps){

    return(
        <span className={`tx-white xbold badge ${variant}`}>{children}</span>
    );
};