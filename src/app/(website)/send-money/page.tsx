import React from "react";
import CrossBorderMoneyTransfer from "../components/CrossBorderMoneyTransfer";
import FreedomToReceive from "../components/FreedomToReceive";
import ComfortSendMoney from "../components/ComfortSendMoney";
import GetStartedSection from "../components/GetStartedSection";

const SendMoneyPage = () => {
  return (
    <div className="Send-MoneyPages">
      <CrossBorderMoneyTransfer />
      <FreedomToReceive />
      <ComfortSendMoney />
      <GetStartedSection />
    </div>
  );
};

export default SendMoneyPage;
