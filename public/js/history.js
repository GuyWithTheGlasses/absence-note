var rows = document.getElementsByTagName( "tr" );

for ( var x = 0; x < rows.length; x++ ) {
  rows[ x ].addEventListener( "click", function( e ) {
    e.preventDefault();
    window.location = ( this.children[ 0 ].children[ 0 ].getAttribute( "href" ) );
  } );
}
