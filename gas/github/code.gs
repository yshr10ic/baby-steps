const GITHUB_URL = 'https://api.github.com/graphql';
const TOKEN = '';

function exec() {
  commitLogs = getCommitLogs();
  updateSheet(commitLogs);
}

function updateSheet(commitLogs) {
  var sheet = SpreadsheetApp.getActive().getSheetByName('コミットログ');
  var row = sheet.getRange('A:A').getValues().filter(String).length + 1;
  
  for (var i = 0; i < commitLogs.length; i++) {
    sheet.getRange(row, 1).setValue(commitLogs[i]['date']);
    sheet.getRange(row, 2).setValue(commitLogs[i]['repoName']);
    sheet.getRange(row, 3).setValue(commitLogs[i]['contributionCount']);
    row++;
  }
}

function getCommitLogs() {
  var targetDate = Moment.moment('2020/1/1 00:00:00', 'YYYY/M/D HH:mm:ss');
  var today = Moment.moment();
  var commitLogs = [];
  
  do {
    var json = fetchCommitLog(targetDate);
    var contributionsCollection = json['data']['viewer']['contributionsCollection'];
    var totalCommitContributions = contributionsCollection['totalCommitContributions'];
    var commitContributionsByRepository = contributionsCollection['commitContributionsByRepository'];
    
    // Logger.log(targetDate.format('YYYY-MM-DD'));
    // Logger.log('totalCommitContributions is ' + totalCommitContributions);
    // Logger.log('commitContributionsByRepository.length is ' + commitContributionsByRepository.length);
    
    for (var i = 0; i < commitContributionsByRepository.length; i++) {
      var repoName = commitContributionsByRepository[i]['repository']['name'];
      var contributionCount = commitContributionsByRepository[i]['contributions']['totalCount'];
      
      // Logger.log(repoName + ': ' + contributionCount);
      
      commitLogs.push({'date': targetDate.format('YYYY/MM/DD'), 'repoName': repoName, 'contributionCount': contributionCount});
    }
    
    targetDate = targetDate.add(1, 'days');
  } while(today.diff(targetDate, 'days') > 0);
  
  // Logger.log(commitLogs);
  
  return commitLogs;
}

function fetchUserName() {
  const query = 
    '{ \
    viewer { \
      login\
        }\
     }';

  const json = fetchData(query);

  // Logger.log(json);
}

function fetchCommitLog(targetDate) {
  var nextDate = Moment.moment(targetDate);
  nextDate = nextDate.add(1, 'days');
  
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
  }', 
      targetDate.format('YYYY-MM-DD') + 'T00:00:00',
      nextDate.format('YYYY-MM-DD') + 'T00:00:00');
  
  const json = fetchData(query);

  // Logger.log(json);
  
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