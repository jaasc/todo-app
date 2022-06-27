const express = require('express');
const Todo = require('../models/todo');
const Joi = require('joi');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    try{
        const getTodo = await Todo.find().sort({ date: -1 });
        const filteredTodo = getTodo.filter(todo => (todo.userID === req.user._id));
        res.json(filteredTodo);
    } catch (e){
        res.status(500).json({message: e});
    }
})

router.post('/', auth, async (req, res) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(200).required(),
        userID: Joi.string(),
        isComplete: Joi.boolean(),
        date: Joi.date()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { title, userID, isComplete, date } = req.body;
    let postTodo = new Todo({
        title, userID, isComplete, date
    })
    
    try{
        postTodo = await postTodo.save();
        res.json(postTodo);
    } catch (e){
        res.status(500).json({message: e});
    }
})

router.patch('/:id', auth, async (req, res) => {
    const findTodo = await Todo.findById(req.params.id);
    if (!findTodo) return res.status(404).send("Todo Not Found");

    if (findTodo.userID !== req.user._id) return res.status(401).send("User not authorized to update");

    try{
        const updateComplete = await Todo.findByIdAndUpdate(req.params.id,{
             isComplete: !findTodo.isComplete 
        }, {
             new: true 
        })
        res.json(updateComplete);
    } catch (e){
        res.status(500).json({message: e});
    }
})

router.put('/:id', auth, async (req, res) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(200).required(),
        userID: Joi.string(),
        isComplete: Joi.boolean(),
        date: Joi.date()
    })

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { title, userID, isComplete, date } = req.body;
    const findTodo = await Todo.findById(req.params.id);
    if (!findTodo) return res.status(404).send("Todo Not Found");

    if (findTodo.userID !== req.user._id) return res.status(401).send("User not authorized to update");
    
    try{
        const updateTodo = await Todo.findByIdAndUpdate(req.params.id,
            { title, userID, isComplete, date }, 
            {  new: true });
        res.json(updateTodo);
    } catch (e){
        res.status(500).json({message: e});
    }
})

router.delete('/:id', auth, async (req, res) => {
    const findTodo = await Todo.findById(req.params.id);

    if (findTodo){
        if (findTodo.userID !== req.user._id) 
            return res.status(401).send("User not authorized to delete");
    }

    try{
        if (findTodo){
            const deleteTodo = await Todo.findByIdAndDelete(req.params.id);
            res.json(deleteTodo);
        } else {
            const deleteComplete = await Todo.deleteMany({
                isComplete : true
            });
            res.json(deleteComplete);
        }
    } catch (e){
        res.status(500).json({message: e});
    }
})

module.exports = router;