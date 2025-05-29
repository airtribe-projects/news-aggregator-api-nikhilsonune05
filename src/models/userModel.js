module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        preferences: {
            type: DataTypes.JSONB,
            defaultValue: {
                categories: [],
                languages: []
            }
        }
    }, { timestamps: true });

    return User;
};
