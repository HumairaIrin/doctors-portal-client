import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full p-3" style={{ backgroundColor: 'black' }} role="status">
                <span className='p-2 bg-white rounded-full font-bold' ></span>
            </div>
        </div>
    );
};

export default Loading;