/* ====================================

Default interface for json files

==================================== */

import { Language } from "./routes";

export interface IJsonConfig {
    _COMMENT?: string;
    config?: {
        lang?: Lang;
        default_language?: Language;
        language_files: {
            [Language in Lang]?: string;
        };
    };
}

export type Img = {
    filename: string;
    alt: string;
}

export interface IContactForm {
    [id: string]: {
        required: boolean,
        type: React.HTMLInputTypeAttribute | "textarea",
        autocomplete?: React.HTMLInputAutoCompleteAttribute,
    }
}

/* ====================================

Range type for easier number range generation

==================================== */

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc['length']]>

type Range<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

/* ====================================

Types and interfaces for [default|lang].content.json,
    [terms|privacy].json

==================================== */

export interface IContent {
    title?: string;
    img?: Img;
    button?: {
        name: string;
        to: string;
    };
    content?: Array<string | IContent> | string;
}

export interface IContentConfig extends IJsonConfig {
    data: {
        [component: string]: IContent;
    };
    default: {
        [item: string]: string;
    };
    forms: {
        [id: string]: string;
    }
}