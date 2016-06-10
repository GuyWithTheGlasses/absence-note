//Takes data object from user input
//Creates absence note PDF using inputed data 
var createAbsencePDF = function(data) {
    
    console.log('creating PDF')
    //Create new PDF document 
    var doc = new PDFDocument();
    //var blobStream = doc.pipe(blobStream());

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
	.text("Name: ", {continued : true});
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
	.text("OSIS: ", {continued: true});
    if(typeof data['OSIS'] !== 'undefined'){
    doc.font("Times-Roman")
        .text(data['OSIS']); //data input
    } else {
	doc.text("_______________");
    }

    doc.moveDown()
	.font("Times-Bold")
	.text("Date of Absence/Lateness/Cut: ", {continued: true});
    if(typeof data['excused_date'] !== 'undefined'){
	doc.font("Times-Roman")
        .text(data['excused_date']); //data input
    } else {
	doc.text("_______________");
    }

    doc.moveDown()
	.font("Times-Bold")
	.text("Explanation: ", {continued: true});
    if(typeof data['explanation'] !== 'undefined'){
    doc.font("Times-Roman")
        .text(data['explanation']); //data input
    } else {
	doc.text("________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________");
    }

    doc.moveDown()
	.font("Times-Bold")
	.text("Parent/Guardian's Name: ", {continued: true});
    if(typeof data['parent'] !== 'undefined'){
	doc.font("Times-Roman")
        .text(data['parent']); //data input
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
	    doc.text("N/A");
    } else {
	if(typeof data['1name'] !== 'undefined'){
        doc.text(data['1name'] + "  ", {continued: true});
	} else {
        doc.text("_______________  ");
	}
	if(typeof data['1code'] !== 'undefined'){
        doc.text(data['1code'], {continued: true});
	} else {
        doc.text("_______________");
	}
	doc.font("Times-Bold")
        .text("Signature: _________________", {align: 'right'});
    }

    doc.font("Times-Bold")
	.text("Pd. 2:   ", {continued: true});
    if(!data['2select']){
        doc.text("N/A");
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
        doc.text("N/A");
    } else {
	if(typeof data['3name'] !== 'undefined'){
        doc.text(data['3name'] + "  ", {continued: true});
	} else {
        doc.text("_______________  ");
	}
	if(typeof data['3code'] !== 'undefined'){
	    doc.text(data['3code'], {continued: true});
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
    //Save PDF
    saveData2(url, "output.PDF");
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
	doc.text("________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________")
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

    //Dict entry unclear
    doc.moveDown()
	.font("Times-Bold")
	.text("I hereby give consent for my son/daughter to leave school early today", {align: center})
    if(typeof data['consent'] !== 'undefined'){
	    doc.font("Times-Roman")
	        .text(data['consent']); //data input
    } else {
	doc.text("Yes     No", {align: center})
	    .text("Son     Daughter", {align: center})
    }

    //Dict entry unclear
    doc.moveDown()
	.font("Times-Bold")
	.text("Reason: ", {continued: true})
    if(typeof data['explanation_parent'] !== 'undefined'){
	doc.font("Times-Roman")
	    .text(data['explanation_parent']); //data input
    } else {
	doc.text("________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________");
    }

    //Dict entry unclear
    doc.moveDown()
	.font("Times-Bold")
	.text("Parent's Name: ", {continued: true})
    if(typeof data['parent_name'] !== 'undefined'){
	doc.font("Times-Roman")
	    .text(data['parent_name']); //data input
    } else {
	doc.text("_______________  ");
    }
    
    doc.font("Times-Bold")
	.text("Parent's Signature: _______________", {align: 'right'});
    
    doc.font("Times-Bold")
    	.text("Date of Signature: _______________", {continued: true})
    	.text("Contact Number: _______________", {align: 'right'});
    
    doc.fontSize(17)
	.font("Times-Bold")
	.text("For Attendence Office Staff Only", {align: 'center', underline: true});

    doc.moveDown()
	    .fontSize(14)
	    .text("Call       Fax       Email", {align: 'center'})
	    .moveDown()
	    .text("From:  Mom       Dad       Guardian       Other:_______________", {align: 'center'})
	    .moveDown()
	    .text("Date: _______________  Time: _______________", {align: 'center'});

    doc.moveDown()
	.text("Student was seen by:", {align: 'center'})
    
    //End the doc 
    doc.end();
    //Save PDF
    saveData(doc, "output.pdf");
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

var saveData2 = function(pdfdoc, name) {
  var link = document.createElement('a');
  link.href = pdfdoc;
  link.download = name;
  link.dispatchEvent(new MouseEvent('click'));
};

