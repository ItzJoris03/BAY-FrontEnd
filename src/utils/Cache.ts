interface CacheItem<T> {
    data: T;
    timestamp: number;
}

class Cache {
    private cache: Map<string, CacheItem<unknown>> = new Map();
    private cacheDuration: number; // Duration in milliseconds

    constructor(cacheDuration: number = 5 * 60 * 1000) { // Default is 5 minutes
        this.cacheDuration = cacheDuration;
    }

    // Store data in the cache
    public set<T>(key: string, data: T): void {
        const cacheItem: CacheItem<T> = {
            data,
            timestamp: Date.now(),
        };
        this.cache.set(key, cacheItem);
    }

    // Retrieve data from the cache
    public get<T>(key: string): T | null {
        const cacheItem = this.cache.get(key);
        if (!cacheItem) {
            return null; // No cache entry found
        }

        // Check if the cached data is still valid
        if (Date.now() - cacheItem.timestamp < this.cacheDuration) {
            return cacheItem.data as T; // Return cached data
        } else {
            this.cache.delete(key); // Remove expired entry
            return null; // Cached data is expired
        }
    }

    // Clear the entire cache
    public clear(): void {
        this.cache.clear();
    }
}

const cache = new Cache();

export default cache;
