import { Section } from "./Components";
import { Chapter } from "./Texts/Heading";
import Text from "./Texts/Text";

interface NewsletterProps {
    data: {
        title: string,
        content: string,
        form: {
            email: string,
            submit: string,
        },
        img: {
            src: string,
            alt: string,
        }
    }
}


const NewsletterSignup: React.FC<NewsletterProps> = ({ data }) => {
    return (
        <Section className="bg-mainDarker text-white text-center relative !px-0 sm:px-6">
            <div className="z-10 relative backdrop-blur-3xl p-4 sm:p-12 rounded-lg w-fit mx-auto">
                <Chapter content={data.title} className="text-2xl font-semibold" />
                <Text content={data.content} className="mt-2" />
                <form className="mt-4 flex justify-center">
                    <input
                        type="email"
                        placeholder={data.form.email}
                        className="p-2 rounded-l-lg text-gray-50 border border-white w-42 sm:w-64 focus:outline-none"
                    />
                    <button type="submit" className="bg-white text-mainDarker px-4 py-2 rounded-r-lg font-semibold">
                        {data.form.submit}
                    </button>
                </form>
            </div>
            <img src={data.img.src} className="absolute top-0 left-0 h-full w-full object-cover z-0" alt={data.img.alt} />
        </Section>
    );
};

export default NewsletterSignup;