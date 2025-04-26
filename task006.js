use("FirstBase");

db.Customers.aggregate([
    {
        $lookup: {
            from: "Ords",
            localField: "_id",
            foreignField: "customer._id",
            as: "orders"
        }
    },
    {
        $unwind: "$orders"
    },
    {
        $group: {
            _id: "$_id",
            name: { $first: "$name" },
            total_spent: { $sum: "$orders.total" },
            products: {
                $push: {
                    product_name: "$orders.products.product.name",
                    quantity: "$orders.products.quantity"
                }
            }
        }
    },
    {
        $match: { total_spent: { $gt: 100000 } }
    },
    {
        $project: {
            customer_name: "$name",
            products: 1
        }
    }
]);