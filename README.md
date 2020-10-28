## Building and running with Docker

Because of the Oracle client libraries needed for database
access, the easiest option to build and run the app without
administrator rights on your machine is to build and run the
app in Docker.

### Database requirement
This build does not provide a running instance of the database itself,
it assumes you have the connection information required to access an
existing database. The connection information should be provided via
an environment file placed at `server/envs/oracle-dev.env` (not in
version control since it must contain secrets). See 
`server/envs/.env.template` for a template version of the required
file which shows the required environment variables.

The database should have the schema objects and test data as described
in the SQL files `db/create-schema-objects.sql` and
`db/create-test-data.sql`, which should be run in that order.

### Build application Docker image
```
docker build -t reskel-ora .
```
If an npm install step times out, try running off the FDA VPN, then
reconnect before continuing.

### Run 
```
docker run --name reskel -p 3000:3000 --env-file server/envs/oracle-dev.env reskel-ora
```
Here we've used the environment file with database connection information
as described above.
 
### Stop / remove the container
This necessary before running the container again.

```
docker rm -vf reskel
```

## Building and running without Docker

### Install Node.js
Download the 64 bit Windows zip distribution of
Node.js from `https://nodejs.org/en/download/current/`.
Create folder `C:\Apps\dev`. Other folders can be used
instead, but `C:\Apps` contents are exempted from virus
scanning. Unzip the downloaded node distribution, and
move/rename the resulting folder to be 
`C:\Apps\dev\nodejs` (which should contain a `node.exe`
). In control panel's "Edit environment variables
for your account", add folder `C:\Apps\dev\nodejs`
to the `Path` environment variable.

### Setup database access
This variant of the skeleton app uses Oracle client library
to access a remote database. See `db/database-client-library-setup.md`
for instructions. Some steps may require administrator access.

## Install client and server node packages
Start a new instance of PowerShell (so it will
see the path changes just made), and navigate to
the react-skeleton directory.

```
cd <wherever>/react-skeleton
```

Then install node packages for the client and server:
```
cd client
npm install
cd ../server
npm install
```

Now within the server directory we can build and
start the full application, with the server
providing static resources for the client app to 
the browser, and also the backend api services
needed by the app:

## Build complete client/server package
```
npm run build
```

When the build is complete, the combined client/server
package will be contained in the `dist` directory.

## Run the app
```
npm run start
```

This runs an app that has been built with the
`npm run build` already. Open your browser to
`localhost:3001/` to try the app. Use the links
in the top bar to navigate between pages of the
app. The main functionality is a filtered list
of "foo" items.

## Build and run the app
We can build and run with one command via:
```
npm run build-start
```
This simply runs the `build` and `start` npm 
scripts described above in sequence. When it's
finished and ready for requests it will print
`Listening on port 3001`. The build is necessary
whenever source code changes are made because of
the required TypeScript compilation step.

## Running in development mode
To run the app with live-reloading enabled for changes
to the client source code, first run the server
as usual:

```
# terminal 1, in `server/`
npm run build-start
```
When the server is ready, it will print
`Listening on port 3001`.

Then run a separate nodejs instance for the client
with live-reloading enabled for the client resources,
which will relay api requests to the server instance
started above:
```
# terminal 2, in `client/`
npm run start
```

Open the browser to `localhost:3000`. The app should
function as before, but any changes made to client
resource files (e.g. javascript, stylesheets) should be
instantly reflected in the client user interface in the
browser.
