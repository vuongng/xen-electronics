This is a [Xendit Electronics](https://xen-electronic.herokuapp.com/) project which uses NodeJS / Fastify for API and NextJS for web application

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

To build for production

```bash
npm run build
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

[API playground](http://localhost:3000/) can be accessed on [http://localhost:3000/](http://localhost:3000/). For example.

- [Get product API](http://localhost:3000/api/products)
- [Get single product](http://localhost:3000/api/products/:productId)

## Technologies

### Backend / API

1. NodeJS + Fastify [Fastify](https://www.fastify.io/docs/latest/)
2. Typescript [Typescript Getting Started](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
3. FastifyPostgres [fastify-postgres](https://github.com/fastify/fastify-postgres) to query and update Postgres database created from Heroku
4. Tap [Node Tap](https://node-tap.org/) and Jest [Jest](https://jestjs.io/) for testing

So *Why Fastify*?
Fastify is a modern Nodejs framework which helps us to create APIs in very handy ways:

- Supports Typescript with strong-type.
- Easily maintain version of APIs.
- Support authentication with simple configuration.
- Follow with some helper libraries: Fastify Postgres and Fastify Swagger (to export swagger format for API).

### Frontend / Web

1. NextJs [Nextjs](https://nextjs.org/docs/getting-started) - a React Framework to build web application which provides simple way to make pages, redirect and well-structured codebase.
2. ReactContext - it is a built-in state management from ReactJS - Example: manage cart and user login.
3. Jest.io for testing.
4. Tailwind CSS for UI / Layout [Tailwind](https://tailwindcss.com/docs/guides/nextjs) is one of most popular CSS framework which provide flexible way to build responsive, beautiful layouts with
SVG icons supported and Webpack.


## Deploy on Heroku

To deploy on Heroku, please register Heroku account (with Github) and follow the guidelines here:
[Heroku Deployment](https://devcenter.heroku.com/categories/nodejs-support)


## Learn More / About

Feel free to contact me through Social media if you have any concern:

- WhatsApp: (+60) 01123-385-026
- Facebook: https://facebook.com/vuong.deking
- Instagram: https://instagram.com/fatboyntv
