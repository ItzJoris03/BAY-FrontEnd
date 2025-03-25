import { ArrowRight } from "lucide-react";

interface IButton {
    className?: string;
    text?: string;
}

const Button: React.FC<IButton> = ({ className = '', text }) => {
    return (
        <button className={`hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-4 px-4 py-2 border border-white rounded-sm ${className}`}>
            {text}
            <ArrowRight />
        </button>
    );
}

export default Button;