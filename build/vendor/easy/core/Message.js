'use strict';

var colors = require('colors');

function Message() {
    return {
        leftSpaces: '  ',

        error: function error(params) {
            if (undefined !== params.title && undefined !== params.message) {

                var consequence = params.consequence ? params.consequence : "";
                console.log('\n');
                console.log(this.getLeftSpaces() + colors.bgRed(colors.white("Error: " + params.title)));
                console.log(this.getLeftSpaces() + colors.bgRed(colors.white("    -> " + params.message)));
                console.log(this.getLeftSpaces() + colors.bgRed(colors.white(consequence)));
                console.log('\n');

                if (typeof params.exit !== "undefined" || !isNaN(params.exit)) {
                    process.exit(params.exit);
                }
            } else {
                this.error({
                    title: "Invalid arguments",
                    message: "Missing arguments to " + colors.underline.yellow("Message.error()") + " function."
                });
            }
        },

        warn: function warn(message) {
            console.log(this.getLeftSpaces() + colors.bgYellow(colors.black('WARN: ' + message)));
        },

        info: function info(message) {
            console.log(this.getLeftSpaces() + colors.cyan(message));
        },

        success: function success(message, exit) {
            console.log(this.getLeftSpaces() + colors.green(message));

            if (exit) {
                process.exit();
            }
        },

        getLeftSpaces: function getLeftSpaces() {
            return this.leftSpaces;
        }
    };
}

module.exports = Message;