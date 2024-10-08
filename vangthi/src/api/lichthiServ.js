import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import axios from 'axios';

export const useFetchAllLichThi = () => {
    const [lichThiData, setLichThiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchAllLichThi = async () => {
            try {
                // Fetch tất cả dữ liệu lich thi từ API
                const response = await axios.get(`http://localhost:8345/api/lichthi/getAllLichThi`);
                    setLichThiData(response.data.elements);
                    setLoading(false);

                if (response.status === 200) {
                    setLichThiData(response.data.elements || []);
                } else {
                    setError('Failed to fetch lich thi data');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllLichThi();
    }, []);

    return {lichThiData, loading, error};
};
export const useFetchAllLichThiById = (userId) => {
    const [lichThiData, setLichThiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchLichThiById = async () => {
            try {
                // Fetch tất cả dữ liệu lich thi từ API
                const response = await axios.get(`http://localhost:8345/api/lichthi/getLichThiByUserId/${userId}`);
                    setLichThiData(response.data.elements);
                    setLoading(false);

                if (response.status === 200) {
                    setLichThiData(response.data.elements || []);
                } else {
                    setError('Failed to fetch lich thi data');
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        if (userId) {
            fetchLichThiById(userId);
        } else {
            setLoading(false);
            setError('User ID is required');
        }

    }, [userId]);

    return {lichThiData, loading, error};
};