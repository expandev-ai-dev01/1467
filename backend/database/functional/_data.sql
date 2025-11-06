/**
 * @load product
 */
INSERT INTO [functional].[product]
([name], [imageUrl], [shortDescription], [fullDescription], [price], [volume], [category], [available], [salesCount])
VALUES
('Monster Energy Original', 'https://example.com/images/monster-original.jpg', 'The original Monster Energy drink', 'Monster Energy is a carbonated energy drink that contains caffeine, taurine, B vitamins, and other ingredients. The original flavor delivers a smooth, easy-drinking experience.', 8.99, '473ml', 'Original', 1, 1250),
('Monster Energy Ultra', 'https://example.com/images/monster-ultra.jpg', 'Zero sugar, full Monster flavor', 'Monster Ultra is a lighter tasting, zero sugar energy drink with full Monster Energy flavor. Perfect for those who want energy without the calories.', 9.49, '473ml', 'Ultra', 1, 980),
('Monster Energy Juice', 'https://example.com/images/monster-juice.jpg', 'Energy + Juice blend', 'Monster Juice combines the energy of Monster with real fruit juice for a refreshing taste. Contains 100% daily value of Vitamin C.', 10.99, '473ml', 'Juice', 1, 750),
('Monster Energy Assault', 'https://example.com/images/monster-assault.jpg', 'Intense cherry lime flavor', 'Monster Assault delivers an intense cherry lime flavor with the full Monster Energy blend. Perfect for those who want a bold taste.', 8.99, '473ml', 'Original', 1, 620),
('Monster Energy Pipeline Punch', 'https://example.com/images/monster-pipeline.jpg', 'Tropical punch flavor', 'Monster Pipeline Punch is a tropical punch flavored energy drink with passion fruit, orange, and guava. A taste of the islands in every can.', 9.99, '473ml', 'Juice', 1, 890);
GO

/**
 * @load nutritionalInfo
 */
INSERT INTO [functional].[nutritionalInfo]
([idProduct], [servingSize], [calories], [sugars], [caffeine], [taurine], [sodium], [vitamins], [ingredients], [allergens])
VALUES
(1, '473ml', 210, 54.0, 160.0, 2000.0, 370.0, '{"B2": "3.6mg", "B3": "43mg", "B6": "4.2mg", "B12": "13mcg"}', 'Carbonated Water, Sucrose, Glucose, Citric Acid, Natural Flavors, Taurine, Sodium Citrate, Color Added, Panax Ginseng Root Extract, L-Carnitine L-Tartrate, Caffeine, Sorbic Acid, Benzoic Acid, Niacinamide, Sodium Chloride, Glucuronolactone, Inositol, Guarana Seed Extract, Pyridoxine Hydrochloride, Sucralose, Riboflavin, Maltodextrin, Cyanocobalamin', NULL),
(2, '473ml', 10, 0.0, 140.0, 2000.0, 370.0, '{"B2": "3.6mg", "B3": "43mg", "B6": "4.2mg", "B12": "13mcg"}', 'Carbonated Water, Citric Acid, Erythritol, Taurine, Sodium Citrate, Natural Flavors, Panax Ginseng Root Extract, L-Carnitine L-Tartrate, Caffeine, Sorbic Acid, Benzoic Acid, Niacinamide, Sucralose, Sodium Chloride, Glucuronolactone, Inositol, Guarana Seed Extract, Pyridoxine Hydrochloride, Riboflavin, Maltodextrin, Cyanocobalamin', NULL),
(3, '473ml', 180, 42.0, 160.0, 2000.0, 370.0, '{"C": "100% DV", "B2": "3.6mg", "B3": "43mg", "B6": "4.2mg", "B12": "13mcg"}', 'Carbonated Water, Concentrated Juices (Apple, Orange, Tangerine, White Grape), Sucrose, Glucose, Citric Acid, Taurine, Natural Flavors, Sodium Citrate, Panax Ginseng Root Extract, L-Carnitine L-Tartrate, Caffeine, Sorbic Acid, Benzoic Acid, Niacinamide, Ascorbic Acid, Sodium Chloride, Glucuronolactone, Inositol, Guarana Seed Extract, Pyridoxine Hydrochloride, Riboflavin, Maltodextrin, Cyanocobalamin', NULL),
(4, '473ml', 200, 52.0, 160.0, 2000.0, 370.0, '{"B2": "3.6mg", "B3": "43mg", "B6": "4.2mg", "B12": "13mcg"}', 'Carbonated Water, Sucrose, Glucose, Citric Acid, Natural Flavors, Taurine, Sodium Citrate, Color Added, Panax Ginseng Root Extract, L-Carnitine L-Tartrate, Caffeine, Sorbic Acid, Benzoic Acid, Niacinamide, Sodium Chloride, Glucuronolactone, Inositol, Guarana Seed Extract, Pyridoxine Hydrochloride, Sucralose, Riboflavin, Maltodextrin, Cyanocobalamin', NULL),
(5, '473ml', 190, 46.0, 160.0, 2000.0, 370.0, '{"C": "100% DV", "B2": "3.6mg", "B3": "43mg", "B6": "4.2mg", "B12": "13mcg"}', 'Carbonated Water, Concentrated Juices (Passion Fruit, Orange, Guava), Sucrose, Glucose, Citric Acid, Taurine, Natural Flavors, Sodium Citrate, Panax Ginseng Root Extract, L-Carnitine L-Tartrate, Caffeine, Sorbic Acid, Benzoic Acid, Niacinamide, Ascorbic Acid, Sodium Chloride, Glucuronolactone, Inositol, Guarana Seed Extract, Pyridoxine Hydrochloride, Riboflavin, Maltodextrin, Cyanocobalamin', NULL);
GO

/**
 * @load productReview
 */
INSERT INTO [functional].[productReview]
([idProduct], [rating])
VALUES
(1, 4.5),
(1, 5.0),
(1, 4.0),
(1, 4.5),
(1, 5.0),
(2, 4.8),
(2, 4.5),
(2, 5.0),
(2, 4.7),
(3, 4.2),
(3, 4.0),
(3, 4.5),
(4, 4.3),
(4, 4.0),
(5, 4.6),
(5, 4.8),
(5, 4.5);
GO
