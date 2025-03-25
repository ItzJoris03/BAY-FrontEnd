import { ROUTES_CONF } from "@/utils/DefaultFiles";

export type Language = keyof typeof ROUTES_CONF.config.default_language;
export type Extension = keyof typeof ROUTES_CONF.config.extensions.registered;

export interface LinkNames {
    [key in Language]: string;
}

export interface Route {
    filename: string;
    linkname?: LinkNames;
    config?: {
        usePathAsRoute?: boolean;
        disableMultiLanguageSupport?: boolean;
        hideNavbar?: boolean;
        hiddenFromMenu?: boolean;
    };
    attr?: Record<string, string>;
    children?: Record<string, Route>;
}

export interface RoutesConfig {
    _COMMENT?: string;
    _BASE_FOLDER?: string;
    config: {
        default_language: Language;
        language_files: Record<Language, string>;
        domainname: string;
        extensions: {
            default: Extension;
            registered: Extension[];
        }
    };
    routes: Record<string, Route>;
}