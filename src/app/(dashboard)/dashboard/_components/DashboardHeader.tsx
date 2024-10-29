import { Coins } from 'lucide-react';

const DashboardHeader = () => {
    return (
        <div className='p-7 bg-violet-500 text-white flex justify-between items-center '>
            <h2 className='font-bold text-3xl'>Minhas Histórias</h2>
            <div className='flex items-center gap-1 text-xl'>
                <Coins />
                <span>3 Creditis</span>
            </div>
        </div>
    )
}

export default DashboardHeader;