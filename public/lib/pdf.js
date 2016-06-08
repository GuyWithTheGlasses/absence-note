var PDFDocument = require("pdfkit");

//Takes data object from user input
//Creates absence note PDF using inputed data 
var createAbsencePDF = function(data) {

    //Create new PDF document 
    var doc = new PDFDocument();

    //Pipe to a readable Node stream - what does this mean?
    var stream = doc.pipe(res);

    //Create heading (same for every note)
    doc.fontSize(12)
	.text("STUYVESANT HIGH SCHOOL", {
	    align: "center"
	})
	.text("ATTENDANCE OFFICE", {
	    align: "center"
	})
	.text("ROOM 203", {
	    align: "center"
	});

    doc.fontSize(14)
        .font("Times-Bold")
	.text("Type: ", {continued: true})
	.font("Times-Roman")
	.text("Excused Absence"); //data input

    doc.fontSize(14)
	.font("Times-Bold")
	.text("Name: ", {continued : true})
	.font("Times-Roman")
	.text("Kevin Yan"); //data input
    
    doc.fontSize(14)
	.font("Times-Bold")
	.text("Signature: _______________");
    
    doc.fontSize(14)
        .moveDown()
        .font("Times-Bold")
        .text("OSIS: ", {continued: true})
        .font("Times-Roman")
        .text("123456789"); //data input

     doc.fontSize(14)
        .moveDown()
        .font("Times-Bold")
        .text("Date of Absence/Lateness/Cut: ", {continued: true})
        .font("Times-Roman")
        .text("1/1/16"); //data input

    doc.fontSize(14)
        .moveDown()
        .font("Times-Bold")
        .text("Explanation: ", {continued: true})
        .font("Times-Roman")
        .text("The alarm didn't go off I swear there 
was a huge delay on the MTA"); //data input

    doc.fontSize(14)
        .moveDown()
        .font("Times-Bold")
        .text("Classes:")
        .moveDown()
        .font("Times-Roman")
        .text("Pd. 1", {continued: true}); //data input

    //End the doc 
    doc.end();
    //When the stream is finished, do something (ask how to display)
    stream.on("finish", function() {
	console.log(doc);
    });
};

var createExcusePDF = function(data) {

};
