USE [master]
GO
/****** Object:  Database [Dragonfruit]    Script Date: 11/17/2024 5:09:18 PM ******/
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
/****** Object:  User [pizzeria_user]    Script Date: 11/17/2024 5:09:18 PM ******/
CREATE USER [pizzeria_user] FOR LOGIN [pizzeria_user] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [pizzeria_user]
GO
/****** Object:  Table [dbo].[BeverageInfo]    Script Date: 11/17/2024 5:09:18 PM ******/
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
/****** Object:  Table [dbo].[Beverages]    Script Date: 11/17/2024 5:09:18 PM ******/
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
/****** Object:  Table [dbo].[Cart]    Script Date: 11/17/2024 5:09:18 PM ******/
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
/****** Object:  Table [dbo].[Customer]    Script Date: 11/17/2024 5:09:18 PM ******/
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
/****** Object:  Table [dbo].[CustomPizza]    Script Date: 11/17/2024 5:09:18 PM ******/
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
/****** Object:  Table [dbo].[Desserts]    Script Date: 11/17/2024 5:09:18 PM ******/
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
/****** Object:  Table [dbo].[Drinks]    Script Date: 11/17/2024 5:09:18 PM ******/
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
/****** Object:  Table [dbo].[Employee]    Script Date: 11/17/2024 5:09:18 PM ******/
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
/****** Object:  Table [dbo].[Manager]    Script Date: 11/17/2024 5:09:18 PM ******/
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
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [ManagerCK] UNIQUE NONCLUSTERED 
(
	[LastName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Options]    Script Date: 11/17/2024 5:09:18 PM ******/
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
/****** Object:  Table [dbo].[OrderSummary]    Script Date: 11/17/2024 5:09:18 PM ******/
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
/****** Object:  Table [dbo].[PaymentItems]    Script Date: 11/17/2024 5:09:18 PM ******/
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
/****** Object:  Table [dbo].[Payments]    Script Date: 11/17/2024 5:09:18 PM ******/
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
/****** Object:  Table [dbo].[Pizza]    Script Date: 11/17/2024 5:09:18 PM ******/
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
/****** Object:  Table [dbo].[Sides]    Script Date: 11/17/2024 5:09:18 PM ******/
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
