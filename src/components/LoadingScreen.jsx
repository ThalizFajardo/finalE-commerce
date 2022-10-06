import React from 'react';
import '../styles/Loading-Screen.css'


const LoadingScreen = () => {
    return (
        <div className='overlay'>
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default LoadingScreen;