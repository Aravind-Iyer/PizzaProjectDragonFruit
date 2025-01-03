USE [master]
GO /* DEPRECATED NOT USING MSSQL ANYMORE USING SQLLITE*/
/****** Object:  Database [Dragonfruit]    Script Date: 11/17/2024 5:59:52 PM ******/
CREATE DATABASE [Dragonfruit]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Dragonfruit', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\Dragonfruit.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Dragonfruit_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\Dragonfruit_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [Dragonfruit] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Dragonfruit].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Dragonfruit] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Dragonfruit] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Dragonfruit] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Dragonfruit] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Dragonfruit] SET ARITHABORT OFF 
GO
ALTER DATABASE [Dragonfruit] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Dragonfruit] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Dragonfruit] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Dragonfruit] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Dragonfruit] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Dragonfruit] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Dragonfruit] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Dragonfruit] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Dragonfruit] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Dragonfruit] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Dragonfruit] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Dragonfruit] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Dragonfruit] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Dragonfruit] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Dragonfruit] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Dragonfruit] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Dragonfruit] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Dragonfruit] SET RECOVERY FULL 
GO
ALTER DATABASE [Dragonfruit] SET  MULTI_USER 
GO
ALTER DATABASE [Dragonfruit] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Dragonfruit] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Dragonfruit] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Dragonfruit] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Dragonfruit] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Dragonfruit] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'Dragonfruit', N'ON'
GO
ALTER DATABASE [Dragonfruit] SET QUERY_STORE = ON
GO
ALTER DATABASE [Dragonfruit] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Dragonfruit]
GO
/****** Object:  User [pizzeria_user]    Script Date: 11/17/2024 5:59:52 PM ******/
CREATE USER [pizzeria_user] FOR LOGIN [pizzeria_user] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [pizzeria_user]
GO
/****** Object:  Table [dbo].[BeverageInfo]    Script Date: 11/17/2024 5:59:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BeverageInfo](
	[BeverageName] [char](75) NOT NULL,
	[Cost] [int] NOT NULL,
 CONSTRAINT [BeverageInfoPK] PRIMARY KEY CLUSTERED 
(
	[BeverageName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Beverages]    Script Date: 11/17/2024 5:59:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Beverages](
	[BeveragesID] [int] NOT NULL,
	[BeverageName] [char](75) NULL,
	[Cost] [int] NOT NULL,
	[Qty] [int] NULL,
 CONSTRAINT [BeveragesPK] PRIMARY KEY CLUSTERED 
(
	[BeveragesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cart]    Script Date: 11/17/2024 5:59:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cart](
	[CartID] [int] IDENTITY(1,1) NOT NULL,
	[CustomerID] [int] NOT NULL,
	[ItemID] [int] NOT NULL,
	[ItemType] [char](50) NOT NULL,
	[ItemName] [char](100) NOT NULL,
	[Quantity] [int] NOT NULL,
	[Cost] [decimal](10, 2) NOT NULL,
 CONSTRAINT [CartPK] PRIMARY KEY CLUSTERED 
(
	[CartID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 11/17/2024 5:59:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[CustomerID] [int] NOT NULL,
	[Username] [char](100) NOT NULL,
	[FirstName] [char](100) NOT NULL,
	[LastName] [char](100) NOT NULL,
	[Email] [varchar](150) NOT NULL,
	[Address] [char](100) NULL,
	[Password] [varchar](255) NOT NULL,
	[Phone] [char](10) NULL,
	[OrderHistory] [char](200) NULL,
	[Favorites] [char](100) NULL,
 CONSTRAINT [CustomerPK1] PRIMARY KEY CLUSTERED 
(
	[CustomerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CustomPizza]    Script Date: 11/17/2024 5:59:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CustomPizza](
	[PizzaID] [int] IDENTITY(1,1) NOT NULL,
	[CustomerID] [int] NOT NULL,
	[PizzaName] [nvarchar](100) NOT NULL,
	[Crust] [nvarchar](50) NULL,
	[Sauce] [nvarchar](50) NULL,
	[Cheese] [nvarchar](50) NULL,
	[Size] [nvarchar](20) NULL,
	[Toppings] [nvarchar](max) NULL,
	[Cost] [decimal](10, 2) NULL,
PRIMARY KEY CLUSTERED 
(
	[PizzaID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Desserts]    Script Date: 11/17/2024 5:59:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Desserts](
	[DessertID] [int] NOT NULL,
	[DessertName] [char](100) NOT NULL,
	[Cost] [decimal](10, 2) NOT NULL,
	[ImageURL] [char](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[DessertID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Drinks]    Script Date: 11/17/2024 5:59:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Drinks](
	[DrinkID] [int] IDENTITY(1,1) NOT NULL,
	[DrinkName] [char](100) NOT NULL,
	[Size] [char](10) NOT NULL,
	[Cost] [decimal](10, 2) NOT NULL,
	[ImageURL] [char](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[DrinkID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 11/17/2024 5:59:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
	[EmployeeID] [int] NOT NULL,
	[Password] [char](100) NOT NULL,
	[HoursWorked] [int] NULL,
	[FirstName] [char](100) NOT NULL,
	[LastName] [char](100) NOT NULL,
	[PayRate] [int] NOT NULL,
	[Manager] [char](100) NOT NULL,
 CONSTRAINT [EmployeePK] PRIMARY KEY CLUSTERED 
(
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Manager]    Script Date: 11/17/2024 5:59:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Manager](
	[ManagerID] [int] NOT NULL,
	[Password] [char](100) NOT NULL,
	[Email] [char](200) NOT NULL,
	[FirstName] [char](100) NOT NULL,
	[LastName] [char](100) NOT NULL,
 CONSTRAINT [ManagerPK] PRIMARY KEY CLUSTERED 
(
	[ManagerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Options]    Script Date: 11/17/2024 5:59:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Options](
	[OptionsID] [int] NOT NULL,
	[Extras] [binary](1) NULL,
	[Less] [binary](1) NULL,
	[None] [binary](1) NULL,
	[Cost] [int] NOT NULL,
 CONSTRAINT [OptionsPK] PRIMARY KEY CLUSTERED 
(
	[OptionsID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OrderSummary]    Script Date: 11/17/2024 5:59:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OrderSummary](
	[OrderID] [int] IDENTITY(1,1) NOT NULL,
	[CustomerID] [int] NOT NULL,
	[ItemType] [nvarchar](50) NULL,
	[ItemName] [nvarchar](100) NULL,
	[Quantity] [int] NULL,
	[Cost] [decimal](10, 2) NULL,
	[OrderDate] [datetime] NULL,
	[PaymentMethod] [nvarchar](50) NULL,
	[CardNumber] [nvarchar](4) NULL,
	[PaymentID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PaymentItems]    Script Date: 11/17/2024 5:59:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaymentItems](
	[PaymentItemID] [int] IDENTITY(1,1) NOT NULL,
	[PaymentID] [int] NOT NULL,
	[ItemID] [int] NOT NULL,
	[ItemName] [varchar](100) NOT NULL,
	[Quantity] [int] NOT NULL,
	[Cost] [decimal](10, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[PaymentItemID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payments]    Script Date: 11/17/2024 5:59:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payments](
	[PaymentID] [int] IDENTITY(1,1) NOT NULL,
	[CustomerID] [int] NOT NULL,
	[PaymentMethod] [varchar](50) NOT NULL,
	[CardNumber] [char](16) NULL,
	[GiftCardNumber] [varchar](50) NULL,
	[AmountPaid] [decimal](10, 2) NOT NULL,
	[OrderDate] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[PaymentID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Pizza]    Script Date: 11/17/2024 5:59:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Pizza](
	[PizzasID] [int] NOT NULL,
	[PizzaName] [char](20) NOT NULL,
	[OptionsID] [int] NOT NULL,
	[Cost] [int] NOT NULL,
	[Qty] [int] NULL,
	[Ingredients] [char](150) NOT NULL,
 CONSTRAINT [PizzaPK] PRIMARY KEY CLUSTERED 
(
	[PizzasID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sides]    Script Date: 11/17/2024 5:59:52 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sides](
	[SidesID] [int] IDENTITY(1,1) NOT NULL,
	[SidesName] [nvarchar](100) NOT NULL,
	[Cost] [decimal](10, 2) NOT NULL,
	[ImageURL] [nvarchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[SidesID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[Customer] ([CustomerID], [Username], [FirstName], [LastName], [Email], [Address], [Password], [Phone], [OrderHistory], [Favorites]) VALUES (1, N'john_doe                                                                                            ', N'John                                                                                                ', N'Doe                                                                                                 ', N'john.doe@example.com                                                                                                                                  ', NULL, N'password123                                                                                         ', N'1234567890', NULL, NULL)
INSERT [dbo].[Customer] ([CustomerID], [Username], [FirstName], [LastName], [Email], [Address], [Password], [Phone], [OrderHistory], [Favorites]) VALUES (2, N'jane_smith                                                                                          ', N'Jane                                                                                                ', N'Smith                                                                                               ', N'jane.smith@example.com                                                                                                                                ', NULL, N'password456                                                                                         ', N'9876543210', NULL, NULL)
INSERT [dbo].[Customer] ([CustomerID], [Username], [FirstName], [LastName], [Email], [Address], [Password], [Phone], [OrderHistory], [Favorites]) VALUES (1959, N'BABA                                                                                                ', N'BA                                                                                                  ', N'BABA                                                                                                ', N'BABABA@gmail.com                                                                                                                                      ', NULL, N'$2b$10$YpiHVOGFzUbjv7rEfVZ9.uOOdQ2ffY1AoS.tMzPdyRTPc3jes6BMG                                        ', NULL, NULL, NULL)
INSERT [dbo].[Customer] ([CustomerID], [Username], [FirstName], [LastName], [Email], [Address], [Password], [Phone], [OrderHistory], [Favorites]) VALUES (2915, N'ara                                                                                                 ', N'Aravind                                                                                             ', N'Iyer                                                                                                ', N'aaaravind@gmail.com                                                                                                                                   ', NULL, N'$2b$10$/qZL4rluqL9ElH8.6U6yyOsTVV2WD3vNgkWCAvShv6cjCuYwiSSqS                                        ', NULL, NULL, NULL)
INSERT [dbo].[Customer] ([CustomerID], [Username], [FirstName], [LastName], [Email], [Address], [Password], [Phone], [OrderHistory], [Favorites]) VALUES (4158, N'aaaravind030702@gmail.com                                                                           ', N'Aravindaaa                                                                                          ', N'Iyeraaa                                                                                             ', N'aaaravind030702@gmail.com                                                                                                                             ', N'sadasda                                                                                             ', N'$2b$10$jSpKO03Dq0qgjOcsG1ZU1u52uSnCPHr7hQnTPOEuDxYaexaGtqyUG                                        ', N'12321312  ', NULL, NULL)
INSERT [dbo].[Customer] ([CustomerID], [Username], [FirstName], [LastName], [Email], [Address], [Password], [Phone], [OrderHistory], [Favorites]) VALUES (5105, N'aravind030702@gmail.com                                                                             ', N'Aravind                                                                                             ', N'Iyer                                                                                                ', N'aravind030702@gmail.com                                                                                                                               ', N'528 Can do ST                                                                                       ', N'$2b$10$RVQfLdmxdUgi62vaw/AHTev7bAoY4GqOdyjrHVGnBgFC503klP.Ei                                        ', N'1236659684', NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[CustomPizza] ON 

INSERT [dbo].[CustomPizza] ([PizzaID], [CustomerID], [PizzaName], [Crust], [Sauce], [Cheese], [Size], [Toppings], [Cost]) VALUES (1, 5105, N'myFav Pizza', N'stuffed', N'marinara', N'normal', N'extraLarge', N'Black Olives,Mushrooms,Tomatoes,Chicken,Bacon,Ham', CAST(24.00 AS Decimal(10, 2)))
INSERT [dbo].[CustomPizza] ([PizzaID], [CustomerID], [PizzaName], [Crust], [Sauce], [Cheese], [Size], [Toppings], [Cost]) VALUES (2, 5105, N'adsada', N'cheesy', N'marinara', N'normal', N'medium', N'Green Peppers,Bacon', CAST(14.00 AS Decimal(10, 2)))
INSERT [dbo].[CustomPizza] ([PizzaID], [CustomerID], [PizzaName], [Crust], [Sauce], [Cheese], [Size], [Toppings], [Cost]) VALUES (3, 5105, N'OPZIZIZPIPZIPIZaaa', N'handmade', N'marinara', N'normal', N'medium', N'Mushrooms,Tomatoes,Chicken', CAST(15.50 AS Decimal(10, 2)))
SET IDENTITY_INSERT [dbo].[CustomPizza] OFF
GO
INSERT [dbo].[Desserts] ([DessertID], [DessertName], [Cost], [ImageURL]) VALUES (1, N'Cinnamon Bites                                                                                      ', CAST(4.99 AS Decimal(10, 2)), N'assets/images/cinnamon-bites.jpg                                                                                                                                                                                                                               ')
INSERT [dbo].[Desserts] ([DessertID], [DessertName], [Cost], [ImageURL]) VALUES (2, N'Brownie                                                                                             ', CAST(3.99 AS Decimal(10, 2)), N'assets/images/brownie.jpg                                                                                                                                                                                                                                      ')
INSERT [dbo].[Desserts] ([DessertID], [DessertName], [Cost], [ImageURL]) VALUES (3, N'Choco Lava Cake                                                                                     ', CAST(5.99 AS Decimal(10, 2)), N'assets/images/choco-lava-cake.jpg                                                                                                                                                                                                                              ')
INSERT [dbo].[Desserts] ([DessertID], [DessertName], [Cost], [ImageURL]) VALUES (4, N'Croissant                                                                                           ', CAST(2.99 AS Decimal(10, 2)), N'assets/images/croissant.jpg                                                                                                                                                                                                                                    ')
INSERT [dbo].[Desserts] ([DessertID], [DessertName], [Cost], [ImageURL]) VALUES (5, N'Cookies                                                                                             ', CAST(1.99 AS Decimal(10, 2)), N'assets/images/cookies.jpg                                                                                                                                                                                                                                      ')
GO
SET IDENTITY_INSERT [dbo].[Drinks] ON 

INSERT [dbo].[Drinks] ([DrinkID], [DrinkName], [Size], [Cost], [ImageURL]) VALUES (2, N'Coca-Cola                                                                                           ', N'Small     ', CAST(1.99 AS Decimal(10, 2)), N'../assets/images/coca-cola.jpg                                                                                                                                                                                                                                 ')
INSERT [dbo].[Drinks] ([DrinkID], [DrinkName], [Size], [Cost], [ImageURL]) VALUES (3, N'Pepsi                                                                                               ', N'Small     ', CAST(1.89 AS Decimal(10, 2)), N'../assets/images/pepsi.jpg                                                                                                                                                                                                                                     ')
INSERT [dbo].[Drinks] ([DrinkID], [DrinkName], [Size], [Cost], [ImageURL]) VALUES (4, N'Sprite                                                                                              ', N'Small     ', CAST(1.79 AS Decimal(10, 2)), N'../assets/images/sprite.jpg                                                                                                                                                                                                                                    ')
INSERT [dbo].[Drinks] ([DrinkID], [DrinkName], [Size], [Cost], [ImageURL]) VALUES (5, N'Fanta Orange                                                                                        ', N'Small     ', CAST(1.99 AS Decimal(10, 2)), N'../assets/images/fanta.jpg                                                                                                                                                                                                                                     ')
INSERT [dbo].[Drinks] ([DrinkID], [DrinkName], [Size], [Cost], [ImageURL]) VALUES (6, N'Mountain Dew                                                                                        ', N'Small     ', CAST(1.89 AS Decimal(10, 2)), N'../assets/images/mountain-dew.jpg                                                                                                                                                                                                                              ')
INSERT [dbo].[Drinks] ([DrinkID], [DrinkName], [Size], [Cost], [ImageURL]) VALUES (7, N'Dr Pepper                                                                                           ', N'Small     ', CAST(1.99 AS Decimal(10, 2)), N'../assets/images/dr-pepper.jpg                                                                                                                                                                                                                                 ')
INSERT [dbo].[Drinks] ([DrinkID], [DrinkName], [Size], [Cost], [ImageURL]) VALUES (8, N'7UP                                                                                                 ', N'Small     ', CAST(1.79 AS Decimal(10, 2)), N'../assets/images/7up.jpg                                                                                                                                                                                                                                       ')
SET IDENTITY_INSERT [dbo].[Drinks] OFF
GO
INSERT [dbo].[Options] ([OptionsID], [Extras], [Less], [None], [Cost]) VALUES (7, 0x00, 0x01, 0x00, 2)
INSERT [dbo].[Options] ([OptionsID], [Extras], [Less], [None], [Cost]) VALUES (8, 0x01, 0x00, 0x00, 3)
GO
SET IDENTITY_INSERT [dbo].[OrderSummary] ON 

INSERT [dbo].[OrderSummary] ([OrderID], [CustomerID], [ItemType], [ItemName], [Quantity], [Cost], [OrderDate], [PaymentMethod], [CardNumber], [PaymentID]) VALUES (46, 5105, N'Side', N'Garlic Knots', 1, CAST(5.99 AS Decimal(10, 2)), CAST(N'2024-11-17T16:56:28.810' AS DateTime), N'Mobile Payment', NULL, NULL)
SET IDENTITY_INSERT [dbo].[OrderSummary] OFF
GO
SET IDENTITY_INSERT [dbo].[PaymentItems] ON 

INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (1, 3, 2, N'Drink Name', 3, CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (2, 3, 3, N'Pepsi', 4, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (3, 3, 5, N'Fanta Orange', 2, CAST(1.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (4, 3, 2, N'Brownie', 2, CAST(3.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (5, 3, 4, N'Croissant', 2, CAST(2.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (6, 3, 3, N'Choco Lava Cake', 2, CAST(5.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (7, 3, 2, N'Brownie', 3, CAST(3.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (8, 4, 3, N'Pepsi', 3, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (9, 5, 3, N'Pepsi', 3, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (10, 6, 3, N'Pepsi', 3, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (11, 7, 3, N'Pepsi', 3, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (12, 8, 3, N'Pepsi', 3, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (13, 9, 3, N'Pepsi', 3, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (14, 9, 8, N'7UP', 2, CAST(1.79 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (15, 9, 3, N'Pepsi', 2, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (16, 9, 2, N'Brownie', 5, CAST(3.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (17, 9, 2, N'Brownie', 5, CAST(3.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (18, 9, 2, N'Brownie', 5, CAST(3.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (19, 9, 2, N'Brownie', 5, CAST(3.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (20, 10, 3, N'Pepsi', 3, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (21, 10, 3, N'Choco Lava Cake', 2, CAST(5.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (22, 10, 2, N'Brownie', 2, CAST(3.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (23, 10, 4, N'Croissant', 1, CAST(2.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (24, 11, 5, N'Fanta Orange', 2, CAST(1.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (25, 11, 8, N'7UP', 7, CAST(1.79 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (26, 12, 3, N'Pepsi', 3, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (27, 13, 3, N'Pepsi', 3, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (28, 14, 3, N'Pepsi', 2, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (29, 15, 3, N'Choco Lava Cake', 2, CAST(5.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (30, 15, 4, N'Sprite', 2, CAST(1.79 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (31, 15, 4, N'Sprite', 2, CAST(1.79 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (32, 16, 3, N'Pepsi', 3, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (33, 16, 3, N'Choco Lava Cake', 2, CAST(5.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (34, 17, 1, N'Dipping Sauces', 3, CAST(0.00 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (35, 17, 3, N'Pepsi', 3, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (36, 18, 4, N'Sprite', 3, CAST(1.79 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (37, 18, 4, N'Croissant', 2, CAST(2.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (38, 18, 4, N'Garlic Knots', 2, CAST(5.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (39, 18, 5, N'Garlic', 2, CAST(0.50 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (40, 18, 3, N'Pepsi', 4, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (41, 18, 8, N'7UP', 3, CAST(1.79 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (42, 18, 3, N'Pepsi', 2, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (43, 18, 2, N'Coca-Cola', 2, CAST(1.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (44, 19, 2, N'Coca-Cola', 3, CAST(1.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (45, 19, 6, N'Mountain Dew', 3, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (46, 19, 4, N'Croissant', 3, CAST(2.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (47, 19, 6, N'Hot Buffalo', 4, CAST(0.50 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (48, 19, 4, N'Garlic Knots', 3, CAST(5.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (49, 20, 3, N'Pepsi', 1, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (50, 20, 3, N'Breadsticks', 3, CAST(4.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (51, 20, 4, N'Croissant', 2, CAST(2.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (52, 21, 2, N'Coca-Cola', 4, CAST(1.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (53, 21, 5, N'Fanta Orange', 3, CAST(1.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (54, 21, 4, N'Croissant', 3, CAST(2.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (55, 21, 2, N'Brownie', 2, CAST(3.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (56, 21, 4, N'Garlic Knots', 2, CAST(5.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (57, 22, 3, N'Pepsi', 3, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (58, 22, 5, N'Fanta Orange', 3, CAST(1.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (59, 22, 3, N'Breadsticks', 1, CAST(4.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (60, 22, 4, N'Garlic Knots', 2, CAST(5.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (61, 22, 8, N'Marinara', 1, CAST(0.50 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (62, 22, 2, N'Brownie', 2, CAST(3.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (63, 22, 3, N'Choco Lava Cake', 2, CAST(5.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (64, 23, 3, N'Pepsi', 2, CAST(1.89 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (65, 23, 5, N'Fanta Orange', 4, CAST(1.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (66, 23, 5, N'Fanta Orange', 4, CAST(1.99 AS Decimal(10, 2)))
INSERT [dbo].[PaymentItems] ([PaymentItemID], [PaymentID], [ItemID], [ItemName], [Quantity], [Cost]) VALUES (67, 23, 8, N'7UP', 2, CAST(1.79 AS Decimal(10, 2)))
SET IDENTITY_INSERT [dbo].[PaymentItems] OFF
GO
SET IDENTITY_INSERT [dbo].[Payments] ON 

INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (3, 1, N'Gift Card', NULL, N'123123123123123344', CAST(49.45 AS Decimal(10, 2)), CAST(N'2024-11-16T17:48:12.290' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (4, 1, N'Cash', NULL, NULL, CAST(5.67 AS Decimal(10, 2)), CAST(N'2024-11-16T17:54:10.823' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (5, 1, N'Credit/Debit Card', N'1234567891234567', NULL, CAST(5.67 AS Decimal(10, 2)), CAST(N'2024-11-16T18:04:19.213' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (6, 1, N'Cash', NULL, NULL, CAST(5.67 AS Decimal(10, 2)), CAST(N'2024-11-16T18:04:42.533' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (7, 1, N'Mobile Payment', NULL, NULL, CAST(5.67 AS Decimal(10, 2)), CAST(N'2024-11-16T18:04:47.340' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (8, 1, N'Gift Card', NULL, N're12e2e12dsda', CAST(5.67 AS Decimal(10, 2)), CAST(N'2024-11-16T18:04:53.957' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (9, 1, N'Credit/Debit Card', N'1234567891234567', NULL, CAST(92.83 AS Decimal(10, 2)), CAST(N'2024-11-16T18:07:29.827' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (10, 1, N'Mobile Payment', NULL, NULL, CAST(28.62 AS Decimal(10, 2)), CAST(N'2024-11-16T18:10:43.130' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (11, 5105, N'Mobile Payment', NULL, NULL, CAST(16.51 AS Decimal(10, 2)), CAST(N'2024-11-16T18:42:17.067' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (12, 5105, N'Cash', NULL, NULL, CAST(5.67 AS Decimal(10, 2)), CAST(N'2024-11-16T18:46:13.630' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (13, 5105, N'Cash', NULL, NULL, CAST(5.67 AS Decimal(10, 2)), CAST(N'2024-11-16T18:49:07.030' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (14, 5105, N'Cash', NULL, NULL, CAST(3.78 AS Decimal(10, 2)), CAST(N'2024-11-16T18:49:24.543' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (15, 5105, N'Mobile Payment', NULL, NULL, CAST(19.14 AS Decimal(10, 2)), CAST(N'2024-11-16T18:56:36.477' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (16, 5105, N'Mobile Payment', NULL, NULL, CAST(17.65 AS Decimal(10, 2)), CAST(N'2024-11-16T21:24:16.350' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (17, 5105, N'Mobile Payment', NULL, NULL, CAST(5.67 AS Decimal(10, 2)), CAST(N'2024-11-16T22:59:36.063' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (18, 5105, N'Mobile Payment', NULL, NULL, CAST(45.02 AS Decimal(10, 2)), CAST(N'2024-11-16T23:11:21.740' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (19, 5105, N'Mobile Payment', NULL, NULL, CAST(40.58 AS Decimal(10, 2)), CAST(N'2024-11-16T23:16:51.630' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (20, 5105, N'Mobile Payment', NULL, NULL, CAST(22.84 AS Decimal(10, 2)), CAST(N'2024-11-16T23:21:12.400' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (21, 5105, N'Cash', NULL, NULL, CAST(42.86 AS Decimal(10, 2)), CAST(N'2024-11-16T23:47:48.027' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (22, 5105, N'Cash', NULL, NULL, CAST(49.07 AS Decimal(10, 2)), CAST(N'2024-11-17T00:34:14.957' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (23, 5105, N'Mobile Payment', NULL, NULL, CAST(23.28 AS Decimal(10, 2)), CAST(N'2024-11-17T01:06:58.273' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (24, 5105, N'Mobile Payment', NULL, NULL, CAST(39.47 AS Decimal(10, 2)), CAST(N'2024-11-17T01:18:58.450' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (25, 5105, N'Gift Card', NULL, N'1324313241', CAST(9.75 AS Decimal(10, 2)), CAST(N'2024-11-17T01:20:11.837' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (26, 5105, N'Mobile Payment', NULL, NULL, CAST(64.14 AS Decimal(10, 2)), CAST(N'2024-11-17T01:26:56.800' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (27, 5105, N'Mobile Payment', NULL, NULL, CAST(16.95 AS Decimal(10, 2)), CAST(N'2024-11-17T01:27:44.527' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (30, 5105, N'Mobile Payment', NULL, NULL, CAST(5.67 AS Decimal(10, 2)), CAST(N'2024-11-17T01:31:57.120' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (31, 5105, N'Mobile Payment', NULL, NULL, CAST(1.89 AS Decimal(10, 2)), CAST(N'2024-11-17T01:34:46.780' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (32, 5105, N'Credit/Debit Card', N'1234567891234567', NULL, CAST(5.67 AS Decimal(10, 2)), CAST(N'2024-11-17T09:26:57.533' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (33, 5105, N'Cash', NULL, NULL, CAST(63.72 AS Decimal(10, 2)), CAST(N'2024-11-17T09:52:55.520' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (34, 5105, N'Mobile Payment', NULL, NULL, CAST(50.34 AS Decimal(10, 2)), CAST(N'2024-11-17T16:13:22.327' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (35, 5105, N'Mobile Payment', NULL, NULL, CAST(14.00 AS Decimal(10, 2)), CAST(N'2024-11-17T16:47:19.267' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (36, 5105, N'Cash', NULL, NULL, CAST(40.13 AS Decimal(10, 2)), CAST(N'2024-11-17T16:50:25.767' AS DateTime))
INSERT [dbo].[Payments] ([PaymentID], [CustomerID], [PaymentMethod], [CardNumber], [GiftCardNumber], [AmountPaid], [OrderDate]) VALUES (37, 5105, N'Mobile Payment', NULL, NULL, CAST(5.99 AS Decimal(10, 2)), CAST(N'2024-11-17T16:56:28.810' AS DateTime))
SET IDENTITY_INSERT [dbo].[Payments] OFF
GO
SET IDENTITY_INSERT [dbo].[Sides] ON 

INSERT [dbo].[Sides] ([SidesID], [SidesName], [Cost], [ImageURL]) VALUES (1, N'Homemade Dipping Sauces', CAST(3.00 AS Decimal(10, 2)), N'assets/images/dipping-sauces.png')
INSERT [dbo].[Sides] ([SidesID], [SidesName], [Cost], [ImageURL]) VALUES (2, N'Chicken Wings', CAST(7.99 AS Decimal(10, 2)), N'assets/images/chicken-wings.png')
INSERT [dbo].[Sides] ([SidesID], [SidesName], [Cost], [ImageURL]) VALUES (3, N'Breadsticks', CAST(4.99 AS Decimal(10, 2)), N'assets/images/breadsticks.png')
INSERT [dbo].[Sides] ([SidesID], [SidesName], [Cost], [ImageURL]) VALUES (4, N'Garlic Knots', CAST(5.99 AS Decimal(10, 2)), N'assets/images/garlic-knots.png')
INSERT [dbo].[Sides] ([SidesID], [SidesName], [Cost], [ImageURL]) VALUES (5, N'Garlic', CAST(0.50 AS Decimal(10, 2)), N'assets/images/garlic.png')
INSERT [dbo].[Sides] ([SidesID], [SidesName], [Cost], [ImageURL]) VALUES (6, N'Hot Buffalo', CAST(0.50 AS Decimal(10, 2)), N'assets/images/hot-buffalo.png')
INSERT [dbo].[Sides] ([SidesID], [SidesName], [Cost], [ImageURL]) VALUES (7, N'Ranch', CAST(0.50 AS Decimal(10, 2)), N'assets/images/ranch.png')
INSERT [dbo].[Sides] ([SidesID], [SidesName], [Cost], [ImageURL]) VALUES (8, N'Marinara', CAST(0.50 AS Decimal(10, 2)), N'assets/images/marinara.png')
SET IDENTITY_INSERT [dbo].[Sides] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [ManagerCK]    Script Date: 11/17/2024 5:59:52 PM ******/
ALTER TABLE [dbo].[Manager] ADD  CONSTRAINT [ManagerCK] UNIQUE NONCLUSTERED 
(
	[LastName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[OrderSummary] ADD  DEFAULT (getdate()) FOR [OrderDate]
GO
ALTER TABLE [dbo].[Payments] ADD  DEFAULT (getdate()) FOR [OrderDate]
GO
ALTER TABLE [dbo].[Beverages]  WITH CHECK ADD  CONSTRAINT [BeverageFK] FOREIGN KEY([BeverageName])
REFERENCES [dbo].[BeverageInfo] ([BeverageName])
GO
ALTER TABLE [dbo].[Beverages] CHECK CONSTRAINT [BeverageFK]
GO
ALTER TABLE [dbo].[Cart]  WITH CHECK ADD  CONSTRAINT [CartCustomerFK] FOREIGN KEY([CustomerID])
REFERENCES [dbo].[Customer] ([CustomerID])
GO
ALTER TABLE [dbo].[Cart] CHECK CONSTRAINT [CartCustomerFK]
GO
ALTER TABLE [dbo].[CustomPizza]  WITH CHECK ADD FOREIGN KEY([CustomerID])
REFERENCES [dbo].[Customer] ([CustomerID])
GO
ALTER TABLE [dbo].[Employee]  WITH CHECK ADD  CONSTRAINT [EmployeeFK] FOREIGN KEY([Manager])
REFERENCES [dbo].[Manager] ([LastName])
GO
ALTER TABLE [dbo].[Employee] CHECK CONSTRAINT [EmployeeFK]
GO
ALTER TABLE [dbo].[OrderSummary]  WITH CHECK ADD  CONSTRAINT [FK_OrderSummary_Payments] FOREIGN KEY([PaymentID])
REFERENCES [dbo].[Payments] ([PaymentID])
GO
ALTER TABLE [dbo].[OrderSummary] CHECK CONSTRAINT [FK_OrderSummary_Payments]
GO
ALTER TABLE [dbo].[PaymentItems]  WITH CHECK ADD FOREIGN KEY([PaymentID])
REFERENCES [dbo].[Payments] ([PaymentID])
GO
ALTER TABLE [dbo].[Payments]  WITH CHECK ADD FOREIGN KEY([CustomerID])
REFERENCES [dbo].[Customer] ([CustomerID])
GO
ALTER TABLE [dbo].[Pizza]  WITH CHECK ADD  CONSTRAINT [PizzaFK] FOREIGN KEY([OptionsID])
REFERENCES [dbo].[Options] ([OptionsID])
GO
ALTER TABLE [dbo].[Pizza] CHECK CONSTRAINT [PizzaFK]
GO
USE [master]
GO
ALTER DATABASE [Dragonfruit] SET  READ_WRITE 
GO
