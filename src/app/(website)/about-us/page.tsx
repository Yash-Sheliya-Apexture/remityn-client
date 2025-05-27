import React from 'react'
import TrustedCurrencyPartner from '../components/About/TrustedCurrencyPartner'
import CurrencyExchangeServices from '../components/About/CurrencyExchangeServices'
import WhyChooseUs from '../components/About/WhyChooseUs'

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