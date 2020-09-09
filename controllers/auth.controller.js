
const { response } = require('express');

const { generateJWT } = require('../helpers/jwt.helper')

const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const Client = require('../models/client.model')


const teamLogin = async (req, res = response) => {
    console.log('team')
    const email = String(req.body.email);
    const password = String(req.body.password);

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

const membersLogin = async (req, res = response) => {

    const email = String(req.body.email);
    const password = String(req.body.password);

    try {
        
        const dbClient = await Client.findOne({ 'contact.email': email });

        if(!dbClient){
            return res.status(500).json({
                ok: false,
                msg: 'Email not valid'
            })
        }

        const validPassword = bcrypt.compareSync(password, dbClient.access.password);

        if(!validPassword){
            return res.status(500).json({
                ok: false,
                msg: 'Password not valid'
            })
        }

        const token = await generateJWT(dbClient.id);

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

const renewUserToken = async(req, res = response) => {

    try {

        const uid = req.uid;

        const user = await User.findById(uid);
        const token = await generateJWT(uid);
    
        res.json({
            ok: true,
            token,
            user
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cannot renew user token'
        })
    }

}

const renewClientToken = async(req, res = response) => {

    const uid = req.uid;

    const client = await Client.findById(uid);
    const token = await generateJWT(uid);

    res.json({
        ok: true,
        token,
        client
    })



}

module.exports = { teamLogin, membersLogin, renewUserToken, renewClientToken }