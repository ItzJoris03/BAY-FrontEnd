import { Language } from "@/types/routes";
import { ROUTES_CONF } from "./DefaultFiles";
import { getRoutePath } from "./routing_helper_functions";

const LANGUAGE_STORAGE_KEY = 'user_language';

// Save the preferred language to local storage
export const setLanguagePreference = (language: string) => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

// Retrieve or set the preferred language based on the current domain
export const getLanguagePreference = (): string => {
    // Attempt to retrieve the language from localStorage
    let language = localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (!language) {
        // If no preference is found, infer the language from the domain extension
        const { extensions } = ROUTES_CONF.config;
        const currentDomainParts = window.location.hostname.split('.');
        const currentExtension = currentDomainParts[currentDomainParts.length - 1];

        // Check if the current extension is in the registered extensions list
        language = extensions.registered.includes(currentExtension) ? currentExtension : extensions.default as string;

        // Save the inferred language to localStorage
        setLanguagePreference(language);
    }

    return language;
};

// Get the domain for the specified language
const getDomainForLanguage = (language: string): string | null => {
    const { domainname, extensions } = ROUTES_CONF.config;
    const { registered, default: defaultExtension } = extensions;

    // Use the language extension if available; otherwise, fall back to default
    const languageExtension = registered.includes(language) ? language : defaultExtension;

    // Construct the domain for the preferred language
    return `${domainname}.${languageExtension}`;
};

// Check the current domain and redirect based on the saved language preference
export const checkAndRedirectLanguage = (lang?: Language) => {
    const preferredLanguage = lang || getLanguagePreference();

    const currentDomain = window.location.hostname;
    const isDev = process.env.NODE_ENV === 'development' || currentDomain.includes('jorishummel');

    // If we can't find a valid route, fallback to pathname
    const currentPath = decodeURIComponent(window.location.pathname);
    const newPath = getRoutePath(currentPath, preferredLanguage);

    if (isDev) {
        // In development, just log instead of redirecting
        // console.log("[DEV] Redirect path would be:", newPath);
        window.location.href = newPath;
        return;
    }

    const expectedDomain = getDomainForLanguage(preferredLanguage);

    // Only redirect if the domain needs to change
    if (expectedDomain && currentDomain !== expectedDomain) {
        const newRoute = window.location.protocol + '//' + expectedDomain + newPath;
        window.location.href = newRoute;
        return;
    }

    // If domain is already correct, just update path
    window.location.href = newPath;
};