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
	.text("Type: ", {continued: true})
	.font("Times-Roman")
	.text(data['type']); //data input

    doc.font("Times-Bold")
	.text("Name: ", {continued : true})
	.font("Times-Roman")
	.text(data['name']); //data input

    doc.font("Times-Bold")
	.text("Signature: _______________");

    doc.moveDown()
	.font("Times-Bold")
	.text("OSIS: ", {continued: true})
	.font("Times-Roman")
	.text(data['OSIS']); //data input

    doc.moveDown()
	.font("Times-Bold")
	.text("Date of Absence/Lateness/Cut: ", {continued: true})
	.font("Times-Roman")
	.text(data['excused_date']); //data input

    doc.moveDown()
	.font("Times-Bold")
	.text("Explanation: ", {continued: true})
	.font("Times-Roman")
	.text(data['explanation']); //data input

    doc.moveDown()
	.font("Times-Bold")
	.text("Parent/Guardian's Name: ", {continued: true})
	.font("Times-Roman")
	.text(data['parent'])

    doc.moveDown()
	.font("Times-Bold")
	.text("Signature: _________________");

    doc.moveDown()
	.font("Times-Bold")
	.text("Classes:");

    doc.font("Times-Bold")
	.text("Pd. 1:   ", {continued: true})
	.font("Times-Roman")
	.text(data['1name'] + "  ", {continued: true}) //data input
	.text(data['1code'], {continued: true}) //data input
	.font("Times-Bold")
	.text("Signature: _________________", {align: 'right'});

    doc.font("Times-Bold")
	.text("Pd. 2:   ", {continued: true})
	.font("Times-Roman")
	.text(data['2name'] + "  ", {continued: true}) //data input
	.text(data['2code'], {continued: true}) //data input
	.font("Times-Bold")
	.text("Signature: _________________", {align: 'right'});

    doc.font("Times-Bold")
	.text("Pd. 3:   ", {continued: true})
	.font("Times-Roman")
	.text(data['3name'] + "  ", {continued: true}) //data input
	.text(data['3code'], {continued: true}) //data input
	.font("Times-Bold")
	.text("Signature: _________________", {align: 'right'});

    doc.font("Times-Bold")
	.text("Pd. 4:   ", {continued: true})
	.font("Times-Roman")
	.text(data['4name'] + "  ", {continued: true}) //data input
	.text(data['4code'], {continued: true}) //data input
	.font("Times-Bold")
	.text("Signature: _________________", {align: 'right'});

    doc.font("Times-Bold")
	.text("Pd. 5:   ", {continued: true})
	.font("Times-Roman")
	.text(data['5name'] + "  ", {continued: true}) //data input
	.text(data['5code'], {continued: true}); //data input
	.font("Times-Bold")
	.text("Signature: _________________", {align: 'right'});

    doc.font("Times-Bold")
	.text("Pd. 6:   ", {continued: true})
	.font("Times-Roman")
	.text(data['6name'] + "  ", {continued: true}) //data input
	.text(data['6code'], {continued: true}) //data input
	.font("Times-Bold")
	.text("Signature: _________________", {align: 'right'});

    doc.font("Times-Bold")
	.text("Pd. 7:   ", {continued: true})
	.font("Times-Roman")
	.text(data['7name'] + "  ", {continued: true}) //data input
	.text(data['7code'], {continued: true}) //data input
	.font("Times-Bold")
	.text("Signature: _________________", {align: 'right'});

    doc.font("Times-Bold")
	.text("Pd. 8:   ", {continued: true})
	.font("Times-Roman")
	.text(data['8name'] + "  ", {continued: true}) //data input
	.text(data['8code'], {continued: true}) //data input
	.font("Times-Bold")
	.text("Signature: _________________", {align: 'right'});

    doc.font("Times-Bold")
	.text("Pd. 9:   ", {continued: true})
	.font("Times-Roman")
	.text(data['9name'] + "  ", {continued: true}) //data input
	.text(data['9code'], {continued: true}) //data input
	.font("Times-Bold")
	.text("Signature: _________________", {align: 'right'});

    doc.font("Times-Bold")
	.text("Pd. 10:   ", {continued: true})
	.font("Times-Roman")
	.text(data['10name'] + "  ", {continued: true}) //data input
	.text(data['10code'], {continued: true}) //data input
	.font("Times-Bold")
	.text("Signature: _________________", {align: 'right'});

    //End the doc 
    doc.end();
    //When the stream is finished, save PDF
    stream.on("finish", function() {
	saveData(doc, "output.pdf");
    });
};

var createExcusePDF = function(data) {
    
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
