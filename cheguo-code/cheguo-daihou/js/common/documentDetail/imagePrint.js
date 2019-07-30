$(function() {
  var html, imgArr;
  imgArr = comn.getArgs().imgUrl.split(",");
  html = "";
  $.each(imgArr, function(index, item) {
    if (index % 2 === 0) {
      html += "<tr>";
      return html += "<td class='text-center'><img src='" + item + "' /></td>";
    } else {
      html += "<td class='text-center'><img src='" + item + "' /></td>";
      return html += "</tr>";
    }
  });
  $("table").html(html);
  return window.print();
});
