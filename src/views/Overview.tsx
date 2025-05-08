import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getRoutePath } from "@/utils/routing_helper_functions";
import { getLanguagePreference } from "@/utils/LanguageHandler";
import Page from "@/components/Components";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Heading, { Chapter, Title } from "@/components/Texts/Heading";
import Image from "@/components/Image";
import PremiumTag from "@/components/PremiumTag";
import Text from "@/components/Texts/Text";
import fetcher from "@/utils/Fetch";
import useLangContent from "@/hooks/useLangContent";
import { Language } from "@/types/routes";

interface Item {
    id: string;
    name: string;
    scientificName: string;
    img: {
        src: string;
        alt: string;
    };
    isPremium: boolean;
    description: string;
}
const ItemCard = ({ item }: { item: Item }) => {
    const { name, scientificName, img, description, isPremium } = item;

    return (
        <Link
            to={getRoutePath(window.location.pathname, getLanguagePreference()) + `/${scientificName.toLowerCase()}`}
            className="item-card bg-white rounded-xl shadow-md overflow-hidden relative transition hover:shadow-lg"
        >
            {isPremium && <PremiumTag />}
            <Image src={img.src} alt={img.alt} className="h-48 w-full" />
            <div className="p-4">
                <Heading lvl={3} className="text-lg font-semibold text-green-900" content={name} />
                <Text className="text-gray-600 text-sm mt-1" content={`${description.slice(0, 100)}...`} />
                <div className="mt-2 text-sm text-gray-500">
                    <span>{scientificName}</span>
                </div>
            </div>
        </Link>
    );
};

const ItemsOverview: React.FC<{ category: 'plants' | 'oils' | 'basic_oils' }> = ({ category }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [query, setQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [activeLetter, setActiveLetter] = useState<string>("");
    const [showPremiumOnly, setShowPremiumOnly] = useState(false);
    const [showFreeOnly, setShowFreeOnly] = useState(false);

    const { data } = useLangContent(getLanguagePreference() as Language, ['encyclopedia']);

    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetcher.get(`/encyclopedia/${category}`);
                if (response) setItems(response as Item[]);

            } catch (err) {
                console.error('Fetch error:', err);
            }
        };

        fetchData();
    }, [category]);


    // ✅ Apply all filters
    const filteredItems = items
        .filter((item) =>
            [item.name, item.scientificName].some((field) =>
                field.toLowerCase().includes(query.toLowerCase())
            )
        )
        .filter((item) => {
            if (showPremiumOnly) return item.isPremium;
            if (showFreeOnly) return !item.isPremium;
            return true;
        })
        .sort((a, b) =>
            sortOrder === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        );

    const groupedItems: { [letter: string]: Item[] } = {};
    filteredItems.forEach((item) => {
        const firstLetter = item.name[0].toUpperCase();
        if (!groupedItems[firstLetter]) {
            groupedItems[firstLetter] = [];
        }
        groupedItems[firstLetter].push(item);
    });

    const availableLetters = Object.keys(groupedItems).sort((a, b) =>
        sortOrder === "asc"
            ? a.localeCompare(b, getLanguagePreference(), { sensitivity: "base" })
            : b.localeCompare(a, getLanguagePreference(), { sensitivity: "base" })
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const letter = entry.target.getAttribute("data-letter");
                        if (letter) setActiveLetter(letter);
                    }
                });
            },
            {
                rootMargin: "-50% 0px -49% 0px",
                threshold: 0,
            }
        );

        Object.entries(sectionRefs.current).forEach(([, el]) => {
            if (el) observer.observe(el);
        });

        return () => {
            Object.values(sectionRefs!.current).forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
    }, [filteredItems]);

    return (
        <Page>
            <Navbar />
            <div className="container p-6 mx-auto pt-32 min-h-[60vh] relative">
                <Title content={data?.encyclopedia.titles[category as keyof typeof data.encyclopedia.titles]} />

                {/* Search + Sort + Checkboxes */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 my-6 flex-wrap">
                    <input
                        type="text"
                        placeholder={data?.encyclopedia.search}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full sm:w-1/2 px-4 py-2 border rounded-md"
                    />
                    <select
                        value={sortOrder}
                        onChange={(e) =>
                            setSortOrder(e.target.value as "asc" | "desc")
                        }
                        className="px-4 py-2 border rounded-md w-full sm:w-auto"
                    >
                        <option value="asc">{data?.encyclopedia.sorting.asc}</option>
                        <option value="desc">{data?.encyclopedia.sorting.desc}</option>
                    </select>

                    {/* ✅ Premium / Free Filter */}
                    <div className="flex gap-4 items-center">
                        <label className="flex items-center gap-1 text-sm">
                            <input
                                type="checkbox"
                                checked={showPremiumOnly}
                                onChange={(e) => {
                                    setShowPremiumOnly(e.target.checked);
                                    if (e.target.checked) setShowFreeOnly(false);
                                }}
                            />
                            {data?.encyclopedia.premium}
                        </label>
                        <label className="flex items-center gap-1 text-sm">
                            <input
                                type="checkbox"
                                checked={showFreeOnly}
                                onChange={(e) => {
                                    setShowFreeOnly(e.target.checked);
                                    if (e.target.checked) setShowPremiumOnly(false);
                                }}
                            />
                            {data?.encyclopedia.free}
                        </label>
                    </div>
                </div>

                {/* Sidebar */}
                {availableLetters.length > 0 && (
                    <div className="hidden md:block fixed top-32 right-4 z-10">
                        <div className="bg-white border rounded-md shadow p-1 space-y-1 text-sm text-center">
                            {availableLetters.map((letter) => (
                                <a
                                    key={letter}
                                    href={`#group-${letter}`}
                                    className={`block px-2 py-0.5 transition rounded-md ${activeLetter === letter
                                        ? "bg-lime-100 text-lime-900 font-semibold"
                                        : "hover:text-lime-600"
                                        }`}
                                >
                                    {letter}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Item Listings */}
                {filteredItems.length === 0 ? (
                    <p className="text-gray-600 mt-6">
                        {data?.encyclopedia.no_results}
                    </p>
                ) : (
                    availableLetters.map((letter) => (
                        <div
                            key={letter}
                            id={`group-${letter}`}
                            data-letter={letter}
                            ref={(el) => {
                                sectionRefs.current[letter] = el;
                            }}
                            className="mb-10 scroll-mt-32"
                        >
                            <Chapter
                                className="text-2xl font-bold text-mainDarker mb-4 border-b pb-1"
                                content={letter}
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                                {groupedItems[letter].map((item) => (
                                    <ItemCard key={item.id} item={item} />
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </Page>
    );
}


export default ItemsOverview;