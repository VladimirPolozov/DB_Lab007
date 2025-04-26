use("FirstBase");


db.Emps.aggregate([
    {
        $match: { commission_pct: { $ne: null } }
    },
    {
        $lookup: {
            from: "Depts",
            localField: "dept._id",
            foreignField: "_id",
            as: "department"
        }
    },
    {
        $unwind: "$department"
    },
    {
        $lookup: {
            from: "Regions",
            localField: "department.region",
            foreignField: "_id",
            as: "region"
        }
    },
    {
        $unwind: "$region"
    },
    {
        $project: {
            last_name: 1,
            department_name: "$department.name",
            region_name: "$region.name"
        }
    }
]);