import { IHeading, IText } from "@/types/texts";
import textFormatter from "@/utils/TextFormatter";

export const Title: React.FC<IText> = ({ content }) => <Heading lvl={1} content={content} className={`font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl`} />
export const SubTitle: React.FC<IText> = ({ content, className = '' }) => <Heading lvl={2} content={content} className={`text-sm sm:text-base md:text-lg lg:text-xl ${className}`} />
export const Chapter: React.FC<IText> = ({ content, className = '' }) => <Heading lvl={2} content={content} className={`${className}`} />
export const ChapterSubtext: React.FC<IText> = ({ content, className = '' }) => <Heading lvl={3} content={content} className={`${className}`} />

const Heading: React.FC<IHeading> = ({ lvl, content, className = '' }) => {
    const formatted = textFormatter(content);

    const defaultClass = "font-PlayfairDisplay";

    const getTag = () => {
        switch (lvl) {
            case 1:
                return <h1 className={`${defaultClass} ${className}`}>{formatted}</h1>
            case 2:
                return <h2 className={`${defaultClass} ${className}`}>{formatted}</h2>
            case 3:
                return <h3 className={`${defaultClass} ${className}`}>{formatted}</h3>
            case 4:
                return <h4 className={`${defaultClass} ${className}`}>{formatted}</h4>
            case 5:
                return <h5 className={`${defaultClass} ${className}`}>{formatted}</h5>
            case 6:
                return <h6 className={`${defaultClass} ${className}`}>{formatted}</h6>
        }
    }

    return getTag();
}

export default Heading;