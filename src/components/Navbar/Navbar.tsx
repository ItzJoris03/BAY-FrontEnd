import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "@/assets/svg/logo/BotanicsYouFull.svg";
import { Menu, X, ChevronDown } from "lucide-react";
import { ROUTES_CONF } from "@/utils/DefaultFiles";
import LanguageSelector from "./LangSelector";
import { getLanguagePreference } from "@/utils/LanguageHandler";
import { Route } from "@/types/routes";
import { getRoutePath } from "@/utils/routing_helper_functions";

const filterRoutes = (routes: Record<string, Route>) =>
    Object.entries(routes).filter(
        ([, route]) =>
            route.linkname &&
            (route?.config?.hiddenFromMenu === undefined ||
                route?.config.hiddenFromMenu === false)
    );

const Logo = () => (
    <NavLink to="/" className="flex items-center">
        <img
            src={logo}
            alt="Botanics&You logo with slogan"
            className="max-h-14"
        />
    </NavLink>
);

const Navbar: React.FC = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
    const language = useMemo(getLanguagePreference, []);

    const toggleDropdown = (path: string) =>
        setDropdownOpen(dropdownOpen === path ? null : path);
    const toggleMobile = () => setMobileOpen((prev) => !prev);
    const closeAllMenus = () => {
        setDropdownOpen(null);
        setMobileOpen(false);
    };

    const filteredRoutes = useMemo(
        () => filterRoutes(ROUTES_CONF.routes),
        []
    );

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm fixed w-full z-50 p-2 sm:px-6">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
                {/* Logo */}
                <Logo />

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6">
                    {filteredRoutes.map(([path, route]) => {
                        const hasChildren = !!route.children;
                        const label = route.linkname?.[language as keyof typeof route.linkname];

                        if (!label) return null;

                        const langPath = getRoutePath(path, getLanguagePreference());

                        return hasChildren ? (
                            <div key={path} className="relative">
                                <NavLink
                                    // onClick={() => toggleDropdown(path)}
                                    to={langPath}
                                    className="flex items-center gap-1 text-gray-800 hover:text-green-700 font-medium peer cursor-pointer"
                                >
                                    {label}
                                    <ChevronDown size={16} />
                                </NavLink>

                                <div
                                    className={`${dropdownOpen === path
                                        ? "opacity-100 translate-y-0 pointer-events-auto"
                                        : "opacity-0 -translate-y-2 pointer-events-none"
                                        } absolute top-full left-0 pt-8 min-w-[180px] rounded-lg bg-white shadow-xl transition-all duration-200 ease-out z-40
                                        peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:pointer-events-auto
                                        hover:opacity-100 hover:translate-y-0 hover:pointer-events-auto`}
                                >
                                    {Object.entries(route.children!).map(([subPath, child]) => {
                                        const fullPath = path + subPath;
                                        const childLangPath = getRoutePath(fullPath, getLanguagePreference());
                                        const childLabel = child.linkname?.[language as keyof typeof child.linkname];
                                        if (!childLabel) return null;
                                        return (
                                            <NavLink
                                                key={childLangPath}
                                                to={childLangPath}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                                            >
                                                {childLabel}
                                            </NavLink>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <NavLink
                                key={path}
                                to={langPath}
                                className="text-gray-800 hover:text-green-700 font-medium"
                            >
                                {label}
                            </NavLink>
                        );
                    })}

                    <LanguageSelector />
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button onClick={toggleMobile}>
                        {mobileOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            <div
                className={`md:hidden bg-white transition-all duration-300 overflow-hidden ${mobileOpen ? "max-h-[800px] py-4 px-4" : "max-h-0"
                    }`}
            >
                {filteredRoutes.map(([path, route]) => {
                    const hasChildren = !!route.children;
                    const label = route.linkname?.[language as keyof typeof route.linkname];

                    if (!label) return null;
                    const langPath = getRoutePath(path, getLanguagePreference());

                    return hasChildren ? (
                        <div key={path} className={`${dropdownOpen ? 'mb-2' : ''}`}>
                            <button
                                onClick={() => toggleDropdown(path)}
                                className="flex w-full justify-between items-center text-gray-800 py-2"
                            >
                                {label}
                                <ChevronDown
                                    size={16}
                                    className={`transform transition ${dropdownOpen === path ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            <div
                                className={`pl-4 mt-1 space-y-1 transition-all duration-200 ${dropdownOpen === path ? "block" : "hidden"
                                    }`}
                            >
                                {Object.entries(route.children!).map(([subPath, child]) => {
                                    const subLangPath = getRoutePath(subPath, getLanguagePreference());
                                    const fullPath = path + subLangPath;
                                    const childLabel = child.linkname?.[language as keyof typeof child.linkname];
                                    if (!childLabel) return null;

                                    return (
                                        <NavLink
                                            key={fullPath}
                                            to={fullPath}
                                            className="block text-sm text-gray-700 hover:text-green-700"
                                            onClick={closeAllMenus}
                                        >
                                            {childLabel}
                                        </NavLink>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <NavLink
                            key={path}
                            to={langPath}
                            className="block text-gray-800 py-2"
                            onClick={closeAllMenus}
                        >
                            {label}
                        </NavLink>
                    );
                })}

                {/* Language selector in mobile */}
                <div className="mt-4">
                    <span className="text-sm font-medium text-gray-600">Language</span>
                    <LanguageSelector isMobile />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
