const sqlite3 = require("sqlite3").verbose();
const queries = require("./queries");
const templates = require("./templates");
const { serve } = require("@hono/node-server");
const { serveStatic } = require("@hono/node-server/serve-static");
const { Hono } = require("hono");

const db = new sqlite3.Database("database.db");

db.serialize(() => {
    db.run(queries.Tweets.createTable);
    db.run(queries.Users.createTable);
});

const app = new Hono();

app.get("/", async (c) => {
  const tweets = await new Promise((resolve) => {
      db.all(queries.Tweets.findAll, (err, rows) => {
          resolve(rows);
      });
  });

  const tweetList = templates.TWEET_LIST_VIEW(tweets);

  const response = templates.HTML(tweetList);

  return c.html(response);
});

app.get("/user/register", async (c) => {
    const registerForm = templates.USER_REGISTER_FORM_VIEW();

    const response = templates.HTML(registerForm);

    return c.html(response);
});

app.post("/user/register", async (c) => {
    const body = await c.req.parseBody();
    const now = new Date().toISOString();

    const userID = await new Promise((resolve) => {
        db.run(queries.Users.create, body.name, body.email, now, function(err) {
            resolve(this.lastID);
        });
    });

    return c.redirect(`/user/${userID}`);
});

app.get("/user/:id", async (c) => {
    const userId = c.req.param("id");

    const user = await new Promise((resolve) => {
        db.get(queries.Users.findById, userId, (err, row) => {
            resolve(row);
        });
    });

    if (!user) {
        return c.notFound();
    }

    const tweets = await new Promise((resolve) => {
        db.all(queries.Tweets.findByUserId, userId, (err, rows) => {
            resolve(rows);
        });
    });

    const userTweetList = templates.USER_TWEET_LIST_VIEW(user, tweets);

    const response = templates.HTML(userTweetList);

    return c.html(response);
});

app.get("/tweet", async (c) => {
    const users = await new Promise((resolve) => {
        db.all(queries.Users.findAll, (err, rows) => {
            resolve(rows);
        });
    });

    const tweetForm = templates.TWEET_FORM_VIEW(users);

    const response = templates.HTML(tweetForm);

    return c.html(response);
});

app.post("/tweet", async (c) => {
    const body = await c.req.parseBody();
    const now = new Date().toISOString();

    await new Promise((resolve) => {
        db.run(queries.Tweets.create, body.content, body.user_id, now, (err) => {
            resolve();
        });
    });

    return c.redirect("/");
});

app.use("/static/*", serveStatic({ root: "./" }));

serve(app);

process.stdin.on("data", (data) => {
  if (data.toString().trim() === "q") {
    db.close();
    process.exit();
  }
});
