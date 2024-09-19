import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "./hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  function handleCloseCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handlefinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const custormerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: custormerData,
        },
      })
    );
  }
  let actions = (
    <>
      <Button textOnly type="button" onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handlefinish}
      >
        <h2>Success!</h2>
        <p>
          Your oder was submitted successfully. You will receive an email with
          your order details.
        </p>
        <p className="modal-action">
          <Button onClick={handlefinish}> Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form action="" onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" />
        <Input label="Email Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title={"Failed to submit order"} message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}

export default Checkout;
