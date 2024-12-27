import chalk from "chalk";

const info = (...msg:any[]) => console.log(chalk.bgCyan.black(" AK "), chalk.green(...msg));
const error = (...msg: any[]) => console.log(chalk.bgRed.black(" AK "), chalk.red(...msg));
const success = (...msg: any[]) => console.log(chalk.bgGreen.black(" AK "), chalk.green(...msg));
const debug = (...msg: any[]) => console.log(chalk.bgBlue.black(" AK "), chalk.blue(...msg));

export default {
  info,
  error,
  debug,
  success,
}
