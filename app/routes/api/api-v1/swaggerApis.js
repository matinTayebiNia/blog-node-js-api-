/**
/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: objectId
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: the name of user
 *         email:
 *           type: string
 *           description: the email of user
 *         password:
 *           type: string
 *           description: the password of user
 *         admin:
 *           type: Boolean
 *           description: with this filed system know the user is admin or not
 *         roles:
 *           type: array(objectId)
 *           description: According to this field, the system can allow access to the user.
 *       example:
 *         id: dkdha31u3h1bddah731
 *         name: matinTayebi
 *         email: matintayebinia@gmail.com
 *         password: $2a$15$NW8vflaCZZDUm2URd4XEbOsBBiXo3N4xMzCaKbzjaQrbUNFMTIYSO
 *         admin: true | false
 *         roles: ["hjjdhda7731yg31udhaw731"]
 *
 *     role:
 *       type: object
 *       required:
 *         - name
 *         - label
 *         - permissions
 *       properties:
 *         id:
 *           type: objectId
 *           description: The auto-generated id of the role
 *         name:
 *           type: string
 *           description: the name of role
 *         label:
 *           type: string
 *           description: the label of role
 *         permissions:
 *           type: array(objectId)
 *           description: the permissions role
 *       example:
 *         id: dkdha31u3h1bddah731
 *         name: role-name
 *         label: label of role
 *         permission: ["jhkhdwakjdkajwhkj54578"]
 *
 *     permission:
 *       type: object
 *       required:
 *         - name
 *         - label
 *       properties:
 *         id:
 *           type: objectId
 *           description: The auto-generated id of the permission
 *         name:
 *           type: string
 *           description: the name of permission
 *         label:
 *           type: string
 *           description: the label of permission
 *       example:
 *         id: dkdha31u3h1bddah731
 *         name: permission-name
 *         label: label of permission
 *     password-reset:
 *       type: object
 *       required:
 *         - email
 *         - token
 *       properties:
 *         id:
 *           type: objectId
 *           description: The auto-generated id of the password-reset
 *         email:
 *           type: string
 *           description: The email of user
 *         token:
 *           type: string
 *           description: The token of password-reset
 *         use:
 *           type: Boolean
 *           description: with this filed system know  token used or not
 *       example:
 *         id: dkdha31u3h1bddah731
 *         email: matintayebinia@gmail.com
 *         token: dwa6d987a9dhwdwaddawaddjao987
 *     like:
 *       type: object
 *       required:
 *         - user
 *         - article
 *       properties:
 *         id:
 *           type: objectId
 *           description: The auto-generated id of the like
 *         user:
 *           type: objectId
 *           description: The user of article
 *         article:
 *           type: objectId
 *           description: id The article for which the like was registered
 *       example:
 *         id: dkdha31u3h1bddah731
 *         user: Alexander K. Dewdney
 *         article: dwa6d987a9dhwaddjao987
 *     comment:
 *       type: object
 *       required:
 *         - comment
 *         - article
 *         - user
 *       properties:
 *         id:
 *           type: objectId
 *           description: The auto-generated id of the comment
 *         article:
 *           type: objectId
 *           description: id The article for which the comment was registered
 *         user:
 *           type: objectId
 *           description: The user of comment
 *         parent:
 *           type: objectId | null
 *           description: The parent of comment
 *         approved:
 *           type: Boolean
 *           description: The approved of comment
 *         comment:
 *           type: string
 *           description: The body of comment
 *       example:
 *         id: dwa6d987a9dhwaddjao987
 *         parent: this can be null or id of comment
 *         user: Alexander K. Dewdney
 *         article: dwa6d987a9dhwaddjao987
 *         comment: this is body of comment
 *     category:
 *       type: object
 *       required:
 *         - name
 *         - slug
 *       properties:
 *         id:
 *           type: objectId
 *           description: The auto-generated id of the category
 *         parent:
 *           type: objectId | null
 *           description: the parent of category
 *         name:
 *           type: string
 *           description: the name of category
 *         slug:
 *           type: string
 *           description: the slug of category
 *       example:
 *         id: dwa6d987a9dhwaddjao987
 *         parent: this can be null or id of category
 *         name: name category
 *         slug: It generates the slug system itself by name
 *     article:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - images
 *         - body
 *         - categories
 *         - tags
 *       properties:
 *         id:
 *           type: objectId
 *           description: The auto-generated id of the article
 *         title:
 *           type: string
 *           description: The article title
 *         author:
 *           type: objectId
 *           description: The article author
 *         body:
 *           type: string
 *           description: The article body
 *         images:
 *           type: object(string)
 *           description: The article images
 *         categories:
 *           type: array(string)
 *           description: The article category
 *         tags:
 *           type: string
 *           description: The article tags
 *         commentCount:
 *           type: Number
 *           description: the article commentCount
 *         viewCount:
 *           type: Number
 *           description: the article viewCount
 *         likes:
 *           type: Number
 *           description: the article likes
 *         thumb:
 *           type: string
 *           description: the article image
 *         slug:
 *           type: string
 *           description: the article slug
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         images: localhost:3000/upload/images/image.jpg
 *         body: this is body
 *         categories: ["jhkhdwakjdkajwhkj54578"]
 *         tags: swagger
 */





