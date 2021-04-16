interface InvoiceRequestBody {
    externalID: string
    payerEmail: string
    description: string
    amount: number
    successRedirectURL?: string
    shouldSendEmail?: boolean
    callbackVirtualAccountID?: string
    invoiceDuration?: number;
    failureRedirectURL?: string
    paymentMethods?: string[]
    currency?: string
    midLabel?: string
    forUserID?: string
}

export { InvoiceRequestBody }
