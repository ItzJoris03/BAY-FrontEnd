// import { getLinkName } from "@/utils/routing_helper_functions";
import React from "react";
// import { useLocation } from "react-router-dom";
// import Navbar from "./Navbar/Navbar";

const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // const location = useLocation();

    return (<>
        {/* {getLinkName(location.pathname) && <Navbar />} */}
        <main className="">
            {children}
        </main>
    </>)
};

const Section: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => {
    return (
        <section className={`py-24 px-6 ${className}`}>
            <div className="container mx-auto">
                {children}
            </div>
        </section>
    );
}

export default Page;

export {
    Section
};