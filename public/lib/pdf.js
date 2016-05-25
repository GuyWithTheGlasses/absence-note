var PDFDocument = require("pdfkit");

//Takes data object from user input
//Creates absence/excuse note PDF using inputed data 
var createPDF = function(data){

    //Create new PDF document 
    var doc = new PDFDocument();
    
    //Pipe to a readable Node stream - what does this mean?
    var stream = doc.pipe(res);
    
    //Create heading (same for every note)
    doc.fontSize(20)
	.text("STUYVESANT HIGH SCHOOL", { align: "center" })
	.text("ATTENDANCE OFFICE", { align: "center" })
	.text("ROOM 203", { align: "center" });   
    
    //MORE DRAWING TO TAKE PLACE HERE

    //End the doc 
    doc.end();
    //When the stream is finished, do something (ask how to display)
    stream.on("finish", function(){
	console.log(doc);
    });
};
