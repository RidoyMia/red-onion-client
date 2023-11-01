import Header from '@/components/shared/Header/Header';
import React from 'react';

const layout = ({children}) => {
    return (
        <div>
            <Header></Header>
            {children}
        </div>
    );
};

export default layout;