import { IRequestParams, IQueryString, IRequestBody } from "./product.interface"
import { ICredentials, IHeaders } from "./auth.interface"
import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify"
import { fastifyPostgres } from "fastify-postgres"
import { Server, IncomingMessage, ServerResponse } from "http"

const server: FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = Fastify()

// Define schema for product ID in request param
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
})

// Register with prefix: /api/
server.register(
  (api, opts, done) => {
    // GET all products
    api.get("/products", async (request, reply) => {
      const client = await server.pg.connect();
      const products = await client.query("SELECT * from products");
      client.release();
      return products ?? {};
    });

    // GET product by id
    api.get<{
      QueryString: IQueryString;
      Params: IRequestParams;
      Headers: IHeaders;
    }>("/products/:id", async (request, reply) => {
      const { id } = request.params;
      console.log(id);
      const client = await server.pg.connect();
      try {
        const { rows } = await client.query(
          `SELECT * FROM products WHERE id=${id}`
        );
        client.release();
        return rows;
      } catch (err) {
        server.log.error(err);
        process.exit(1);
      }
    });

    // Save order
    api.post<{Body: IRequestBody}>("/orders/save", async (request, reply) => {
      try {
        const { products, userId, totalPrice, deliveryAddress } = request.body;
        return server.pg.transact(async (client) => {
          return await client.query(
            `INSERT INTO orders(products, totalPrice, deliveryAddress, userId)
                  VALUES(${products}, ${totalPrice}, ${deliveryAddress}, ${userId})`
          );
        });
      } catch (err) {
        server.log.error(err);
        process.exit(1);
      }
    });

    done();
  },
  {
    prefix: "/api",
  }
);

// Create products table (async)
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
            deliveryAddress text NOT NULL,
            CONSTRAINT fk_user
                FOREIGN KEY(userId)
                    REFERENCES users(id)
        );
    `;
  return server.pg.transact(async (client) => {
    try {
      const result = await client.query(createOrdersTableQuery);
      console.log("Orders table was created successfully");
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

// Start server
const start = async () => {
  try {
    await server.listen(3000);
    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(`Server is listening on port: ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
