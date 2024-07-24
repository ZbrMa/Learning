import { useState, useEffect, useRef } from 'react';
import qs from 'qs';
import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const useApiGet = <T,>(apiPoint: string, getParams: any = {}) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const getParamsRef = useRef(getParams);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.get(apiPoint, {
                params: getParamsRef.current,
                paramsSerializer: (params) => {
                    return qs.stringify(params, { arrayFormat: 'repeat' });
                },
            });
            setData(response.data as T);
            setError(false);
        } catch (err) {
            setError(true);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error };
};

export const useApiGetNoParams = <T,>(apiPoint:string) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await api.get(apiPoint);
            setData(response.data as T);
            setError(false);
        } catch (err) {
            setError(true);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, loading, error };
};