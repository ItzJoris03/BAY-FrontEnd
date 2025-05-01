import { Section } from "./Components";
import { Chapter } from "./Texts/Heading";

interface ITopic {
    title: string,
    imgsrc: string,
    link: string
}

interface TopicsProps {
    data: {
        title: string,
    },
    topics: ITopic[],
}

const TopicsSection: React.FC<TopicsProps> = ({ data, topics }) => {
    return (
        <Section>
            <Chapter content={data.title} className="text-2xl font-semibold text-center mb-6" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                {topics.map((topic) => (
                    <a href={topic.link} key={topic.title} className="block relative group">
                        <img src={topic.imgsrc} alt={topic.title} className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:opacity-75 transition" />
                        <p className="absolute inset-0 bg-black/40 flex items-center justify-center text-center text-white text-lg font-bold rounded-lg">
                            {topic.title}
                        </p>
                    </a>
                ))}
            </div>
        </Section>
    );
};

export default TopicsSection;