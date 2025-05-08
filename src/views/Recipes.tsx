import React, { useMemo, useState } from 'react';
import Page, { Section } from '@/components/Components';
import Footer from '@/components/Footer';
import { Search, Filter } from 'lucide-react';
import Heading, { Chapter, Title } from '@/components/Texts/Heading';
import { Link } from 'react-router-dom';
import { getRoutePath } from '@/utils/routing_helper_functions';
import { getLanguagePreference } from '@/utils/LanguageHandler';
import Navbar from '@/components/Navbar/Navbar';

import { recipes as allRecipes } from '@/assets/json/recipes.json';
import PremiumTag from '@/components/PremiumTag';


const RecipeCard = ({ recipe }: { recipe: typeof allRecipes[0] }) => {
    const lang = useMemo(() => getLanguagePreference(), []);

    return (
        <Link to={getRoutePath(window.location.pathname, lang) + `/${recipe.title}`} className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg relative">
            {recipe.premium && <PremiumTag />}
            <img src={recipe.image} alt={recipe.title} className="h-48 w-full object-cover" />
            <div className="p-4">
                <Heading lvl={3} className="text-lg font-SourceSans font-semibold text-lime-900" content={recipe.title} />
                <p className="text-gray-600 text-sm mt-1">{recipe.description}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                    {recipe.categories.map((cat) => (
                        <span
                            key={cat}
                            className="bg-lime-100 text-mainDarker text-xs px-3 py-1 rounded-full"
                        >
                            {cat}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
}


const RecipesOverview: React.FC = () => {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const filteredRecipes = allRecipes.filter((recipe) => {
        const matchTitle = recipe.title.toLowerCase().includes(search.toLowerCase());
        const matchCategory =
            !selectedCategory || recipe.categories.includes(selectedCategory);
        return matchTitle && matchCategory;
    });

    const uniqueCategories = Array.from(
        new Set(allRecipes.flatMap((r) => r.categories))
    );

    return (
        <Page>
            <Navbar />
            {/* Search + Filters */}
            <Section className='!pt-42 !py-0'>
                <Title content='Recipes' />
            </Section>

            <Section className='!py-12'>
                <Chapter content={'Recommended'} className="text-2xl font-semibold text-center mb-6" />
                <div className="grid md:grid-cols-3 gap-6 px-4">
                    {allRecipes
                        .filter((r) => r.recommended)
                        .map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                </div>
            </Section>

            <Section className='!py-12 !pb-24'>
                <Chapter content={'All Recipes'} className="text-2xl font-semibold text-center mb-6" />

                <div className="flex flex-col md:flex-row md:items-center gap-4 my-10 mx-12">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by title or ingredient..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-200"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        <span className="text-gray-600 flex items-center gap-1">
                            <Filter className="w-4 h-4" /> Filter:
                        </span>
                        {uniqueCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                                className={`px-3 py-1 cursor-pointer rounded-full text-sm transition ${selectedCategory === cat
                                    ? 'bg-lime-700 text-white'
                                    : 'bg-gray-200 text-gray-800 hover:bg-lime-100'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
                {filteredRecipes.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-6 px-4">
                        {filteredRecipes.map((recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic">No recipes found...</p>
                )}
            </Section>

            <Footer />
        </Page>
    );
};

export default RecipesOverview;
