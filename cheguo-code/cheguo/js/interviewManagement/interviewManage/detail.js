var args;
args = comn.getArgs();
var pictures = document.querySelector('#interviewManage');
var options = {
    url: 'data-src',
    title: true,
    transition: false,
    build: function (e) {
    },
    built: function (e) {
    },
    show: function (e) {
        window.parent.toggleTopNav();
    },
    hide: function (e) {
        window.parent.toggleTopNav();
    }
};
//注册组件
Vue.component('v-input',vueComponent.inputComponent);
Vue.component('v-select',vueComponent.selectComp);
Vue.component('v-textArea',vueComponent.textArea);

var vm = new Vue({
    el: '#interviewManage',
    data: {
        url: '',
        videoMarkOfName: '',
        videoMarkOfTime: ''
    },
    methods: {
        downloadVideo: function () {
            window.open($(".downloadVideoSrc").html(), "_blank");
        }
    },
    ready: function(){
        //面签详情
        comn.ajax({
            url: interUrl.interviewManage.detail,
            data: {
                id: args['id'],
            },
            success: function (res) {
                var o = res.data, ref;
                $("#interviewInfoForm").values(o.loanBaseInfo); //基本信息
                $("#interviewForm").values(o.loanCustomerHfr); //相似度
                $("#interviewDetailForm").values(o.imVideoInterviewInfo); //面签信息
                //面签图片
                if (o.documentList) {
                    ref = o.documentList;
                    for (var i = 0; i < ref.length; i++) {
                        if (i > 3) { //目前只有4张图只写了4个位置
                            return;
                        }
                        if (ref[i].filePath) {
                            var html = "<img src='"+ ref[i].filePath +"' height='80' data-src='"+ ref[i].filePath +"'><span>"+ ref[i].remark +"</span>";
                            $("#interviewPic").children().eq(i).append(html);
                        }
                    }
                    setTimeout(function () {
                        viewer = new Viewer(pictures, options);
                    }, 300);
                } else {
                    $("#interviewForm").addClass("hide");
                }
                //面签视频url
                if (o.imVideoInterviewInfo && o.imVideoInterviewInfo.url) {
                    $("#videoArea").removeClass('hide');
                    var video = ['<video class="video-js vjs-default-skin" controls preload="none" data-setup="{}">',
                                '<source src="'+  o.imVideoInterviewInfo.url +'" type="video/mp4" />',
                                '</video>'].join(",");
    
                    $("#video").html(video);
                    vm.videoMarkOfName = o.imVideoInterviewInfo.videoMarkOfName;
                    vm.videoMarkOfTime = o.imVideoInterviewInfo.videoMarkOfTime;
                    vm.url = o.imVideoInterviewInfo.url;
                }
            }
            
        });
    }
});