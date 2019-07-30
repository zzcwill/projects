//获取url相应参数值
function getUrlParam(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
	var r = window.location.search.substr(1).match(reg)
	if(r !== null) {
		return unescape(r[2])
	}
	return null
}

//待办事项菜单跳转
function jumpCarWeb(name) {
	var url = interUrl.oaUrl;
	window.open(url+"?param="+name);
};

//待办事项菜单遍历方法
function getTodoMenu() {
    //获取子菜单方法
    function getSubMenu(arr) {
        var html = '';

        if(!arr.length) {
            return html
        }

        for( var i = 0 ; i < arr.length ; i++ ) {
            html = html + [
                "<li>",
                   "<a href='javascript:void(0);')>",
                        arr[i].node_name,
                        "（<span class='fff3333'>" + arr[i].node_number + "</span>）", 
                    "</a>",
                "</li>"
            ].join("");                        
        }

        return html;
    } 

    //获取主菜单方法
    function getmenu(arr) {
        var html = '';

        if(!arr.length) {
            return html
        }        

        for (i = 0; i < arr.length; i++) {
            html += [
                " <li>",
                "     <a class='has-arrow' href='javascript:void(0);'>",
                "         <span class='fa arrow'></span>",
                          arr[i].flowName,
                "        （<span class='fff3333'>" + arr[i].number + "</span>)",
                "     </a>" ,
                "     <ul aria-expanded='false' class='collapse'>",
                        getSubMenu(arr[i].nodes),
                "     </ul>",
                " </li>"
            ].join("");
        }

        return html; 
    }

    $.ajax({
        url: interUrl.basic + interUrl.oa.flowTreeNodesNumber,
        type: "POST",   
        data: {
            username : getUrlParam('username')
        },
        success: function (res) {
            if(!res.data.length) {
                return
            }

            if(res.data.length < 5) {
                $("#menu1").append(getmenu(res.data));
                $('#menu1 .collapse li a').bind('click',jumpCarWeb);
                $('#menu1').metisMenu();
                return
            }

            //菜单列表超5个,现实两个菜单列
            $("#menu1").append(getmenu(res.data.slice(0,5)));
            $("#menu2").append(getmenu(res.data.slice(5,res.data.length)));

            //遍历生产的菜单加点击跳转事件
            $('#menu1 .collapse li a').bind('click',jumpCarWeb);
            $('#menu2 .collapse li a').bind('click',jumpCarWeb);

            //激活遍历菜单
            $('#menu1').metisMenu();
            $('#menu2').metisMenu();
        }
    });
}


$(function () {
    //首次加载执行方法
    getTodoMenu();
});