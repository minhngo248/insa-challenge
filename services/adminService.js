const { Admin } = require('../domains/models/admin');

async function authenticate(username, password) {
    return new Promise((resolve, reject) => {
        Admin.findOne({username: {$eq:username}, password: {$eq:password}}, (err, doc) => {
            return err ? reject(err) : resolve(doc);
        });
    }); 
}

async function findAdminById(id) {
    return new Promise((resolve, reject) => {
        Admin.findById(id, (err, doc) => {
            return err ? reject(err) : resolve(doc);
        });
    });
}

module.exports = {
    authenticate,
    findAdminById
};