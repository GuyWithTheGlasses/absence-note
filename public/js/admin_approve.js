document.getElementById( "approve" ).addEventListener( "click", function( e ) {
  e.preventDefault();
  ajax( {
    url: "/admin/approve",
    method: "POST",
    success: function( res ) {
      console.log( res );
    }
  } );
} );

document.getElementById( "deny" ).addEventListener( "click", function( e ) {
  e.preventDefault();
  ajax( {
    url: "/admin/deny",
    method: "POST",
    success: function( res ) {
      console.log( res );
    }
  } );
} );