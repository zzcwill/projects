$(function() {
    var args = common.getArgs();
    var seconds = 10;
    var time = setInterval(function() {
        seconds --;
        $('.seconds').html(seconds);
        if(seconds == 0) {
            clearInterval(time);
            return newCommon.Ajax({
                url: 'webank/credit/recaptureWeBankResult',
                data: args,
                success: function(data) {
                    $('.second').addClass('hide')
                    if(data.code == 10000) {//初审通过
                        $('#resultImg').attr('src','./images/weBank/succeed.png');
                        $('.message').html('恭喜，初审通过');
                    }else if(data.code == 20001) {//初审未通过
                        $('#resultImg').attr('src','./images/weBank/fail.png');
                        $('.message').html('非常遗憾，初审未通过');
                    }else if(data.code == 20002)  {//征信查询异常
                        $('#resultImg').attr('src','./images/weBank/unusual.png');
                        $('.message').html('银行征信查询异常，请稍后查看结果');
                    }else {
                        $('#resultImg').attr('src','./images/weBank/fail.png');
                        $('.message').html('接口调用失败！');
                    }
                    $('.btn').removeClass('hide');
                    $('.btn').click(function() {
                        appNative.backToList(); //调用app方法跳转回征信发起之前的页面；
                    })
                }
            });
        }
    },1000)

})