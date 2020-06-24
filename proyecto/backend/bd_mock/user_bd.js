let userId = 1; 
// array de usuarios con usuario administrador creado previamente
let users = [
    {
        userId: 0,
        email: 'admin@gmail.com',
        password: '$2b$10$0wIm2T056QcHc.GLtGJgyuvNfimLe/xcpjWBC934NBbJXxTGt8K/u',
        role: 'admin'
    }
];
// recuperación de usuario por email
const getUser = (email) => {
    return users.find(user => user.email === email);
}
// recuperación de usuario por id
const getUserById = (id) => {
    return users.find(user => user.userId === id);
}
// registro de usuario nuevo
const saveUser = (name, surname, email, password, role) => {
    users.push({
        userId: userId++,
        name,
        surname,
        email,
        password,
        role
    })

}
// actualización de usuario según los campos pasados en el data 
const updateProfile = (id, data) => {
    let user = getUserById(id);
    Object.keys(data).forEach(field => {
        user[field] = data[field]
    });
}
// eliminación de perfil de usuario
const deleteProfile = (id) => {
    users = users.filter(user => user.userId !== id);
}

module.exports = {
    getUser,
    getUserById,
    updateProfile,
    deleteProfile,
    saveUser
}