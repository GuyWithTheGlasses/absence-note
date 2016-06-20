forEachInClass( document, 'approve', function( button ) {
  button.addEventListener( 'click', function( e ) {
    e.preventDefault();
    if ( this.parentNode.parentNode.tagName == "tr" ) {
      this.parentNode.parentNode.style.display = "none";
    }
    ajax( {
      url: "/admin/note/" + this.getAttribute( 'id' ) + "/approve",
      method: "POST",
      success: function( res ) {
        document.getElementById( "response" ).innerHTML = "Approved";
      }
    } );
  } );
} );

forEachInClass( document, 'deny', function( button ) {
  button.addEventListener( 'click', function( e ) {
    e.preventDefault();
    if ( this.parentNode.parentNode.tagName == "tr" ) {
      this.parentNode.parentNode.style.display = "none";
    }
    ajax( {
      url: "/admin/note/" + this.getAttribute( 'id' ) + "/deny",
      method: "POST",
      success: function( res ) {
        document.getElementById( "response" ).innerHTML = "Denied";
      }
    } );
  } );
} );