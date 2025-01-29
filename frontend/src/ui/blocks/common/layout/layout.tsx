import { Link } from "react-router-dom";
import { MainHeader } from "../bodyBlock/bodyBlock";
import { Menu } from "../menu/menu";
import './layout.css';
import { HTMLAttributes } from "react";


interface LayoutProps extends HTMLAttributes<HTMLElement> {
  button:React.ReactNode,
  left:React.ReactNode,
  right:React.ReactNode,
}

export function Layout({button,left,right,...props}:LayoutProps) {

  return(
    <>
      <Menu button={button}/>
      <main className="layout" {...props}>
        <div className="layout__left">
          <Link to="/"><MainHeader>busk-up</MainHeader></Link>
          {left}
        </div>
        <div className="layout__right">
          {right}
        </div>
      </main>
    </>
  );
};