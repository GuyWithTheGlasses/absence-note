var fs = require('fs');
var Teachers = {};
data = fs.readFileSync('emails_facstaff_20160520.csv', 'utf8');
data = data.split('\n');
for (var lineindex in data) {
  var line = data[lineindex].trim().split(',');
  Teachers[line[1].trim() + ' ' + line[2].trim()] = line[0].trim();
}

var emails = {
  'Teachers': Teachers,
  'Administrators': {
    'Leon': 'bleepbloopsify@gmail.com',
    'Cintron': 'ccintron@stuy.edu',
  },
};

module.exports = emails;
