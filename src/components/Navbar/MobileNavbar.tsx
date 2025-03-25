import React, { useRef } from "react";
import { NavLink } from "react-router-dom";
import { MobileMenuBackground } from "./Navbar";
import { filterRoutes } from "@/utils/filters";
import classNames from "@/utils/classnames";
import { Route } from "@/types/routes";
import { getLanguagePreference } from "@/utils/LanguageHandler";
import { getRoutePath } from "@/utils/routing_helper_functions";
import { ChevronDown } from "lucide-react";

const MobileSubroutesMenu: React.FC<{ route: Route, path: string, onClick: () => void }> = ({ route, path, onClick }) => {
    const mobileMenuBgRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const navlinkButtonRef = useRef<HTMLButtonElement>(null);

    const subRouteOnClick = () => {
        onClick();
        toggleSubrouteMenu();
    }

    const toggleSubrouteMenu = () => {
        if (mobileMenuRef.current && navlinkButtonRef.current && mobileMenuBgRef.current) {
            const container = mobileMenuRef.current;
            const btn = navlinkButtonRef.current;
            const bg = mobileMenuBgRef.current;

            const children = bg.children;

            for (const child of children) {
                child.classList.toggle('w-0');
                child.classList.toggle('w-1/3');
            }

            if (container.classList.contains("flex")) { // === mobile menu is visible
                for (const link of container.children) {
                    link.classList.toggle("scale-0");
                }

                setTimeout(() => {
                    bg.classList.toggle('z-[-1]');
                    bg.classList.toggle('z-[1]');
                    btn.classList.toggle('z-[-1]');
                    container.classList.toggle('hidden');
                    container.classList.toggle('flex');
                }, 250);
            } else {
                btn.classList.toggle('z-[-1]');
                container.classList.toggle('hidden');
                container.classList.toggle('flex');

                bg.classList.toggle('z-[-1]');
                bg.classList.toggle('z-[1]');

                setTimeout(() => {
                    for (const link of container.children) {
                        link.classList.toggle("scale-0");
                    }
                }, 100);
            }
        }
    }

    return route.children ? (
        <div className="scale-0 transition duration-300 origin-left">
            <button
                onClick={toggleSubrouteMenu}
                ref={navlinkButtonRef}
                className={classNames(
                    "relative text-black text-3xl transition duration-300 px-3 py-2",
                    window.location.href === path ? "font-bold" : "hover:text-main rounded-md"
                )}
            >
                {route.linkname?.[getLanguagePreference() as keyof typeof route.linkname]}
                <ChevronDown
                    className="w-6 ml-2 h-fit mb-0.5 group-hover:rotate-180 transition-transform"
                />
            </button>
            <div ref={mobileMenuBgRef} className="absolute top-0 left-0 flex w-full z-[-1]">
                <MobileMenuBackground />
                <MobileMenuBackground />
                <MobileMenuBackground />
            </div>
            <div ref={mobileMenuRef} className="hidden flex-col space-y-8 px-4 py-8 absolute top-0 left-0 w-full h-screen justify-center z-20">
                <div className="absolute scale-0 transition duration-300 top-28 flex justify-between items-center border-b border-main w-4/5 left-1/2 -translate-x-1/2">
                    <NavLink
                        to={getRoutePath(path, route, getLanguagePreference())}
                        className={({ isActive }) =>
                            classNames(
                                "text-black font-bold text-3xl px-3 py-2 transition duration-300 origin-left",
                                !isActive && "hover:text-main rounded-md"
                            )
                        }
                        onClick={subRouteOnClick}
                    >
                        {route.linkname?.[getLanguagePreference() as keyof typeof route.linkname]}
                    </NavLink>
                    <button className="w-fit h-6 cursor-pointer" onClick={toggleSubrouteMenu}>
                        <span className="block border-t-2 border-solid border-black w-6 mt-0.5 rotate-45"></span>
                        <span className="block border-t-2 border-solid border-black w-6 -mt-0.5 -rotate-45"></span>
                    </button>
                </div>
                {filterRoutes(route.children).map(([subpath, subroute], index) => (
                    <NavLink
                        key={`1${JSON.stringify(subroute)}-${index}`}
                        to={path + getRoutePath(subpath, subroute, getLanguagePreference())}
                        className={({ isActive }) =>
                            classNames(
                                "text-black scale-0 origin-left text-3xl px-3 py-2 transition duration-300",
                                isActive ? "font-bold" : "hover:text-main rounded-md"
                            )
                        }
                        onClick={subRouteOnClick}
                    >
                        {subroute.linkname?.[getLanguagePreference() as keyof typeof subroute.linkname]}
                    </NavLink>
                ))}
            </div>
        </div>
    ) : (
        <NavLink
            to={getRoutePath(path, route, getLanguagePreference())}
            className={({ isActive }) =>
                classNames(
                    "text-black scale-0 origin-left text-3xl px-3 py-2 transition duration-300",
                    isActive ? "font-bold" : "hover:text-main rounded-md"
                )
            }
            onClick={onClick}
        >
            {route.linkname?.[getLanguagePreference() as keyof typeof route.linkname]}
        </NavLink>
    );
}

export default MobileSubroutesMenu;