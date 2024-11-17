UPDATE Desserts
SET ImageURL = REPLACE(ImageURL, '../', '')
WHERE ImageURL LIKE '../%';
