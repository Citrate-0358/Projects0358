function myFunction() {
  var x = document.getElementById("right-label");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}