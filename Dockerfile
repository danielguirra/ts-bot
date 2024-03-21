###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:19.7.0-slim As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:19.7.0-slim As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build


ENV NODE_ENV production

RUN npm i --prod

USER node

##################
## PRODUCTION
##################

FROM node:19.7.0-slim As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/envs.json ./envs.json
COPY --chown=node:node --from=build /usr/src/app/database.sqlite ./database.sqlite
COPY --chown=node:node --from=build /usr/src/app/data/json/newbible.json ./newbible.json 

EXPOSE 4040

CMD [ "node", "dist/src/server.js" ]