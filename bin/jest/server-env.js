/* eslint-disable @typescript-eslint/no-var-requires */
const NodeEnvironment = require('jest-environment-node');

class ServerEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
    this.config = config;
    // this.testPath = context.testPath;
  }

  async setup() {
    await super.setup();
    this.preparePolyfills();

    // await someSetupTasks(this.testPath);
    // this.global.someGlobalObject = createGlobalObject();
  }

  async teardown() {
    // this.global.someGlobalObject = destroyGlobalObject();
    // await someTeardownTasks();
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }

  preparePolyfills() {
    const r = require('dotenv').config({
      path: require('path').resolve(this.config.globals.dotEnvDir, '.env.test'),
      debug: process.env.DEBUG,
    });

    if (r && r.parsed) {
      this.global.process.env = {
        ...this.global.process.env,
        ...r.parsed,
      };
    }
  }
}

module.exports = ServerEnvironment;
