"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_1 = __importDefault(require("fastify"));
var fastify_postgres_1 = require("fastify-postgres");
var server = fastify_1.default();
// Define schema for product ID in request param
var schema = {
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
};
// Order schema
var orderSchema = {
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
};
server.register(fastify_postgres_1.fastifyPostgres, {
    connectionString: "postgres://pkaivdkebjftgl:a2e63a92dde013678669b1beaebe7944ef403b9d58d7d0c00351fd5c90654224@ec2-3-211-37-117.compute-1.amazonaws.com:5432/d1gf70s2t0rhp9",
    ssl: {
        rejectUnauthorized: false,
    },
});
server.register(function (api, opts, done) {
    // GET all products
    api.get("/products", function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
        var client, products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, server.pg.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("SELECT * from products")];
                case 2:
                    products = _a.sent();
                    client.release();
                    return [2 /*return*/, products !== null && products !== void 0 ? products : {}];
            }
        });
    }); });
    // GET product by id
    api.get("/products/:id", function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
        var id, client, rows, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = request.params.id;
                    console.log(id);
                    return [4 /*yield*/, server.pg.connect()];
                case 1:
                    client = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, client.query("SELECT * FROM products WHERE id=" + id)];
                case 3:
                    rows = (_a.sent()).rows;
                    client.release();
                    return [2 /*return*/, rows];
                case 4:
                    err_1 = _a.sent();
                    server.log.error(err_1);
                    process.exit(1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); });
    // Save order
    api.post("/orders/save", function (request, reply) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, products_1, userId_1, totalPrice_1, deliveryAddress_1;
        return __generator(this, function (_b) {
            try {
                _a = request.body, products_1 = _a.products, userId_1 = _a.userId, totalPrice_1 = _a.totalPrice, deliveryAddress_1 = _a.deliveryAddress;
                return [2 /*return*/, server.pg.transact(function (client) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, client.query("INSERT INTO orders(products, totalPrice, deliveryAddress, userId)\n                  VALUES(" + products_1 + ", " + totalPrice_1 + ", " + deliveryAddress_1 + ", " + userId_1 + ")")];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); })];
            }
            catch (err) {
                server.log.error(err);
                process.exit(1);
            }
            return [2 /*return*/];
        });
    }); });
    done();
}, {
    prefix: "/api",
});
// Create products table (async)
server.post("/create-products-table", function () { return __awaiter(void 0, void 0, void 0, function () {
    var createProductsTableQuery;
    return __generator(this, function (_a) {
        createProductsTableQuery = "\n        CREATE TABLE products (\n            id serial PRIMARY KEY,\n            name varchar(255) NOT NULL,\n            description text,\n            price real NOT NULL,\n            category varchar(255),\n            brand varchar(255),\n            imageUrl text,\n            created_at timestamp default NULL\n        );\n    ";
        return [2 /*return*/, server.pg.transact(function (client) { return __awaiter(void 0, void 0, void 0, function () {
                var result, err_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, client.query(createProductsTableQuery)];
                        case 1:
                            result = _a.sent();
                            console.log("Products table was created successfully");
                            return [2 /*return*/, result];
                        case 2:
                            err_2 = _a.sent();
                            server.log.error(err_2);
                            process.exit(1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })];
    });
}); });
server.post("/create-orders-table", function () { return __awaiter(void 0, void 0, void 0, function () {
    var createOrdersTableQuery;
    return __generator(this, function (_a) {
        createOrdersTableQuery = "\n        CREATE TABLE orders (\n            id serial PRIMARY KEY,\n            products text NOT NULL,\n            totalPrice real NOT NULL,\n            deliveryAddress text NOT NULL,\n            CONSTRAINT fk_user\n                FOREIGN KEY(userId)\n                    REFERENCES users(id)\n        );\n    ";
        return [2 /*return*/, server.pg.transact(function (client) { return __awaiter(void 0, void 0, void 0, function () {
                var result, err_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, client.query(createOrdersTableQuery)];
                        case 1:
                            result = _a.sent();
                            console.log("Orders table was created successfully");
                            return [2 /*return*/, result];
                        case 2:
                            err_3 = _a.sent();
                            server.log.error(err_3);
                            process.exit(1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })];
    });
}); });
// Seed data
server.post("/init-data", function (request, reply) {
    var batchProductQuery = "\n        INSERT INTO products (name, description, price, category, brand, imageUrl)\n        VALUES ('Iphone X space gray', 'new smartphone from Apple', 2000.00, 'smartphones', 'Apple', 'https://unsplash.com/photos/xdLXPic3Wfk'),\n               ('Sony WH-MX4', 'best noise cancelling headphone', 800.50, 'headsets', 'Sony', 'https://unsplash.com/photos/mpnA-Cgrzv8'),\n               ('Dell XPS 13', 'future of laptop with core i7 and 16gb RAM included 4k screen', 2500.00, 'laptops', 'Dell', 'https://unsplash.com/photos/8pb7Hq539Zw'),\n               ('Fujifilm x100v', 'latest street photography camera from Fujifilm', 4000.50, 'cameras', 'Fujifilm', 'https://unsplash.com/photos/-E7CLBZf7x8')\n    ";
    try {
        return server.pg.transact(function (client) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.query(batchProductQuery)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); });
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
});
// Start server
var start = function () { return __awaiter(void 0, void 0, void 0, function () {
    var address, port, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, server.listen(3000)];
            case 1:
                _a.sent();
                address = server.server.address();
                port = typeof address === "string" ? address : address === null || address === void 0 ? void 0 : address.port;
                console.log("Server is listening on port: " + port);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                server.log.error(err_4);
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
start();
