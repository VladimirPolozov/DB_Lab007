use("FirstBase");

db.Ords.aggregate([
    {
        $unwind: "$products"
    },
    {
        $group: {
            _id: "$_id",
            total_quantity: { $sum: "$products.quantity" }
        }
    },
    {
        $match: { total_quantity: { $gte: 100 } }
    },
    {
        $project: {
            _id: 0,
            order_id: "$_id",
            total_quantity: 1
        }
    }
]);