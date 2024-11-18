INSERT INTO Customer (
    CustomerID,
    Username,
    FirstName,
    LastName,
    Email,
    Address,
    Password,
    Phone,
    OrderHistory,
    Favorites
) VALUES (
             1002, -- Unique ID for the manager
             'Realmanager.MP', -- Manager username
             'Ara', -- First name
             'Iyer', -- Last name
             'manager@pizzeria.com', -- Email
             '123 Manager Street', -- Address
             '$2b$10$abcdefghijk1234567890qrstuvwxyzABCDEFGHIJKLMN', -- Pre-hashed password
             '1234567890', -- Phone number
             NULL, -- OrderHistory (optional)
             NULL -- Favorites (optional)
         );
