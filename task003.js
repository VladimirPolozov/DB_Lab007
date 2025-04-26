use("FirstBase")

db.Ords.aggregate([
    {
        $match: { date_ordered: new Date("1992-08-31T16:00:00Z") }
    },
    {
        $unwind: "$products"
    },
    {
        $lookup: {
            from: "Products",
            localField: "products.product._id",
            foreignField: "_id",
            as: "product_details"
        }
    },
    {
        $unwind: "$product_details"
    },
    {
        $project: {
            product_name: "$product_details.name",
            product_id: "$product_details._id",
            quantity: "$products.quantity"
        }
    }
]);