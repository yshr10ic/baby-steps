const GITHUB_URL = 'https://api.github.com/graphql';
const TOKEN = '';

function exec() {
  var json = fetchCommitLog();
  var contributionsCollection = json['data']['viewer']['contributionsCollection'];
  var totalCommitContributions = contributionsCollection['totalCommitContributions'];
  var commitContributionsByRepository = contributionsCollection['commitContributionsByRepository'];

  Logger.log(totalCommitContributions);
  Logger.log(commitContributionsByRepository);
}

function fetchUserName() {
  const query =
    '{ \
    viewer { \
      login\
        }\
     }';

  const json = fetchData(query);

  Logger.log(json);
}

function fetchCommitLog() {
  var query =
      Utilities.formatString('{\
  viewer {\
    contributionsCollection(from: "%s", to: "%s") {\
      totalRepositoryContributions\
      totalCommitContributions\
      commitContributionsByRepository {\
        repository {\
          name\
        }\
        contributions\
        {\
          totalCount\
        }\
      }\
    }\
  }\
  }', '2020-03-20T00:00:00', '2020-03-30T00:00:00');

  const json = fetchData(query);

  Logger.log(json);

  return json;
}

function fetchData(query) {
  const options = {
    'method' : 'post',
    'contentType' : 'application/json',
    'headers' : {
      'Authorization' : 'Bearer ' +  TOKEN
     },
    'payload' : JSON.stringify({ query : query })
  };

  const response = UrlFetchApp.fetch(GITHUB_URL, options);
  const json = JSON.parse(response.getContentText());

  return json;
}