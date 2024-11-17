CREATE TABLE CustomPizza (
                             PizzaID INT IDENTITY(1,1) PRIMARY KEY,
                             CustomerID INT NOT NULL,
                             PizzaName NVARCHAR(100) NOT NULL,
                             Crust NVARCHAR(50),
                             Sauce NVARCHAR(50),
                             Cheese NVARCHAR(50),
                             Size NVARCHAR(20),
                             Toppings NVARCHAR(MAX), -- Storing as a comma-separated string
                             Cost DECIMAL(10, 2),
                             FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);
