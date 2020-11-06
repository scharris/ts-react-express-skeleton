import * as fs from 'fs';

// First two args are the node/ts-node interpreters, remaining args are the actual application args.
if ( process.argv.length !== 4 )
   throw new Error("make-query-specs-json.ts: Expected two application arguments.");

const inputTSModule = process.argv[2];
const outputFilePath = process.argv[3];

console.log(`Converting TypeScript query specifications to json form.`)

import(inputTSModule)
   .then(tsModule => {
      const queryGroupSpec = tsModule.default;
      fs.writeFileSync(
         outputFilePath,
         JSON.stringify(queryGroupSpec, null, '  ')
      );
   })
   .catch(err => {
      console.error("Error converting TypeScript query specifications: ", err);
      process.exit(1);
   });


