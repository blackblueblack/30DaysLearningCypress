FROM cypress/base:10
WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

RUN $(npm bin)/cypress verify

COPY cypress cypress
COPY cypress.json .
COPY reporterOptions.json .

RUN $(npm bin)/cypress
