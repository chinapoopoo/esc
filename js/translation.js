$(document).ready(() => {
  translate();
});

function translate() {
  $.ajax({
    url: "http://127.0.0.1:3000/translate",
    method: "POST",
    data: JSON.stringify({ message: "is test" }),
    dataType: "json",
    contentType: "application/json"
  })
    .done(json => {
      console.log(JSON.parse(json));
    })
    .fail((xhr, status, errorThrown) => {
      console.log(errorThrown);
    });
}
