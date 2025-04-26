use("FirstBase");

db.Emps.aggregate([
    {
        $match: { last_name: "Smith" }
    },
    {
        $lookup: {
            from: "Emps",
            localField: "dept._id",
            foreignField: "dept._id",
            as: "colleagues"
        }
    },
    {
        $unwind: "$colleagues"
    },
    {
        $lookup: {
            from: "Depts",
            localField: "colleagues.dept._id",
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
            last_name: "$colleagues.last_name",
            department_name: "$department.name",
            region_name: "$region.name"
        }
    }
]);