
const bcrypt = require('bcryptjs');

const { createUserName } = require('../helpers/user-name.helper');

const User = require('../models/user.model');


const newAdmin = async(req, res) => {

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

const newUser = async(req, res) => {

    const { email } = req.body.contact;
    const { password } = req.body.access;
    const { name, surname } = req.body;

    try {

        const emailExists = await User.findOne({ 'contact.email': email });
        
        if(emailExists){
            return res.status(400).json({
                ok: false,
                msg: 'Email already in use'
            })
        };

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.access.password = bcrypt.hashSync(password, salt);
        user.access.userName = createUserName(name, surname);
        user.img = 'no-image';
        user.createdBy = req.uid;

        user.save();

        res.status(200).json({
            ok: true,
            msg: 'User created'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cannot create user'
        })
    }

}

const getUsers = async (req, res) => {

    const from = Number(req.query.from || 0);
    const role = String(req.params.role);

    try {

        if(role === 'all'){
            const [ users, total ] = await Promise.all([
                User.find()
                    .skip(from)
                    .limit(5)
                    .sort({created: -1}),
                
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
                    .limit(5)
                    .sort({created: -1}),
                
                User.countDocuments({role: role})
            ]);
            return res.json({
                ok: true,
                users,
                total
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cannot get users'
        })
    }
}

const getUserById = async(req, res) => {

    const uid = String(req.params.id);

    try {

        const dbUser = await User.findById(uid);

        res.status(200).json({
            ok: true,
            dbUser
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cannot get user by id'
        });
    }


}

const updateUser = async (req, res) => {

    const uid = req.params.id;
    const { email } = req.body.contact;

    try {

        const dbUser = await User.findById(uid);
        
        if(email !== dbUser.contact.email){

            const emailExists = await User.findOne({'contact.email': email});

            if(emailExists){
                return res.status(500).json({
                    ok: false,
                    msg: 'Email already in use'
                })
            }
        }

        let userChanges = req.body;

        await User.findByIdAndUpdate(uid, userChanges, {new:true});

        res.status(200).json({
            ok: true,
            msg: 'User updated'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cannot update user'
        })
    }

}

const checkPassword = async(req, res) => {

    const uid = String(req.params.id);
    const password = String(req.query.pass);

    try {

        const user = await User.findById(uid);

        const validPass = bcrypt.compareSync(password, user.access.password);

        if(!validPass){
            res.status(500).json({
                ok: false,
                msg: 'Password not valid'
            })
        }else{
            res.status(200).json({
                ok: true
            })
        }
        
    } catch (error) {
        console.log(error)
    }

}

const updatePassword = async(req, res) => {

    const uid = String(req.params.id);
    const pass = String(req.body.pass);

    try {

        const salt = bcrypt.genSaltSync();
        const newPass = bcrypt.hashSync(pass, salt);

        await User.findByIdAndUpdate(uid, {'$set': {'access.password': newPass}})
        
        res.status(200).json({
            ok: true,
            msg: 'Password saved'
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Cannot save password'
        })
    }

}




module.exports = { newAdmin, getUsers, newUser, updateUser, getUserById, checkPassword, updatePassword };