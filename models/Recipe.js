const mongoose = require('mongoose');
const { Schema } = mongoose;

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
    },
});

const recipeSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        },
        ingredients: [ingredientSchema],
        steps: [String],
        cookingTime: Number,
        servings: {
            type: Number,
            default: 4,
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
        },
        isVegetarian: {
            type: Boolean,
            default: false,
        },
        rating: {
            type: Number,
            min: 0,
            max: 5,
        }
    },
    {
        timestamps: true
    }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;