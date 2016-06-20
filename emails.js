var fs = require('fs');
var Teachers = {};
data = fs.readFileSync('emails_facstaff_20160520.csv', 'utf8');
data = data.split('\n');
for (var lineindex in data) {
  var line = data[lineindex].trim().split(',');
  var name;
  if(line[2]) name = line[2].trim() + ', ' + line[1].trim().slice(0,1);
  else name = line[line.length - 1].trim();
  Teachers[name] = line[0].trim();
}

//Teachers['Leon Chou'] = 'leonchou123@gmail.com';
Teachers['Johnny So'] = 'jso123450@gmail.com';

var emails = {
  'Teachers': Teachers,
  'Administrators': {
    'Leon': 'bleepbloopsify@gmail.com',
    'Cintron': 'ccintron@stuy.edu',
    'Johnny' : 'sharpnkill@gmail.com',
    'Roy' : 'royxu652@gmail.com'
  },
};
module.exports = emails;
