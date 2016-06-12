var NOTE_CONTAINER_CLASS = 'note-container';
var NOTE_CREATION_BUTTON_CLASS = 'pdf-note-button';

var pullNote = function(e){
  forEachInClass(document, NOTE_CONTAINER_CLASS, function(note){
    var doc = new jsPDF();
    doc.fromHTML(note);
  });
  doc.output('dataurlnewwindow');
};

forEachInClass(document, NOTE_CREATION_BUTTON_CLASS, function(button){
  button.addEventListener('click', pullNote);
});
