import chalk from "chalk";

export class DefaultReporter {
  constructor() {
    this.indentLevel = 0;
  }

  indent() {
    return "  ".repeat(this.indentLevel);
  }

  startSuite(name) {
    console.log(`${this.indent()}📦 ${chalk.bold.blue(name)}`);
    this.indentLevel++;
  }

  endSuite() {
    this.indentLevel--;
  }

  logSuccess(name, duration) {
    console.log(
      `${this.indent()}✅ ${chalk.green(name)} ${chalk.gray(`(${duration}ms)`)}`
    );
  }

  logFailure(name, duration, error) {
    console.log(
      `${this.indent()}❌ ${chalk.red(name)} ${chalk.gray(`(${duration}ms)`)}`
    );
    console.log(`${this.indent()}   ${chalk.redBright(error.message)}`);
  }

  logSkipped(name) {
    console.log(`${this.indent()}⏭️  ${chalk.yellow(name)} (skipped)`);
  }

  logSlow(name, duration, threshold = 100) {
    const icon = duration > 300 ? "🐌" : "🐢";
    console.log(
      `${this.indent()}⚠️  ${icon} ${chalk.yellow(name)} ${chalk.gray(
        `(${duration}ms - slow)`
      )} `
    );
  }

  reportSummary() {
    console.log("\n" + chalk.bold.magenta("✨ Test execution complete.\n"));
  }
}
