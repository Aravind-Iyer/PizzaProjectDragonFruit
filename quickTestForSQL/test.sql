-- Step 1: Delete All Existing Data from Dependent Tables First
DELETE FROM Orders;

DELETE FROM CustomPizzas;

DELETE FROM Options;

DELETE FROM Customer;  -- Include Customer table to reset all data

-- Step 2: Populate Customer Table with Test Data
-- Explicitly inserting CustomerID values that will be used in Orders, including Username and Password
INSERT INTO Customer (CustomerID, Username, FirstName, LastName, Email, Phone, [Password]) VALUES
                                                                                               (1, 'john_doe', 'John', 'Doe', 'john.doe@example.com', '1234567890', 'password123'),  -- Add Password field
                                                                                               (2, 'jane_smith', 'Jane', 'Smith', 'jane.smith@example.com', '9876543210', 'password456');

-- Step 3: Populate Options Table with Unique OptionsID Values
INSERT INTO Options (OptionsID, Extras, Less, None, Cost) VALUES
                                                              (7, 0, 1, 0, 2),  -- Unique OptionsID values, starting from 7
                                                              (8, 1, 0, 0, 3);

-- Step 4: Populate CustomPizzas Table with Test Data
-- Explicitly setting CustomPizzasID with unique values and including all topping columns
INSERT INTO CustomPizzas (CustomPizzasID, OptionsID, Crust, Sauce, ToppingOne, ToppPingTwo, ToppingThree, ToppingFour, ToppingFive, Cost, Qty) VALUES
                                                                                                                                                   (201, 7, 'Thin', 'Marinara', 'Mushrooms', 'None', 'None', 'None', 'None', 12, 1),
                                                                                                                                                   (202, 8, 'Regular', 'Alfredo', 'Pepperoni', 'None', 'None', 'None', 'None', 15, 1);

-- Step 5: Populate Orders Table
-- Make sure to reference the appropriate CustomerID and CustomPizzasID in ODCustomPizzasID
INSERT INTO Orders (CustomerID, OrderID, ODCustomPizzasID, TotalCost) VALUES
                                                                          (1, 301, 201, 12),  -- Unique OrderID values, starting from 301
                                                                          (2, 302, 202, 15);
