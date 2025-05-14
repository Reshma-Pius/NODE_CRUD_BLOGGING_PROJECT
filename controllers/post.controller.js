//initial setup to understand contrller - routes

//method to list all blogpost in db
// function index(req, res){
//     const posts = "Posts List";
//     res.send(posts);
// }

// module.exports = {
//     index: index                    //export this so other files can acess
// }


const Validator = require('fastest-validator');             //import fastest validator for validation
//import model
const models = require('../models');

//method to get data from req body.
//----------------------------------------------------------------
// function save(req, res){
//     const post = {
//         title: req.body.title,
//         content: req.body.content,
//         imageUrl: req.body.image_url,
//         categoryId: req.body.category_id,
//         // userId: req.body.user_id                  //this will get from token
//         userId: 1
//     }
//     models.Post.create(post).then(result => {                   //create will return a promise
//         res.status(201).json({                                  //if resolved -> will return a success message
//             message: 'Post created successfully',
//             post: result
//         })
//     }).catch(error => {                                         //if not resolved -> will return a error message
//         res.status(500).json({
//             message: 'Something went wrong',
//             error: error
//         })

//     });
// }

// validate save 
function save(req, res){
    const post = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        // userId: 1                                    //initially hardcoded
        userId: req.userData.user                      //this will get from token
    }

    const schema = {
        title: {type: 'string', optional:false, max: 100},        //validation
        content: {type:'string',optional:false, max: 500},
        categoryId: {type: 'number', optional:false}
    }
    const v = new Validator() ;                                              // create a instance for vlidator class
    const validationResponse = v.validate(post, schema);                     //if validatio pass -> return true
    if(validationResponse !== true) {                                       //if validation failed -> return array of error messages
        res.status(400).json({
            message: 'Validation error',
            errors: validationResponse
        })
    }

    models.Category.findByPk(req.body.category_id).then(result => {
        if(result !== null){
            models.Post.create(post).then(result => {                   //create will return a promise
            res.status(201).json({                                  //if resolved -> will return a success message
                message: 'Post created successfully',
                post: result
            });
        }).catch(error => {                                         //if not resolved -> will return a error message
            res.status(500).json({
                message: 'Something went wrong',
                error: error
            });
        });
        }else{
            res.status(400).json({
                message: 'Invalid Category',
            });
        }
    });

    // models.Post.create(post).then(result => {                   //create will return a promise
    //         res.status(201).json({                                  //if resolved -> will return a success message
    //             message: 'Post created successfully',
    //             post: result
    //         });
    //     }).catch(error => {                                         //if not resolved -> will return a error message
    //         res.status(500).json({
    //             message: 'Something went wrong',
    //             error: error
    //         });
    //     });
}

//method to list all
function list(req, res){
    models.Post.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        })
    })
}

//method to list single object
function show(req, res) {
    const id = req.params.id;                           //to get single object
    // models.Post.findByPk(id).then(result => {             //findByPk -> get single obj with primiary key
    //     if (result){
    //         res.status(200).json(result);                 // if pk exist return 200
    //     }else{
    //         res.status(404).json({                        // if pk not found return 404
    //             message: 'Post not found'
    //         });
    //     }

    // implementing user & category association in show method
    models.Post.findByPk(id,{
        include:[models.Category, models.User]
    }).then(result => {             
        if (result){
            res.status(200).json(result);                 
        }else{
            res.status(404).json({                        
                message: 'Post not found'
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        })
    });
}  

//method to put
// function update(req, res) {
//     const id = req.params.id;                           //to get single object
//     const updatedPost = {
//         title: req.body.title,
//         content: req.body.content,
//         imageUrl: req.body.image_url,
//         categoryId: req.body.category_id,
//     }
//     const userId = 1;                                   //initially hardcoded bcoz we dont have user now
//     models.Post.update(updatedPost, {where: {id:id, userId:userId}}).then(result => {                             // update -> sequelize method ;   {where: {id:id, userId:userId}} -> condition
//         if (result[0] > 0){
//             res.status(200).json({
//                 message: 'Post updated successfully',
//                 post: updatedPost                            //to get the updated result
//             });
//         }else{
//             res.status(404).json({                        // if id or userId not match return 404
//                 message: 'Post not found or you are not authorized to update this post'
//             });
//         }
//     }).catch(error => {
//         res.status(500).json({
//             message: 'Something went wrong',
//             error: error
//         });
//     })                               
// }   


//vaidate put method
function update(req, res) {
    const id = req.params.id;                           //to get single object
    const updatedPost = {
        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
    }
    // const userId = 1;                                   //initially hardcoded bcoz we dont have user now
    const userId = req.userData.user                      //this will get from token

    const schema = {
        title: {type: 'string', optional:true, max: 100},        //validation
        content: {type:'string',optional:true, max: 500},
        categoryId: {type: 'number', optional:true}
    }
    const v = new Validator() ;                                              // create a instance for vlidator class
    const validationResponse = v.validate(updatedPost, schema);                     //if validatio pass -> return true
    if(validationResponse !== true) {                                       //if validation failed -> return array of error messages
        res.status(400).json({
            message: 'Validation error',
            errors: validationResponse
        })
    }

     models.Category.findByPk(req.body.category_id).then(result => {
        if(result !== null){
            models.Post.update(updatedPost, {where: {id:id, userId:userId}}).then(result => {                             // update -> sequelize method ;   {where: {id:id, userId:userId}} -> condition
            if (result[0] > 0){
                res.status(200).json({
                    message: 'Post updated successfully',
                    post: updatedPost                            //to get the updated result
                });
            }else{
                res.status(404).json({                        // if id or userId not match return 404
                    message: 'Post not found or you are not authorized to update this post'
                });
            }
        }).catch(error => {
            res.status(500).json({
                message: 'Something went wrong',
                error: error
            });
        })   
        }else{
            res.status(400).json({
                message: 'Invalid Category',
            });
        }
    });  
    // models.Post.update(updatedPost, {where: {id:id, userId:userId}}).then(result => {                             // update -> sequelize method ;   {where: {id:id, userId:userId}} -> condition
    //         if (result[0] > 0){
    //             res.status(200).json({
    //                 message: 'Post updated successfully',
    //                 post: updatedPost                            //to get the updated result
    //             });
    //         }else{
    //             res.status(404).json({                        // if id or userId not match return 404
    //                 message: 'Post not found or you are not authorized to update this post'
    //             });
    //         }
    //     }).catch(error => {
    //         res.status(500).json({
    //             message: 'Something went wrong',
    //             error: error
    //         });
    //     })                             
}   


//method to delete
function destroy(req, res) {
    const id = req.params.id;                           //to get single object
    // const userId = 1;                                   //initially hardcoded bcoz we dont have user now
    const userId = req.userData.user
    
    models.Post.destroy({where: {id:id, userId:userId}}).then(result => {                             // destroy -> sequelize method ;   {where: {id:id, userId:userId}} -> condition ; id -> from url; userId -> from token(initially hardcoded)
        if (result){       
            res.status(200).json({
                message: 'Post deleted successfully',
            });
        }else{
            res.status(404).json({                        // if id or userId not match return 404
                message: 'Post not found or you are not authorized to delete this post'
            });
        }
    }).catch(error => {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    })
}

module.exports = {
    save: save,                   //export this so other files can access
    show: show, 
    list: list,
    update: update, 
    destroy: destroy
}




