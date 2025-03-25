import React, { useRef, useCallback, useMemo, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '@/assets/svg/logo/BotanicsYouFull.svg';
import { filterRoutes } from '@/utils/filters';
import MobileSubroutesMenu from './MobileNavbar';
import classNames from '@/utils/classnames';
import { ROUTES_CONF } from '@/utils/DefaultFiles';
import { getLanguagePreference } from '@/utils/LanguageHandler';
import { getRoutePath } from '@/utils/routing_helper_functions';
import LanguageSelector from './LangSelector';
import useScrollDirection, { ScrollDirection } from '@/hooks/useScrollDirection';
import { ChevronDown } from 'lucide-react';

export const MobileMenuBackground = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((_, ref) => (
    <div ref={ref} className='transition-all duration-500 w-0 bg-white h-screen'></div>
));

const Line = React.forwardRef<HTMLSpanElement, { className?: string }>(({ className = '' }, ref) => (
    <span ref={ref} className={`transition-all duration-500 block border-t-2 border-solid border-black w-6 ${className}`}></span>
));

const Navbar: React.FC = () => {
    const mobileMenuBgRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const navContainerRef = useRef<HTMLElement>(null);

    const scrollDir = useScrollDirection();

    const buttonRefs = useRef({
        button: useRef<HTMLButtonElement>(null),
        lines: [useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null), useRef<HTMLSpanElement>(null)]
    });

    useEffect(() => {
        if (navContainerRef.current) {
            if (scrollDir == ScrollDirection.up) {
                navContainerRef.current?.classList.remove('-translate-y-full');
            } else {
                navContainerRef.current?.classList.add('-translate-y-full');
            }
        }
    }, [scrollDir]);

    // Memoize filtered routes to avoid re-computation on each render
    const filteredRoutes = useMemo(() => filterRoutes(ROUTES_CONF.routes), []);

    const toggleClassList = useCallback((elements: Element[], classes: string[]) => {
        elements.forEach((el) => classes.forEach(cls => el.classList.toggle(cls)));
    }, []);

    const toggleMobileMenu = useCallback(() => {
        const { lines } = buttonRefs.current;

        lines.map((line, i) => {
            if (line.current) {
                switch (i) {
                    case 0:
                        line.current.classList.toggle("rotate-45");
                        break;
                    case 1:
                        line.current.classList.toggle("opacity-0");
                        line.current.classList.toggle("my-1");
                        line.current.classList.toggle("-my-0.5");
                        break;
                    case 2:
                        line.current.classList.toggle("-rotate-45");
                        break;
                    default:
                        break;
                }
            }
        })

        // Toggle background panels
        if (mobileMenuBgRef.current) {
            toggleClassList([...mobileMenuBgRef.current.children], ["w-0", "w-1/3", "z-10"]);
        }

        // Toggle mobile menu visibility and animations
        if (mobileMenuRef.current) {
            const container = mobileMenuRef.current;
            const isVisible = container.classList.contains("flex");

            if (isVisible) {
                toggleClassList([...container.children], ["scale-0"]);
                setTimeout(() => {
                    container.classList.toggle("hidden");
                    container.classList.toggle("flex");
                }, 250);
            } else {
                container.classList.toggle("hidden");
                container.classList.toggle("flex");
                setTimeout(() => toggleClassList([...container.children], ["scale-0"]), 100);
            }
        }
    }, [toggleClassList])

    return (
        <nav ref={navContainerRef} className="fixed top-0 left-0 transition-transform duration-300 max-h-screen w-full bg-white p-4 px-6 z-20">
            <div className="container mx-auto flex gap-8 justify-between items-center">
                <div className="text-white text-3xl font-bold">
                    <NavLink to="/">
                        <img
                            src={logo}
                            alt="Botanics&You logo with slogan"
                            className="max-h-16"
                        />
                    </NavLink>
                </div>
                <div className="hidden md:flex space-x-4">
                    {filteredRoutes.map(([path, route], index) => {
                        const subRoutes = route.children ? filterRoutes(route.children) : [];

                        return (
                            <div className='group relative' key={index}>
                                <NavLink
                                    to={getRoutePath(path, route, getLanguagePreference())}
                                    className={({ isActive }) => classNames(
                                        "border-b-2 px-3 py-2 relative flex justify-center items-center gap-2 text-lg font-medium transition-all duration-300",
                                        {
                                            "font-medium border-main": isActive,
                                            "border-transparent group-hover:border-main hover:opacity-75": !isActive,
                                        }
                                    )}
                                >
                                    {route.linkname?.[getLanguagePreference() as keyof typeof route.linkname]}
                                    {route.children && (
                                        <ChevronDown className='w-4 h-fit mb-0.5 group-hover:rotate-180 transition-transform' />
                                    )}
                                </NavLink>
                                {route.children && (
                                    <div className='absolute invisible group-hover:visible scale-0 transition-all duration-300 group-hover:scale-100 origin-top flex flex-col items-center gap-2 w-full top-full py-4 bg-white shadow-md rounded-sm'>
                                        {subRoutes.map(([subpath, subroute], index) => (
                                            <NavLink
                                                key={index}
                                                to={path + getRoutePath(subpath, subroute, getLanguagePreference())}
                                                className={({ isActive }) => classNames("text-lg font-medium transition-all duration-300", { "font-bold": isActive, "hover:opacity-75": !isActive })}
                                            >
                                                {subroute.linkname?.[getLanguagePreference() as keyof typeof subroute.linkname]}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                <div className="md:hidden">
                    <button ref={buttonRefs.current.button} onClick={toggleMobileMenu} className="w-fit h-8 transform duration-500 cursor-pointer">
                        {buttonRefs.current.lines.map((ref, index) => (
                            <Line ref={ref} key={index} className={index === 1 ? "my-1" : ""} />
                        ))}
                    </button>
                </div>
                <LanguageSelector />
            </div>

            {/* Mobile menu */}
            <div className="md:hidden">
                <div ref={mobileMenuBgRef} className='absolute top-0 left-0 flex w-full z-[-1]'>
                    {[...Array(3)].map((_, index) => <MobileMenuBackground key={index} />)}
                </div>
                <div ref={mobileMenuRef} className="hidden flex-col space-y-8 px-4 py-8 absolute top-0 left-0 w-full h-screen justify-center z-[-1]">
                    {filteredRoutes.map(([path, route], index) => (
                        <MobileSubroutesMenu route={route} path={path} onClick={toggleMobileMenu} key={index} />
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
