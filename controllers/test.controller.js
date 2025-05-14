const models = require('../models');



async function test(req, res){

    // //one to one -> 1:1
    // // example : a user has 1 address & an address belongs to only 1 user
    // const user = await models.User.findByPk(5, {
    //     include:[models.Address]
    // });
    // const address = await models.Address.findByPk(1, {
    //     include:[models.User]
    // });
    // res.status(200).json({
    //     data: address
    // });

    // //one to many -> 1:m
    // // example : a user has many post
    // const user = await models.User.findByPk(5, {
    //     include:[models.Post]
    // });
    // res.status(200).json({
    //     data: user
    // });

    //many to many -> m:m
    //example : a post belongs to many categories
    const post = await models.Post.findByPk(2, {
        include:[models.Category]
    });
    const category = await models.Category.findByPk(6, {
        include:[models.Post]
    });
    res.status(200).json({
        data: category
    });

    
}



module.exports = {
    test: test
}