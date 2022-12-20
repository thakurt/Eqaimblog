const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,

    },

    des: {
        type: String,
        required: true,

    },
},
    {
        timestamps: true // it will create our updated and created at time
    });

module.exports = mongoose.model("Post", PostSchema)