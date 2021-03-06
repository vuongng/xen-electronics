import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify"
import { IRequestParams, IQueryString, IRequestBody, IHeaders } from "./product.interface"
import { InvoiceRequestBody } from './payment.interface'
import Xendit from 'xendit-node'
import { Server, IncomingMessage, ServerResponse } from "http"
import { fastifyPostgres } from "fastify-postgres"
import { XenditOptions } from "xendit-node/src/xendit_opts"
import Invoice from 'xendit-node/src/invoice/invoice'
import * as config from './config/config.json'

const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = Fastify();

const schema = {
  querystring: {
      type: "object",
      properties: {
          brand: {
              type: "string",
          },
          category: {
              type: "string",
          },
      },
  },
  params: {
      type: "object",
      properties: {
          id: {
              type: "number",
          },
      },
  },
  headers: {
      type: "object",
      properties: {
          token: "string",
      },
  },
}

// Order schema
const orderSchema = {
  body: {
      type: "object",
      required: ["products"],
      properties: {
          products: {
              type: "string", // Serialized products
          },
          totalPrice: {
              type: "number",
          },
          deliveryAddress: {
              type: "string", // Serialized address
          },
          userId: {
              type: "number",
          },
      },
  },
}

server.register(fastifyPostgres, {
  connectionString:
    "postgres://pkaivdkebjftgl:a2e63a92dde013678669b1beaebe7944ef403b9d58d7d0c00351fd5c90654224@ec2-3-211-37-117.compute-1.amazonaws.com:5432/d1gf70s2t0rhp9",
  ssl: {
    rejectUnauthorized: false,
  },
});

// Register with prefix: /api/
server.register(
  (api, opts, done) => {
    // GET all products
    api.get("/products", async (request, reply) => {
      const client = await server.pg.connect();
      const products = await client.query("SELECT * from products");
      client.release();
      console.log('')
      return products ?? {};
    });

    // GET product by id
    api.get<{
      QueryString: IQueryString;
      Params: IRequestParams;
      Headers: IHeaders;
    }>("/products/:id", async (request, reply) => {
      const { id } = request.params;
      const client = await server.pg.connect();
      try {
        const { rows } = await client.query(
          `SELECT * FROM products WHERE id=${id}`
        );
        client.release();
        console.log(`There is 1 product matched: ${rows}`)
        return rows
      } catch (err) {
        console.log(err);
        // process.exit(1);
      }
    });

    // Save order
    api.post<{ Body: IRequestBody }>("/orders/save", async (request, reply) => {
      try {
        const { products, userId, totalPrice, deliveryAddress } = request.body
        return server.pg.transact(async (client) => {
          return await client.query(
            `INSERT INTO orders(products, totalPrice, deliveryAddress, userId)
              VALUES(${products}, ${totalPrice}, ${deliveryAddress}, ${userId})`
          )
        })
      } catch (err) {
        console.log(err)
      }
    });

    const xenditOptions: XenditOptions = {
      secretKey: config.xendit_secret_key,
      xenditURL: config.xendit_url
    }

    // Initiate Xendit Client
    const i = new Invoice(xenditOptions)

    // Checkout with Xendit API
    api.post<{ Body: string }>('/checkout', async (request, reply) => {
      const { externalID, payerEmail, description, amount, successRedirectURL, failureRedirectURL } = JSON.parse(request.body)
      // Return redirect url to Xendit invoice page
        // Then go back to success / fail / homepage after payment completed
        return await i.createInvoice({
          externalID: externalID,
          payerEmail: payerEmail,
          description: description,
          amount: amount,
          successRedirectURL: successRedirectURL,
          failureRedirectURL: failureRedirectURL,
          shouldSendEmail: true
        })
        .then((response) => {
          console.log('Invoice created!', response)
          return response
        })
        .catch((error) => {
          console.log(error)
        })
    })

    done()
  },
  {
    prefix: "/api",
  }
);

// Seed data
//
//
server.post("/create-products-table", async () => {
  // serial: auto increase number
  const createProductsTableQuery = `
          CREATE TABLE products (
              id serial PRIMARY KEY,
              name varchar(255) NOT NULL,
              description text,
              price real NOT NULL,
              category varchar(255),
              brand varchar(255),
              imageUrl text,
              created_at timestamp default NULL
          );
      `;
  return server.pg.transact(async (client) => {
    try {
      const result = await client.query(createProductsTableQuery);
      console.log("Products table was created successfully");
      return result;
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  });
});

server.post("/create-orders-table", async () => {
  const createOrdersTableQuery = `
          CREATE TABLE orders (
              id serial PRIMARY KEY,
              products text NOT NULL,
              totalPrice real NOT NULL,
              deliveryAddress text default NULL,
              userEmail varchar(255),
              CONSTRAINT fk_user
                  FOREIGN KEY(userEmail)
                      REFERENCES users(email)
          );
      `;
  return server.pg.transact(async (client) => {
    try {
      const result = await client.query(createOrdersTableQuery);
      console.log("Orders table was created successfully");
      return result;
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  });
});

server.post("/create-user-table", async () => {
  const createUsersTableQuery = `
      CREATE TABLE users (
        id serial,
        email varchar(255) PRIMARY KEY,
        password varchar(255) NOT NULL,
        address text default NULL
      );
    `;
  return server.pg.transact(async (client) => {
    try {
      const result = await client.query(createUsersTableQuery);
      console.log("Users table was created successfully");
      return result;
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  });
});

// Seed data
server.post("/init-data", (request, reply) => {
  const batchProductQuery = `
          INSERT INTO products (name, description, price, category, brand, imageUrl)
          VALUES ('Iphone X space gray', 'new smartphone from Apple', 2000.00, 'smartphones', 'Apple', 'https://unsplash.com/photos/xdLXPic3Wfk'),
                 ('Sony WH-MX4', 'best noise cancelling headphone', 800.50, 'headsets', 'Sony', 'https://unsplash.com/photos/mpnA-Cgrzv8'),
                 ('Dell XPS 13', 'future of laptop with core i7 and 16gb RAM included 4k screen', 2500.00, 'laptops', 'Dell', 'https://unsplash.com/photos/8pb7Hq539Zw'),
                 ('Fujifilm x100v', 'latest street photography camera from Fujifilm', 4000.50, 'cameras', 'Fujifilm', 'https://unsplash.com/photos/-E7CLBZf7x8')
      `;

  try {
    return server.pg.transact(async (client) => {
      return await client.query(batchProductQuery);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
});

export default server
