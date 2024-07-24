import './styles/teaser.css';

type Props = {
    children:any,
    styles?: React.CSSProperties;
}

export function Teaser({children,styles}:Props){

    return(
        <div style={styles} className="teaser">{children}</div>
    );
}