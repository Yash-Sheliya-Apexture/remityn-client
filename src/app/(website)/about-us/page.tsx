import React from 'react'
import TrustedCurrencyPartner from '../components/About/TrustedCurrencyPartner'
import CurrencyExchangeServices from '../components/About/CurrencyExchangeServices'
import WhyChooseUs from '../components/About/WhyChooseUs'
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'About Remityn', // Becomes "About Remityn Clone | Remityn Clone"
  description: 'Learn more about Remityn, our mission, and our commitment to providing affordable and reliable money transfer services.',
  openGraph: {
    title: 'About Remityn',
    description: 'Learn more about our mission and commitment.',
  },
  // ... other specific metadata
};


const page = () => {
  return (
    <div className='AboutUs-Page'>
        <TrustedCurrencyPartner />
        <CurrencyExchangeServices />
        <WhyChooseUs />
    </div>
  )
}

export default page