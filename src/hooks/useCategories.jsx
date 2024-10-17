import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {BASE_API_URL} from "../api/config";

/**
 * Custom hook to fetch categories from the server.
 * It retrieves categories from local storage if they are cached and valid,
 * otherwise, it fetches from the API.
 *
 * @returns {Array} An array where the first element is the list of categories
 *                  and the second element is a boolean indicating the loading state.
 */
const useCategories = () => {
    const [allCategories, setAllCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    /**
     * Retrieves all categories from local storage or fetches them from the API if not available or expired.
     *
     * @async
     * @function
     * @returns {Promise<Array>} A promise that resolves to an array of categories.
     */
    const retrieveAllCategory = useCallback(async () => {
        const cachedCategories = localStorage.getItem('allCategories');
        const cacheTimestamp = localStorage.getItem('categoriesCacheTimestamp');
        const now = new Date().getTime();

        if (cachedCategories && cacheTimestamp && now - parseInt(cacheTimestamp) < 24 * 60 * 60 * 1000) {
            return JSON.parse(cachedCategories);
        }
        try {
            const response = await axios.get(`${BASE_API_URL}/category/all`);
            const categories = response.data;

            localStorage.setItem('allCategories', JSON.stringify(categories));
            localStorage.setItem('categoriesCacheTimestamp', now.toString());

            return categories;
        } catch (error) {
            console.error("Error fetching categories:", error);
            return [];
        }
    }, []);

    useEffect(() => {
        /**
         * Fetches all categories and updates the state.
         *
         * @async
         * @function
         */
        const getAllCategory = async () => {
            try {
                setLoading(true);
                const categories = await retrieveAllCategory();
                setAllCategories(Array.isArray(categories) ? categories : categories?.categories || []);
            } catch (error) {
                console.error("Error in getAllCategory:", error);
            } finally {
                setLoading(false);
            }
        };
        getAllCategory();
    }, [retrieveAllCategory]);

    return [allCategories, loading];
};

export default useCategories;
