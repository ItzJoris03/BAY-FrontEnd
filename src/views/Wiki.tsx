import Page, { Section } from "@/components/Components";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Title } from "@/components/Texts/Heading";

const Wiki = () => {
    return (
        <Page>
            <Navbar />
            <Section className="min-h-[64vhs]">
                <Title content="Wiki page" />
            </Section>
            <Footer />
        </Page>
    );
}

export default Wiki;