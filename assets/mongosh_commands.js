// fetch blogs with author and comments
db.blogs.aggregate([ 
    { $lookup: { from: 'users', localField: 'authorId', foreignField: '_id', as: 'user' } },
    { 
        $lookup: { 
            from: 'comments', 
            localField: '_id', 
            foreignField: 'blogId', 
            as: 'comments',
            $lookup: {
                from: 'users', 
                localField: 'userId', 
                foreignField: '_id', 
                as: 'user',
            }
        } 
    },
    { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },
]). pretty()

db.blogs.aggregate([ 
    { $lookup: { from: 'users', localField: 'authorId', foreignField: '_id', as: 'user' } }, 
    { $lookup: { 
        from: 'comments', localField: '_id', foreignField: 'blogId', as: 'comments', 
    } 
}, { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } }]). pretty()