import { useContext } from "react"
import { CartContext } from "../../contexts/CartContext"
import { checkoutWithXendit } from "../api/checkoutService"

const Checkout = () => {
  const { cart } = useContext(CartContext)

  const totalPrice = cart.reduce((totalPrice, currentProduct) => {
    return (totalPrice +=
      parseFloat(currentProduct.price) * parseInt(currentProduct.quantity));
  }, 0)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const successUri = `${process.env.NEXT_PUBLIC_CHECKOUT_SUCCESS_REDIRECT_URL}`
    const failureUri = `${process.env.NEXT_PUBLIC_CHECKOUT_FAIL_REDIRECT_URL}`
    const invoiceUrl = `${process.env.NEXT_PUBLIC_INVOICE_URL}`
    const externalID = Date.now().toString()
    const credentials = {
      secretKey: `${process.env.NEXT_PUBLIC_XENDIT_SECRET_KEY}`,
    }

    const payload = {
      externalID: externalID,
      payerEmail: event.target.email.value,
      amount: totalPrice,
      description: "Checkout with XenInvoice",
      successRedirectURL: successUri,
      failureRedirectURL: failureUri,
      shouldSendEmail: true
    }

    await checkoutWithXendit(credentials, payload).then((response) => {
      window.location = response
    })
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <span className="mb-4 text-gray-700 text-sm font-bold">{`You are going to pay ${totalPrice} RM with Xendit Payment Gateway`}</span>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Delivery adddress
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          placeholder="Address"
        />
      </div>
      <div className="mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Checkout with Xendit
        </button>
      </div>
    </form>
  );
};

export default Checkout
