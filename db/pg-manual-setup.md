# Database setup (Postgres)
Note: If docker is available on your platform, it may be easier to
just run the database via docker by calling the
`db/init-pg.sh` script.

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
