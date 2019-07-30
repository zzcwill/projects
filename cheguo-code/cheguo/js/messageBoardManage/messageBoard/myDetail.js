//在线支持-我的提问
var args,id;
args=comn.getArgs();
id=args['id'];

//获取问题详情
comn.ajax({
    url:interUrl.messageBoardManage.feedbackDetail,
    data:{id:id},
    success:function(res){
        $("#detail").nameValues(res.data);
        if(res.data.replyList){
            var html='';
            var o = res.data.replyList;
            html=addReply(o);
            $("#replyList").html(html);
        }
        getDocumentList(id);
    }
});

function addReply(o){
    var len,i,html="";
    len= o.length;
    for(i=0;i<len;i++){
    	if(o[i].flag==1){
    		html+="<div class=''><p>回复内容:</p><p class='bg-success p1'>"+ o[i].note+"</p><p class='text-right text-muted'>"+o[i].createTime+"</p></div>";
    	}else{
    		html+="<div class=''><p>补充内容:</p><p class='bg-success p1'>"+ o[i].note+"</p><p class='text-right text-muted'>"+o[i].createTime+"</p></div>";
    	}
        
    }
    return html;
}

//留言字数
$("#note").on('keyup',function(){
    var _this=$(this);
    var a=$("#alreadyNum");
    var b=$("#leftNum");
    a.text(_this.val().length);
    b.text(1000-_this.val().length);
});

//回复提问
$("#answer-question").click(function(){
	var note=$('#note').val();
	if(note.length==0){
		alert('请填写留言');
		return;
	}
    var html="";
    comn.ajax({
        url: interUrl.messageBoardManage.myFeedbackReply,
        data: $.extend($("#answer").values(),{id:id}),
        success: function (res){
            tip({content:res.message || "提问成功!"});
            $("#note").val("");
            if(res.data){
                var o=res.data;
                if(o.flag==1){
                	 html+="<div class=''><p>回复内容:</p><p class='bg-success p1'>"+ o.note+"</p><p class='text-right text-muted'>"+o.createTime+"</p></div>";
                }else{
                	 html+="<div class=''><p>补充内容:</p><p class='bg-success p1'>"+ o.note+"</p><p class='text-right text-muted'>"+o.createTime+"</p></div>";
                }
            }
            $("#replyList").append(html);
        }
    });
});

//获取图片
function getDocumentList(id) {
    var result = "";
    comn.ajax({
        url: interUrl.gr.documentList,
        data: {
            fileNamespace:"FEEDBACK",
            loanApplyId: id,
            dirId:901,
            releventFlow:"FEED_BACK",
            releventFlowNode:"FEED_BACK_LAUNCH"
        },
        success: function (res) {
            var i, list = res.data;
            for (i = 0; i < list.length; i++) {
                var o = list[i];
                result+="<li><img src='"+ o.filePath+"'/></li>";
            }
            $("#files-ul").html(result);
        }
    });
}