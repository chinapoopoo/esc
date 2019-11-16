$(document).ready(() => {
  getInfo();
});

const checkCategory = item =>
  item.category_id == 1 ||
  item.category_id == 2 ||
  item.category_id == 3 ||
  item.category_id == 54;

const trContent = (index, item) =>
  `
    <tr>
        <th scope="row">${index + 1}</th>
        <td>${item.name}</td>
        <td>${item.phone}</td>
        <td>${item.time == null ? "09:00~18:00" : item.time}</td>
    </tr>
    `;

function getInfo() {
  $.ajax({
    url: "https://bluelim.dev/api/v3/info",
    method: "GET",
    dataType: "json"
  })
    .done(json => {
      json
        .filter(checkCategory)
        .map((item, index) => $("tbody").append(trContent(index, item)));
    })
    .fail((xhr, status, errorThrown) => {
      console.log(errorThrown);
    })
    .always((xhr, status) => {
      console.log("request done");
    });
}
