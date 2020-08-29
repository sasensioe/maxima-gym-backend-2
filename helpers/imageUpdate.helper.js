
const User = require('../models/user.model');
const Article = require('../models/article.model');


const imageUpdate = async (collection, id, dbImage) => {

    const update = {img: dbImage.url};

    switch(collection){

        case 'articles':
            const article = await Article.findByIdAndUpdate(id, update, { useFindAndModify: false });

            if(!article){
                console.log('Article not found')
                return false;
            }
        break;

        case 'users':
            const user = await User.findByIdAndUpdate(id, update, { useFindAndModify: false });

            if(!user){
                console.log('User not found')
                return false;
            }
        break;
    }

};

module.exports = { imageUpdate }