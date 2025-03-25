import { Section } from "./Components";
import { Chapter } from "./Texts/Heading";
import Text from "./Texts/Text";

const WorkshopsTeaser = () => {
    return (
        <Section className="text-center">
            <Chapter content="Workshops & Cursussen" className="text-2xl font-semibold" />
            <Text content="Binnenkort starten nieuwe workshops over kruiden en natuurlijke verzorging!" className="mt-2" />
            <a href="/workshops" className="mt-4 inline-block bg-mainDarker text-white px-6 py-2 rounded-lg font-semibold hover:bg-mainDarker/70 transition">
                Meer Informatie
            </a>
        </Section>
    );
};

export default WorkshopsTeaser;