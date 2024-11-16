CREATE TABLE PaymentItems (
                              PaymentItemID INT IDENTITY PRIMARY KEY,    -- Unique ID for each purchased item
                              PaymentID INT NOT NULL FOREIGN KEY REFERENCES Payments(PaymentID), -- Links to Payments table
                              ItemID INT NOT NULL,                       -- ID of the purchased item
                              ItemName VARCHAR(100) NOT NULL,            -- Name of the purchased item
                              Quantity INT NOT NULL,                     -- Quantity purchased
                              Cost DECIMAL(10, 2) NOT NULL               -- Cost of the item
);
