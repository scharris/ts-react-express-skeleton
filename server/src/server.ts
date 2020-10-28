import express from "express";
import helmet from "helmet";
import * as dotenv from 'dotenv';
import apiRouter from "./api-router";
import {httpErrorHandler} from "./errors/http-error-handler";
import {createPool, closePool} from './db/pool-executor';

async function init(staticResourcesDir: string, port: number): Promise<void>
{
   createPool();
   process
      .once('SIGTERM', closePool)
      .once('SIGINT',  closePool);

   const app =
      express()
         .use(express.static(staticResourcesDir))
         // CSP is off for now to allow deep links into app content, which require execution of inline scripts.
         .use(helmet({ contentSecurityPolicy: false }))
         .use(express.json())
         .use(express.urlencoded({ extended: true }))
         .use("/api", apiRouter)
         // Enable deep links into the app by serving index.html for any routes not recognized above.
         .get('/*', function (req, res) {
            res.sendFile('index.html', { root: staticResourcesDir });
         })
         .use(httpErrorHandler); // General http errors, other than 404.

   /** Run the server. */
   app.listen(port, () => {
      console.log(`Listening on port ${port}`);
   });
}

////////////////////////////
//       STARTUP          //
////////////////////////////

if ( process.argv.length < 3 || process.argv.length > 4 )
{
   console.error('Expected application arguments: <public-directory> [<env-file>]');
   process.abort();
}

const publicDir = process.argv[2];
const envFile = process.argv.length === 4 ? process.argv[3] : null;

if ( envFile )
   dotenv.config({ path: envFile });

const port: number = process.env.PORT ? parseInt(process.env.PORT as string, 10): 3001;

init(publicDir, port);
