import { Link } from 'react-router-dom';
export default function Button({children,to,onClick,variant='',type='button',disabled=false}){ const className=`button ${variant}`; return to?<Link className={className} to={to}>{children}</Link>:<button className={className} onClick={onClick} type={type} disabled={disabled}>{children}</button> }
