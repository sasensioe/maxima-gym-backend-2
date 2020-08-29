
const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.model');


const newAdmin = async(req, res = response) => {

    const { password } = req.body;
    const { email } = req.body.contact;

    try {

        const emailExists = await User.findOne({ 'contact.email': email });
        
        if(emailExists){
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            })
        }

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        user.save();

        res.status(200).json({
            ok: true,
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Failed user creation'
        })
    }

}

const getUsers = async (req, res = response) => {

    const from = Number(req.query.from || 0);
    const role = req.params.role;

    if(role === 'all'){
        const [ users, total ] = await Promise.all([
            User.find()
                .skip(from)
                .limit(5),
            
            User.countDocuments()
        ]);
        return res.json({
            ok: true,
            users,
            total
        })
    }else{
        const [ users, total ] = await Promise.all([
            User.find({role: role})
                .skip(from)
                .limit(5),
            
            User.countDocuments({role: role})
        ]);
        return res.json({
            ok: true,
            users,
            total
        })
    }





}

const newUser = async(req, res = response) => {

    const { email } = req.body.contact;
    const { password } = req.body.access;
    const { name, surname } = req.body;

    try {

        const emailExists = await User.findOne({ 'contact.email': email });
        
        if(emailExists){
            return res.status(400).json({
                ok: false,
                msg: 'Email already exists'
            })
        }

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.access.password = bcrypt.hashSync(password, salt);
        user.createdBy = req.uid;

        function createUserName(){

            let part1 = name.slice(0, 1);
            let splitted = surname.split(' ');
            let part2 = splitted[0];
            let splitted2 = splitted[1];
            let part3;
            let userName;

            if(splitted2){
                part3 = splitted2.slice(0,1);
                userName = (part1+part2+part3+"01").toLowerCase();
            }else{
                userName = (part1+part2+"01").toLowerCase();
            }

            return userName;

        }

        user.access.userName = createUserName();

        user.save();

        res.status(200).json({
            ok: true,
            msg: 'User created'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Failed user creation'
        })
    }

}

const getUser = async(req, res) => {

    const uid = req.params.id;
    const dbUser = await User.findById(uid);

    res.status(200).json({
        ok: true,
        dbUser
    })

}

const updateUser = async (req = request, res = response) => {

    const uid = req.params.id;
    const { email } = req.body.contact;

    try {
        const dbUser = await User.findById(uid);
        
        if(email !== dbUser.contact.email){

            const emailExists = await User.findOne({'contact.email': email});

            if(emailExists){
                return res.json({
                    ok: false,
                    msg: 'email already in use'
                })
            }
        }

        let userChanges = req.body;

        const updatedUser = await User.findByIdAndUpdate(uid, userChanges, {new:true})

        res.status(200).json({
            ok: true,
            updatedUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cannot update user'
        })
    }

}




module.exports = { newAdmin, getUsers, newUser, updateUser, getUser };