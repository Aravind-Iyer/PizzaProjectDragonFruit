-- Create Cart Table
CREATE TABLE Dragonfruit.dbo.Cart (
                                      CartID INT IDENTITY(1,1) NOT NULL, -- Unique cart item identifier
                                      CustomerID INT NOT NULL, -- Links cart to a specific customer
                                      ItemID INT NOT NULL, -- Links to item ID from Pizza, Desserts, etc.
                                      ItemType CHAR(50) NOT NULL, -- Specifies the type of item (Pizza, Dessert, etc.)
                                      ItemName CHAR(100) NOT NULL, -- Name of the item for easy reference
                                      Quantity INT NOT NULL, -- Number of items in the cart
                                      Cost DECIMAL(10, 2) NOT NULL, -- Price per unit of the item
                                      CONSTRAINT CartPK PRIMARY KEY (CartID),
                                      CONSTRAINT CartCustomerFK FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);
