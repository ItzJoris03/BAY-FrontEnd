import { Facebook, Instagram, LucideProps, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import logo from '/LogoIcon-inverted.svg';
import Heading from "./Texts/Heading";
import Text from "./Texts/Text";
import { NavLink } from "react-router-dom";

interface LucideIcon {
    Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
}

interface ContactItem extends LucideIcon {
    title: string;
    content: string;
}

interface SocialLink extends LucideIcon {
    platform: string;
    url: string;
}

const contactItems: ContactItem[] = [
    { Icon: MapPin, title: "Find us", content: "1010 Avenue, SW 54321, Chandigarh" },
    { Icon: Phone, title: "Call us", content: "9876543210 0" },
    { Icon: Mail, title: "Mail us", content: "mail@info.com" },
];

const socialLinks: SocialLink[] = [
    { platform: "Facebook", url: "#", Icon: Facebook },
    { platform: "Instagram", url: "#", Icon: Instagram },
];

const quickLinks = [
    "Home", "About", "Services", "Portfolio", "Contact",
    "About us", "Our Services", "Expert Team", "Contact us", "Latest News"
];

const footerMenu = [
    { name: "Home", to: "/" },
    { name: "Terms", to: "/terms" },
    { name: "Privacy", to: "/privacy" },
    { name: "Contact", to: "/contact" },
];

const Footer: React.FC = () => {
    return (
        <footer className="footer-section bg-neutral-800 text-white py-10">
            <div className="container mx-auto px-6">

                {/* Contact Info Section */}
                <div className="grid md:grid-cols-3 gap-8 border-b border-main pb-8">
                    {contactItems.map(({ Icon, title, content }) => (
                        <div key={title} className="flex items-center space-x-4">
                            <Icon className={`text-main text-2xl`}></Icon>
                            <div>
                                <Heading lvl={4} content={title} className="text-lg font-semibold" />
                                <span className="text-gray-200">{content}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Main Content */}
                <div className="grid md:grid-cols-3 gap-10 mt-8">

                    {/* About Section */}
                    <div>
                        <img src={logo} alt="Logo" className="w-28 mb-4" />
                        <Text content="Ontdek de kracht van kruiden en natuurlijke verzorging. Natuurlijk en gezond leven begint hier." className="text-gray-200" />
                        <div className="mt-4 flex space-x-3">
                            {socialLinks.map(({ platform, url, Icon }) => (
                                <a key={platform} href={url} className="hover:text-white transition">
                                    <Icon className={`text-main text-2xl`}></Icon>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <Heading lvl={3} content="Useful Links" className="text-xl font-semibold mb-3" />
                        <ul className="grid grid-cols-2 gap-2">
                            {quickLinks.map(link => (
                                <li key={link}>
                                    <a href="#" className="hover:text-white transition">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div>
                        <Heading lvl={3} content="Subscribe" className="text-xl font-semibold mb-3" />
                        <Text content="Don't miss out on new updates, kindly fill in your email below." className="text-gray-200 mb-4" />
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Voer je e-mail in"
                                className="p-2 rounded-l-lg text-gray-50 border border-white w-42 sm:w-64 focus:outline-none"
                            />
                            <button type="submit" className="bg-lime-600 text-neutral-800 px-4 py-2 rounded-r-lg font-semibold">
                                Inschrijven
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-main text-center text-gray-300 text-sm mt-6 pt-4 flex flex-col-reverse gap-4 md:flex-row justify-between">
                    <p>
                        Copyright &copy; {new Date().getFullYear()}, All Rights Reserved | Designed by
                        <a href="https://jorishummel.com/" target="_blank" className="hover:opacity-70 border-b border-main ml-1">Joris Hummel</a>
                    </p>
                    <ul className="flex space-x-4 mt-2 md:mt-0 md:mx-0 mx-auto">
                        {footerMenu.map(item => (
                            <li key={item.name}>
                                <NavLink to={item.to} className="text-gray-200 hover:text-gray-200/70 transition">{item.name}</NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
