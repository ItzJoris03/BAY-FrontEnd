import Page from '@/components/Components';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar/Navbar';
import React from 'react';

const ContactPage: React.FC = () => {
    return (
        <Page>
            <Navbar />
            <p>Contact Page</p>
            <Footer />
        </Page>
    );
};

export default ContactPage;
