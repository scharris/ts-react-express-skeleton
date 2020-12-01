import express from "express";
import helmet from "helmet";
import path from 'path';
import * as dotenv from 'dotenv';
import apiRouter from "./api-router";
import {httpErrorHandler} from "./errors/http-error-handler";
import {createPool, closePool, loadSqls} from './db-access';

async function init(resourcesDir: string, port: number): Promise<void>
{
   const publicDir = path.join(resourcesDir, 'public');

   createPool();
   process.once('SIGTERM', closePool).once('SIGINT',  closePool);

   const sqlsLoaded = await loadSqls(path.join(resourcesDir, 'sql'));
   console.log(`Loaded ${sqlsLoaded} SQL files from application resources.`);

   const app =
      express()
         .use(express.static(publicDir))
         // CSP is off for now to allow deep links into app content, which require execution of inline scripts.
         .use(helmet({ contentSecurityPolicy: false }))
         .use(express.json())
         .use(express.urlencoded({ extended: true }))
         .use("/api", apiRouter)
         // Enable deep links into the app by serving index.html for any routes not recognized above.
         .get('/*', function (req, res) {
            res.sendFile('index.html', { root: publicDir });
         })
         .use(httpErrorHandler); // General http errors, other than 404.

   /** Run the server. */
   const server = app.listen(port, () => {
      console.log(`Listening on port ${port}`);
   });
   
   function exit() { server.close(); closePool(); }
   process.once('SIGTERM', exit).once('SIGINT',  exit);
}

////////////////////////////
//       STARTUP          //
////////////////////////////

if ( process.argv.length < 3 || process.argv.length > 4 )
{
   console.error('Expected application arguments: <public-directory> [<env-file>]');
   process.abort();
}

const resourcesDir = process.argv[2];
const envFile = process.argv.length === 4 ? process.argv[3] : null;

if ( envFile )
   dotenv.config({ path: envFile });

const port: number = process.env.PORT ? parseInt(process.env.PORT as string, 10): 3001;

init(resourcesDir, port);
