# Running Postgres via Docker
If you can run Docker on your local machine, then the easiest
way to get a running database populated with test data is to
run the `init-pg` PowerShell script. In PowerShell:

```
cd react-skeleton
db/init-pg
```

This will create a container running Postgres database as a
"daemon" or background process that runs independently of your
current shell. You should be able to see the running container
via `docker ps`. After the container has been started, you can
close your shell and the container will continue running.


While container `pg` started as above is running, you can run a
`psql` Postgres command line client within it via:
```
docker exec -it pg psql -U foos
```

This will allow you to enter database queries and commands.
For example: `\d` to list tables/views/sequences, and
`select * from foo;` to query table `foo`. You can exit by
entering `exit`. Changes to the data will be persisted
until the container is stopped.

If you have other database access tools, you can use the following
connection information to connect to the database:
  - Via jdbc via url: `jdbc:postgresql://localhost:5432/foos`
  - With connection parameters:
    - host: localhost
    - port: 5432
    - user: foos
    - database: foos
    - password: (ignored)

To stop and remove the container:
```
docker rm -vf pg
```

# Manual setup of Postgres database
This set of instructions assumes that the Postgresql database client
command line program, `psql`, is available to run on your local machine,
and that you have access to a server instance (which also may be on your
local machine) with administrative login as user postgres.

Note: If docker is available to to on your local machine, it may be
easier to run the database via docker by calling the `init-pg`
script, which has no prerequisits other than docker itself.

## Create foos user and database
```
# psql -U postgres
create user foos with password 'foos';
create database foos owner foos;
```

## Create and populate foos schema
```
# psql -U foos 
\i db/init/create-schema.sql
\i db/init/create-schema-objects.sql
\i db/init/create-test-data.sql
```
