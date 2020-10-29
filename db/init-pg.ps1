$dbInit = "$PSScriptRoot"

docker build -t foos-pg $dbInit

docker run -d --name foos-pg --rm -p 5432:5432 --shm-size=256MB `
  -e POSTGRES_USER=foos -e POSTGRES_PASSWORD=foos -e POSTGRES_DB=foos `
  foos-pg

# While container 'foos-pg' started as above is running, you can run a
# psql client within the container via:
#    docker exec -it foos-pg psql -U foos
# This will allow you to enter database queries and commands.
# foos=# select * from foo;
# Type ctrl-d or "exit" to exit psql and return to your shell.
#
# Or connect from the host
#  - with jdbc via url:
#    jdbc:postgresql://localhost:5432/foos
#  - or with connection parameters:
#    host: localhost
#    port: 5432
#    user: foos
#    database: foos
#    (password is ignored)

# To stop and remove the container:
# docker rm -vf foos-pg