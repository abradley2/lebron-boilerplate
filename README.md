# LeBroN Example

This is a kewl example of the Lebron stack built upon guidance from
[this article](https://github.com/yoshuawuyts/tiny-guide-to-non-fancy-node).

It is too fleshed out to be a boilerplate or a starter (making one of those is
a TODO).

## Setup

Create a local.js file at the root of this with the following:

```
module.exports = {
	serverSecret: 'PutYourSecretStringUsedToSignSecureCookiesHere'
}
```

`npm install` (or yarn)  

## Commands

`npm run start-dev` (runs the app in development mode)  
`npm run start-prod` (runs the app in "production" mode)  

_start-dev_ will cause the server to spin up Budo (a browserify development
server) and also refresh the require cache for the api on any changes to the
_/api/..._ files. Load the app on port 8000 in this mode.

_start-prod_ will cause the server to spin up a node httpServer instance that
uses the api for all api requests, and node-static for all others.
