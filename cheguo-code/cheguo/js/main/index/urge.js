
$(function() {
  $("#send").click(function() {
    var data;
    data = $("#urgeForm").values();
    return comn.ajax({
      url: null,
      data: data,
      success: function(res) {
        tip({
          content: "发送成功!!"
        });
        return window.parent.toUrl({
          url: "./Modal/main/index/trackingList.html"
        });
      }
    });
  });
  $("#userName").val(comn.user.realname);
})
