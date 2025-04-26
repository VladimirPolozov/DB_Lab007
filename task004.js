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
            customer_id: "$_id",
            customer_name: "$name",
            order_ids: {
                $map: {
                    input: "$orders",
                    as: "order",
                    in: "$$order._id"
                }
            }
        }
    }
]);