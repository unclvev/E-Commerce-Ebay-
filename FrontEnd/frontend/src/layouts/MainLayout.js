import React from 'react';
import Header from '../layouts/Includes/Header';
import Footer from '../layouts/Includes/Footer';
import SearchBar from '../layouts/Includes/SearchBar';
import SubHeader from '../layouts/Includes/SubHeader';
function MainLayout({ children }) {
    return (
        <div id='Mainlayout' className='min-w-[1050px] max-w-[1300px] mx-auto'>
            <div>
            <Header />
            <SearchBar />
            <SubHeader />
            </div>
            {/* <main>{children}</main> */}
            <Footer />
        </div>
    );
}

export default MainLayout;
