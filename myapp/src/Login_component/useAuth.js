import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        if (!token || token !== token) {            
            navigate('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);

    return isAuthenticated;
}

export default useAuth;
