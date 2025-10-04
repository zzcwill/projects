// 计算rem
const docEl = document.documentElement;
const clientWidth = docEl.clientWidth;

let fontSize = 100 * (clientWidth / 375);
if (clientWidth > 750) {
  fontSize = 100;
}

docEl.style.fontSize = `${fontSize}px`;

// window.onresize = function () {
//   const clientWidth = docEl.clientWidth;

//   let fontSize = 100 * (clientWidth / 375);
//   if (clientWidth > 750) {
//     fontSize = 100;
//   }

//   docEl.style.fontSize = `${fontSize}px`;
// };