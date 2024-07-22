import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        if (!token) {
            console.log(token)

            navigate('/login');
        } else {
            console.log(token)

            setIsAuthenticated(true);
        }
    }, [navigate]);

    return isAuthenticated;
}

export default useAuth;
