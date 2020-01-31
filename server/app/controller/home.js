'use strict';

const setRend = require('../utils/setRend');
const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
class HomeController extends Controller {
    async login() {
        const { ctx, app } = this;
        const { user, pwd } = ctx.request.body;
        const result = await ctx.service.user.login(user);
        if (!result.length > 0) {
            ctx.body = setRend(0, '用户账号未注册');

            return;
        }
        if (pwd != result[0].pwd) {
            ctx.body = setRend(0, '密码错误');
            return;
        }
        let token = jwt.sign({...result[0] }, app.config.keys);

        ctx.body = setRend(1, '登陆成功', { utype: result[0].role, token });
    }
    async register() {
        const { ctx } = this;
        const { user, pwd, role } = ctx.request.body;
        let data = await ctx.service.user.login(user);
        if (data.length > 0) {
            ctx.body = setRend(0, '用户已存在');
            return;
        } else {
            const result = await ctx.service.user.register(user, pwd, role);
            if (result.affectedRows > 0) {
                ctx.body = setRend(2, '注册成功');
            }
        }
    }
}

module.exports = HomeController;