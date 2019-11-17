$(document).ready(() => {
  $(".esc-btn").click(e => {
    e.preventDefault();
    translate();
  });
});

function translate() {
  const text = $("#textarea").val();

  if (text.length === 0) {
    alert("Please fill in a textbox!");
    return;
  }

  $.ajax({
    url: "https://bluelim.dev/translate/translate",
    method: "POST",
    data: JSON.stringify({ message: text }),
    dataType: "json",
    contentType: "application/json"
  })
    .done(json => {
      $(".translated").text(json.result);
    })
    .fail((xhr, status, errorThrown) => {
      $(".translated").text(xhr.responseJSON.result);
    });
}
