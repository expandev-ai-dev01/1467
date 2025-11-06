/**
 * @schema functional
 * Business entity schema for Monster Energy catalog
 */
CREATE SCHEMA [functional];
GO

/**
 * @table product Monster Energy product catalog
 * @multitenancy false
 * @softDelete false
 * @alias prd
 */
CREATE TABLE [functional].[product] (
  [idProduct] INTEGER IDENTITY(1, 1) NOT NULL,
  [name] NVARCHAR(100) NOT NULL,
  [imageUrl] VARCHAR(500) NOT NULL,
  [shortDescription] NVARCHAR(150) NOT NULL,
  [fullDescription] NVARCHAR(MAX) NOT NULL,
  [price] NUMERIC(18, 6) NOT NULL,
  [volume] NVARCHAR(50) NOT NULL,
  [category] NVARCHAR(50) NOT NULL,
  [available] BIT NOT NULL DEFAULT (1),
  [salesCount] INTEGER NOT NULL DEFAULT (0),
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE()),
  [dateModified] DATETIME2 NOT NULL DEFAULT (GETUTCDATE())
);
GO

/**
 * @table nutritionalInfo Nutritional information for products
 * @multitenancy false
 * @softDelete false
 * @alias nutInf
 */
CREATE TABLE [functional].[nutritionalInfo] (
  [idNutritionalInfo] INTEGER IDENTITY(1, 1) NOT NULL,
  [idProduct] INTEGER NOT NULL,
  [servingSize] NVARCHAR(50) NOT NULL,
  [calories] INTEGER NOT NULL,
  [sugars] NUMERIC(15, 2) NOT NULL,
  [caffeine] NUMERIC(15, 2) NOT NULL,
  [taurine] NUMERIC(15, 2) NOT NULL,
  [sodium] NUMERIC(15, 2) NOT NULL,
  [vitamins] NVARCHAR(MAX) NULL,
  [ingredients] NVARCHAR(MAX) NOT NULL,
  [allergens] NVARCHAR(MAX) NULL
);
GO

/**
 * @table productReview Product reviews and ratings
 * @multitenancy false
 * @softDelete false
 * @alias prdRev
 */
CREATE TABLE [functional].[productReview] (
  [idReview] INTEGER IDENTITY(1, 1) NOT NULL,
  [idProduct] INTEGER NOT NULL,
  [rating] NUMERIC(2, 1) NOT NULL,
  [dateCreated] DATETIME2 NOT NULL DEFAULT (GETUTCDATE())
);
GO

/**
 * @primaryKey pkProduct
 * @keyType Object
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [pkProduct] PRIMARY KEY CLUSTERED ([idProduct]);
GO

/**
 * @primaryKey pkNutritionalInfo
 * @keyType Object
 */
ALTER TABLE [functional].[nutritionalInfo]
ADD CONSTRAINT [pkNutritionalInfo] PRIMARY KEY CLUSTERED ([idNutritionalInfo]);
GO

/**
 * @primaryKey pkProductReview
 * @keyType Object
 */
ALTER TABLE [functional].[productReview]
ADD CONSTRAINT [pkProductReview] PRIMARY KEY CLUSTERED ([idReview]);
GO

/**
 * @foreignKey fkNutritionalInfo_Product Links nutritional info to product
 * @target functional.product
 */
ALTER TABLE [functional].[nutritionalInfo]
ADD CONSTRAINT [fkNutritionalInfo_Product] FOREIGN KEY ([idProduct])
REFERENCES [functional].[product]([idProduct]);
GO

/**
 * @foreignKey fkProductReview_Product Links review to product
 * @target functional.product
 */
ALTER TABLE [functional].[productReview]
ADD CONSTRAINT [fkProductReview_Product] FOREIGN KEY ([idProduct])
REFERENCES [functional].[product]([idProduct]);
GO

/**
 * @check chkProduct_Available Validates availability flag
 * @enum {0} Product unavailable
 * @enum {1} Product available
 */
ALTER TABLE [functional].[product]
ADD CONSTRAINT [chkProduct_Available] CHECK ([available] BETWEEN 0 AND 1);
GO

/**
 * @check chkProductReview_Rating Validates rating range
 * @enum Rating must be between 0 and 5
 */
ALTER TABLE [functional].[productReview]
ADD CONSTRAINT [chkProductReview_Rating] CHECK ([rating] BETWEEN 0 AND 5);
GO

/**
 * @index ixProduct_Category Search by category
 * @type Search
 */
CREATE NONCLUSTERED INDEX [ixProduct_Category]
ON [functional].[product]([category]);
GO

/**
 * @index ixProduct_Available Search available products
 * @type Search
 * @filter Only available products
 */
CREATE NONCLUSTERED INDEX [ixProduct_Available]
ON [functional].[product]([available])
WHERE [available] = 1;
GO

/**
 * @index ixProduct_SalesCount Performance optimization for popularity sorting
 * @type Performance
 */
CREATE NONCLUSTERED INDEX [ixProduct_SalesCount]
ON [functional].[product]([salesCount] DESC);
GO

/**
 * @index ixNutritionalInfo_Product Foreign key optimization
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixNutritionalInfo_Product]
ON [functional].[nutritionalInfo]([idProduct]);
GO

/**
 * @index ixProductReview_Product Foreign key optimization
 * @type ForeignKey
 */
CREATE NONCLUSTERED INDEX [ixProductReview_Product]
ON [functional].[productReview]([idProduct]);
GO
