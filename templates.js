const HTML = (body) => `
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <title>これはただの文字列です</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/static/style.css">
</head>
<body>
    ${body}
</body>
</html>
`;

const TWEET_LIST_VIEW = (tweets) => `
<h1 class="title">ツイート一覧</h1>
<div class="tweet-list">
    ${tweets
      .map((tweet) => `<div class="tweet">${tweet.content}</div>`)
      .join("\n")}
</div>
`;

const USER_REGISTER_FORM_VIEW = () => `
<h1 class="title">ユーザー登録</h1>
<form action="/user/register" method="POST">
    <label for="name">名前</label>
    <input type="text" name="name" id="name" />
    <label for="email">メールアドレス</label>
    <input type="email" name="email" id="email" />
    <button type="submit">登録</button>
</form>
`;

const USER_TWEET_LIST_VIEW = (user, tweets) => `
<h1 class="title">${user.name}さんのツイート一覧</h1>
<div class="tweet-list">
    ${tweets
      .map((tweet) => `<div class="tweet">${tweet.content}</div>`)
      .join("\n")}
</div>
`;

const TWEET_FORM_VIEW = (users) => `
<h1 class="title">ツイート</h1>
<form action="/tweet" method="POST">
    <label for="content">内容</label>
    <textarea name="content" id="content" rows="10"></textarea>
    <label for="user_id">ユーザー</label>
    <select name="user_id" id="user_id">
        ${users
          .map((user) => `<option value="${user.id}">${user.name}</option>`)
          .join("\n")}
    </select>
    <button type="submit">投稿</button>
</form>
`;

module.exports = {
    HTML,
    TWEET_LIST_VIEW,
    USER_REGISTER_FORM_VIEW,
    USER_TWEET_LIST_VIEW,
    TWEET_FORM_VIEW,
};
