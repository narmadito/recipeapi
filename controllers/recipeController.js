const Recipe = require('../models/recipe')

const createRecipe = async (req, res) => {
    try {
        const newRecipe = await Recipe.create(req.body)
        res.status(201).json(newRecipe)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const getAllRecipes = async (req, res) => {
    try {
        const { difficulty, isVegetarian, category, sort, order, page, limit } = req.query
        const filter = {}

        if (difficulty) {
            filter.difficulty = difficulty
        }

        if (isVegetarian !== undefined) {
            filter.isVegetarian = isVegetarian === 'true'
        }

        if (category) {
            filter.category = category
        }

        const sortOption = {}
        if (sort) {
            sortOption[sort] = order === 'asc' ? 1 : -1
        }

        const allRecipes = await Recipe.find(filter)
            .sort(sortOption)
            .skip(((page || 1) - 1) * (limit || 10))
            .limit(Number(limit) || 10)

        res.status(200).json(allRecipes)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

module.exports = {
    createRecipe,
    getAllRecipes,
}