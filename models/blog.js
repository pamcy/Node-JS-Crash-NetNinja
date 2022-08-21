const mongoose = require('mongoose')
const Schema = mongoose.Schema

// define the structure of our document
const blogSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    snippet: {
        type: String,
        require: true,
    },
    body: {
        type: String,
        require: true,
    }
}, { timestamps: true })

// timestamps:
// the option tells Mongoose to assign 'createdAt' and 'updatedAt' fields to your schema automatically.


/* 
 * create a model based on the blogSchema
 * 1. compile schema into a model
 * 2. take 2 parameters
 *  - first: the name of the Model (mongoose going to pluralize it and look for that collection inside the database whenever we use this model)
 *      - automatically find the collection in DB based on this name 'Blog'
 *  - second: schema, what type of object are we goging to store in this collection
*/
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog