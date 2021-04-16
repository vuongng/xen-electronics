module.exports = {
  async rewrites() {
    return [
      {
        source: '/undefined/v2/invoices',
        destination: 'https://api.xendit.co/v2/invoices',
      },
    ]
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },

  publicRuntimeConfig: {
    checkout_success_redirect_url: process.env.CHECKOUT_SUCCESS_REDIRECT_URL,
    checkout_fail_redirect_url: process.env.CHECKOUT_FAIL_REDIRECT_URL,
    invoice_url: process.env.INVOICE_URL,
    xendit_secret_key: process.env.XENDIT_SECRET_KEY,
    xendit_url: process.env.XENDIT_URL
  },
};
