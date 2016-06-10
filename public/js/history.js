var rows = document.getElementsByClassName( "tablerow" );

for ( var x = 0; x < rows.length; x++ ) {
  var link = rows[ x ].children[ 0 ].children[ 0 ].getAttribute( "href" );
  var cells = rows[ x ].children;
  for ( var y = 0; y < cells.length; y++ ) {
    if ( cells[ y ].classList.contains( "tablelink" ) ) {
      cells[ y ].addEventListener( "click", function( e ) {
        e.preventDefault();
        window.location = link;
      } );
    }
  }
}