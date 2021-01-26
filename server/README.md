## Clone the project

```git clone -b db-postgres https://github.com/scharris/ts-react-express-skeleton.git```

Enter your github username and password when prompted.

```cd ts-react-express-skeleton```

## Start the database

This step requires Docker to be installed and on your path. Start a command line shell, and test
that the `docker` command is found by entering `docker ps`. You should see a possibly empty listing
of containers with column names starting with `CONTAINER ID`.

Enter the `server` subdirectory of the project:
```cd server```

Note: In the below, npm scripts are being used for convenience. See the `scripts` section of
`server/package.json` to see the commands that are actually being run by these scripts if you
need to troubleshoot them or are curious.

Now start the database in a Docker container via:
```npm run start-db```

If this works properly, you should get output with last line ending with a long string of hexidecimal
digits, which is the identifier of the container that was started. Verify by running `docker ps` again,
which should now show a container with name name `foos-pg` in the last column. The database is running
in the background within this container.

Now as a test, connect to the database via the `psql` command line client for Postgres:
```npm run psql```
You should be met with a `foos=#` prompt at which you can enter SQL commands. The psql command
is being run within the same container in which the database itself is running.

Enter a query:
```select * from foo;```

You should see a result set with a few rows. This is the example data for the application.

Quit to exit the psql process within the container and return to your command shell:
```\q```

Note: The database remains running in the background and needs to be running for the application
to work. If you want to stop and remove the database container, for example after modifying table
definitions in which case you want to rebuild the database's Docker image, then run the following:

```docker rm -vf foos-pg```

You will need to restart the database container as above before running the application.

## Install npm dependencies

From the top-level project directory, install npm dependencies for both client and server:
```cd server && npm i && cd ../client && npm i```

It's not unusual for these commands to fail because of timeouts when they are run initially, in
which case just run the failing command again until it succeeds. Also the warning on non-MacOS
systems about package `fsevents` is normal.

## Run in development mode

With the database running, start the app from witin the `server` directory by entering:
```npm run dev```

This will run two instances of node.js, one for the client which listens on port 3001, and one for the
server listening on port 3000. In production mode, only the server instance would be running. The client
instance is used for development because it allows for fast reloading as changes are made to source files
in `client/` such as `.js`, `.ts`, `.css`, `.tsx` files. It is configured to relay to the server
instance of node when necessary, such as for calls to your server api.

Open your browser to `localhost:3001` to access the app if it has not opened automatically to that
address. You may have to wait a minute or so for the client part of the app to build before it is
started. The client build utilizes `webpack` which is helpful for packaging everything needed for
the app to be sent efficiently to the browser, but can be a bit slow for a full/non-incremental build.

## Excercize server side api via command line
To learn about and test the server side of the application, it's helpful to use the command line
to create http requests like the client side of the application would, and to the see the server's
responses to the requests printed as output.

The below are PowerShell commands which can be run in a separate command shell, assuming that
the application is running as described above.

Here `iwr` is a short name for PowerShell's "Invoke-WebRequest". For MacOS and Linux, you
can either install Powershell version 7 (recommended) to run these commands as is, or else
adapt the commands to use the `curl` executable instead. If you use `curl`, instead of `iwr`
from within Powershell, some command parameters will have to be adjusted (e.g. http methods
are set via `-X` instead of `-Method`), details can be easily found online.


### Get all foo items.
```
iwr http://localhost:3001/api/foos
```

You should see a response like:
```
StatusCode        : 200
StatusDescription : OK
Content           : [{"id":1,"name":"#1 in A","category":"A","description":"first foo of category A"},{"id":2,"name":"#2 in A","category":"A","description":"second foo of
                    category A"},{"id":3,"name":"#1 in B","category": ...
```

### Get item 2.
```
iwr http://localhost:3001/api/foos/2
```

### Add a new item (assigned id = 7).
```
iwr http://localhost:3001/api/foos -Method POST `
   -Headers @{"Content-Type"="application/json"} `
   -Body '{"item":{"name": "new seventh item"}}'
```

### Update the new item.
```
iwr http://localhost:3001/api/foos/7 -Method PUT `
   -Headers @{"Content-Type"="application/json"} `
   -Body '{"item":{"id": 7, "name": "seventh item updated"}}'
```

### View updated new item.
```
iwr http://localhost:3001/api/foos/7
```

### Delete the new item.
```
iwr http://localhost:3001/api/foos/7 -Method DELETE
```
