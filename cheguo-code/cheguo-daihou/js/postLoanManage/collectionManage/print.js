$(function(){
    var args = comn.getArgs();

    //打印详情信息
    function getPrintInfo() {
        comn.ajax({
            url: interUrl.collectionManage.loanOverdueInfoPrint,
            data: {
                projectId : args['projectId']
            },
            success: function (res) {
                //其他联系人dom遍历
                function getLoanOtherContactInfoPrintHtml(item) {
                    var html = "";
                    var len = item.length;

                    if(len === 0) {
                        html = html + [
                            '<tr>',
                                '<td>其他联系人</td>',
                                '<td></td>',
                                '<td>电话</td>',
                                '<td></td>',
                                '<td>身份证</td>',
                                '<td></td>',
                            '</tr>',
                            '<tr>',
                                '<td>地址</td>',
                                '<td colspan="3"></td>',
                                '<td>与借贷人关系</td>',
                                '<td></td>',
                            '</tr>',                         
                        ].join(""); 
                        $("#loanContactInfo tbody").append(html);
                        return;
                    }
                    
                    for (i = 0; i < len; i++) {
                        html = html + [
                            '<tr>',
                                '<td>其他联系人</td>',
                                '<td>' + (item[i].otherName || '') + '</td>',
                                '<td>电话</td>',
                                '<td>' + (item[i].mobilePhone || '') + '</td>',
                                '<td>身份证</td>',
                                '<td>' + (item[i].cardNo || '') + '</td>',
                            '</tr>',
                            '<tr>',
                                '<td>地址</td>',
                                '<td colspan="3">' + (item[i].homeAddressDetail || '') + '</td>',
                                '<td>与借贷人关系</td>',
                                '<td>' + (item[i].relationshipWithLoaner || '') + '</td>',
                            '</tr>', 
                        ].join("");
                    }
                    $("#loanContactInfo tbody").append(html);

                }
                //目前情况dom遍历
                function getloanLawsuitAndFeeInfoHtml(item,item2) {
                    var html = "";
                    var len = item.length;
                    var len2 = item2.length

                    if(len === 0) {
                        html = html + [
                            '<tr>',
                                '<td>诉讼时间</td>',
                                '<td></td>',
                                '<td>标的</td>',
                                '<td></td>',
                                '<td>司法费用</td>',
                                '<td></td>',
                            '</tr>',                         
                        ].join(""); 
                    }
                    
                    for (i = 0; i < len; i++) {
                        html = html + [
                            '<tr>',
                                '<td>诉讼时间</td>',
                                '<td>' + item[i].lawsuitDate + '</td>',
                                '<td>标的</td>',
                                '<td>' + item[i].targetAmount + '</td>',
                                '<td>司法费用</td>',
                                '<td>' + item[i].judicialCost + '</td>',
                            '</tr>',
                        ].join("");
                    }

                    if(len2 === 0) {
                        html = html + [
                            '<tr>',
                                '<td>第一次垫款时间</td>',
                                '<td></td>',
                                '<td>第一次垫款费用</td>',
                                '<td></td>',
                                '<td></td>',
                                '<td></td>',
                            '</tr>',                         
                        ].join(""); 
                        $("#loanLawsuitAndFeeInfo tbody").append(html);    
                        return
                    }                    

                    for (j = 0; j < len2; j++) {
                        var times = '第' + (j+1) + '次垫款时间';
                        var times2 = '第' + (j+1) + '次垫款费用';
                        html = html + [
                            '<tr>',
                                '<td>' + times + '</td>',
                                '<td>' + item2[j].actualDate + '</td>',
                                '<td>' + times2 + '</td>',
                                '<td>' + item2[j].applyAmount + '</td>',
                                '<td></td>',
                                '<td></td>',
                            '</tr>',
                        ].join("");
                    }                    

                    $("#loanLawsuitAndFeeInfo tbody").append(html);                
                }

                $("#loanCustomerInfo").nameValues(res.data.loanCustomerInfo);
                $("#loanCarInfoPrint").nameValues(res.data.loanCarInfoPrint);

                
                $("#loanContactInfo").nameValues(res.data.loanContactInfo);
                getLoanOtherContactInfoPrintHtml(res.data.loanContactInfo.loanOtherContactInfoPrint);

                $("#loanLawsuitAndFeeInfo").nameValues(res.data.loanLawsuitAndFeeInfo);
                getloanLawsuitAndFeeInfoHtml(res.data.loanLawsuitAndFeeInfo.loanLawsuitInfoPrints,res.data.loanLawsuitAndFeeInfo.loanFeeInfoPrints);
                window.print();
            }
        });         
    }
    
    //首次加载执行方法
    getPrintInfo();
});


