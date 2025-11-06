/**
 * @summary
 * Retrieves complete details of a specific Monster Energy product including
 * full nutritional information and review statistics
 *
 * @procedure spProductGet
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/internal/product/:id
 *
 * @parameters
 * @param {INT} idProduct
 *   - Required: Yes
 *   - Description: Product identifier
 *
 * @returns {ProductDetail} Complete product information
 *
 * @testScenarios
 * - Valid request with existing product ID
 * - Request with non-existent product ID
 * - Verify complete nutritional information
 * - Verify review statistics calculation
 */
CREATE OR ALTER PROCEDURE [functional].[spProductGet]
  @idProduct INTEGER
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Validate required parameter
   * @throw {idProductRequired}
   */
  IF (@idProduct IS NULL)
  BEGIN
    ;THROW 51000, 'idProductRequired', 1;
  END;

  /**
   * @validation Verify product exists
   * @throw {productDoesntExist}
   */
  IF NOT EXISTS (SELECT * FROM [functional].[product] [prd] WHERE [prd].[idProduct] = @idProduct)
  BEGIN
    ;THROW 51000, 'productDoesntExist', 1;
  END;

  /**
   * @output {ProductDetail, 1, n}
   * @column {INT} idProduct - Product identifier
   * @column {NVARCHAR} name - Product name
   * @column {VARCHAR} imageUrl - Product image URL
   * @column {NVARCHAR} shortDescription - Brief description
   * @column {NVARCHAR} fullDescription - Complete description
   * @column {NUMERIC} price - Product price in BRL
   * @column {NVARCHAR} volume - Product volume
   * @column {NVARCHAR} category - Product category
   * @column {BIT} available - Availability flag
   * @column {NUMERIC} averageRating - Average rating (0-5)
   * @column {INT} reviewCount - Total reviews
   * @column {NVARCHAR} ratingDistribution - JSON with rating distribution
   */
  SELECT
    [prd].[idProduct],
    [prd].[name],
    [prd].[imageUrl],
    [prd].[shortDescription],
    [prd].[fullDescription],
    [prd].[price],
    [prd].[volume],
    [prd].[category],
    [prd].[available],
    ISNULL(AVG([prdRev].[rating]), 0.0) AS [averageRating],
    COUNT([prdRev].[idReview]) AS [reviewCount],
    (
      SELECT
        SUM(CASE WHEN [rating] >= 4.5 THEN 1 ELSE 0 END) AS [fiveStars],
        SUM(CASE WHEN [rating] >= 3.5 AND [rating] < 4.5 THEN 1 ELSE 0 END) AS [fourStars],
        SUM(CASE WHEN [rating] >= 2.5 AND [rating] < 3.5 THEN 1 ELSE 0 END) AS [threeStars],
        SUM(CASE WHEN [rating] >= 1.5 AND [rating] < 2.5 THEN 1 ELSE 0 END) AS [twoStars],
        SUM(CASE WHEN [rating] < 1.5 THEN 1 ELSE 0 END) AS [oneStar]
      FROM [functional].[productReview]
      WHERE [idProduct] = @idProduct
      FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ) AS [ratingDistribution]
  FROM [functional].[product] [prd]
    LEFT JOIN [functional].[productReview] [prdRev] ON ([prdRev].[idProduct] = [prd].[idProduct])
  WHERE [prd].[idProduct] = @idProduct
  GROUP BY
    [prd].[idProduct],
    [prd].[name],
    [prd].[imageUrl],
    [prd].[shortDescription],
    [prd].[fullDescription],
    [prd].[price],
    [prd].[volume],
    [prd].[category],
    [prd].[available];

  /**
   * @output {NutritionalInfo, 1, n}
   * @column {INT} idNutritionalInfo - Nutritional info identifier
   * @column {NVARCHAR} servingSize - Serving size
   * @column {INT} calories - Calories per serving
   * @column {NUMERIC} sugars - Sugars in grams
   * @column {NUMERIC} caffeine - Caffeine in milligrams
   * @column {NUMERIC} taurine - Taurine in milligrams
   * @column {NUMERIC} sodium - Sodium in milligrams
   * @column {NVARCHAR} vitamins - JSON with vitamin information
   * @column {NVARCHAR} ingredients - Complete ingredient list
   * @column {NVARCHAR} allergens - Allergen information
   */
  SELECT
    [nutInf].[idNutritionalInfo],
    [nutInf].[servingSize],
    [nutInf].[calories],
    [nutInf].[sugars],
    [nutInf].[caffeine],
    [nutInf].[taurine],
    [nutInf].[sodium],
    [nutInf].[vitamins],
    [nutInf].[ingredients],
    [nutInf].[allergens]
  FROM [functional].[nutritionalInfo] [nutInf]
  WHERE [nutInf].[idProduct] = @idProduct;
END;
GO
