// src/utils/Fetcher.ts

import axios, { AxiosRequestConfig } from 'axios';
import cache from './Cache';

class Fetcher {
    private baseURL: string = 'http://localhost:5000';
    private pendingRequests: Map<string, Promise<unknown>> = new Map();

    // Generic request function
    private async request<T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        const url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`;
        const requestKey = this.generateRequestKey(method, endpoint, config);

        // Check if the request is already in progress
        if (this.pendingRequests.has(requestKey)) {
            console.log(`Duplicate request for ${requestKey}. Ignoring this request.`);
            return this.pendingRequests.get(requestKey) as Promise<T>;
        }

        // Attempt to get cached data first for GET requests
        if (method === 'GET') {
            const cachedData = cache.get<T>(requestKey);
            if (cachedData) {
                console.log(`Returning cached data for ${requestKey}`);
                return Promise.resolve(cachedData);
            }
        }

        // Perform the request
        const requestPromise = axios.request<T>({
            method,
            url,
            ...config,
        })
        .then(response => {
            if (method === 'GET') {
                // Cache the data for GET requests
                cache.set(requestKey, response.data);
            }
            return response.data;
        })
        .catch(error => {
            console.error(`Error fetching data from ${url}:`, error);
            throw error;
        })
        .finally(() => {
            // Remove the request from pendingRequests once completed
            this.pendingRequests.delete(requestKey);
        });

        this.pendingRequests.set(requestKey, requestPromise);
        return requestPromise;
    }

    // Generate a unique request key
    private generateRequestKey(method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint: string, config?: AxiosRequestConfig): string {
        const configKey = config?.data ? JSON.stringify(config.data) : '';
        return `${method}:${endpoint}:${configKey}`;
    }

    // Public methods for each HTTP method
    public get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('GET', endpoint, config);
    }

    public post<T>(endpoint: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('POST', endpoint, { ...config, data });
    }

    public put<T>(endpoint: string, data: unknown, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('PUT', endpoint, { ...config, data });
    }

    public delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
        return this.request<T>('DELETE', endpoint, config);
    }
}

const fetcher = new Fetcher();

export default fetcher;
