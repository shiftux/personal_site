# build it with
# docker build -t shiftux/personal-website:v1.0.1 .
# run it with
# docker run --rm -p 49160:3000 -d shiftux/personal-website
FROM node:26

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# this was set originally, i am trying the prod command from the comment below
# RUN npm install
# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
