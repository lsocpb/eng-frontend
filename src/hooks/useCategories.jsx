import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

/**
 * Custom Hook for fetching categories.
 * @returns {Object} Object containing categories and loading state.
 */
export const useCategories = () => {
    const [allCategories, setAllCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const retrieveAllCategory = useCallback(async () => {
        console.log('retrieveAllCategory called');
        const cachedCategories = localStorage.getItem('allCategories');
        const cacheTimestamp = localStorage.getItem('categoriesCacheTimestamp');
        const now = new Date().getTime();

        if (cachedCategories && cacheTimestamp && now - parseInt(cacheTimestamp) < 24 * 60 * 60 * 1000) {
            console.log('Loading categories from cache');
            return JSON.parse(cachedCategories);
        }

        try {
            const response = await axios.get("http://localhost:8000/category/fetch/all");
            const categories = response.data;
            console.log('API Response:', response.data);

            localStorage.setItem('allCategories', JSON.stringify(categories));
            localStorage.setItem('categoriesCacheTimestamp', now.toString());

            return categories;
        } catch (error) {
            console.error("Error fetching categories:", error);
            return [];
        }
    }, []);

    useEffect(() => {
        console.log('useEffect in useCategories');
        const getAllCategory = async () => {
            try {
                setLoading(true);
                const categories = await retrieveAllCategory();
                console.log('Categories retrieved:', categories);
                if (Array.isArray(categories)) {
                    setAllCategories(categories);
                } else {
                    console.error("Invalid response format from API");
                    setAllCategories([]);
                }
            } catch (error) {
                console.error("Error in getAllCategory:", error);
                setAllCategories([]);
            } finally {
                setLoading(false);
            }
        };
        getAllCategory();
    }, [retrieveAllCategory]);

    return { allCategories, loading };
};

