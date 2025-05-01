import React, { useState } from 'react';
import ROUTES_CONF from '@/assets/json/routes.json';
import { checkAndRedirectLanguage, getLanguagePreference, setLanguagePreference } from '@/utils/LanguageHandler';
import { ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
    isMobile?: boolean
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isMobile }) => {
    const { languages } = ROUTES_CONF.config;
    const [langOpen, setLangOpen] = useState(false);

    // Get the current language preference
    const currentLanguage = getLanguagePreference();

    // Handle language change
    const handleLanguageChange = (newLanguage: string) => {
        if (newLanguage !== currentLanguage) {
            // Update the language preference
            setLanguagePreference(newLanguage);

            // Redirect to the correct domain
            checkAndRedirectLanguage(newLanguage);
        }
    };

    return isMobile ? (
        <div className="flex gap-2 mt-2">
            {Object.entries(languages).map(([code, label]) => (
                <button
                    key={code}
                    onClick={() => handleLanguageChange(code)}
                    className={`px-2 py-1 text-sm rounded border ${currentLanguage === code
                        ? "bg-gray-200 font-semibold"
                        : "hover:bg-gray-100"
                        }`}
                >
                    {label}
                </button>
            ))}
        </div>
    ) : (
        <div className="relative">
            <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-sm border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-100 transition"
            >
                {languages[currentLanguage as keyof typeof languages]} <ChevronDown size={14} />
            </button>

            <div
                className={`${langOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                    } absolute right-0 mt-2 w-36 bg-white shadow-xl rounded-md overflow-hidden transition-all duration-200 z-50`}
            >
                {Object.entries(languages).map(([code, label]) => (
                    <button
                        key={code}
                        onClick={() => {
                            handleLanguageChange(code);
                            setLangOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${currentLanguage === code ? "font-semibold" : ""
                            }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSelector;
