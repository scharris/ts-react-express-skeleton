$dbInit = "$PSScriptRoot"

docker run -d --name pg --rm `
  -p 5432:5432 --shm-size=256MB `
  -v $dbInit/create-schema.sql:/docker-entrypoint-initdb.d/01.sql `
  -v $dbInit/create-schema-objects.sql:/docker-entrypoint-initdb.d/02.sql `
  -v $dbInit/create-test-data.sql:/docker-entrypoint-initdb.d/03.sql `
  -e POSTGRES_USER=foos -e POSTGRES_PASSWORD=foos -e POSTGRES_DB=foos `
  postgres:13

# While container 'pg' started as above is running, you can run a psql client
# within the container via:
#    docker exec -it pg psql -U foos
# This will allow you to enter database queries and commands.
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
# docker rm -vf pg