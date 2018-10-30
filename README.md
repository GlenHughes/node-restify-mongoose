## Node Restify Mongoose Boilerplate

Basic boilerplate to get started with a Node, Restify and Mongoose REST API.

## Setup

Open `.env-example` and enter your config details. Then save as `.env` in the root directory. You will need to have a mongoose account setup with a new database. This isn't a tutorial on that though! https://mlab.com

    PORT=3000 // node server port (i.e. http://localhost:3000)
    URL=http://localhost // url to run node server on
    MONGO_USER=node_developer // your mongoose user (not your regular login, this will be the user created for the database)
    MONGO_PASS=123456 // the mongoose databases user's pass
    MONGO_URL=ds147440.mlab.com // your databases generated URL from mongoose
    MONGO_PORT=47440 // your databases generated port from mongoose
    MONG_DB_NAME=customer_api // your mongoose database name

Then install the dependencies: `yarn`

## Scripts

### `yarn dev`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.
