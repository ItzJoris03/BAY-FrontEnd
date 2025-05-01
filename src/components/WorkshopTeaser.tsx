import { NavLink } from "react-router-dom";
import { Section } from "./Components";
import { Chapter } from "./Texts/Heading";
import Text from "./Texts/Text";

interface WorkshopsTeaserProps {
    data: {
        title: string,
        content: string,
        button: {
            name: string,
            to: string,
        }
    }
}

const WorkshopsTeaser: React.FC<WorkshopsTeaserProps> = ({ data }) => {
    return (
        <Section className="text-center">
            <Chapter content={data.title} className="text-2xl font-semibold" />
            <Text content={data.content} className="mt-2" />
            <NavLink to={data.button.to} className="mt-4 inline-block bg-mainDarker text-white px-6 py-2 rounded-lg font-semibold hover:bg-mainDarker/70 transition">
                {data.button.name}
            </NavLink>
        </Section>
    );
};

export default WorkshopsTeaser;