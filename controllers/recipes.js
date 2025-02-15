// controllers/recipes.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');

router.get('/new', async (req,res) => {
    try {
        res.render('recipes/new.ejs')
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.post('/', async (req,res) => {
    try {
        const newRecipe = new Recipe(req.body)
        newRecipe.owner = req.session.user._id

        await newRecipe.save()
        res.redirect('/recipes')

    } catch (error) {
        console.log(error)
        res.redirect('/')  
    }
})

router.get('/', async (req,res) => {
    try {

        const allRecipes = await Recipe.find().populate('owner')

        res.render('recipes/index.ejs', { recipes: allRecipes})
        
    } catch (error) {
        console.log(error)
        res.redirect('/')  
    }
})

router.get('/:recipeId', async (req, res) => {
    try {
        const recipeToShow = await Recipe.findById(req.params.recipeId).populate('owner')

        res.render('recipes/show.ejs',{ recipe: recipeToShow})
        
    } catch (error) {
        console.log(error)
        res.redirect('/')  
    }
})

router.delete('/:recipeId', async (req, res) => {
    try {
        await Recipe.findByIdAndDelete(req.params.recipeId)

        res.redirect('/recipes')
        
    } catch (error) {
        console.log(error)
        res.redirect('/')  
    }
})


router.get('/:recipeId/edit', async (req, res) => {
    try {
        const recipeToEdit = await Recipe.findById(req.params.recipeId)

        res.render('recipes/edit.ejs',{ recipe: recipeToEdit})
    } catch (error) {
        console.log(error)
        res.redirect('/') 
    }
})


router.put('/:recipeId', async (req,res) => {
    try {




        const recipeToEdit = await Recipe.findByIdAndUpdate(req.params.recipeId, req.body)
    
        res.redirect(`/recipes/${req.params.recipeId}`)

    } catch (error) {
        console.log(error.message)
        res.redirect('/')  
    }
})

module.exports = router;
