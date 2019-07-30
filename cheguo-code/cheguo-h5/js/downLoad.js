var args;
args = common.getArgs();
var is_weixin = (function(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return true;
	} else {
		return false;
	}
})();

//args["type"]未传参数时默认显示车贷相关信息
function download(status) {
    //当前时间戳
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    switch (args["type"]) {
        case "cls":
            return render("https://download.cgw360.com/CLS.apk", "itms-services:///?action=download-manifest&url=https://download.cgw360.com/CLS.plist", "icon.png", "车国车贷 &nbsp;&nbsp;&nbsp;", status);
            break;
        case "shengan":
            return render("https://download.cgw360.com/Shengan.apk", "itms-services:///?action=download-manifest&url=https://download.cgw360.com/Shengan.plist", "shengan.png", "晟安E车贷 &nbsp;&nbsp;&nbsp;", status);
            break;
        case "cherong":
            return render("https://download.cgw360.com/CheRong.apk", "itms-services:///?action=download-manifest&url=https://download.cgw360.com/CheRong.plist", "cherong.png", "车融E车贷 &nbsp;&nbsp;&nbsp;", status);
            break;
        case "eWBank":
            return render("https://download.cgw360.com/WBankE.apk", "itms-services:///?action=download-manifest&url=https://download.cgw360.com/WBankE.plist", "wzbk.png", "中安-温行面签 &nbsp;&nbsp;&nbsp;", status);
            break;
        case "eICBC":
            return render("https://download.cgw360.com/GSBankE.apk", "itms-services:///?action=download-manifest&url=https://download.cgw360.com/GSBankE.plist", "ICBCE.png", "中安-工行面签 &nbsp;&nbsp;&nbsp;", status);
            break;
        default:
            return render("https://download.cgw360.com/CLS.apk", "itms-services:///?action=download-manifest&url=https://download.cgw360.com/CLS.plist", "icon.png", "车国车贷 &nbsp;&nbsp;&nbsp;", status);
            break;
    }
    /*
    ** _url_Andr:安卓地址
    * _url_ios: ios地址
    * _logoImg: logo地址
    * status：区分安卓和ios
*/
    function render(_url_Andr, _url_ios, _logoImg, font, status) {
        $("#logo").html('<img src="./images/'+ _logoImg +'" width="20%">');
        $("#systemFont").html(font);
        if (status === "android") {
            return _url_Andr;
        } else if (status === "ios") {
            return _url_ios;
        } else {
            return;
        }

    }
}


$(function() {
  var btnAndroid, btnIos, tip;
  btnAndroid = $("#android-link");
  btnIos = $("#ios-link");
  tip = $(".tip");
  if (is_weixin) {
    btnAndroid.on("click", function(e) {
      tip.show();
      return false;
    });
    btnIos.on("click", function(e) {
      tip.show();
      return false;
    });
    return tip.on("click", function() {
      return $(this).hide();
    });
  } else {
    btnAndroid.attr("href", download("android"));
    return btnIos.attr("href", download("ios"));
  }
});
