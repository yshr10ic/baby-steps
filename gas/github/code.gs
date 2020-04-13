const GITHUB_URL = 'https://api.github.com/graphql';
const TOKEN = PropertiesService.getScriptProperties().getProperty('TOKEN');

function exec() {
  commitLogs = getCommitLogs();
  updateSheet(commitLogs);
  commitDays = getCommitDays();
  body = getBody(commitLogs, commitDays);
  sendToSlack('notifications', body);
}

function sendToSlack(channel, body) {
  const url = PropertiesService.getScriptProperties().getProperty('WEBHOOK_URL');
  
  const data = { 
    'channel' : channel,
    'username' : 'Octocat',
    'attachments': [{
      'color': '#fc166a',
      'text' : body,
    }]
  };
  
  const payload = JSON.stringify(data);
  const options = {
    'method' : 'POST',
    'contentType' : 'application/json',
    'payload' : payload
  };

  UrlFetchApp.fetch(url, options);
}

function getBody(commitLogs, commitDays){
  var targetDate = Moment.moment();
  targetDate = targetDate.subtract(1, 'days');
  var targetDateStr = targetDate.format('YYYY/MM/DD');
  var totalCount = 0;
  
  var body = '1日お疲れ様でした😊\n';
  body += targetDateStr + 'のコミット数を集計しました。\n\n';
  
  if (commitLogs.length == 0) {
    body += '```合計 0 件```\n';
  } else {
    body += '```';
    for (var i = 0; i < commitLogs.length; i++) {
      body += commitLogs[i]['repoName'] + ' のコミット数は ' + commitLogs[i]['contributionCount'] + ' 件\n';
      totalCount += commitLogs[i]['contributionCount'];
    }
    body += '合計 ' + totalCount + ' 件```\n\n';
    body += commitDays + '日連続でコミット中です💯この調子で頑張りましょう💪';
  }
  
  return body;
}

function getCommitDays() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('コミットログ');
  var row = sheet.getRange('A:A').getValues().filter(String).length;
  var currentDate = Moment.moment(sheet.getRange(row, 1).getValue());
  var previousDate = Moment.moment(sheet.getRange(row, 1).getValue());
  var commitDays = 1;
  
  for (var i = row - 1; i > 0; i--) {
    previousDate = Moment.moment(sheet.getRange(i, 1).getValue());
    diffDays = currentDate.diff(previousDate, 'days');
    if (diffDays === 0) {
      continue;
    } else if (diffDays === 1) {
      commitDays++;
    } else {
      break;
    }
    currentDate = previousDate;
  }
  
  return commitDays;
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
  var targetDate = Moment.moment();
  targetDate = targetDate.subtract(1, 'days');
  var commitLogs = [];
  
  var json = fetchCommitLog(targetDate);
  var contributionsCollection = json['data']['viewer']['contributionsCollection'];
  var commitContributionsByRepository = contributionsCollection['commitContributionsByRepository'];
    
  for (var i = 0; i < commitContributionsByRepository.length; i++) {
    var repoName = commitContributionsByRepository[i]['repository']['name'];
    var contributionCount = commitContributionsByRepository[i]['contributions']['totalCount'];
    
    commitLogs.push({'date': targetDate.format('YYYY/MM/DD'), 'repoName': repoName, 'contributionCount': contributionCount});
  }
  
  return commitLogs;
}

function getCommitLogsPast() {
  var targetDate = Moment.moment('2020/1/1 00:00:00', 'YYYY/M/D HH:mm:ss');
  var today = Moment.moment();
  var commitLogs = [];
  
  do {
    var json = fetchCommitLog(targetDate);
    var contributionsCollection = json['data']['viewer']['contributionsCollection'];
    var commitContributionsByRepository = contributionsCollection['commitContributionsByRepository'];
    
    for (var i = 0; i < commitContributionsByRepository.length; i++) {
      var repoName = commitContributionsByRepository[i]['repository']['name'];
      var contributionCount = commitContributionsByRepository[i]['contributions']['totalCount'];
      
      commitLogs.push({'date': targetDate.format('YYYY/MM/DD'), 'repoName': repoName, 'contributionCount': contributionCount});
    }
    
    targetDate = targetDate.add(1, 'days');
  } while(today.diff(targetDate, 'days') > 0);
  
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
  
  return json;
}

function fetchCommitLog(targetDate) {
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
      targetDate.format('YYYY-MM-DD') + 'T00:00:00+09:00',
      targetDate.format('YYYY-MM-DD') + 'T23:59:59+09:00');
  
  const json = fetchData(query);
  
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