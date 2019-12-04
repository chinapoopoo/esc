$(document).ready(() => {
  getInfo();
});

const trContent = (index, item) =>
  `
      <tr>
          <th scope="row">${index + 1}</th>
          <td>${translate[item.id]}</td>
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
    });
}

const translate = {
  14: "Jibungwiepadak & ttobagi (지붕위에 파닭&또박이)",
  5: "Dondoni seoksoe hanpan bulgogi (돈도니 석쇠한판 불고기)",
  23: "Love me soup tteokbokki& large cutlet(러브미 국물떡볶이&왕돈까스)",
  2: "Ttangttang chicken(Heunghae), 땅땅치킨(흥해점)",
  4: "Samchonne jjimdak 삼촌네 찜닭",
  28: "Ugong fish (Changpo), 우공피쉬 초밥(창포점)",
  12: "Shinsegae dakbal 신세계 닭발",
  32: "Tosirae jokbal/bossam/dosirak 토시래 족발/보쌈/도시락",
  26: "Manyeo Jokbal 마녀족발",
  30: "Hosigi dumari chicken (Yangdeok), 호식이두마리치킨(양덕점)",
  31: "Ugong fish (Yangdeok), 우공피쉬(양덕점)",
  11: "Ttangttang chicken(Yangdeok), 땅땅치킨(양덕점)",
  8: "Michyeo beorin padak 미쳐버린 파닭",
  10: "Chiko padak 치코파닭"
};
