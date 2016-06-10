var teachers = [ "Ada", "Java", "JavaScript", "Brainfuck", "LOLCODE", "Node.js", "Ruby on Rails" ];

var auto = completely( document.getElementById( '1name' ) );

auto.options = teachers;
auto.startFrom = 0;

var insert = '<input type="text" class="input save-text"><i class="fa fa-floppy-o" aria-hidden="true"></i>';
var done = '<i class="fa fa-pencil" aria-hidden="true"></i>';
var pencils = document.getElementsByClassName( "fa-pencil" );

for ( var x = 0; x < pencils.length; x++ ) {
  pencils[ x ].addEventListener( "click", function( e ) {
    e.preventDefault();
    var parent = this.parentNode;
    parent.innerHTML = insert;
    parent.childNodes[ 0 ].focus();
    parent.childNodes[ 1 ].addEventListener( "click", function( e ) {
      e.preventDefault();
      //add ajax here
      var parent = this.parentNode;
      parent.innerHTML = done;
    } );
  } );
}
