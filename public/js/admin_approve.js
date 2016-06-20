forEachInClass( document, 'approve', function( button ) {
  button.addEventListener( 'click', function( e ) {
    e.preventDefault();
    ajax( {
      url: "/admin/note/" + this.getAttribute( 'id' ) + "/approve",
      method: "POST",
      success: function( res ) {
        document.getElementById( "response" ).innerHTML = "Approved";
        this.parent.parent.style.display = "none";
      }
    } );
  } );
} );

forEachInClass( document, 'deny', function( button ) {
  button.addEventListener( 'click', function( e ) {
    e.preventDefault();
    ajax( {
      url: "/admin/note/" + this.getAttribute( 'id' ) + "/deny",
      method: "POST",
      success: function( res ) {
        document.getElementById( "response" ).innerHTML = "Denied";
        this.parent.parent.style.display = "none";
      }
    } );
  } );
} );