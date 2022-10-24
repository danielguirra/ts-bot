###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:16-slim As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN yarn

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:16-slim As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN yarn run build

ENV NODE_ENV production

RUN yarn --prod

USER node

###################
# PRODUCTION
###################

FROM node:16-slim As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/bin ./bin
COPY --chown=node:node --from=build /usr/src/app/.env ./.env

EXPOSE 4040

CMD [ "node", "bin/src/server.js" ]