"use client";
import axios from 'axios';
import { Coins } from 'lucide-react';
import { useEffect, useState } from 'react';

const DashboardHeader = () => {
    const [credit, setCredit] = useState(0);

    useEffect(() => {
        const getCredit = async () => {
            try {
                const response = await axios.get('/api/update-credits');
                setCredit(response.data.credits);
            } catch (e) {
                console.log(e);
            }
        };

        getCredit();
    }, []);

    return (
        <div className='p-7 bg-violet-500 text-white flex justify-between items-center'>
            <h2 className='font-bold text-3xl'>Minhas Histórias</h2>
            <div className='flex items-center gap-1 text-xl'>
                <Coins />
                <span>{credit} Credits</span>
            </div>
        </div>
    );
};

export default DashboardHeader;
