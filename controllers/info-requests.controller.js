
const InfoRequest = require('../models/info-request.model')

const newInfoRequest = async(req, res) => {

    try {

        let data = {...req.body, status: 'pending'};
        let infoRequest = new InfoRequest(data);

        await infoRequest.save();

        res.status(200).json({
            ok: true
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false
        })
    }

}

const getInfoRequests = async(req, res) => {

    const from = Number(req.query.from);

    try {

        const [requests, total] = await Promise.all([
            InfoRequest.find({status: 'pending'}).skip(from).limit(8),
            InfoRequest.countDocuments({status: 'pending'})
        ])

        res.status(200).json({
            ok: true,
            requests,
            total
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Cannot get info requests'
        })
    }


}

const getInfoRequest = async(req, res) => {

    const id = req.params.id;

    try {

        const request = await InfoRequest.findById(id);

        console.log(request)

        res.status(200).json({
            ok: true,
            request
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Cannot get request'
        })
    }

}

const setResponse = async(req, res) => {

    const response = req.body.response;
    const id = req.params.id;

    try {

        if(response){
            await InfoRequest.findByIdAndUpdate(id, {status: 'accept'}, {useFindAndModify:false});
            res.status(200).json({
                ok: true,
                msg:'Saved'
            })
        }else{
            await InfoRequest.findByIdAndDelete(id);
            res.status(200).json({
                ok: true,
                msg:'Deleted'
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Cannot set response'
        })
    }

}

const addCallLog = async(req, res) => {

    const id = req.params.id;

    try {

        let call = req.body;

        await InfoRequest.findByIdAndUpdate(id, {$push: {calls: call}});

        res.status(200).json({
            ok: true,
            call
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Cannot add call'
        })
    }


}

module.exports = { newInfoRequest, getInfoRequests, getInfoRequest, setResponse, addCallLog }