import { PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { BookCourtAPI } from "../../../../../services/users/BookingPickleBall/BookingPickleBall";
import { showSuccess} from "../../../../../components/UserComponent/CommonComponent/Message/Message"

const PaymentPage = ({accessToken, dataCourt, namee, phonee, totalPrice}) => {
  const navigate = useNavigate();

  const handleApprove = async (data, actions) => {
    const details = await actions.order.capture()
    if(details.status === "COMPLETED")
      {
        const response = await BookCourtAPI(dataCourt, namee, phonee)
        navigate("/receipt")
      }

  }
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
        onApprove={handleApprove}
        onError={(err) => {
          console.error("Lỗi thanh toán", err);
        }}
      />
    </div>
  );
};

export default PaymentPage;