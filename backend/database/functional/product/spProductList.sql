/**
 * @summary
 * Retrieves paginated list of Monster Energy products with basic information,
 * nutritional summary, and average ratings
 *
 * @procedure spProductList
 * @schema functional
 * @type stored-procedure
 *
 * @endpoints
 * - GET /api/v1/internal/product
 *
 * @parameters
 * @param {INT} page
 *   - Required: No
 *   - Description: Page number for pagination (default: 1)
 *
 * @param {INT} pageSize
 *   - Required: No
 *   - Description: Number of products per page (default: 16)
 *
 * @returns {ProductList} List of products with pagination metadata
 *
 * @testScenarios
 * - Valid request with default pagination
 * - Valid request with custom page and pageSize
 * - Request for page beyond available data
 * - Verify correct calculation of average ratings
 * - Verify nutritional summary format
 */
CREATE OR ALTER PROCEDURE [functional].[spProductList]
  @page INTEGER = 1,
  @pageSize INTEGER = 16
AS
BEGIN
  SET NOCOUNT ON;

  /**
   * @validation Validate pagination parameters
   * @throw {pageMustBePositive}
   */
  IF (@page < 1)
  BEGIN
    ;THROW 51000, 'pageMustBePositive', 1;
  END;

  /**
   * @validation Validate page size
   * @throw {pageSizeMustBePositive}
   */
  IF (@pageSize < 1)
  BEGIN
    ;THROW 51000, 'pageSizeMustBePositive', 1;
  END;

  DECLARE @offset INTEGER = (@page - 1) * @pageSize;
  DECLARE @totalProducts INTEGER;

  /**
   * @rule {be-database-requirement} Calculate total products for pagination
   */
  SELECT @totalProducts = COUNT(*)
  FROM [functional].[product] [prd];

  /**
   * @output {ProductList, n, n}
   * @column {INT} idProduct - Product identifier
   * @column {NVARCHAR} name - Product name
   * @column {VARCHAR} imageUrl - Product image URL
   * @column {NVARCHAR} shortDescription - Brief product description
   * @column {NUMERIC} price - Product price in BRL
   * @column {NUMERIC} averageRating - Average rating (0-5 scale)
   * @column {INT} reviewCount - Total number of reviews
   * @column {BIT} available - Product availability flag
   * @column {NVARCHAR} nutritionalSummary - JSON with calories, sugars, caffeine
   * @column {INT} totalProducts - Total number of products
   * @column {INT} currentPage - Current page number
   * @column {INT} pageSize - Products per page
   * @column {INT} totalPages - Total number of pages
   */
  SELECT
    [prd].[idProduct],
    [prd].[name],
    [prd].[imageUrl],
    [prd].[shortDescription],
    [prd].[price],
    ISNULL(AVG([prdRev].[rating]), 0.0) AS [averageRating],
    COUNT([prdRev].[idReview]) AS [reviewCount],
    [prd].[available],
    (
      SELECT
        [nutInf].[calories] AS [calorias],
        CAST([nutInf].[sugars] AS NVARCHAR(20)) + 'g' AS [acucares],
        CAST([nutInf].[caffeine] AS NVARCHAR(20)) + 'mg' AS [cafeina]
      FROM [functional].[nutritionalInfo] [nutInf]
      WHERE [nutInf].[idProduct] = [prd].[idProduct]
      FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    ) AS [nutritionalSummary],
    @totalProducts AS [totalProducts],
    @page AS [currentPage],
    @pageSize AS [pageSize],
    CEILING(CAST(@totalProducts AS FLOAT) / @pageSize) AS [totalPages]
  FROM [functional].[product] [prd]
    LEFT JOIN [functional].[productReview] [prdRev] ON ([prdRev].[idProduct] = [prd].[idProduct])
  GROUP BY
    [prd].[idProduct],
    [prd].[name],
    [prd].[imageUrl],
    [prd].[shortDescription],
    [prd].[price],
    [prd].[available],
    [prd].[salesCount]
  ORDER BY [prd].[salesCount] DESC
  OFFSET @offset ROWS
  FETCH NEXT @pageSize ROWS ONLY;
END;
GO
