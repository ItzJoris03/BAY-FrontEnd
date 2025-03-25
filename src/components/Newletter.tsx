import { Section } from "./Components";
import { Chapter } from "./Texts/Heading";
import Text from "./Texts/Text";

const NewsletterSignup = () => {
    return (
        <Section className="bg-mainDarker text-white text-center relative">
            <div className="z-10 relative backdrop-blur-3xl p-12 rounded-lg w-fit mx-auto">
                <Chapter content="Schrijf je in voor onze nieuwsbrief" className="text-2xl font-semibold" />
                <Text content="Ontvang gratis recepten, tips en updates over kruiden!" className="mt-2" />
                <form className="mt-4 flex justify-center">
                    <input
                        type="email"
                        placeholder="Voer je e-mail in"
                        className="p-2 rounded-l-lg text-gray-50 border border-white w-64 focus:outline-none"
                    />
                    <button type="submit" className="bg-white text-mainDarker px-4 py-2 rounded-r-lg font-semibold">
                        Inschrijven
                    </button>
                </form>
            </div>
            <img src="https://cdn.pixabay.com/photo/2020/12/17/14/07/leaves-5839550_960_720.jpg" className="absolute top-0 left-0 h-full w-full object-cover z-0" alt="Just a wallpaper" />
        </Section>
    );
};

export default NewsletterSignup;