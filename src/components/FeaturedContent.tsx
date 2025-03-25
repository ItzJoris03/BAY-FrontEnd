import { Section } from "./Components";
import { Chapter } from "./Texts/Heading";

const FeaturedContent = () => {
    const articles = [
        { title: "Lavendelolie: Hoe gebruik je het?", img: "https://cdn.pixabay.com/photo/2017/07/16/22/22/bath-oil-2510783_960_720.jpg", link: "/articles/lavendel" },
        { title: "Maak je eigen kruidenzalf", img: "https://cdn.pixabay.com/photo/2017/06/18/19/20/salve-2416882_960_720.jpg", link: "/articles/zalf" },
        { title: "Kruidenthee voor ontspanning", img: "https://cdn.pixabay.com/photo/2016/09/21/22/00/tea-1685847_960_720.jpg", link: "/articles/thee" }
    ];

    return (
        <Section>
            <Chapter content="Uitgelichte Artikelen" className="text-2xl font-semibold text-center mb-6" />
            <div className="grid md:grid-cols-3 gap-6 px-4">
                {articles.map((article) => (
                    <a href={article.link} key={article.title} className="block bg-white shadow-md rounded-lg overflow-hidden">
                        <img src={article.img} alt={article.title} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h3 className="font-semibold text-lg">{article.title}</h3>
                            <p className="text-gray-600 mt-2">Lees meer →</p>
                        </div>
                    </a>
                ))}
            </div>
        </Section>
    );
};


export default FeaturedContent;