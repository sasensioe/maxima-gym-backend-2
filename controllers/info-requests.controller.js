
const InfoRequest = require('../models/info-request.model')

const newInfoRequest = async(req, res) => {

    try {

        const infoRequest = new InfoRequest({...req.body});

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



}

const getInfoRequest = async(req, res) => {

    

}

const updateInfoRequest = async(req, res) => {

    

}


module.exports = { newInfoRequest, getInfoRequests, getInfoRequest, updateInfoRequest }