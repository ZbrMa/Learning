import './styles/blockTitle.css';

type Props = {
    text:string,
}

export function BlockTitle({text}:Props){
    return (
        <div className="block-title">
            <rect className="title-rect"></rect>
            {text}
        </div>
    );

}