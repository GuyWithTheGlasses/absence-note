ajax( {
  url: '/student/names',
  method: 'GET',
  success: function( res ) {
    res = JSON.parse( res );
    forEachInClass( document, 'input teacher', function( input ) {
      var name = completely( input );
      name.options = res.sort();
      name.startFrom = 0;
    } );
  }
} );

var insert = '<input type="text" class="input save-text"><i class="fa fa-floppy-o" aria-hidden="true"></i>';
var done = '<i class="fa fa-pencil" aria-hidden="true"></i>';

var submitData = function( e ) {
  e.preventDefault();
  var parent = this.parentNode;
  var change = parent.getElementsByTagName( 'INPUT' )[ 0 ].value;
  if ( !change ) return;
  var data = {};
  data[ parent.getAttribute( 'id' ) ] = change;
  ajax( {
    url: "/student/profile",
    method: "POST",
    data: data,
    success: function( res ) {
      res = JSON.parse( res );
      if ( res.success ) {
        parent.innerHTML = change + done;
        parent.children[ 0 ].addEventListener( 'click', createEditField );
      } else {
        document.getElementById( "error" ).innerHTML = res.message;
      }
    }
  } );
};

var createEditField = function( e ) {
  e.preventDefault();
  var parent = this.parentNode;
  parent.innerHTML = insert;
  parent.childNodes[ 0 ].focus();
  parent.childNodes[ 1 ].addEventListener( "click", submitData );
};

var variable = document.getElementsByClassName( "variable" );
for ( var x = variable.length - 1; x >= 0; x-- ) {
  if ( ( variable[ x ].innerHTML ).trim() === "" ) {
    variable[ x ].innerHTML = insert;
    variable[ x ].childNodes[ 0 ].focus();
    variable[ x ].childNodes[ 1 ].addEventListener( "click", submitData );
  } else {
    variable[ x ].innerHTML += done;
    variable[ x ].children[ 0 ].addEventListener( 'click', createEditField );
  }
}

var pencils = document.getElementsByClassName( "fa-pencil" );
for ( var x = 0; x < pencils.length; x++ ) {
  pencils[ x ].addEventListener( "click", createEditField );
}

var setupTeachers = function( user ) {
  forEachInClass( document, TEACHER_EDIT_TABLE, function( table ) {
    var period = 0;
    forEachInTags( table, 'TR', function( input ) {
      var teacher = user.teachers[ period++ - 1 ];
      if ( !teacher ) return;
      forEachInClass( input, 'teacher', function( name ) {
        forEachInTags( name, 'input', function( inputname ) {
          inputname.value = teacher.name || "";
        } );
      } );
      forEachInClass( input, 'code', function( code ) {
        code.value = teacher.course_code || "";
      } );
    } );
  } );
};

ajax( {
  url: '/student/me',
  method: 'POST',
  success: function( res ) {
    res = JSON.parse( res );
    setupTeachers( res );
  }
} );

var TEACHER_EDIT_TABLE = "courses";

var submitTeachers = function( e ) {
  forEachInClass( document, TEACHER_EDIT_TABLE, function( table ) {
    var teachers = [];
    var period = 0;
    forEachInTags( table, 'TR', function( input ) {
      var teacher = {};
      forEachInClass( input, 'teacher', function( name ) {
        forEachInTags( name, 'input', function( inputname ) {
          teacher.name = inputname.value;
        } );
      } );
      forEachInClass( input, 'code', function( code ) {
        teacher.course_code = code.value;
      } );
      teacher.period = period++;
      if ( period !== 1 ) teachers.push( teacher );
    } );
    var data = {
      teachers: teachers
    };
    ajax( {
      url: '/student/profile',
      data: data
    } );
  } );
};
document.getElementsByClassName( 'form-submit-ajax' )[ 0 ].addEventListener( 'click', submitTeachers );