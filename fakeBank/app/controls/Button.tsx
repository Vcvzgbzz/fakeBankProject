import React,{CSSProperties} from 'react';

interface ButtonProps {
    className?: string;
    text?: any;
    onClick: () => void;
    disabled?:boolean;
    style?:CSSProperties
}

function Button({ className, text, onClick ,disabled,style}: ButtonProps) {
    return (
        <button className={className} onClick={onClick} disabled={disabled} style={style}>
            {text}
        </button>
    );
}

export default Button;
