"use client";
import axios from 'axios';
import { Coins } from 'lucide-react';
import { useEffect, useState } from 'react';

const DashboardHeader = () => {
    const [credit, setCredit] = useState(0);

    useEffect(() => {
        const getCredit = async () => {
            try {
                const response = await axios.get('/api/getUserCredit');
                setCredit(response.data.credit);
            } catch (e) {
                console.log(e);
            }
        };

        getCredit();
    }, []);

    return (
        <div className='md:p-7 p-3 bg-violet-500 text-white flex justify-between items-center'>
            <h2 className='font-bold text-xl md:text-3xl'>Minhas Histórias</h2>
            <div className='flex items-center gap-1 text-sm'>
                <Coins />
                <span>{credit} Credits</span>
            </div>
        </div>
    );
};

export default DashboardHeader;
