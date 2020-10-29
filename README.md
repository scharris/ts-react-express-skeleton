## Building and running the app for development

In this mode, the app is run outside of Docker, with
only the backing database (optionally) being run
in Docker.

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

### Run the application database
This variant of the skeleton app uses a database to store
the application data. Follow the instructions in
`db/database-setup.md` to setup and run a local Postgres
database before continuing.

To connect to a different (possibly remote) Postgres
database, you must provide the connection information
for this database in environment file
`envs/pg-dev.env`, or start node referencing a
different environment file having the same format
(see "start" script in the `package.json` file for how
to start the app with an environment file). The
database should have schema objects and test data
created as described in the SQL scripts in folder `db`.
The schema setup is not necessary when running the
database within Docker with the provided `init-pg`
script because they are executed in the database as
part of container startup.

### Install client and server node packages
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

### Build complete client/server package
```
npm run build
```

When the build is complete, the combined client/server
package will be contained in the `dist` directory.

### Run the app
```
npm run start
```

This runs an app that has been built with the
`npm run build` already. Open your browser to
`localhost:3001/` to try the app. Use the links
in the top bar to navigate between pages of the
app. The main functionality is a filtered list
of "foo" items.

### Build and run the app
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

### Running in development mode
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

## Building and running app and database together with Docker-Compose

With Docker-Compose, we can build and run the entire application system,
consisting of the server and database, from a description given in file
`docker-compose.yml`. This file lists services and their dependencies
to each other. In our case the services consist of the database and
the application server, with the application server service depending
on the database service. Each service references a build directory
containing a Dockerfile describing how the Docker image that will
be run to implement the service should be built.

To run the complete system, execute:
```
docker-compose up --build
```
(Note the dash between "docker" and "compose", `docker-compose` is the command.)

The app can be accessed in the browser at `localhost:3000`.

The `--build` argument to `docker-compose` above is to make sure that
the app and database images are rebuilt before starting.  Caching of
Docker image layers makes the rebuilding time negligible when their
sources have not changed.
