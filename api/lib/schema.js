"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductQuerySchema = void 0;
// Define schema for product ID in request param
var ProductQuerySchema = /** @class */ (function () {
    function ProductQuerySchema() {
        this.schema = {
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
        this.orderSchema = {
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
    }
    return ProductQuerySchema;
}());
exports.ProductQuerySchema = ProductQuerySchema;
