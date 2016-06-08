var PDFDocument = require("pdfkit");

//Takes data object from user input
//Creates absence note PDF using inputed data 
var createAbsencePDF = function(data) {

    //Create new PDF document 
    var doc = new PDFDocument();

    //Create the absence note PDF
    doc.fontSize(12)
	.text("STUYVESANT HIGH SCHOOL", {align: "center"})
	.text("ATTENDANCE OFFICE", {align: "center"})
	.text("ROOM 203", {align: "center"});

    doc.fontSize(14)
	.font("Times-Bold")
	.text("Type: ", {continued: true});
    if(typeof data['type'] !== 'undefined'){
	doc.font("Times-Roman")
	    .text(data['type']); //data input
    } else {
	doc.text("_______________");
    }

    doc.font("Times-Bold")
	.text("Name: ", {continued : true})
    if(typeof data['name'] !== 'undefined'){
	doc.font("Times-Roman")
	    .text(data['name']); //data input
    } else {
	doc.text("_______________");
    }

    doc.font("Times-Bold")
	.text("Signature: _______________");

    doc.moveDown()
	.font("Times-Bold")
	.text("OSIS: ", {continued: true})
    if(typeof data['OSIS'] !== 'undefined'){
	    .font("Times-Roman")
	    .text(data['OSIS']); //data input
    } else {
	doc.text("_______________");
    }

    doc.moveDown()
	.font("Times-Bold")
	.text("Date of Absence/Lateness/Cut: ", {continued: true})
    if(typeof data['excused_date'] !== 'undefined'){
	doc.font("Times-Roman")
	    .text(data['excused_date']); //data input
    } else {
	doc.text("_______________");
    }

    doc.moveDown()
	.font("Times-Bold")
	.text("Explanation: ", {continued: true})
    if(typeof data['explanation'] !== 'undefined'){
	doc.font("Times-Roman")
	    .text(data['explanation']); //data input
    } else {
	doc.text("________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________");
    }

    doc.moveDown()
	.font("Times-Bold")
	.text("Parent/Guardian's Name: ", {continued: true})
    if(typeof data['parent'] !== 'undefined'){
	doc.font("Times-Roman")
	    .text(data['parent'])
    } else {
	doc.text("_______________");
    }

    doc.moveDown()
	.font("Times-Bold")
	.text("Signature: _________________");

    doc.moveDown()
	.font("Times-Bold")
	.text("Classes:");

    doc.font("Times-Bold")
	.text("Pd. 1:   ", {continued: true});
    if(!data['1select']){
	doc.text("N/A")
    } else {
	if(typeof data['1name'] !== 'undefined'){
	    doc.text(data['1name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['1code'] !== 'undefined'){
	    doc.text(data['1code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 2:   ", {continued: true});
    if(!data['2select']){
	doc.text("N/A")
    } else {
	if(typeof data['2name'] !== 'undefined'){
	    doc.text(data['2name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['2code'] !== 'undefined'){
	    doc.text(data['2code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 3:   ", {continued: true});
    if(!data['3select']){
	doc.text("N/A")
    } else {
	if(typeof data['3name'] !== 'undefined'){
	    doc.text(data['3name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['3code'] !== 'undefined'){
	    doc.text(data['3code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 4:   ", {continued: true});
    if(!data['4select']){
	doc.text("N/A")
    } else {
	if(typeof data['4name'] !== 'undefined'){
	    doc.text(data['4name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['4code'] !== 'undefined'){
	    doc.text(data['4code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 5:   ", {continued: true});
    if(!data['5select']){
	doc.text("N/A")
    } else {
	if(typeof data['5name'] !== 'undefined'){
	    doc.text(data['5name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['5code'] !== 'undefined'){
	    doc.text(data['5code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 6:   ", {continued: true});
    if(!data['6select']){
	doc.text("N/A")
    } else {
	if(typeof data['6name'] !== 'undefined'){
	    doc.text(data['6name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['6code'] !== 'undefined'){
	    doc.text(data['6code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 7:   ", {continued: true});
    if(!data['7select']){
	doc.text("N/A")
    } else {
	if(typeof data['7name'] !== 'undefined'){
	    doc.text(data['7name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['7code'] !== 'undefined'){
	    doc.text(data['7code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 8:   ", {continued: true});
    if(!data['8select']){
	doc.text("N/A")
    } else {
	if(typeof data['8name'] !== 'undefined'){
	    doc.text(data['8name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['8code'] !== 'undefined'){
	    doc.text(data['8code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 9:   ", {continued: true});
    if(!data['9select']){
	doc.text("N/A")
    } else {
	if(typeof data['9name'] !== 'undefined'){
	    doc.text(data['9name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['9code'] !== 'undefined'){
	    doc.text(data['9code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 10:   ", {continued: true});
    if(!data['10select']){
	doc.text("N/A")
    } else {
	if(typeof data['10name'] !== 'undefined'){
	    doc.text(data['10name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['10code'] !== 'undefined'){
	    doc.text(data['10code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    //End the doc 
    doc.end();
    //When the stream is finished, save PDF
    stream.on("finish", function() {
	d	saveData(doc, "output.pdf");
    });
};

var createExcusePDF = function(data) {
    //Create new PDF document 
    var doc = new PDFDocument();

    //Create the excuse note PDF
    doc.fontSize(12)
	.text("STUYVESANT HIGH SCHOOL", {align: "center"})
	.text("ATTENDANCE OFFICE", {align: "center"})
	.text("ROOM 203", {align: "center"});

    doc.fontSize(14)
	.font("Times-Bold")
	.text("Type: ", {continued: true});
    if(typeof data['type'] !== 'undefined'){
	doc.font("Times-Roman")
	    .text(data['type']); //data input
    } else {
	doc.text("_______________");
    }

    doc.font("Times-Bold")
	.text("Name: ", {continued : true})
    if(typeof data['name'] !== 'undefined'){
	doc.font("Times-Roman")
	    .text(data['name']); //data input
    } else {
	doc.text("_______________");
    }

    doc.font("Times-Bold")
	.text("Signature: _______________");

    doc.moveDown()
	.font("Times-Bold")
	.text("OSIS: ", {continued: true})
    if(typeof data['OSIS'] !== 'undefined'){
	doc.font("Times-Roman")
	    .text(data['OSIS']); //data input
    } else {
	doc.text("_______________");
    }

    doc.moveDown()
	.font("Times-Bold")
	.text("Homeroom: ", {continued: true})
    if(typeof data['homeroom'] !== 'undefined'){
	doc.font("Times-Roman")
	    .text(data['homeroom']); //data input
    } else {
	doc.text("_______________");
    }

    doc.moveDown()
	.font("Times-Bold")
	.text("Date of Excuse: ", {continued: true})
    if(typeof data['excused_date'] !== 'undefined'){
	doc.font("Times-Roman")
	    .text(data['excused_date']); //data input
    } else {
	doc.text("_______________");
    }

    doc.moveDown()
	.font("Times-Bold")
	.text("Current Time: ", {continued: true})
    if(typeof data['current_time'] !== 'undefined'){
	doc.font("Times-Roman")
	    .text(data['current_time']);
    } else {
	doc.text("_______________");
    }

    doc.moveDown()
	.font("Times-Bold")
	.text("Exiting Time: ", {continued: true})
    if(typeof data['exiting_time'] !== 'undefined'){
	doc.font("Times-Roman")
	    .text(data['exiting_time']);
    } else {
	doc.text("_______________");
    }

    doc.moveDown()
	.font("Times-Bold")
	.text("Reason for Leaving: ", {continued: true})
    if(typeof data['explanation'] !== 'undefined'){
	doc.font("Times-Roman")
	    .text(data['explanation']); //data input
    } else {
	doc..text("________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________")
    }

    doc.moveDown()
	.font("Times-Bold")
	.text("Parent/Guardian's Name: ", {continued: true})
    if(typeof data['parent'] !== 'undefined'){
	doc.font("Times-Roman")
	    .text(data['parent'])
    } else {
	doc.text("_______________");
    }

    doc.moveDown()
	.font("Times-Bold")
	.text("Signature: _________________");

    doc.moveDown()
	.font("Times-Bold")
	.text("Classes:");

    doc.font("Times-Bold")
	.text("Pd. 1:   ", {continued: true});
    if(!data['1select']){
	doc.text("N/A")
    } else {
	if(typeof data['1name'] !== 'undefined'){
	    doc.text(data['1name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['1code'] !== 'undefined'){
	    doc.text(data['1code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 2:   ", {continued: true});
    if(!data['2select']){
	doc.text("N/A")
    } else {
	if(typeof data['2name'] !== 'undefined'){
	    doc.text(data['2name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['2code'] !== 'undefined'){
	    doc.text(data['2code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 3:   ", {continued: true});
    if(!data['3select']){
	doc.text("N/A")
    } else {
	if(typeof data['3name'] !== 'undefined'){
	    doc.text(data['3name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['3code'] !== 'undefined'){
	    doc.text(data['3code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 4:   ", {continued: true});
    if(!data['4select']){
	doc.text("N/A")
    } else {
	if(typeof data['4name'] !== 'undefined'){
	    doc.text(data['4name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['4code'] !== 'undefined'){
	    doc.text(data['4code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 5:   ", {continued: true});
    if(!data['5select']){
	doc.text("N/A")
    } else {
	if(typeof data['5name'] !== 'undefined'){
	    doc.text(data['5name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['5code'] !== 'undefined'){
	    doc.text(data['5code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 6:   ", {continued: true});
    if(!data['6select']){
	doc.text("N/A")
    } else {
	if(typeof data['6name'] !== 'undefined'){
	    doc.text(data['6name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['6code'] !== 'undefined'){
	    doc.text(data['6code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 7:   ", {continued: true});
    if(!data['7select']){
	doc.text("N/A")
    } else {
	if(typeof data['7name'] !== 'undefined'){
	    doc.text(data['7name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['7code'] !== 'undefined'){
	    doc.text(data['7code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 8:   ", {continued: true});
    if(!data['8select']){
	doc.text("N/A")
    } else {
	if(typeof data['8name'] !== 'undefined'){
	    doc.text(data['8name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['8code'] !== 'undefined'){
	    doc.text(data['8code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 9:   ", {continued: true});
    if(!data['9select']){
	doc.text("N/A")
    } else {
	if(typeof data['9name'] !== 'undefined'){
	    doc.text(data['9name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['9code'] !== 'undefined'){
	    doc.text(data['9code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 10:   ", {continued: true});
    if(!data['10select']){
	doc.text("N/A")
    } else {
	if(typeof data['10name'] !== 'undefined'){
	    doc.text(data['10name'] + "  ", {continued: true})
	} else {
	    doc.text("_______________  ");
	}
	if(typeof data['10code'] !== 'undefined'){
	    doc.text(data['10code'], {continued: true})
	} else {
	    doc.text("_______________");
	}
	doc.font("Times-Bold")
	    .text("Signature: _________________", {align: 'right'});
    }

    //Start the back page of the excuse note
    doc.addPage();
    
    doc.fontSize(18)
	.text("CONSENT", {align: center});
    
    doc.fontSize(14)
	.moveDown()
	.font("Times-Bold")
	.text("Date: ", {continued: true})
    if(typeof data['excused_date'] !== 'undefined'){
	doc.font("Times-Roman")
	    .text(data['excused_date']); //data input
    } else {
	doc.text("_______________");
    }

    doc.moveDown()
	.font("Times-Bold")
	.text("I hereby give consent for my son/daughter to leave school early today", {align: center})
    if(typeof data['consent'] !== 'undefined'){
	    .font("Times-Roman")
	    .text(data['consent']); //data input
    } else {
	doc.text("Yes     No", {align: center})
	    .text("Son     Daughter", {align: center})
    }

    doc.moveDown()
	.font("Times-Bold")
	.text("Reason: ", {continued: true})
    if(typeof data['explanation_parent'] !== 'undefined'){
	doc.font("Times-Roman")
	    .text(data['explanation_parent']); //data input
    } else {
	doc.text("________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________");
    }

    //More to come
    
    //End the doc 
    doc.end();
    //When the stream is finished, save PDF
    stream.on("finish", function() {
	saveData(doc, "output.pdf");
    });
};

var saveData = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, fileName) {
        var json = JSON.stringify(data),
        blob = new Blob([json], {type: "octet/stream"}),
        url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());

createAbsencePDF({
    type: 'absence-correction',
    name: 'Kevin Yan',
    OSIS: '205440076', 
    excused_date: '1-1-16',
    explanation: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
    parent: 'Dong Yan',
    1name: 'pd 1',
    1code: 'course 1',
    2name: 'pd 2',
    2code: 'course 2',
    3name: 'pd 3',
    3code: 'course 3',
    4name: 'pd 4',
    4code: 'course 4',
    5name: 'pd 5',
    5code: 'course 5',
    6name: 'pd 6',
    6code: 'course 6',
    7name: 'pd 7',
    7code: 'course 7',
    8name: 'pd 8',
    8code: 'course 8',
    9name: 'pd 9',
    9code: 'course 9',
    10name: 'pd 10',
    10code: 'course 10'
}
