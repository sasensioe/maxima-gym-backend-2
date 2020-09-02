const path = require('path');
const cloudinary = require('cloudinary');
const fs = require('fs');

const Article = require('../models/article.model')

const { imageUpdate } = require('../helpers/imageUpdate.helper');

cloudinary.config({ 
    cloud_name: 'dxia9znx5', 
    api_key: 527528975557857, 
    api_secret: 'Ni5c114I2_xNiUR_A1s4wHOvoyc'
});


const imageUpload = async(req, res = response) => {

    console.log(req)
    const collection = req.params.collection;
    const id = req.params.id;
    const validCollections = ['articles', 'customers', 'users'];

    // check collection
    if( !validCollections.includes(collection) ){
        return res.status(400).json({
            ok: false,
            msg: 'Collection not valid'
        })
    }

    // check if image exists
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok: false,
            msg: 'No file uploaded'
        })
    }

    // process image
    const file = req.files.image;

    // check extension
    const splittedFile = file.name.split('.');
    const fileExtension = splittedFile[splittedFile.length - 1];
    
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];
    
    if(!validExtensions.includes(fileExtension)){
        return res.status(400).json({
            ok: false,
            msg: 'Extension not valid'
        })
    };

    // generate temp file name and file path
    const fileName = `${id}.${fileExtension}`;
    const filePath = `./images/temp/${fileName}`;

    // move temp file to path
    file.mv(filePath, (err) => {
        if(err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Cannot move image'
            })
        }
    })

    // delete old file from cloudinary
    cloudinary.v2.uploader.destroy(id).then(resp => console.log(resp))

    // upload temp file to cloudinary
    const dbImage = await cloudinary.v2.uploader.upload(filePath, {public_id: fileName, folder: collection}, (error, result) => {
        if(error){
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Cannot upload image'
            })
        }
        return result.data;
    })

    const url = dbImage.url;

    // update database
    await imageUpdate(collection, id, dbImage);

    res.status(200).json({
        ok: true,
        msg: 'Image uploaded',
        url
    })

    // delete temp img
    fs.unlinkSync(filePath);

}


const getImage = (req, res = response) => {

    const collection = req.params.collection;
    const image = req.params.image;

    const pathImg = path.join( __dirname, `../images/${collection}/${image}` );

    // defect img
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const noImage = path.join( __dirname, `../images/no-image.png` );
        res.sendFile(noImage)
    }

}

module.exports = { imageUpload, getImage };