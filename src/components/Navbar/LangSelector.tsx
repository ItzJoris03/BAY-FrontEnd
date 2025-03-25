import React from 'react';
import ROUTES_CONF from '@/assets/json/routes.json';
import { checkAndRedirectLanguage, getLanguagePreference, setLanguagePreference } from '@/utils/LanguageHandler';

interface LanguageSelectorProps {
    availableLanguages?: string[]; // Optional: Override the available languages
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ availableLanguages }) => {
    const { extensions } = ROUTES_CONF.config;

    // Use registered languages from the configuration or the override prop
    const languages = availableLanguages || extensions.registered;

    // Get the current language preference
    const currentLanguage = getLanguagePreference();

    // Handle language change
    const handleLanguageChange = (newLanguage: string) => {
        if (newLanguage !== currentLanguage) {
            // Update the language preference
            setLanguagePreference(newLanguage);

            // Redirect to the correct domain
            checkAndRedirectLanguage(currentLanguage, newLanguage);
        }
    };

    return (
        <div>
            <label htmlFor="language-select" className="sr-only">Select Language: </label>
            <select
                id="language-select"
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="px-3 py-2 rounded-md text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
            >
                {languages.map((lang) => (
                    <option key={lang} value={lang} className='cursor-pointer'>
                        {lang !== 'com' ? lang.toUpperCase() : 'EN'}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
