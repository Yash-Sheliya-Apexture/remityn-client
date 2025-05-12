import React from 'react'
import TrustedCurrencyPartner from '../components/TrustedCurrencyPartner'
import CurrencyExchangeServices from '../components/CurrencyExchangeServices'
import WhyChooseUs from '../components/WhyChooseUs'

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