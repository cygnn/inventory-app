#! /usr/bin/env node
import pkg from 'pg';
const { Client } = pkg

const CREATE_CATEGORIES_TABLE = `
CREATE TABLE IF NOT EXISTS categories (
    categoryid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    categoryname VARCHAR ( 255 ) NOT NULL,
    img TEXT
);`;

const CREATE_ITEMS_TABLE = `
CREATE TABLE IF NOT EXISTS items (
    itemId INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    itemName VARCHAR(150) NOT NULL,
    brand VARCHAR(150) NOT NULL,
    categoryid INT,
    partNum VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    price NUMERIC(10,2),
    quantity INT NOT NULL DEFAULT 0,
    CONSTRAINT fk_category
    FOREIGN KEY (categoryId)
    REFERENCES categories (categoryId)
    ON DELETE SET NULL
);`;

const INSERT_DATA =`
INSERT INTO categories (categoryName, img) 
VALUES
    ('Engine Cooling System', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1JHNK7ZSQqDyq_HGlayrU5iOf7INhTr_o1Q&s'),
    ('Braking System', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd2thC5Af9_ntLN11CVRzGLKIJaVYNLxUP-g&s'),
    ('Fuel Supply System', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwGtOmwibhXcighdOq2nKMfGJ9Eeo4RmUSQw&s'),
    ('Transmission System', 'https://www.shutterstock.com/image-vector/car-transmission-icon-gearshift-symbol-600nw-1913268241.jpg');

INSERT INTO items (itemName, brand, categoryId, partNum, description, price, quantity)
VALUES
    ('Radiator', 'Brand A', 1, 'PN12345', 'High-performance radiator for cooling systems.', 120.50, 10),
    ('Thermostat', 'Brand B', 1, 'PN12346', 'Efficient thermostat for temperature regulation.', 25.00, 15),
    ('Cooling Fan', 'Brand C', 1, 'PN12347', 'Durable cooling fan for enhanced airflow.', 55.00, 20),
    
    ('Brake Pads', 'Brand D', 2, 'PN67890', 'Durable brake pads for safe braking.', 45.99, 50),
    ('Brake Rotors', 'Brand E', 2, 'PN67891', 'High-quality brake rotors for optimal performance.', 75.00, 20),
    ('Brake Calipers', 'Brand F', 2, 'PN67892', 'Precision-engineered brake calipers for enhanced braking.', 120.00, 10),
    
    ('Fuel Pump', 'Brand G', 3, 'PN11223', 'Efficient fuel pump for improved fuel supply.', 85.00, 25),
    ('Fuel Injector', 'Brand H', 3, 'PN11224', 'Precision-engineered fuel injector for efficient combustion.', 50.00, 30),
    ('Fuel Filter', 'Brand I', 3, 'PN11225', 'High-quality fuel filter for cleaner fuel supply.', 20.00, 40),
    
    ('Gearbox', 'Brand J', 4, 'PN44556', 'Reliable gearbox for smooth transmission.', 300.00, 5),
    ('Clutch Kit', 'Brand K', 4, 'PN44557', 'High-quality clutch kit for better control.', 120.00, 10),
    ('Drive Shaft', 'Brand L', 4, 'PN44558', 'Durable drive shaft for improved power transmission.', 200.00, 8);

`;

async function main() {
  console.log("seeding...");
  const connectionString = process.argv[2];
  if(!connectionString){
    console.error("Error: Please provide a connection string as an argument.");
    process.exit(1);
  }
  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false, // Set to true if you need to verify the server's SSL certificate
  },
  });
  await client.connect();
  try {
    await client.query(CREATE_CATEGORIES_TABLE);
  } catch (error) {
    console.log('Error creating categories table')
  }
  try {
    await client.query(CREATE_ITEMS_TABLE);
  } catch (error) {
    console.log('Error creating items table')
  }
  try {
    await client.query(INSERT_DATA);
  } catch (error) {
    console.log('Error inserting data')
    console.log(error)
  }
  await client.end();
  console.log("done");
}

main();
