import React, { ReactNode } from 'react';
import { Section } from './Components';

interface IBanner {
    imgSrc: string;
    imgAlt: string;
    children: ReactNode;
}

const Banner: React.FC<IBanner> = (props) => {
    return (
        <Section className='w-full h-screen max-h-[1080px] flex items-center'>
            <img
                src={props.imgSrc}
                alt={`Banner image of ${props.imgAlt}`}
                className="absolute inset-0 object-cover w-full h-full z-[-1] brightness-50 select-none"
            />
            {props.children}
        </Section>
    );
};

export default Banner;
