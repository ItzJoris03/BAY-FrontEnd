import { Section } from "./Components";
import { Chapter } from "./Texts/Heading";

const TopicsSection = () => {
    const topics = [
        { title: "Geneeskrachtige kruiden", img: "https://cdn.pixabay.com/photo/2015/01/09/11/27/basil-594168_960_720.jpg", link: "/kruiden" },
        { title: "Recepten voor voeding en verzorging", img: "https://cdn.pixabay.com/photo/2020/04/20/14/08/medical-5068385_960_720.jpg", link: "/recepten" },
        { title: "Essentiële oliën", img: "https://cdn.pixabay.com/photo/2019/04/06/19/22/glass-4108085_960_720.jpg", link: "/olien" },
        { title: "Zelfgemaakte lotions", img: "https://cdn.pixabay.com/photo/2016/06/16/14/37/sunblock-1461397_960_720.jpg", link: "/lotions" }
    ];

    return (
        <Section>
            <Chapter content="Ontdek Meer" className="text-2xl font-semibold text-center mb-6" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                {topics.map((topic) => (
                    <a href={topic.link} key={topic.title} className="block relative group">
                        <img src={topic.img} alt={topic.title} className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:opacity-75 transition" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg font-bold rounded-lg">
                            {topic.title}
                        </div>
                    </a>
                ))}
            </div>
        </Section>
    );
};

export default TopicsSection;