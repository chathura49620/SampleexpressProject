module.exports = (sequelize, Sequelize) => {
    const Registration = sequelize.define("registration", {
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        number: {
            type: Sequelize.STRING
        }
    });

    return Registration;
};