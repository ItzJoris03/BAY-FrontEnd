import { Section } from "./Components";
import { SubTitle } from "./Texts/Heading";
import Text from "./Texts/Text";

interface AboutMeProps {
    data: {
        title: string,
        content: string[],
    }
}

const AboutMe: React.FC<AboutMeProps> = ({ data }) => {
    return (
        <Section className="min-h-96">
            <div className="flex justify-center items-center max-w-4xl w-full mx-auto flex-col gap-8 text-center">
                <SubTitle className="!text-5xl font-bold" content={data.title} />
                <Text className="!text-lg" content={data.content[0]} />
                <Text className="text-gray/80" content={data.content[data.content.length - 1]} />
            </div>
        </Section>
    );
}

export default AboutMe;