import { IText } from "@/types/texts";
import textFormatter from "@/utils/TextFormatter";

const Text: React.FC<IText> = ({ content, className = '' }) => {
    const formatted = textFormatter(content);

    const defaultClass = "font-SourceSans";

    return (
        <p className={`${defaultClass} ${className}`}>{formatted}</p>
    );
}

export const Bolden: React.FC<IText> = ({ content }) => (
    <strong className="font-bold">
        {content}
    </strong>
);

export const Italic: React.FC<IText> = ({ content }) => (
    <em className="italic">
        {content}
    </em>
);

export const Underline: React.FC<IText> = ({ content }) => (
    <span className="underline">
        {content}
    </span>
);

export const Strikethrough: React.FC<IText> = ({ content }) => (
    <span className="line-through">
        {content}
    </span>
);

export const Highlight: React.FC<IText> = ({ content }) => (
    <span className="relative text-white">
        {content}
        <span className="bg-main brightness-90 w-[110%] h-[110%] -skew-x-12 absolute top-0 -left-2 z-[-1]"></span>
    </span>
);

export default Text;