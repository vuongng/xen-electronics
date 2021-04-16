import Invoice from "xendit-node/src/invoice/invoice"

export async function checkoutWithXendit(credentials, payload) {
  const xenditClient = new Invoice(credentials)

  return await xenditClient
    .createInvoice(payload)
    .then((response) => {
      console.log(response)
      return response.invoice_url
    })
    .catch((error) => console.log(error))
}
