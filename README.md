# CV Website

Project for writing your CV using markdown

Built to be deployed on Cloudflare pages.

## Development setup

### Required Software

- NodeJS
- Yarn
- Cloudflare Wrangler

### Configuration Files

#### Cloudflare Wrangler Config

Add a file called `wrangler.toml` to the root directory of the repository, it should contain the following:

```
[[ d1_databases ]]
binding = "MAIN_DB"
database_name = "cv_production"
database_id=<Production D1 Database>
#preview_database_id=<Preview D1 Database>
migrations_dir="./drizzle"
```

For the moment the `database_id` is required, this means you need to make a CF account and create a D1 database and copy the ID into this slot. The database is not used in local development at all but wrangler needs it. (note this is bad and cloudflare should patch this awful behaviour.)

### Run Database Migrations

```
db:apply
```

### Install Dependencies

```
yarn install
```

### Run NextJS Development Server

This server will live refresh and usually runs out of [https://localhost:3000](https://localhost:3000)

### Build Project

```
yarn run pages:build
```

## Deployment

_to be added_
