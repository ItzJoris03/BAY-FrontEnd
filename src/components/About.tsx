import { Section } from "./Components";
import { SubTitle } from "./Texts/Heading";
import Text from "./Texts/Text";

const AboutMe = () => {
    return (
        <Section className="h-96">
            <div className="flex justify-center items-center max-w-4xl w-full mx-auto flex-col gap-8 text-center">
                <SubTitle className="!text-5xl font-bold" content="Welkom in mijn wereld!" />
                <Text className="!text-lg" content="**Ben je klaar om je in het avontuur van kruiden en natuur te storten?** Hier komt mijn passie voor de natuur en kruidenkunde tot leven, en ik kan niet wachten om jou mee te nemen op deze ontdekkingsreis!" />
                <Text className="text-gray/80" content="// Annika Wessels, oprichter Botanics & You." />
            </div>
        </Section>
    );
}

export default AboutMe;