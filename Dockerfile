# build:
#   docker build -t reskel-ora .
# If an npm install step times out, try running off the FDA vpn network, then
# reconnect before continuing.
# run (requires an env file for database login information):
#   docker run --name reskel -p 3000:3000 --env-file server/envs/oracle-dev.env reskel-ora
# Stop (if running) and remove the container (necessary before running again):
#   docker rm -vf reskel

FROM oraclelinux:7-slim as builder

ARG release=19
ARG update=9

RUN  yum -y install oracle-release-el7 && \
     yum -y install oracle-instantclient${release}.${update}-basiclite && \
     rm -rf /var/cache/yum

RUN rm -rf /usr/lib/oracle/${release}.${update}/client64/bin
WORKDIR /usr/lib/oracle/${release}.${update}/client64/lib/
RUN rm -rf *jdbc* *occi* *mysql* *jar

########################

FROM node:15-buster-slim

COPY --from=builder /usr/lib/oracle /usr/lib/oracle
COPY --from=builder /usr/share/oracle /usr/share/oracle
COPY --from=builder /etc/ld.so.conf.d/oracle-instantclient.conf /etc/ld.so.conf.d/oracle-instantclient.conf

RUN apt-get update && apt-get -y upgrade && apt-get -y dist-upgrade && apt-get install -y libaio1 && \
    apt-get -y autoremove && apt-get -y clean && \
    ldconfig

########################
RUN mkdir /app
WORKDIR /app

RUN mkdir src
ADD client src/client
ADD server src/server
RUN cd src/client && npm install
RUN cd src/server && npm install
RUN cd src/server && npm run build
RUN mv src/server/dist/* .
RUN mv src/server/node_modules .

ENV PORT=3000
EXPOSE $PORT
CMD node server.js public/
