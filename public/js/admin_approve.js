forEachInClass(document, 'approve', function(button) {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    console.log("/admin/note/" + this.getAttribute('id') + "/approve");
    ajax({
      url: "/admin/note/" + this.getAttribute('id') + "/approve",
      method: "POST",
      success: function(res) {
        console.log(res);
      }
    });
  });
});

forEachInClass(document, 'deny', function(button) {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    ajax({
      url: "/admin/note/" + this.getAttribute('id') + "/deny",
      method: "POST",
      success: function(res) {
        console.log(res);
      }
    });
  });
});
