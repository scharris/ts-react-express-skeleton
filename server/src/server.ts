import express from "express";
import helmet from "helmet";
import apiRouter from "./api-router";
import {httpErrorHandler} from "./errors/http-error-handler";
import {createPool, closePool} from './db/pool-executor';

async function init(staticResourcesDir: string, port: number): Promise<void>
{
   await createPool();
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

if ( process.argv.length !== 3 )
{
   console.error('Expected application arguments: <public-directory>');
   process.abort();
}

const publicDir = process.argv[2];
const port: number = process.env.PORT ? parseInt(process.env.PORT as string, 10): 3000;

init(publicDir, port);
