import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const PaymentPage = ({namee, phonee, totalPrice}) => {
  const navigate = useNavigate();
  return (
    <div>
      <h2>Thanh toán bằng PayPal</h2>
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: totalPrice.toString()  
              },
              description: `Thanh toán cho ${namee} - ${phonee}`,
            }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            // alert(`Giao dịch thành công bởi ${details.payer.name.given_name}`);
            console.log(details);
            if(details.status === "COMPLETED")
              {
                navigate("/receipt")
                
              }
          });
        }}
        onError={(err) => {
          console.error("Lỗi thanh toán", err);
        }}
      />
    </div>
  );
};

export default PaymentPage;