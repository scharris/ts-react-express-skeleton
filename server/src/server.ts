import express from "express";
import helmet from "helmet";
import * as dotenv from "dotenv";
import apiRouter from "./api-router";
import {httpErrorHandler} from "./errors/http-error-handler";
import {notFoundHandler} from "./errors/not-found-handler";

if ( process.argv.length !== 4 )
{
   console.error('Expected application arguments: <public-directory> <env-file>');
   process.abort();
}
const publicDir = process.argv[2];
const envFile = process.argv[3];

dotenv.config({ path: envFile});

const PORT: number = process.env.PORT ? parseInt(process.env.PORT as string, 10): 3000;

const app = express();

app.use(express.static(publicDir));
// CSP is off for now to allow deep links into app content, which require execution of
// inline scripts. With more work this could be supported via proper CSP policy like 'nonce'
// for inline scripts.
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRouter);

// Enable deep links into the app by serving index.html for any routes not recognized above.
app.get('/*', function (req, res) {
   res.sendFile('index.html', { root: publicDir });
});

/** error handling */
app.use(httpErrorHandler); // General http errors, other than 404.


/** Run the server. */
app.listen(PORT, () => {
   console.log(`Listening on port ${PORT}`);
});
