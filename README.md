## Install Node.js
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

## Run the application database
This variant of the skeleton app uses a database to store
the application data. Follow the instructions in
`db/database-setup.md` to setup and run the application
database before continuing.

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
