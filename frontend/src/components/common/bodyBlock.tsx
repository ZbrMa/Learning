import './styles/bodyBlock.css'

type Props = {
    children: any;
    color?: 'primary' | 'secondary';
  }
  
  export function BodyBlock({ children, color = 'primary'}: Props) {
    return (
      <div className={`body-block-${color}`}>
        <div className="body-inner-block">
          {children}
        </div>
      </div>
    );
  }
  