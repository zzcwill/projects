var GlobaData = null, uId, args = comn.getArgs(), fontSize = window.parent.fontSize, uId = window.parent.uId, dataState = window.parent.dataState;
dataState=0;
(function() {
	GlobaData = [{name: "海门市", value: 9},
                    {name: "鄂尔多斯市", value: 12},
                    {name: "招远市", value: 12},
                    {name: "舟山市", value: 12},
                    {name: "齐齐哈尔市", value: 14},
                    {name: "盐城市", value: 15},
                    {name: "赤峰市", value: 16},
                    {name: "青岛市", value: 18},
                    {name: "乳山市", value: 18},
                    {name: "金昌市", value: 19},
                    {name: "泉州市", value: 21},
                    {name: "莱西市", value: 21},
                    {name: "日照市", value: 21},
                    {name: "胶南市", value: 22},
                    {name: "南通市", value: 23},
                    {name: "拉萨市", value: 24},
                    {name: "云浮市", value: 24},
                    {name: "梅州市", value: 25},
                    {name: "文登市", value: 25},
                    {name: "上海市", value: 25},
                    {name: "攀枝花市", value: 25},
                    {name: "威海市", value: 25},
                    {name: "承德市", value: 25},
                    {name: "厦门市", value: 26},
                    {name: "汕尾市", value: 26},
                    {name: "潮州市", value: 26},
                    {name: "丹东市", value: 27},
                    {name: "太仓市", value: 27},
                    {name: "曲靖市", value: 27},
                    {name: "烟台市", value: 28},
                    {name: "福州市", value: 29},
                    {name: "瓦房店市", value: 30},
                    {name: "即墨市", value: 30},
                    {name: "抚顺市", value: 31},
                    {name: "玉溪市", value: 31},
                    {name: "张家口市", value: 31},
                    {name: "阳泉市", value: 31},
                    {name: "莱州市", value: 32},
                    {name: "湖州市", value: 32},
                    {name: "汕头市", value: 32},
                    {name: "昆山市", value: 33},
                    {name: "宁波市", value: 33},
                    {name: "湛江市", value: 33},
                    {name: "揭阳市", value: 34},
                    {name: "荣成市", value: 34},
                    {name: "连云港市", value: 35},
                    {name: "葫芦岛市", value: 35},
                    {name: "常熟市", value: 36},
                    {name: "东莞市", value: 36},
                    {name: "河源市", value: 36},
                    {name: "淮安市", value: 36},
                    {name: "泰州市", value: 36},
                    {name: "南宁市", value: 37},
                    {name: "营口市", value: 37},
                    {name: "惠州市", value: 37},
                    {name: "江阴市", value: 37},
                    {name: "蓬莱市", value: 37},
                    {name: "韶关市", value: 38},
                    {name: "嘉峪关市", value: 38},
                    {name: "广州市", value: 38},
                    {name: "延安市", value: 38},
                    {name: "太原市", value: 39},
                    {name: "清远市", value: 39},
                    {name: "中山市", value: 39},
                    {name: "昆明市", value: 39},
                    {name: "寿光市", value: 40},
                    {name: "盘锦市", value: 40},
                    {name: "长治市", value: 41},
                    {name: "深圳市", value: 41},
                    {name: "珠海市", value: 42},
                    {name: "宿迁市", value: 43},
                    {name: "咸阳市", value: 43},
                    {name: "铜川市", value: 44},
                    {name: "平度市", value: 44},
                    {name: "佛山市", value: 44},
                    {name: "海口市", value: 44},
                    {name: "江门市", value: 45},
                    {name: "章丘市", value: 45},
                    {name: "肇庆市", value: 46},
                    {name: "大连市", value: 47},
                    {name: "临汾市", value: 47},
                    {name: "吴江市", value: 47},
                    {name: "石嘴山市", value: 49},
                    {name: "沈阳市", value: 50},
                    {name: "苏州市", value: 50},
                    {name: "茂名市", value: 50},
                    {name: "嘉兴市", value: 51},
                    {name: "长春市", value: 51},
                    {name: "胶州市", value: 52},
                    {name: "银川市", value: 52},
                    {name: "张家港市", value: 52},
                    {name: "三门峡市", value: 53},
                    {name: "锦州市", value: 54},
                    {name: "南昌市", value: 54},
                    {name: "柳州市", value: 54},
                    {name: "三亚市", value: 54},
                    {name: "自贡市", value: 56},
                    {name: "吉林市", value: 56},
                    {name: "阳江市", value: 57},
                    {name: "泸州市", value: 57},
                    {name: "西宁市", value: 57},
                    {name: "宜宾市", value: 58},
                    {name: "呼和浩特市", value: 58},
                    {name: "成都市", value: 58},
                    {name: "大同市", value: 58},
                    {name: "镇江市", value: 59},
                    {name: "桂林市", value: 59},
                    {name: "张家界市", value: 59},
                    {name: "宜兴市", value: 59},
                    {name: "北海市", value: 60},
                    {name: "西安市", value: 61},
                    {name: "金坛市", value: 62},
                    {name: "东营市", value: 62},
                    {name: "牡丹江市", value: 63},
                    {name: "遵义市", value: 63},
                    {name: "绍兴市", value: 63},
                    {name: "扬州市", value: 64},
                    {name: "常州市", value: 64},
                    {name: "潍坊市", value: 65},
                    {name: "重庆市", value: 66},
                    {name: "台州市", value: 67},
                    {name: "南京市", value: 67},
                    {name: "滨州市", value: 70},
                    {name: "贵阳市", value: 71},
                    {name: "无锡市", value: 71},
                    {name: "本溪市", value: 71},
                    {name: "克拉玛依市", value: 72},
                    {name: "渭南市", value: 72},
                    {name: "马鞍山市", value: 72},
                    {name: "宝鸡市", value: 72},
                    {name: "焦作市", value: 75},
                    {name: "句容市", value: 75},
                    {name: "北京市", value: 79},
                    {name: "徐州市", value: 79},
                    {name: "衡水市", value: 80},
                    {name: "包头市", value: 80},
                    {name: "绵阳市", value: 80},
                    {name: "乌鲁木齐市", value: 84},
                    {name: "枣庄市", value: 84},
                    {name: "杭州市", value: 84},
                    {name: "淄博市", value: 85},
                    {name: "鞍山市", value: 86},
                    {name: "溧阳市", value: 86},
                    {name: "库尔勒市", value: 86},
                    {name: "安阳市", value: 90},
                    {name: "开封市", value: 90},
                    {name: "济南市", value: 92},
                    {name: "德阳市", value: 93},
                    {name: "温州市", value: 95},
                    {name: "九江市", value: 96},
                    {name: "邯郸市", value: 98},
                    {name: "临安市", value: 99},
                    {name: "兰州市", value: 99},
                    {name: "沧州市", value: 100},
                    {name: "临沂市", value: 103},
                    {name: "南充市", value: 104},
                    {name: "天津市", value: 105},
                    {name: "富阳市", value: 106},
                    {name: "泰安市", value: 112},
                    {name: "诸暨市", value: 112},
                    {name: "郑州市", value: 113},
                    {name: "哈尔滨市", value: 114},
                    {name: "聊城市", value: 116},
                    {name: "芜湖市", value: 117},
                    {name: "唐山市", value: 119},
                    {name: "平顶山市", value: 119},
                    {name: "邢台市", value: 119},
                    {name: "德州市", value: 120},
                    {name: "济宁市", value: 120},
                    {name: "荆州市", value: 127},
                    {name: "宜昌市", value: 130},
                    {name: "义乌市", value: 132},
                    {name: "丽水市", value: 133},
                    {name: "洛阳市", value: 134},
                    {name: "秦皇岛市", value: 136},
                    {name: "株洲市", value: 143},
                    {name: "石家庄市", value: 147},
                    {name: "莱芜市", value: 148},
                    {name: "常德市", value: 152},
                    {name: "保定市", value: 153},
                    {name: "湘潭市", value: 154},
                    {name: "金华市", value: 157},
                    {name: "岳阳市", value: 169},
                    {name: "长沙市", value: 175},
                    {name: "衢州市", value: 177},
                    {name: "廊坊市", value: 193},
                    {name: "合肥市", value: 229},
                    {name: "武汉市", value: 273},
                    {name: "大庆市", value: 279}];

})();

$(function() { (function() {
		require.config({
			paths: {
				echarts: '../../../common/plugs/echarts/doc/example/www/js'
			},
			packages: [{
				name: 'BMap',
				location: '../../../common/plugs/echarts/js/src',
				main: 'main'
			}]
		});

		require(['echarts', 'BMap', 'echarts/chart/map'], function(echarts, BMapExtension) {
			// 地图自定义样式 
			option = {
				backgroundColor: '#1b1b1b',
				color: ['rgba(255, 255, 255, 0.8)', 'rgba(14, 241, 242, 0.8)', 'rgba(37, 140, 249, 0.8)'],
				tooltip: {
					trigger: 'item',
					formatter: function(params) {
                              if(params.data.companyName){
                                   return '分公司：'+params.data.companyName+'<br/>人数：'+params.data.staffCount+'人<br/>贷款笔数：'+params.data.loanCount+'笔<br/>贷款金额：'+params.data.loanAmount+'万元<br/>GPS安装数量：'+params.data.gpsCount+'个';
                              }else{
                                   return params.name;
                              }
                              /*if (!params.series.data) {
							//return '';
							return params.name;
						}
						var res = "";
						if (params.data.Company) {
							res = params.data.Company + "签单量：" + params.data.value + '单，签单金额：' + params.data.ammountSum + "万元";
						} else {
							res = params.name + "签单量：" + params.data.value + '单，签单金额：' + params.data.ammountSum;
						}
						return res;*/
					}
				},
				dataRange: {
					min: 0,
					max: 100000,
					x: 'left',
					orient: 'vertical',
					calculable: true,
					color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
					textStyle: { 
                              color: '#fff' ,
                              fontSize: fontSize, },
					seriesIndex: 1
				},
                    /*toolbox: {
                         show: true,
                         orient: 'vertical',
                         x: 'right',
                         y: 'center',
                         feature: {
                              mark: {
                                   show: true
                              },
                              dataView: {
                                   show: true,
                                   readOnly: false
                              },
                              restore: {
                                   show: true
                              },
                              saveAsImage: {
                                   show: true
                              }
                         }
                    },*/
				series: [{
					name: '全国',
					type: 'map',
					mapType: 'china',
					roam: 'scale',
                         mapLocation:{
                              x: '10%'
                         },
					//selectedMode: 'single',
					hoverable: false,
					itemStyle: {
						normal: {
							borderColor: 'rgba(100,149,237,1)',
							borderWidth: 1.5,//地图边界宽度
							areaStyle: { color: '#1b1b1b' }
						},
						emphasis: {                 // 也是选中样式
                areaStyle: {
                    color: '#99d2dd'
                }
            }
					},
					data: [],
					geoCoord: {},
					markPoint: {
						symbol: 'circle',
						symbolSize: 5/*function(v) {
							return 1 + v / 25
						}*/,
						effect: {
							show: false,
							shadowBlur: 0
						},
						itemStyle: {
							normal: {
								borderWidth: 1,
								label: {
									show: false
								}
							},
							emphasis: {
								borderWidth: 5,
								label: {
									show: false
								}
							}
						},
						data: [
						// {name:'上海市',value:95},
						// {name:'常州市',value:10}
						]
					}
				},{
					name: '当前',
					type: 'map',
					mapType: 'china',
					roam: 'scale',
					//selectedMode: 'single',
					hoverable: false,
					itemStyle: {
						normal: {
							borderColor: 'rgba(100,149,237,1)',
							borderWidth: 1.5,//地图边界宽度
							areaStyle: { color: '#1b1b1b' }
						},
						emphasis: {                 // 也是选中样式
                areaStyle: {
                    color: '#99d2dd'
                }
            }
					},
					data: [],
					geoCoord: {},
					markPoint: {
						symbol: 'emptyCircle',
						symbolSize: 10/*function(v) {
							return 1 + v / 25
						}*/,
						effect: {
							show: true,
							shadowBlur: 0
						},
						itemStyle: {
							normal: {
								label: {
									show: false
								}
							}
						},
						data: [{name: "北京市", value: 79}]
					}
				}]
			};

               var loanAmountArr=[];
               var myChart = null;
               myChart = echarts.init($("#layoutMap")[0], "shine");
               option.series[0].geoCoord = geoCoord;
               option.series[1].geoCoord = geoCoord;
               var layoutData , dataLength, index = 0;
               var timer=null;
               comn.ajax({
                 url: interUrl.dataView.companyinfoList,
                 success: function (res) {
                    layoutData = res.data;
                    dataLength = res.data.length;
                    for(var i=0;i<dataLength;i++){
                         layoutData[i].name=layoutData[i].cityName || layoutData[i].provinceName;
                         layoutData[i].value=layoutData[i].loanAmount;
                         loanAmountArr.push(layoutData[i].loanAmount);
                    }
                    option.series[0].markPoint.data = layoutData;
                    option.dataRange.max = Math.ceil(Math.max.apply(Math,loanAmountArr)/1000)*1000;
                    setData();
                    timer = setInterval(function(){
                         index++;
                         if(index>=dataLength){
                              index = 0;
                         }
                         setData();
                    },5000)
                 }
               });

               function setData(){
                    option.series[1].markPoint.data= [{name: layoutData[index].name, value: layoutData[index].loanAmount}];
                    $('#company').html(layoutData[index].companyName || '');
                    $('#num').html(layoutData[index].staffCount || '');
                    $('#loanNum').html(layoutData[index].loanCount || '');
                    $('#loanAmount').html(layoutData[index].loanAmount || '');
                    //$('#N2').html(layoutData[index].N2 || '');
                    $('#GPS').html(layoutData[index].gpsCount || '');
                    myChart.setOption(option);
               }
		});

	})(); 
});

