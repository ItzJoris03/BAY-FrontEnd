import { useState } from "react";

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
    fallbackSrc?: string;
}

const Image: React.FC<ImageProps> = ({
    src,
    alt,
    className = "",
    fallbackSrc = "/noimagefound.jpg",
}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isError, setIsError] = useState(false);

    return (
        <div
            className={`relative overflow-hidden ${className}`}
        >
            {/* Placeholder (blur effect) */}
            {!isLoaded && !isError && (
                <div className="absolute inset-0 bg-gray-300 animate-pulse"></div>
            )}

            {/* Main Image */}
            <img
                src={isError || src === '' ? fallbackSrc : src}
                alt={alt}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                onError={() => setIsError(true)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            />
        </div>
    );
};

export default Image;
