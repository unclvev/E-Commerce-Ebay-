import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import SubHeader from '../components/SubHeader';
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
