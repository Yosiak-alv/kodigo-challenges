import { useEffect, useState } from "react";
import { ProductService } from "./productService.js";

export const findAllProducts = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const products = await ProductService.list();
                setData(products);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setError(error);
            } finally {
             setLoading(false);
            }
        };
    
        fetchProducts();
    }, []);
  
    return { loading, data, error };
}

export const findById = (id) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const product = await ProductService.get(id);
                setData(product);
            } catch (error) {
                console.error("Failed to fetch product:", error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchProduct();
    }, [id]);
  
    return { loading, data, error };
}

export const save = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const saveProduct = async (product) => {
        try {
            setLoading(true);
            await ProductService.create(product);
            setData({message: "Product created successfully"});
        } catch (error) {
            console.error("Failed to save product:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };
  
    return { saveProduct, loading, data, error };
}

export const update = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const updateProduct = async (id, product) => {
        try {
            setLoading(true);
            await ProductService.update(id, product);
            setData({message: "Product updated successfully"});
        } catch (error) {
            console.error("Failed to update product:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };
  
    return { updateProduct, loading, data, error };
}

export const destroy = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const deleteProduct = async (id) => {
        try {
            setLoading(true);
            await ProductService.delete(id);
        } catch (error) {
            console.error("Failed to delete product:", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };
  
    return { loading, deleteProduct, error };
}