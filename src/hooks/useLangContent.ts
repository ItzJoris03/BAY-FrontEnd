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
    data: typeof DEFAULT_DATA.data;
}

const useLangContent = (
    lang: LangCode,
    components: string[]
): UseLangContentResult => {
    const [data, setData] = useState<typeof DEFAULT_DATA.data>(DEFAULT_DATA.data);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const queryParams = new URLSearchParams({
                    lang,
                    components: components.join(","),
                });

                const response = await fetcher.get<LangContentResponse>(
                    `/api/content?${queryParams.toString()}`
                );

                setData(response.data as typeof DEFAULT_DATA.data);
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (err) {
                setData(DEFAULT_DATA.data);
            }
        };

        fetchData();
    }, [lang, components]);

    return { data };
};

export default useLangContent;
