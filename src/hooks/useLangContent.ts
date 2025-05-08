// src/hooks/useLangContent.ts
import fetcher from "@/utils/Fetch";
import { useEffect, useState } from "react";
import DEFAULT_DATA from '@/assets/json/default.content.json';

export type LangCode = "com" | "nl" | "se";

interface LangContentResponse {
    config?: {
        lang: string;
    };
    data: Record<string, unknown>;
}

interface UseLangContentResult {
    data?: typeof DEFAULT_DATA.data;
}

const getHtmlLangCode = (lang: LangCode): string => {
    switch (lang) {
        case "nl":
            return "nl";
        case "se":
            return "sv";
        case "com":
        default:
            return "en";
    }
};

const useLangContent = (
    lang: LangCode,
    components: string[]
): UseLangContentResult => {
    const [data, setData] = useState<typeof DEFAULT_DATA.data>();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryParams = new URLSearchParams({
                    lang,
                    components: components.join(","),
                });

                const response = await fetcher.get<LangContentResponse>(
                    `/content?${queryParams.toString()}`
                );

                const mergeData = {
                    ...DEFAULT_DATA.data,
                    ...response.data
                }

                setData(mergeData);
                document.documentElement.lang = lang === "com" ? "en" : getHtmlLangCode(lang);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setData(DEFAULT_DATA.data);
                document.documentElement.lang = "en";
            }
        };

        if (!data) fetchData();
    }, [lang, components, data]);

    return { data };
};

export default useLangContent;
