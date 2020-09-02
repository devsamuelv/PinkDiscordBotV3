import * as chalk from 'chalk';

export function PrintInfo(message: string) {
    console.log(`${chalk.green.underline.bold('Pinky ❯❯')} ${message}`);
}

export function PrintError(message: string) {
    console.log(`${chalk.red.underline.bold('Pinky ❯❯')} ${message}`);
} 