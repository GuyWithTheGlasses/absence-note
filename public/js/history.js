var rows = document.getElementsByClassName( "tablerow" );
forEachInClass(document, 'tablerow', function(row){
    forEachInClass(row, 'tablelink', function(element){
      element.addEventListener('click', function(e){
        e.preventDefault();
        var link = row.children[0].children[0].getAttribute('href');
        window.location.href = link;
      });
    });
});
