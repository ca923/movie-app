import { useNavigate, useLocation } from 'react-router'
import { useEffect, useState } from 'react';
// CSS
import './BookingSuccess.css'

export default function BookingSuccess() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, []) 

    if (isLoading) {
        return <p className='loading'>載入中...</p>
    }

    else return (
        <div className='success'>
            <h2>訂票成功！</h2>
            <button onClick={() => navigate('/')}>回首頁</button>
        </div>
    )
}