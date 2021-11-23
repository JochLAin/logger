const chalk = require('chalk');

const format = (message, section) => {
    if (!section) return [message];
    return [chalk.bold(`[${section.toUpperCase()}]`), message];
};

module.exports.log = (message, section) => {
    console.log(format(message, section).join(' ').trim());
};

module.exports.success = (message, section) => {
    console.log(chalk.green(...format(message, section)));
};

module.exports.error = (message, section) => {
    if (message instanceof Error) {
        const lines = message.message.split('\n');
        const title = lines.shift();
        const detail = lines.length && `  ${lines.join('\n  ')}`;
        const stacktrace = message.stack.split('\n').slice((message.message.match(/\n/g) || []).length + 1).join('\n');
        let msg = `${chalk.red.bold(`${message.name}:`)} ${chalk.red(title)}`;
        if (detail) msg += `\n${chalk.hex('#ff8a65')(detail)}`;
        msg += `\n${chalk.hex('#bf360c')(stacktrace)}`;
        console.error(...format(msg, section));
    } else {
        console.log(chalk.red(...format(message, section)));
    }
};

module.exports.warn = (message, section) => {
    console.log(chalk.yellow(...format(message, section)));
};

module.exports.info = (message, section) => {
    console.log(chalk.cyan(...format(message, section)));
};

module.exports.debug = (message, section) => {
    console.log(chalk.blue(...format(message, section)));
};
