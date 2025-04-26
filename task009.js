use("FirstBase");

db.Ords.aggregate([
    {
        $unwind: "$products"
    },
    {
        $group: {
            _id: "$products.product._id",
            product_name: { $first: "$products.product.name" },
            order_count: { $sum: 1 }
        }
    },
    {
        $match: { order_count: { $gte: 3 } }
    },
    {
        $project: {
            product_name: 1,
            order_count: 1
        }
    }
]);