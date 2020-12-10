require('dotenv').config({
  path: require('path').resolve(process.cwd(), '.env.dev'),
});
require('module-alias').addAlias('app', require('path').resolve(process.cwd(), 'src'));

import 'reflect-metadata';
import nconf from 'nconf';
import fs from 'fs';
import path from 'path';
import { printSchema } from 'graphql/utilities';

nconf
  .argv({
    schema: {
      describe: 'Provide path to Schema module with { schema } export value',
      demand: true,
    },
    out: {
      describe: 'Provide path for generated file',
      demand: true,
    },
  })
  .required(['schema', 'out']);

function generate() {
  const schemaFile = path.resolve(process.cwd(), nconf.get('schema'));
  const outputFile = path.resolve(process.cwd(), nconf.get('out'));

  if (!fs.existsSync(schemaFile)) {
    throw new Error(`Schema file not found: ${schemaFile}`);
  }

  const schema = require(schemaFile).schema;

  if (!schema) {
    throw new Error(`Module ${schemaFile} should export 'schema' variable.`);
  }

  let oldSchema = '';
  try {
    oldSchema = fs.readFileSync(outputFile, 'utf8');
  } catch (e) {}
  const newSchema = printSchema(schema, { commentDescriptions: true });

  if (oldSchema !== newSchema) {
    fs.writeFileSync(outputFile, newSchema);
  } else {
    console.log(`\nGraphQL schema didn't change: ${outputFile}\n`);
  }
}

generate();

process.exit(0);
