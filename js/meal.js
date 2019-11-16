$(document).ready(() => {
  getInfo();
});

const trContent = (index, item) =>
  `
      <tr>
          <th scope="row">${index + 1}</th>
          <td>${item.name}</td>
          <td>${item.phone}</td>
          <td>${item.startTime}~${item.endTime}</td>
      </tr>
      `;

function getInfo() {
  $.ajax({
    url: "https://bluelim.dev/api/snack",
    method: "GET",
    dataType: "json"
  })
    .done(json => {
      json.map((item, index) => $("tbody").append(trContent(index, item)));
    })
    .fail((xhr, status, errorThrown) => {
      console.log(errorThrown);
    })
    .always((xhr, status) => {
      console.log("request done");
    });
}
