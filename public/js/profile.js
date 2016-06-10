ajax( {
  url: '/student/email',
  method: 'GET',
  success: function( res ) {
    for ( var x = 1; x < 11; x++ ) {
      var name = completely( document.getElementById( x + 'name' ) );
      name.options = res.split( ";" ).sort();
      name.startFrom = 0;
    }
  }

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
      var parent = this.parentNode;
      ajax( {
        url: "/student/profile",
        method: "POST",
        data: data,
        success: function( res ) {
          res = JSON.parse( res );
          if ( res.success ) {
            parent.innerHTML = change + done;
          } else {
            document.getElementById( "error" ).innerHTML = res.message;
          }
        }
      } );
    } );
  } );
}

var variable = document.getElementsByClassName( "variable" );

for ( var x = 0; x < variable.length; x++ ) {
  if ( ( variable[ x ].innerHTML ).trim() === "" ) {
    variable[ x ].innerHTML = insert;
    variable[ x ].childNodes[ 0 ].focus();
    variable[ x ].childNodes[ 1 ].addEventListener( "click", function( e ) {
      e.preventDefault();
      var parent = this.parentNode;
      var change = this.value;
      var data = {};
      data[ this.getAttribute( 'id' ) ] = change;
      ajax( {
        url: "/student/profile",
        method: "POST",
        data: data,
        success: function( res ) {
          res = JSON.parse( res );
          if ( res.success ) {
            parent.innerHTML = change + done;
          } else {
            document.getElementById( "error" ).innerHTML = res.message;
          }
        }
      } );
    } );
  }
}

document.getElementById( "submit" ).addEventListener( "click", function( e ) {
  e.preventDefault();
  var data = {};
  for ( var x = 1; x < 11; x++ ) {
    data[ x ] = [ document.getElementById( x + "name" ).children[ 0 ].children[ 1 ].value, document.getElementById( x + "code" ).value ];
  }
  ajax( {
    url: "/student/teachers",
    method: "POST",
    data: data,
    success: function( res ) {
      res = JSON.parse( res );
      if ( res.success ) {} else {
        document.getElementById( "error" ).innerHTML = res.message;
      }
    }
  } );
} );