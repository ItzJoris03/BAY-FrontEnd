// A utility function to conditionally join class names
type ClassValue = string | string[] | { [key: string]: boolean } | undefined | null | false;

const classNames = (...args: ClassValue[]): string => {
    return args
        .flatMap(arg => {
            if (typeof arg === 'string') {
                return arg;
            }

            if (Array.isArray(arg)) {
                return classNames(...arg);
            }

            if (typeof arg === 'object' && arg !== null) {
                return Object.entries(arg)
                    .filter(([, condition]) => condition)
                    .map(([className]) => className);
            }

            return [];
        })
        .filter(Boolean) // Remove falsy values like undefined, null, false, etc.
        .join(' '); // Join into a single string
};

export default classNames;
