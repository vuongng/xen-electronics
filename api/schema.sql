CREATE TABLE products (
    id SERIAL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price FLOAT NOT NULL,
    category VARCHAR(255),
    brand VARCHAR(255),
    imageUrl TEXT,
    created_at TIMESTAMP default NULL

    PRIMARY KEY (id)
)

-- CREATE TABLE CART ()
