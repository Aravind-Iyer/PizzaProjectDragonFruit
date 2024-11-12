Use Dragonfruit
Create Table Dragonfruit.dbo.Customer (
CustomerID Int not null,
[Username] char(100) not null,
FirstName char(100) not null,
LastName char(100) not null,
Email char(150) not null,
[Address] char(100) null,
[Password] char(100) not null,
Phone char(10) null,
OrderHistory char(200) null,
Favorites char(100) null,
Constraint CustomerPK1 Primary Key (CustomerID),
);

Create Table Dragonfruit.dbo.Employee (
EmployeeID int not null,
[Password] char(100) not null,
HoursWorked int null,
FirstName char(100) not null,
LastName char(100) not null, 
PayRate int not null,
[Manager] char(100) not null,
Constraint EmployeePK Primary Key (EmployeeID),
Constraint EmployeeFK Foreign Key (Manager) References Manager(LastName)
);

Create Table Dragonfruit.dbo.Manager (
ManagerID int not null,
[Password] char(100) not null,
Email char(200) not null,
FirstName char(100) not null,
LastName char(100) not null, 
Constraint ManagerPK Primary Key (ManagerID),
Constraint ManagerCK Unique(LastName)
);

Create Table Dragonfruit.dbo.Orders(
CustomerID int not null,
OrderID int not null,
ODPizzasID int null, 
ODSidesID int null,
ODBevsID int null,
ODCustomPizzasID int null, 
TotalCost int not null
Constraint OrdersPK Primary Key (CustomerID, OrderID),
Constraint OrdersU Unique (OrderID),
Constraint OrdersFK Foreign Key (CustomerID)
					  References Customer(CustomerID),
Constraint OrdersFK1 Foreign Key (ODPizzasID)
					  References Pizza(PizzasID),
Constraint OrdersFK2 Foreign Key (ODCustomPizzasID)
					  References CustomPizzas(CustomPizzasID),
Constraint OrdersFK3 Foreign Key (ODSidesID)
					  References Sides(SidesID),
Constraint OrdersFK4 Foreign Key (ODBevsID)
					  References Beverages(BeveragesID)
);

Create Table Dragonfruit.dbo.CustomPizzas(
CustomPizzasID int not null,
OptionsID int not null,
Crust char(20) not null,
Sauce char(15) not null,
ToppingOne char(20) not null,
TopppingTwo char(20) not null,
ToppingThree char(20) not null,
ToppingFour char(20) not null,
ToppingFive char(20) not null,
Cost int not null,
Qty int null,
Constraint CustomPizzasPK Primary Key (CustomPizzasID),
Constraint CustomPizzasFK Foreign Key (OptionsID)
						  References Options(OptionsID)
);

Create Table Dragonfruit.dbo.Pizza(
PizzasID int not null,
PizzaName char(20) not null,
OptionsID int not null,
Cost int not null,
Qty int null,
Ingredients char(150) not null,
Constraint PizzaPK Primary Key (PizzasID),
Constraint PizzaFK Foreign Key (OptionsID)
						  References Options(OptionsID)
);

Create Table Dragonfruit.dbo.Options (
OptionsID int not null,
Extras binary(1) null, 
Less binary(1) null,
[None] binary(1) null,
Cost int not null,
Constraint OptionsPK Primary Key (OptionsID)
);

Create Table Dragonfruit.dbo.Payment (
CustomerID int not null,
OrderID int not null,
TotalCost int not null,
CardInfo int not null,
CarryoutorDelivery binary(1) not null,
Constraint PaymentPK Primary Key (CustomerID, OrderID),
Constraint PaymentFK Foreign Key (CustomerID)
					 References Customer(CustomerID),
Constraint PaymentFK1 Foreign Key (OrderID)
					  References Orders(OrderID)
);

Create Table Dragonfruit.dbo.Beverages (
BeveragesID int not null,
BeverageName char(75) null,
Cost int not null,
Qty int null,
Constraint BeveragesPK Primary Key (BeveragesID),
Constraint BeverageFK Foreign Key (BeverageName) References BeverageInfo(BeverageName)
);

Create Table Dragonfruit.dbo.Sides (
SidesID int not null,
SideName char(75) null,
Cost int not null,
Qty int null,
Constraint SidesID Primary Key (SidesID),
Constraint SidesFK Foreign Key (SideName) References SidesInfo(SideName)
);

Create Table Dragonfruit.dbo.BeverageInfo (
BeverageName char(75) not null,
Cost int not null
Constraint BeverageInfoPK Primary Key (BeverageName)
)

Create Table Dragonfruit.dbo.SidesInfo (
SideName char(75) not null,
Cost int not null
Constraint SidesInfoPK Primary Key (SideName)
)