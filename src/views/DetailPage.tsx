import React, { useEffect, useState } from 'react';
import Page from '@/components/Components';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer';
import { Chapter, SubTitle, Title } from '@/components/Texts/Heading';
import Text from '@/components/Texts/Text';
import { useParams } from 'react-router-dom';
import Image from '@/components/Image';
import ErrorPage from './Error';
import fetcher from '@/utils/Fetch';
import { getLanguagePreference } from '@/utils/LanguageHandler';
import useLangContent from '@/hooks/useLangContent';
import { Language } from '@/types/routes';

const DetailPage: React.FC<{ category: 'plants' | 'oils' | 'basic_oils' }> = ({ category }) => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<DetailData>();
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetcher.get(`/encyclopedia/${category}/${id}?language=${getLanguagePreference()}`);
                if (response) setData(response as DetailData);
            } catch (err) {
                console.error('Fetch error:', err);
                setError(true);
            }
        };

        if (id) fetchData();
    }, [id, category]);

    if (error) return <ErrorPage />;

    return (
        <Page>
            <Navbar />
            <div className="container mx-auto pt-32 pb-16">
                {data === undefined ? (
                    <Loading category={category || ''} />
                ) : (
                    <DynamicDetail detailData={data} />
                )}
            </div>
            <Footer />
        </Page>
    );
};

export default DetailPage;

// ----------------- Dynamic UI Components -----------------

interface FactualData {
    label: string;
    value: string;
}

interface QuoteData {
    text: string;
    isQuote: boolean;
}

type DataDetailField = string | string[] | QuoteData | FactualData[];

interface DataDetailObject {
    [key: string]: DataDetailField;
}

interface DetailData {
    img: {
        src: string;
        alt: string;
    };
    name: string;
    scientificName: string;
    description: string;
    data: [DataDetailObject, DataDetailObject]; // always exactly two
}


const DynamicDetail: React.FC<{ detailData: DetailData }> = ({ detailData }) => {
    const { img, name, scientificName, description } = detailData;
    const { data } = useLangContent(getLanguagePreference() as Language, ['encyclopedia']);

    const renderDataObject = (obj: DataDetailObject) =>
        Object.entries(obj).map(([key, value]) => {
            const title = data?.encyclopedia[key as keyof typeof data.encyclopedia] as string || '';

            // Simple string
            if (typeof value === 'string') {
                return (
                    <Section key={key} title={title}>
                        <p>{value}</p>
                    </Section>
                );
            }

            // Array of strings
            if (Array.isArray(value) && typeof value[0] === 'string') {
                return (
                    <Section key={key} title={title}>
                        <List items={value as string[]} />
                    </Section>
                );
            }

            // Quote object
            if (typeof value === 'object' && 'isQuote' in value && value.isQuote) {
                return (
                    <Section key={key} title={title}>
                        <Quote quote={value.text} />
                    </Section>
                );
            }

            // Array of { label, value } facts
            if (Array.isArray(value) && typeof value[0] === 'object' && 'label' in value[0]) {
                return (
                    <Section key={key} title={title}>
                        <div className="space-y-2">
                            {(value as FactualData[]).map((fact, index) => (
                                <Fact key={index} label={data?.encyclopedia[fact.label as keyof typeof data.encyclopedia] as string || ''} value={fact.value} />
                            ))}
                        </div>
                    </Section>
                );
            }

            return null;
        });

    return (
        <div className="bg-[#fdfcf8] border border-gray-300 rounded-3xl shadow-inner grid md:grid-cols-2 gap-10 p-10 relative overflow-hidden">
            {/* Left side */}
            <div className="space-y-6 relative z-10">
                {img?.src && (
                    <Image src={img.src} alt={img.alt || name} className="rounded-xl shadow-md mx-auto" />
                )}
                <div className="text-center">
                    {name && <Title className="!text-5xl text-mainDarker" content={name} />}
                    {scientificName && (
                        <SubTitle
                            className="italic text-lg font-SourceSans text-gray-700"
                            content={scientificName}
                        />
                    )}
                </div>
                {description && <Text content={description} />}
                {renderDataObject(detailData.data[0])}
            </div>

            {/* Right side */}
            <article className="prose prose-orange max-w-none relative z-10">
                {renderDataObject(detailData.data[1])}
            </article>

            {/* Decorative divider */}
            <div className="absolute left-1/2 top-0 h-full w-px bg-gray-300 z-0" />
        </div>
    );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
    title,
    children,
}) => (
    <section className="mb-6">
        <Chapter className="text-2xl text-mainDarker mb-2 border-b border-main pb-1" content={title} />
        {children}
    </section>
);

const Loading = ({ category }: { category: string }) => (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
        <div
            className={`animate-spin rounded-full h-16 w-16 border-t-4 ${category === 'oils' ? 'border-orange-500' : 'border-green-600'
                } border-opacity-50 mb-6`}
        />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            {category === 'oils' ? 'Even geduld...' : 'Translating Content...'}
        </h2>
        <p className="text-gray-600 max-w-md">
            {category === 'oils'
                ? 'De gegevens van deze etherische olie worden geladen. Dit kan enkele seconden duren.'
                : 'We’re preparing content in your language. Please hang tight!'}
        </p>
    </div>
);

const Fact: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="flex flex-col">
        <dt className="text-gray-600 font-medium">{label}</dt>
        <dd className="text-gray-800">{value}</dd>
    </div>
);

const List: React.FC<{ items: string[] }> = ({ items }) => (
    <ul className="list-disc list-inside space-y-1">
        {items.map((item, idx) => (
            <li key={idx}>{item}</li>
        ))}
    </ul>
);

const Quote: React.FC<{ quote: string }> = ({ quote }) => (
    <blockquote className="italic border-l-4 border-main pl-4 text-gray-700">
        {quote}
    </blockquote>
);