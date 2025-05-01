import Page, { Section } from "@/components/Components";
import Footer from "@/components/Footer";
import useLangContent, { LangCode } from "@/hooks/useLangContent";
import { getLanguagePreference } from "@/utils/LanguageHandler";
import React from "react";

type LegalType = "terms" | "privacy";

interface LegalPageProps {
    id: LegalType;
}

const LegalPage: React.FC<LegalPageProps> = ({ id }) => {
    const { data } = useLangContent(getLanguagePreference() as LangCode, ["terms", "privacy"]);

    return (
        <Page>
            <Section className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
                <h1 className="text-3xl font-bold mb-4">{data[id].title}</h1>
                <p className="mb-6 text-lg">{data[id].subtitle}</p>
                <div className="space-y-6">
                    {data[id].content.map((section, idx) => (
                        <section key={idx}>
                            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                            <p className="text-base leading-relaxed whitespace-pre-line">
                                {section.content}
                            </p>
                        </section>
                    ))}
                </div>
                <p className="mt-10 text-sm text-gray-500">{data[id].updated}</p>
            </Section>
            <Footer />
        </Page>
    );
};

export default LegalPage;
