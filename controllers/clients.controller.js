
const bcrypt = require('bcryptjs');

const { createUserName } = require('../helpers/user-name.helper');

const Client = require('../models/client.model');

const newClient = async(req, res) => {

    const { email } = req.body.contact;
    const { password } = req.body.access;
    const { name, surname } = req.body;

    try {

        const emailExists = await Client.findOne({ 'contact.email': email });
        
        if(emailExists){
            return res.status(400).json({
                ok: false,
                msg: 'Email already in use'
            })
        };

        const client = new Client(req.body);

        const salt = bcrypt.genSaltSync();
        client.access.password = bcrypt.hashSync(password, salt);
        client.access.userName = createUserName(name, surname);
        client.img = 'no-image';
        client.createdBy = req.uid;

        client.save();

        res.status(200).json({
            ok: true,
            msg: 'Client created'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cannot create client'
        })
    }

}

const getClients = async (req, res) => {

    const from = Number(req.query.from || 0);
    const plan = String(req.params.plan);

    console.log(from)
    console.log(plan)

    try {

        if(plan === 'all'){
            const [ clients, total ] = await Promise.all([
                Client.find()
                    .skip(from)
                    .limit(5)
                    .sort({created: -1}),
                
                Client.countDocuments()
            ]);
            return res.json({
                ok: true,
                clients,
                total
            })
        }else{
            const [ clients, total ] = await Promise.all([
                Client.find({plan: plan})
                    .skip(from)
                    .limit(5)
                    .sort({created: -1}),
                
                Client.countDocuments({plan: plan})
            ]);
            return res.json({
                ok: true,
                clients,
                total
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cannot get clients'
        })
    }
}

const getClientById = async(req, res) => {

    const uid = String(req.params.id);

    try {

        const dbClient = await Client.findById(uid);

        res.status(200).json({
            ok: true,
            dbClient
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cannot get client by id'
        });
    }


}

const updateClient = async (req, res) => {

    const uid = req.params.id;
    const { email } = req.body.contact;

    try {

        const dbClient = await Client.findById(uid);
        
        if(email !== dbClient.contact.email){

            const emailExists = await Client.findOne({'contact.email': email});

            if(emailExists){
                return res.status(500).json({
                    ok: false,
                    msg: 'Email already in use'
                })
            }
        }

        let clientChanges = req.body;

        await Client.findByIdAndUpdate(uid, clientChanges, {new:true});

        res.status(200).json({
            ok: true,
            msg: 'Client updated'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cannot update client'
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

        await Client.findByIdAndUpdate(uid, {'$set': {'access.password': newPass}}, {useFindAndModify: false})
        
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

const updateRoutine = async(req, res) => {

    const uid = req.params.id;
    const data = req.body;

    try {

        await Client.findByIdAndUpdate(uid, {routine: data});

        res.status(200).json({
            ok: true,
            msg: 'Routine saved'
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Cannot update routine'
        })
    }

}




module.exports = { newClient, getClients, getClientById, updateClient, updatePassword, updateRoutine };