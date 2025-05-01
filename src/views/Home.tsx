import AboutMe from '@/components/About';
import Banner from '@/components/Banner';
import Page from '@/components/Components';
import FeaturedContent from '@/components/FeaturedContent';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar/Navbar';
import NewsletterSignup from '@/components/Newletter';
import Button from '@/components/Texts/Buttons';
import { SubTitle, Title } from '@/components/Texts/Heading';
import TopicsSection from '@/components/TopicsSection';
import WorkshopsTeaser from '@/components/WorkshopTeaser';
import useLangContent, { LangCode } from '@/hooks/useLangContent';
import { getLanguagePreference } from '@/utils/LanguageHandler';
import { ChevronDown } from 'lucide-react';
import React from 'react';

const HomePage: React.FC = () => {
    const { data } = useLangContent(getLanguagePreference() as LangCode, [
        "banner",
        "about_short",
        "topics",
        "featured",
        "newsletter_signup",
        "workshop_teaser"
    ]);

    const topics = [
        { title: "Geneeskrachtige kruiden", imgsrc: "https://cdn.pixabay.com/photo/2015/01/09/11/27/basil-594168_960_720.jpg", link: "/kruiden" },
        { title: "Recepten voor voeding en verzorging", imgsrc: "https://cdn.pixabay.com/photo/2020/04/20/14/08/medical-5068385_960_720.jpg", link: "/recepten" },
        { title: "Essentiële oliën", imgsrc: "https://cdn.pixabay.com/photo/2019/04/06/19/22/glass-4108085_960_720.jpg", link: "/olien" },
        { title: "Zelfgemaakte lotions", imgsrc: "https://cdn.pixabay.com/photo/2016/06/16/14/37/sunblock-1461397_960_720.jpg", link: "/lotions" }
    ];

    return (
        <Page>
            <Navbar />
            <Banner
                imgSrc={data.banner.img.src}
                imgAlt={data.banner.img.alt}
            >
                <div className='max-w-4xl text-white'>
                    <Title content={data.banner.title} />
                    <SubTitle className="mt-2" content={data.banner.subtitle} />
                    <Button text={data.banner.button.name} className='mt-12' />
                </div>

                <ChevronDown size={64} className='absolute bottom-32 text-white left-1/2 -translate-x-1/2 animate-bounce' />
            </Banner>
            <AboutMe data={data.about_short} />
            <TopicsSection data={data.topics} topics={topics} />
            <FeaturedContent data={data.featured} />
            <NewsletterSignup data={data.newsletter_signup} />
            <WorkshopsTeaser data={data.workshop_teaser} />
            <Footer />
        </Page>
    );
};

export default HomePage;
