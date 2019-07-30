var map;
$(function(){
	//地图
	comn.ajax({
		url: interUrl.customer.getVisitAddressGPSInfo,
		data: {projectId: args['projectId']},
		success: function(res){
			var pictureIcon = new BMap.Icon("./../../../images/picture_icon.png", new BMap.Size(30,30));
			var curIcon = new BMap.Icon("./../../../images/red_icon.png", new BMap.Size(30,30));
			var cpointArr= res.data.realAddressItude.split(",");
			map = new BMap.Map("showMap");
			map.clearOverlays();
			var point = new BMap.Point(cpointArr[0], cpointArr[1]);
			map.centerAndZoom(point, 15);
			map.enableScrollWheelZoom();
			map.enableContinuousZoom();

			function addMarker(point){
			  var marker = new BMap.Marker(point,{icon: pictureIcon });
			  map.addOverlay(marker);
			}
			if(res.data.phototItudeInfo) {
				var pointArr = res.data.phototItudeInfo.split(",");
				addMarker(new BMap.Point(pointArr[0], pointArr[1]));
				//$.each(res.data.phototItudeInfo, function(i, o){
				//	var pointArr = o.split(",");
				//	addMarker(new BMap.Point(pointArr[0], pointArr[1]));
				//});
			}
			var circle = new BMap.Circle(point,1000,{fillColor:"#0b70d6", strokeWeight: 1 ,fillOpacity: 0.25, strokeOpacity: 0.25});
			map.addOverlay(circle);
			var marker = new BMap.Marker(point, {icon: curIcon});        // 创建标注
			map.addOverlay(marker);
		}
	});

	var flag = false;
	comn.ajax({
		url: interUrl.loanDetail.getGpsTrajectoryParam,
		data: {
			projectId: args['projectId']
		},
		success: function(res){

			if(res.data.Imei){ flag = true; }
			//$("#trajectory").children("iframe").eq(0).attr("src", "http://lcrm.lunz.cn/Login/NewWeiXinLogin?Imei="+ res.data.Imei +"&pageType=3&loginName="+ res.data.loginName + "&loginPwd=" + res.data.loginPwd);
			//$("#pos").children("iframe").eq(0).attr("src", "http://lcrm.lunz.cn/Login/NewWeiXinLogin?Imei="+ res.data.Imei +"&pageType=1&loginName="+ res.data.loginName +"&loginPwd=" + res.data.loginPwd);
		}
	});
	var track = true;
	$("[href='#trajectory']").click(function(res){
		if(track) {
			comn.ajax({
				url: interUrl.common.getLoanGpsInfo,
				data: {
					projectId: args["projectId"]
				},
				success: function (res) {
					if(res.data.length > 0) {
						$('#trajectory').find('iframe').attr('src','../../../Modal/common/commonGPS/trackPlayReback/trackPlayReback.html?detail=' + JSON.stringify(res.data) + '&projectId=' + args["projectId"]);
						track = false;
					}else {
						tip({
							content: '未安装GPS设备'
						})
					}
				}
			});
		}
	});
    var posFlag = true;
	$("[href='#pos']").click(function(){
	    if (posFlag) {
            comn.ajax({
                url: interUrl.common.getLoanGpsInfo,
                data: {
                    projectId: args["projectId"]
                },
                success: function (res) {
                    if(res.data.length > 0){
                        flag = true;
                        $("#iframe")[0].src = '../../../Modal/common/commonGPS/position/position.html?info=' + JSON.stringify(res.data) + '&projectId=' + args["projectId"];
                    }else{
                        tip({
                            content: res.message || '未安装GPS设备'
                        })
                    }
                    posFlag = false;
                }
            })
        }
    })
});

