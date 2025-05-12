import React from "react";
import AddMoneyGlobally from "../components/AddMoneyGlobally";
import GettingStartedSteps from "../components/GettingStartedSteps";
import EasyCurrencyExchange from "../components/EasyCurrencyExchange";

const AddMoneyPage = () => {
  return (
    <div className="add-moneyPage">
      <AddMoneyGlobally />
      <GettingStartedSteps />
      <EasyCurrencyExchange />  
    </div>
  );
};

export default AddMoneyPage;


