const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        slug: {
            type: String,
            unique: true
        },
        description: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);



categorySchema.pre('save', async function(next) {
    try {
        this.slug = this.name.trim().toLowerCase().replace("_", '-');
        next();
    } catch (err) {
        next(err);
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;