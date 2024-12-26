import chalk from "chalk";
var info = function () {
    var msg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msg[_i] = arguments[_i];
    }
    return console.log(chalk.bgCyan.black(" AK INFO "), chalk.green.apply(chalk, msg));
};
var error = function () {
    var msg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msg[_i] = arguments[_i];
    }
    return console.log(chalk.bgRed.black(" AK ERROR "), chalk.red.apply(chalk, msg));
};
var success = function () {
    var msg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msg[_i] = arguments[_i];
    }
    return console.log(chalk.bgGreen.black(" AK SUCCESS "), chalk.green.apply(chalk, msg));
};
var debug = function () {
    var msg = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        msg[_i] = arguments[_i];
    }
    return console.log(chalk.bgBlue.black(" AK DEBUG "), chalk.blue.apply(chalk, msg));
};
export default {
    info: info,
    error: error,
    debug: debug,
    success: success,
};
