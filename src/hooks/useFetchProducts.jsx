import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_API_URL } from "../api/config";

/**
 * Custom React hook to fetch the latest products from the API.
 *
 * @returns {Array} An array containing two elements:
 *  - products {Array}: The list of fetched products.
 *  - loading {boolean}: Indicates whether the data is still being loaded.
 */
const useFetchProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${BASE_API_URL}/product/fetch/last`);
                setProducts(response.data.products);
            } catch (err) {
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return [products, loading];
};

export default useFetchProducts;
