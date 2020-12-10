const pool = require("../config/database");
const db = require("../models");
const Registration = db.registration;
const Op = db.Sequelize.Op;

module.exports = {
    create:(data,callBack) => {
        const registration = {
            first_name: data.first_name,
            last_name: data.last_name,
            gender: data.gender,
            email: data.email,
            password: data.password,
            number: data.number
        };
        Registration.create(registration)
            .then((results) =>{
                            if(results){
                              return callBack(results);
                            }

                        });
    },
    getUsers:callBack => {
        Registration.findAll()
            .then((results)=>{
                if(results){
                    return callBack(results);
                }
            });
    },
    getUserById:(id,callBack) =>{
        var id1 = id;
        Registration.findByPk(id1)
            .then(results=>{
                if(results){
                    return callBack(results);
                }});
    },
    updateUser:(data,callBack) => {

        Registration.update(data, {
            where: { id: data.id }
        })
            .then(results => {
                if (results == 1) {
                    return callBack(results)

                }
            })
    },
    deleteUser:(data,callBack) => {
        Registration.destroy({
            where: { id: data.id }
        }).then((results)=>{
            if(results){
                return callBack(results);
            }});

    },
    getUserByEmail:(email,callBack) =>{

        Registration.findAll({ where: {email: email} })
            .then((results) => {
                return callBack(results);
            }).catch(err => {
                message:
                    err.message || "Some error occurred while retrieving tutorials."

        });
        // pool.query(
        //     'select * from registration where email = ?',
        //     [email],
        //     (error,results,fields) =>{
        //         if(error){
        //             return callBack(error);
        //         }
        //         return callBack(null,results[0])
        //     }
        // );

    }

}

