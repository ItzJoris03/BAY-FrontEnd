import React from 'react';
import logo from '@/assets/svg/logo/BotanicsYouFull-inverted.svg';
import logoIcon from '/LogoIcon-inverted.svg';

const ComingSoon: React.FC = () => {
    return (
        <div className='relative flex justify-center items-center h-screen overflow-hidden py-10'>
            <img
                src="https://images.unsplash.com/photo-1543459176-4426b37223ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Natural Products Background"
                className="absolute inset-0 object-cover w-full h-full"
            />

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                <div className='absolute flex justify-center items-center h-24 top-16 w-full group'>
                    <img
                        src={logo}
                        alt="Botanics&You logo with slogan"
                        className="absolute h-full transform duration-1000 transition-all group-hover:animate-TurnInvisible group-hover:opacity-0 group-hover:rotate-y-180"
                    />
                    <img
                        src={logoIcon}
                        alt="Botanics&You logo with slogan"
                        className="relative h-full opacity-0 duration-1000 transform rotate-y-180 group-hover:opacity-100 group-hover:rotate-y-0 transition-all"
                    />
                </div>

                <div>
                    <h1 className="text-6xl font-bold mb-8">Coming Soon</h1>
                    <p className="text-2xl mb-2 brightness-90">We're crafting something special to share our passion for natural products.</p>
                    <p className="text-xl mb-6 brightness-75">This website is currently under construction, no launch date has given yet.</p>
                </div>

                <p className="absolute bottom-16 brightness-75">Botanics & You @{new Date().getFullYear()}</p>
            </div>
        </div>
    );
};

export default ComingSoon;
