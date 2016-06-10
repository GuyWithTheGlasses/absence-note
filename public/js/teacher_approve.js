document.getElementById( "approve" ).addEventListener( "click", function( e ) {
  e.preventDefault();
  ajax( {
    url: "/teacher/approve",
    method: "POST",
    success: function( res ) {
      console.log( res );
    }
  } );
} );

document.getElementById( "deny" ).addEventListener( "click", function( e ) {
  e.preventDefault();
  ajax( {
    url: "/teacher/deny",
    method: "POST",
    success: function( res ) {
      console.log( res );
    }
  } );
} );