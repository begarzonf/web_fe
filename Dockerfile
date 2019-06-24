# base image
FROM node:12.2.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN cd /app; npm install
RUN cd /app; npm install @vue/cli@3.7.0 -g
RUN cd /app; npm install express express-graphql graphql --save
RUN cd /app; npm install --save axios
RUN cd /app; npm install cors --save
RUN cd /app; npm install downloadjs

COPY . /app

ENV PORT 8050
EXPOSE 8050

# start app
CMD ["npm", "run", "serve"]
