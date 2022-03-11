import React from 'react';
import Header from '../components/Header';
import WalletCard from '../components/WalletCard';

export default function About() {
    return(
        <div>
            <div><Header/></div>
            <h1>About</h1>
            <WalletCard />            
        </div>
    )
}