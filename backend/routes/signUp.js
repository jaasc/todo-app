const express = require('express');
const User = require('../models/users');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(80).email().required(),
        password: Joi.string().min(4).max(1024).required()
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try{
        let postUser = await User.findOne({email: req.body.email});
        if (postUser) return res.status(400).send("Email already exists");
        
        const { name, email, password } = req.body;
        postUser = new User({
            name, email, password
        });

        const salt = await bcrypt.genSalt(10);
        postUser.password = await bcrypt.hash(postUser.password, salt);

        await postUser.save();
        const secretKey = process.env.SECRET_KEY;
        const token = jwt.sign({ _id: postUser._id, name: postUser.name, email: postUser.email }, 
            secretKey);

        res.json(token);
    } catch (e) {
        res.status(500).json({message: e});
    }
})

module.exports = router;
