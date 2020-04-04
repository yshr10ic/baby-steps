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
  var targetDate = new Date('2020/3/20 00:00:00');
  var counter = 1;
  const MAX_COUNTER = 3;
  var commitLogs = [];
  
  do {
    var json = fetchCommitLog(targetDate);
    var contributionsCollection = json['data']['viewer']['contributionsCollection'];
    var totalCommitContributions = contributionsCollection['totalCommitContributions'];
    var commitContributionsByRepository = contributionsCollection['commitContributionsByRepository'];
    
    Logger.log(Utilities.formatDate(targetDate, 'Asia/Tokyo', 'yyyy-MM-dd'));
    Logger.log('totalCommitContributions is ' + totalCommitContributions);
    Logger.log('commitContributionsByRepository.length is ' + commitContributionsByRepository.length);
    
    for (var i = 0; i < commitContributionsByRepository.length; i++) {
      var repoName = commitContributionsByRepository[i]['repository']['name'];
      var contributionCount = commitContributionsByRepository[i]['contributions']['totalCount'];
      
      Logger.log(repoName + ': ' + contributionCount);
      
      commitLogs.push({'date': Utilities.formatDate(targetDate, 'Asia/Tokyo', 'yyyy/MM/dd'), 'repoName': repoName, 'contributionCount': contributionCount});
    }
    
    targetDate.setDate(targetDate.getDate() + 1);
    counter++;
  } while(counter <= MAX_COUNTER);
  
  Logger.log(commitLogs);
  
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

  Logger.log(json);
}

function fetchCommitLog(targetDate) {
  var nextDate = new Date(targetDate);
  nextDate.setDate(nextDate.getDate() + 1);
  
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
      Utilities.formatDate(targetDate, 'Asia/Tokyo', 'yyyy-MM-dd') + 'T00:00:00',
      Utilities.formatDate(nextDate, 'Asia/Tokyo', 'yyyy-MM-dd') + 'T00:00:00');
  
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