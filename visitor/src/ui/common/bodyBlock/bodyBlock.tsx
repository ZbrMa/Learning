import './bodyBlock.css';
import { HTMLAttributes } from 'react';

interface BodyBlockProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: "full" | "pad";
  color?:'white' | 'grey' | 'black';
  title?:string;
  button?:React.ReactNode;
}

export function BodyBlock({ children, variant = "pad",color='white',title,button, className, ...props }: BodyBlockProps,) {
  return (
    <section className={`body__section ${variant} ${color} ${className ?? ''}`} {...props}>
      <div className="section__inner h-full">
        {title && <BodyBlockHeader button={button}>{title}</BodyBlockHeader>}
        {children}
      </div>
    </section>
  );
};


interface BodyBlockHeaderProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  button?:React.ReactNode;
};

function BodyBlockHeader({children, button,...props}:BodyBlockHeaderProps){

  return(
    <div className="section__header mb-32 flex content-space">
      <h1 className='h-xl thick' {...props}>{children}</h1>
      {button}
    </div>
    
  );
};

type SectionHeaderProps = {
  children: React.ReactNode;
}

export function SectionHeader ({children}:SectionHeaderProps) {

  return(
    <h3 className="h-sm thick">{children}</h3>
  );
};

export function MainHeader ({children}:SectionHeaderProps) {

  return(
    <h2 className="main--header thick">{children}</h2>
  );
};

export function SectionNumber ({children}:SectionHeaderProps) {

  return(
    <h2 className="h-top section--number thick">{children}.</h2>
  )
}

