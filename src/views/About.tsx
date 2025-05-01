import Page, { Section } from '@/components/Components';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { Title } from '@/components/Texts/Heading';
import React from 'react';

const ContactPage: React.FC = () => {
    return (
        <Page>
            <Navbar />
            <Section className="min-h-[64vhs]">
                <Title content="About Page" />
            </Section>
            <Footer />
        </Page>
    );
};

export default ContactPage;
