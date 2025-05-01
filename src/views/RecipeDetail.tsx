import React, { useState } from 'react';
import Page, { Section } from '@/components/Components';
import Footer from '@/components/Footer';
import { Timer, Users, Flame } from 'lucide-react';
import { SubTitle, Title } from '@/components/Texts/Heading';
import Text from '@/components/Texts/Text';
import Navbar from '@/components/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { recipes } from '@/assets/json/recipes.json';

const RecipeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [activeStep, setActiveStep] = useState(0);
    const recipe = recipes.filter(({ title }) => title === id)[0];

    return recipe && (
        <Page>
            <Navbar />

            {/* Header */}
            <Section className="max-w-5xl mx-auto px-6 pt-12">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <img
                        src={recipe.image}
                        alt={recipe.altText}
                        className="w-full h-80 object-cover rounded-3xl shadow-lg"
                    />
                    <div>
                        <Title content={recipe.title} />
                        <Text content={recipe.description} />
                        <div className="flex flex-wrap gap-4 mt-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Timer className="w-4 h-4" /> {recipe.nutrition.prepTime}
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" /> {recipe.nutrition.servings} serving
                            </div>
                            <div className="flex items-center gap-2">
                                <Flame className="w-4 h-4" /> {recipe.nutrition.calories} kcal
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Origin / Story */}
            <Section className="max-w-5xl mx-auto px-6 !py-0">
                <SubTitle className="font-semibold text-mainDarker mb-2" content='Origin' />
                <Text className="text-gray-700 leading-relaxed" content={recipe.origin} />
            </Section>

            {/* Ingredients */}
            <Section className="max-w-5xl mx-auto px-6">
                <SubTitle className="text-2xl font-semibold text-mainDarker mb-4 flex items-center gap-2" content='Ingredients' />
                <div className="flex flex-wrap gap-3">
                    {recipe.ingredients.map((item, idx) => (
                        <span
                            key={idx}
                            className="bg-lime-50/5 text-mainDarker px-4 py-2 rounded-full text-sm shadow-sm"
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </Section>

            {/* Interactive Steps */}
            <Section className="max-w-5xl mx-auto px-6 !py-0">
                <SubTitle className="text-2xl font-semibold text-mainDarker mb-4 flex items-center gap-2" content='Instructions' />
                <div className="space-y-4">
                    {recipe.instructions.map((step, idx) => (
                        <div
                            key={idx}
                            onClick={() => setActiveStep(idx)}
                            className={`cursor-pointer border-l-4 px-4 py-3 rounded-md transition ${idx === activeStep
                                ? 'bg-lime-50 border-mainDarker'
                                : 'bg-white border-gray-300 hover:border-main'
                                }`}
                        >
                            <p className="text-sm font-medium text-gray-800">
                                Step {idx + 1}
                            </p>
                            <p className="text-gray-700">{step}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Tips */}
            {recipe.tips.length > 0 && (
                <Section className="max-w-5xl mx-auto px-6 mb-20">
                    <SubTitle className="text-2xl font-semibold text-mainDarker mb-4 flex items-center gap-2" content='Tips & Variations' />
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        {recipe.tips.map((tip, idx) => (
                            <li key={idx}>{tip}</li>
                        ))}
                    </ul>
                </Section>
            )}

            <Footer />
        </Page>
    );
};

export default RecipeDetail;
