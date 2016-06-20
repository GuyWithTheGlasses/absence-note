forEachInClass( document, 'approve', function( button ) {
  button.addEventListener( 'click', function( e ) {
    e.preventDefault();
    console.log( this.parentNode.parentNode.tagName );
    if ( this.parentNode.parentNode.tagName == "TR" ) {
      this.parentNode.parentNode.style.display = "none";
    } else {
      forEachInClass( document, 'approve', function( button ) {
        button.style.display = "none";
      } );
      forEachInClass( document, 'deny', function( button ) {
        button.style.display = "none";
      } );
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
    console.log( this.parentNode.parentNode );
    if ( this.parentNode.parentNode.tagName == "TR" ) {
      this.parentNode.parentNode.style.display = "none";
    } else {
      forEachInClass( document, 'approve', function( button ) {
        button.style.display = "none";
      } );
      forEachInClass( document, 'deny', function( button ) {
        button.style.display = "none";
      } );
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