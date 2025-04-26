use("FirstBase");

db.Emps.aggregate([
    {
        $lookup: {
            from: "Emps",
            localField: "manager",
            foreignField: "_id",
            as: "manager_details"
        }
    },
    {
        $unwind: {
            path: "$manager_details",
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $project: {
            _id: 1,
            last_name: 1,
            manager_id: "$manager_details._id",
            manager_last_name: "$manager_details.last_name"
        }
    }
]);