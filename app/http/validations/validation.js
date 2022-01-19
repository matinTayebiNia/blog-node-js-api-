const autoBind = require("auto-bind")
module.exports = class validation {
    constructor() {
        autoBind(this)
    }
}
