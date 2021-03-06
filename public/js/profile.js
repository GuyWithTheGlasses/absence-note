var TEACHER_EDIT_TABLE = "courses";

ajax({
  url: '/student/names',
  method: 'GET',
  success: function(res) {
    res = JSON.parse(res);
    Array.prototype.push.apply(res, ['LUNCH', 'PHYSICAL EDUCATION FREE', 'PHYSICS FREE', 'BIOLOGY FREE', 'FREE']);
    forEachInClass(document, 'input teacher', function(input) {
      var name = completely(input);
      name.options = res.sort();
      name.startFrom = 0;
      input.childNodes[0].childNodes[2].addEventListener("keydown", function(e) {
        if (event.keyCode == 9) {
          input.parentNode.parentNode.childNodes[5].childNodes[1].focus();
        }
        if (event.keyCode == 13) {
          document.getElementById("submit").click();
        }
      });
      input.parentNode.parentNode.childNodes[5].childNodes[1].addEventListener("keydown", function(e) {
        if (event.keyCode == 9) {
          input.parentNode.parentNode.nextElementSibling.children[1].children[0].children[0].children[1].focus();
        }
        if (event.keyCode == 13) {
          document.getElementById("submit").click();
        }
      });
    });
    var setupTeachers = function(user) {
      forEachInClass(document, TEACHER_EDIT_TABLE, function(table) {
        var period = 0;
        forEachInTags(table, 'TR', function(input) {
          var teacher = user.teachers[period++ - 1];
          if (!teacher) return;
          forEachInClass(input, 'teacher', function(name) {
            forEachInTags(name, 'input', function(inputname) {
              inputname.value = teacher.name || "";
            });
          });
          forEachInClass(input, 'code', function(code) {
            code.value = teacher.course_code || "";
          });
        });
      });
    };
    ajax({
      url: '/student/me',
      method: 'POST',
      success: function(res) {
        res = JSON.parse(res);
        setupTeachers(res);
      }
    });
  }
});

var insert = '<input type="text" class="input save-text"><i class="fa fa-floppy-o" aria-hidden="true"></i>';
var done = '<i class="fa fa-pencil" aria-hidden="true"></i>';

var submitData = function(e) {
  e.preventDefault();
  var parent = this.parentNode;
  var change = parent.getElementsByTagName('INPUT')[0].value;
  if (!change) return;
  var data = {};
  data[parent.getAttribute('id')] = change;
  ajax({
    url: "/student/profile",
    method: "POST",
    data: data,
    success: function(res) {
      res = JSON.parse(res);
      if (res.success) {
        parent.innerHTML = change + done;
        parent.children[0].addEventListener('click', createEditField);
      } else {
        document.getElementById("error").innerHTML = res.message;
      }
    }
  });
};

var createEditField = function(e) {
  e.preventDefault();
  var parent = this.parentNode;
  parent.innerHTML = insert;
  parent.childNodes[0].focus();
  parent.childNodes[1].addEventListener("click", submitData);
  console.log(parent.childNodes[0]);
  parent.childNodes[0].addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      console.log('enter');
      parent.childNodes[1].click();
    }
  });
};

var enterKey = function(event) {
  event.preventDefault();
  var parent = this.parentNode;
  if (event.keyCode == 13) {
    parent.children[1].click();
  }
};

var variable = document.getElementsByClassName("variable");
for (var x = variable.length - 1; x >= 0; x--) {
  if ((variable[x].innerHTML).trim() === "") {
    variable[x].innerHTML = insert;
    variable[x].childNodes[0].focus();
    variable[x].childNodes[1].addEventListener("click", submitData);
    variable[x].childNodes[0].addEventListener("keyup", enterKey);
  } else {
    variable[x].innerHTML += done;
    variable[x].children[0].addEventListener('click', createEditField);
  }
}

forEachInClass(document, "fa-pencil", function(pencil) {
  pencil.addEventListener('click', createEditField);
});

var submitTeachers = function(e) {
  forEachInClass(document, TEACHER_EDIT_TABLE, function(table) {
    var teachers = [];
    var period = 0;
    forEachInTags(table, 'TR', function(input) {
      var teacher = {};
      forEachInClass(input, 'teacher', function(name) {
        forEachInTags(name, 'input', function(inputname) {
          teacher.name = inputname.value;
        });
      });
      forEachInClass(input, 'code', function(code) {
        teacher.course_code = code.value;
      });
      teacher.period = period++;
      if (period !== 1) teachers.push(teacher);
    });
    var data = {
      teachers: teachers
    };
    ajax({
      url: '/student/profile',
      data: data,
      success: function(res) {
        document.getElementById("success").innerHTML = "Successfully Updated";
        setTimeout(function() {
          document.getElementById("success").innerHTML = "";
        }, 2000);
      }
    });
  });
};
document.getElementsByClassName('form-submit-ajax')[0].addEventListener('click', submitTeachers);

var saveProfile = function(e){
  var data = {};
  forEachInClass(document, "fa-floppy-o", function(savebutton){
      savebutton.click();
  });
};
forEachInClass(document, "save-profile", function(button){
    button.addEventListener('click',saveProfile);
});
