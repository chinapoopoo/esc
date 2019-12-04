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
        <td>${translate[item.id]}</td>
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
    });
}

const translate = {
  22: "GLS",
  32: "ICT",
  17: "Security office",
  23: "Management and Economics",
  29: "Spatial Environment System Engineering",
  31: "Engineering Education Innovation Center",
  3: "Academy supporting team",
  18: "Education development center",
  40: "International hall office",
  20: "International studies, Languages and literature",
  6: "International affairs",
  28: "Mechanical and Control Engineering",
  39: "Lothem Hall office",
  43: "Mom’s Kitchen",
  13: "Convenience store",
  45: "Bus lost-and-found",
  30: "Law",
  36: "Bethel hall office",
  41: "Clinic",
  7: "Welfare society",
  35: "Vision hall office",
  47: "Counseling Psychology and Social Welfare",
  25: "Life science",
  34: "Dormitory management office",
  14: "Book store",
  16: "Dry-Cleaning and Laundry",
  5: "Facility management team",
  26: "Communication arts and science",
  19: "GLC(Global language center)",
  15: "Post office",
  38: "Grace hall office",
  46: "Rent bus lost-and-found",
  27: "Computer Science and Electrical Engineering",
  12: "Information and service promotion office",
  33: "Creative Convergence education center",
  37: "Creation hall office",
  4: "General staff personnel team",
  8: "Image solution(print&fax)",
  24: "Creative Convergence Education",
  42: "Farm’s Barley",
  11: "Student Experience Development Team",
  44: "Cafeteria",
  2: "Student support team"
};
