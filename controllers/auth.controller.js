
const { response } = require('express');

const { generateJWT } = require('../helpers/jwt.helper')

const bcrypt = require('bcryptjs');

const User = require('../models/user.model');


const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        
        const dbUser = await User.findOne({ 'contact.email': email });

        if(!dbUser){
            return res.status(500).json({
                ok: false,
                msg: 'Email not valid'
            })
        }

        const validPassword = bcrypt.compareSync(password, dbUser.access.password);

        if(!validPassword){
            return res.status(500).json({
                ok: false,
                msg: 'Password not valid'
            })
        }

        const token = await generateJWT(dbUser.id);

        res.status(200).json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cannot login'
        })
    }
}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    const user = await User.findById(uid);
    const token = await generateJWT(uid);

    res.json({
        ok: true,
        token,
        user
    })



}

module.exports = { login, renewToken }