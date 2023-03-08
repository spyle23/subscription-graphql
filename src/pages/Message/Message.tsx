import { Container, Typography } from "@mui/material";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useApplicationContext } from "../../hooks";

export const Message = (): JSX.Element => {
  const { dispatchSnack } = useApplicationContext();
  return (
    <Container>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AVz6aionkkO4pBOauKC1wVyzO9td3DCI0lW5rOLf_K0KFWiQBPJWyzYHhhN4U1hWPou3OYkPpURs7AlN",
            currency: "EUR"
        }}
      >
        <PayPalButtons
          style={{ layout: "horizontal" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "10.99",
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            if (actions.order) {
              return actions.order.capture().then((details) => {
                const name = details.payer.name?.given_name;
                dispatchSnack({
                  open: true,
                  severity: "success",
                  message: `Transaction completed by ${name}`,
                });
              });
            }
            return new Promise<void>((resolve, reject)=>{
              reject("error")
            });
          }}
        />
      </PayPalScriptProvider>
    </Container>
  );
};
