const Service = require('egg').Service;

class UserService extends Service {
    async login(user) {
        const result = await this.app.mysql.select('user', { where: { user } });
        return result;
    }
    async register(user, pwd, role) {
        const result = await this.app.mysql.insert('user', { user, pwd, role });
        return result;
    }
}

module.exports = UserService;