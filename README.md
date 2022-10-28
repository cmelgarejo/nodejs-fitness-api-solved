# Fitness step tracking API server - solved

## Introduction

Imagine that your company is launching a fitness tracking wearable device.
They need your team to develop a step tracking backend application that can
do the following:

1. Maintain a user's cumulative step count through a stream of updates.
2. Provide an interface to retrieve the user's cumulative step count.

## Problem Statement

1. A **WebSocket-based API** in which the client can send a series of `update`s
   with a number of steps that were recently taken. Whenever the server receives
   a valid `update`, the user's step count should be updated to reflect total
   number of steps taken up until that point in time. A valid `update` is a
   WebSocket message containing a JSON payload that has an `username` (string),
   a `ts` (numerical timestamp) representing when the client sent the `update`,
   and the `newSteps` (number) recently taken. The server should ignore
   an `update` that isn't valid.

   The client will access your WebSocket server by opening a connection
   to `ws://localhost:8081`.

   Here's an example of an `update` that your server needs to handle:

   ```json
   {
     "update_id": "ba3f2ea6-1478-4b6d-bacc-97904f839d17",
     "username": "luisa",
     "ts": 1666960429981,
     "newSteps": 108
   }
   ```

2. A **REST API** endpoint served to get the total number of steps taken by an
   user up until that point in time:

   **Request**
   `GET http://localhost:8080/users/{username}/steps`

   Example: `GET http://localhost:8080/users/luisa/steps`

   **Success Response**:
   **Code:** `200`
   **Body:** `{ "cumulativeSteps": 108, "ts": 1666979475893 }`

   `ts` represents the timestamp of the _most recent_ valid `update` for an
   user from the client.

   **Error Response**:
   **Code:** `404` (not found)
   **Body:** `{ "error": "User doesn't exist" }`

## Your Task

Your task is to complete the Step Tracking application by implementing both
the websocket API and the REST API endpoint described above. Write your code in
the existing files to make the tests pass. Look for the `TODO` comments.

This is an initial prototype to be tested internally at the company, so you
don't need to handle user authentication. Since we don't expect a lot of users
now, we're using a simple in-memory `store` object to maintain state. Here is an
example of the `store` at a given point in time:

```javascript
{
  luisa: {
    ts: 1666979473893,
    cumulativeSteps: 6969,
  },
  juan: {
    ts: 1666879475893,
    cumulativeSteps: 420,
  },
}
```

You _should_ use the following npm package in your implementation of the
WebSocket API:

- `ws` (<https://www.npmjs.com/package/ws>)

You _may_ optionally use one of the following npm packages in your
implementation of the REST API endpoint:

- `express` (<https://www.npmjs.com/package/express>)
- `koa` (<https://www.npmjs.com/package/koa>)
- `hapi` (<https://www.npmjs.com/package/@hapi/hapi>)
- `restify` (<https://www.npmjs.com/package/restify>)

You _should_ return object containing `close()` function (that shuts down
the server) from both WebSocket API and REST API.

## Setup

1. `pnpm install` – install dependencies
2. `pnpm test` – run all tests once (this will be used to evaluate your
   solutions)
3. `pnpm run test:watch` - run all tests in _watch mode_ (optionally, you
   can use it locally if you prefer)

**Good Luck!**
