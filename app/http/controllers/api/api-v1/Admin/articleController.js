const controller = require("app/http/controllers/api/controller")
const Article = require("app/models/article.model")
const sharp = require('sharp')
const fs = require('fs')
const path = require('path')
const mongoose = require("mongoose")

class ArticleController extends controller {

    async index(req, res) {
        try {
            const options = {
                page: req.query.page || 1,
                limit: 10,
                sort: {createdAt: 1},
                populate: [{path: "user", select: "name "}, {path: "categories"}]
            };
            let articles = await Article.paginate({}, options);

            return this.returnSuccessMessage(res, this.setDataOfArticle(articles))

        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    setDataOfArticle(articles) {
        return {
            docs: articles.docs.map(article => {
                return {
                    author: article.user.name,
                    title: article.title,
                    body: article.body,
                    thumb: article.thumb,
                    tags: article.tags,
                    createdAt: article.createdAt,
                    updatedAt: article.updatedAt,
                    categories: article.categories.map(category => {
                        return {
                            name: category.name
                        }
                    }),
                }
            }),
            "totalDocs": articles.totalDocs,
            "limit": articles.limit,
            "totalPages": articles.totalPages,
            "page": articles.page,
            "pagingCounter": articles.pagingCounter,
            "hasPrevPage": articles.hasPrevPage,
            "hasNextPage": articles.hasNextPage,
            "prevPage": articles.prevPage,
            "nextPage": articles.nextPage
        }
    }


    async store(req, res) {
        try {
            const status = this.ValidationData(req, res)
            if (!status) {
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return;
            }
            let {title, body, tags, categories} = req.body;

            let images = this.ResizeImage(req);


            let newArticle = new Article({
                user: req.user._id,
                title,
                slug: this.slug(title),
                body,
                images,
                thumb: images[480],
                tags,
                categories: categories.forEach(cat => mongoose.Types.ObjectId(cat))
            })
            await newArticle.save();
            return this.returnSuccessMessage(res, "مقاله مورد نظر با موفقیت ثبت شد ")
        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    async update(req, res) {
        try {
            if (this.isMongoId(req.params.id, res)) return;
            let status = await this.ValidationData(req, res)
            if (!status) {
                if (req.file)
                    fs.unlinkSync(req.file.path);
                return;
            }
         
            let ObjForUpdate = {}
            //set image thumb
            ObjForUpdate.thumb = req.body.imagesThumb;
            //check the new image uploaded if that's true: remove the old image and upload new image
            await this.CheckingNewImageUploaded(req, ObjForUpdate);
            //update course
            await this.updatingArticle(req, ObjForUpdate);

            return this.returnSuccessMessage(res, "مقاله مورد نظر با موفقیت ویرایش شد ")

        } catch (e) {
            return this.failed(e.message, res)
        }
    }

    async updatingArticle(req, ObjForUpdate) {
        delete req.body.images
        ObjForUpdate.slug = this.slug(req.body.title)
        await Article.findByIdAndUpdate(req.params.id, {$set: {...req.body, ...ObjForUpdate}})
    }

    async CheckingNewImageUploaded(req, ObjForUpdate) {
        if (req.file) {
            ObjForUpdate.images = this.ResizeImage(req)
            ObjForUpdate.thumb = ObjForUpdate.images[480];
            let article = await Article.findById(req.params.id)
            Object.values(article.images).forEach(image => fs.unlinkSync('./public' + image));
        }
    }

    async destroy(req, res) {
        try {

            if (this.isMongoId(req.params.article_id, res)) return;
            const article = await Article.findById(req.params.article_id)
            Object.values(article.images).forEach(image => fs.unlinkSync('./public' + image));
            await article.remove();

            return this.returnSuccessMessage(res, "مقاله مورد نظر با موفقیت پاک شد")

        } catch (e) {
            return this.failed(e.message, res)
        }

    }

    ResizeImage(req) {
        const imageInfo = path.parse(req.file.path);

        let imageAddress = {};

        imageAddress['original'] = this.getUrlImage(req.body.images);

        const resize = size => {
            let ImageName = `${imageInfo.name}-${size}${imageInfo.ext}`;
            imageAddress[size] = this.getUrlImage(req.file.destination + '/' + ImageName);
            sharp(req.file.path)
                .resize(size, null)
                .toFile(req.file.destination + '/' + ImageName)

        };


        [1080, 720, 480].map(resize)

        return imageAddress;
    }
}


module.exports = new ArticleController();