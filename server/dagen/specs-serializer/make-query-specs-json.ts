import * as fs from 'fs';
import * as path from 'path';
import queryGroupSpec from '../query-specs';

// First two args are the node/ts-node interpreters, so third is the first application arg.
if ( process.argv.length !== 3 )
   throw new Error("Expected one application argument.");

const outputDir = process.argv[2];

console.log(`Converting query specifications to json form.`)

fs.writeFileSync(
   path.join(outputDir, "query-specs.json"),
   JSON.stringify(queryGroupSpec, null, '  ')
);
