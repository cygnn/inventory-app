#! /usr/bin/env node
//NOT YET FINISHED!
const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
  categoryId INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  categoryName VARCHAR ( 255 ) NOT NULL,
  img TEXT
);

INSERT INTO categories (categoryName) 
VALUES
    ('Engine Cooling System'),
    ('Braking System'),
    ('Fuel Supply System'),
    ('Transmission System');

CREATE TABLE IF NOT EXISTS items (
    itemId INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    itemName VARCHAR(150) NOT NULL,
    bran VARCHAR(150) NOT NULL,
    categoryId INT,
    partNum VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    price NUMERIC(10,2),
    quantity INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_category
    FOREIGN KEY (categoryId)
    REFERENCES categories (categoryId)
    ON DELETE SET NULL
);

INSERT INTO items (itemName, categoryId, partNum, description, price, quantity)
VALUES
    ()

);
    `;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: "postgresql://clydee342:Puntanarclyde23*@localhost:5432/car_inventory",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
