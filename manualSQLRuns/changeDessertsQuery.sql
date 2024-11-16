-- DO NOT RUN THIS UNLESS U WANNA CHANGE THE DESSERT OPTIONS

UPDATE Desserts
SET
    DessertName = 'New Dessert Name',
    Cost = 6.99,
    ImageURL = '../assets/images/new-dessert.jpg'
WHERE
    DessertID = 3; -- Replace 3 with the ID of the dessert you want to change
