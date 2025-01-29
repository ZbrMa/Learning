import './separator.css';

export function Separator(){

    return(
        <div className="separator flex relative w-full items-center content-center my-16">
            <span className="separator__line left"></span>
            <span className="separator__triangle"></span>
            <span className="separator__line right"></span>
        </div>
    );
};