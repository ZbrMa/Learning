type HighlightProps = {
    children:React.ReactNode,
}

export function Highlight({children}:HighlightProps){

    return(
        <span className="tx-black xbold">{children}</span>
    )
};