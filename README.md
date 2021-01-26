<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

This repo is my vision for +- Clean Architecture using Nest.JS and TypeScript.

#### Few Concerns
- **Business logic** should never depend on libraries/frameworks/dbs
- Anything other can depend on **Business logic**
- Since **@Injectable, @Inject, etc** are framework specific decorators, I use custom providers (such as **Factories**).
- We depend on **abstractions** in **Business logic**, so we can use **any storage** (RDS/NoSQL/files), any lib for caching, configuration, etc.
- Tests only for **Business logic**, because I'm lazy.

#### Few Details
- I'm using [Pino](https://github.com/pinojs/pino) as **logger**, because of speed, simpleness. Thx, [Mr. Shemsedinov](https://github.com/tshemsedinov) for advice.
- Tracing requests with [AsyncLocalStorage](https://nodejs.org/api/async_hooks.html#async_hooks_class_asynclocalstorage).
  Thx, [Mr. Melikhov](https://github.com/amel-true) for advanced educational videos and showing this approach, but I've changed **middleware** to **interceptor**.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
```
