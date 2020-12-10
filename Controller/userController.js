const {hashSync} = require("bcrypt");
const {genSaltSync} = require("bcrypt");
const {compareSync} = require("bcrypt");
const {sign} =require("jsonwebtoken")
const { create,
        getUsers,
        getUserById,
        updateUser,
        deleteUser,
        getUserByEmail
           } = require("../Services/userService")

module.exports ={
    createUser: (req,res) =>{
        if (!req.body.password) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }
        const body = req.body;
        const salt = genSaltSync(10);
        body.password =hashSync(body.password,salt)
        create(body,(results) =>{
            return res.status(200).json({
                success:1,
                data:results
            });
        });

    },
    getUserByUserId:(req,res) =>{
        const id = req.params.id;
        getUserById(id,(results) =>{
            if(!results){
                return res.json({
                    success:0,
                    message:"Recod not Found"
                });
            }
            return res.json({
                success:1,
                data:results
            });
        });
    },
    getAllUsers:(req,res) =>{
        getUsers((results) => {
            return res.json({
               results
            });
        });
    },
    updateSpecificUser:(req,res) => {
        const body = req.body;
        const salt =genSaltSync(10);
        body.password = hashSync(body.password,salt);
        updateUser(body, (results) => {
            if (results != 1){
                return res.json({
                    success:0,
                    message:"update Failed"
                });
            }
           return res.json({
              success:1,
              message:"update successfully"
           });
        });
    },
    deleteUsers: (req,res) =>{
        const data = req.body;
        deleteUser(data, (results) => {
            return res.json({
                success:1,
                data:results
            });
        });
    },
    login:(req,res) =>{
        const  body = req.body;
        getUserByEmail(body.email,(results)=>{
            if(!results){
                return res.json({
                    success:0,
                    data:"Invalid email or Password"
                });
            }
            console.log('*****',)
            const result = compareSync(body.password,results.password);
            if(result) {
                result.password = undefined;
                const jsontoken = sign({result: results}, "qwe1234", {
                    expiresIn: "1h"
                });
                return res.json({
                    success: 1,
                    message: "Login Successfully",
                    token: jsontoken
                });
            }else {
                return res.json({
                    success:0,
                    data:"Invalid email or Password"
                });
            }
        });

    }

}