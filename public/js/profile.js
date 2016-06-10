var teachers = [ "Ada", "Java", "JavaScript", "Brainfuck", "LOLCODE", "Node.js", "Ruby on Rails" ];

var oneName = document.getElementById( "1name" );
new Awesomplete( oneName, {
  list: teachers
} );

var twoName = document.getElementById( "2name" );
new Awesomplete( twoName, {
  list: teachers
} );

var threeName = document.getElementById( "3name" );
new Awesomplete( threeName, {
  list: teachers
} );

var fourName = document.getElementById( "4name" );
new Awesomplete( fourName, {
  list: teachers
} );

var fiveName = document.getElementById( "5name" );
new Awesomplete( fiveName, {
  list: teachers
} );

var sixName = document.getElementById( "6name" );
new Awesomplete( sixName, {
  list: teachers
} );

var sevenName = document.getElementById( "7name" );
new Awesomplete( sevenName, {
  list: teachers
} );

var eightName = document.getElementById( "8name" );
new Awesomplete( eightName, {
  list: teachers
} );

var nineName = document.getElementById( "9name" );
new Awesomplete( nineName, {
  list: teachers
} );

var tenName = document.getElementById( "10name" );
new Awesomplete( tenName, {
  list: teachers
} );

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
