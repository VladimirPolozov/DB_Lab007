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
        $project: {
            customer_name: "$name",
            order_count: { $size: "$orders" }
        }
    }
]);