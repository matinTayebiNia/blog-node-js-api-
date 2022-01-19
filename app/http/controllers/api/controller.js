const autoBind = require("auto-bind")
const isMongoId = require('validator/lib/isMongoId');
const {validationResult} = require('express-validator')
const jsonWebToken = require("jsonwebtoken")
const Category = require("app/models/category.model")

module.exports = class controller {
    constructor() {
        autoBind(this)
    }

    async getMultiLevelCategory() {
        const categoriesAggregate = await this.getChileCategory()
        let categories = []
        categoriesAggregate.map(category => {
            let single_child = this.list_to_tree(category.childCategory);
            let obj = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: single_child
            };
            categories.push(obj)
        })
        return categories;
    }

    list_to_tree(list) {
        let node2;
        let map = {}, node, roots = [], i;
        for (i = 0; i < list.length; i += 1) {
            map[list[i]._id] = i;
            list[i].children = [];
        }
        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            if (node.parent !== null && map[node.parent] !== undefined) {
                node2 = {         //Because i need only _id,Title & childrens
                    _id: node._id,
                    name: node.name,
                    slug:node.slug,
                    children: node.children
                };
                list[map[node.parent]].children.push(node2); //You can push direct "node"
            } else {
                node2 = {
                    _id: node._id,
                    name: node.name,
                    slug:node.slug,
                    children: node.children
                };
                roots.push(node2);
            }
        }
        return roots;
    }

    getChileCategory() {
        return Category.aggregate().match({parent: null})
            .graphLookup(
                {
                    from: 'categories',
                    startWith: '$_id',
                    connectFromField: '_id',
                    connectToField: 'parent',
                    as: 'childCategory',
                })
    }

    returnSuccessMessage(res, msg) {
        return res.status(200).json({
            data: msg,
            status: "success"
        })
    }

    failed(msg, res, statusCode = 500) {
        return res.status(statusCode).json({
            data: msg,
            status: "error"
        })
    }

    isMongoId(paramId, res) {
        if (!isMongoId(paramId))
            return this.failed('ای دی وارد شده صحیح نیست', res, 404);
    }

    getUrlImage(dir) {
        return dir.substring(8);
    }

    slug(subject) {
        return subject.replace(/([^۰-۹آ-یa-z0-9]|-)+/g, "-")
    }

    ValidationData(req, res) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const errors = result.array();
            const message = [];
            errors.map(item => {
                message.push({'param': item.param, 'msg': item.msg})
            })
            this.failed(message, res, 403)
            return false;
        }
        return true;
    }

    createTokenAndSend(user, res) {
        const token = jsonWebToken.sign({
            id: user.id,
        }, config.secretKayJwt, {
            expiresIn: 60 * 60 * 24
        })
        return this.returnSuccessMessage(res, {
            accessToken: token,
        })
    }
}