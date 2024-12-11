import './footer.css';

const year = (new Date()).getFullYear();

export function Footer(){

    return(
        <footer className="grid-3 g-64 tx-white">
            <div className="footer__left">

            </div>
            <div className="footer__center">

            </div>
            <div className="footer__right">

            </div>
            <div className="footer__bottom">@Copyright {year}</div>
        </footer>
    )
};