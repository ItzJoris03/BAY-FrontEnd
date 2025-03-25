export interface IText {
    content?: string;
    className?: string;
}

export interface IHeading extends IText {
    lvl?: 1 | 2 | 3 | 4 | 5 | 6;
}