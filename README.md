# Description

My own node API for open source projects. It holds my tests on PostgreSQL and serves as a development quick setup for my frontend websites. Further content will be added to this project and the README along this year, including more features like authentication, accounts and security.

# Start

## Installation

Install dependencies and add a `db-configuration.json` file in the `database` folder to connect to your local postgres DB. After installing your local postgres database, run `configure_db.sh` (`npm run db:configure`) to drop any old DB and create a new one (named `postgres`).

## Run

Run `npm run start` to run node server in localhost 5000.

# Content

Any content can call this API, although not every endpoint will be available. For extra security, add a `server-auth.json` file with a token. You can use the website https://jwt.io/ to generate a suitable password with a respective token. This way you can easily pass the password to someone with the encoding key for them to add to their requests in the header as `basicToken`. Also add the cors origin URL here.

Example:

```
{
  "cors-origin": "http://localhost:1234",
  "api-password": "yourPassword!",
  "api-token": "tokenGeneratedFromPasswordInJWT"
}

```

<!-- TEMP -->

## Tuist Website

Using 3 tables: 'tuno', 'section' and 'audio'

The 'section' table contains a JSON file able to change the content of the app regarding titles, texts, web links and image urls. The way we will be showing images is with an imgur account as a host. The content of the JSON can be anything that the developer needs to make new sections customizable by the project owners.

Example of a section JSON:

```
{
  "image": "i.imgur.com/eG2Plq6.jpg",
  "title": "Tuna Universitária do Instituto Superior Técnico",
  "cta": {
    "label": "Vem descobrir",
    "slug": "#",
  },
}
```

### Adding sections

This API feeds the Tuist Website app. Whenever possible, update `mockData` to reflect changes made on the frontend. Since a local DB is always needed and it will be frequently reseted, mockData will allow frontend developers to have every section working properly. To do this, run `npm run load:mock:sections`.

<!-- TEMP -->
