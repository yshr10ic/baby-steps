const GITHUB_URL = 'https://api.github.com/graphql';
const TOKEN = '';

function fetchUserName() {
  // GraphQLのクエリを作成
  const graphql =
    '{ \
    viewer { \
      login\
        }\
     }';

  const options = {
    'method' : 'post',
    'contentType' : 'application/json',
    'headers' : {
      'Authorization' : 'Bearer ' +  TOKEN
     },
    'payload' : JSON.stringify({ query : graphql })
  };

  const response = UrlFetchApp.fetch(GITHUB_URL, options);
  const json = JSON.parse(response.getContentText());

  Logger.log(json);
}