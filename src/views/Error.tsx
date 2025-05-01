import Page, { Section } from "@/components/Components";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Title } from "@/components/Texts/Heading";

const ErrorPage = () => {
    return (
        <Page>
            <Navbar />
            <Section className="min-h-[64vhs]">
                <Title content="Error 404 - Page not found" />
            </Section>
            <Footer />
        </Page>
    );
}

export default ErrorPage;