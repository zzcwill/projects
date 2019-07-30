$(function () {
    //费用类型管理数据(保存按钮所存数据)
    var data = {
        feeManageTypeResults: [] 
    };

    //公用方法start
    //让select下拉框选中默认值
    function selectCheck() {
        var length = $("select").length;
        for (var i = 0; i < length; i++) {
            var val = $("select:eq(" + i + ")").attr('value');
            $("select:eq(" + i + ") option[value=" + val + "]").attr("selected", true);
        }
    };
    //公用方法end   

    //获取费用类型管理目录树信息
    function getInfo() {
        comn.ajax({
            url: interUrl.systemSettings.feeManageTypeTree,
            data: {},
            success: function (res) {
                //费用类型管理目录树遍历
                function showFeeManageTypeList(feeData) {
                    //没有数据不执行下面方法
                    if(feeData.length === 0) {
                        return;
                    }
                    //目录树三级每级数据信息
                    var arrLevel1 = [];
                    var arrLevel2 = [];
                    var arrLevel3 = [];

                    //获取费用类型管理三级各个级别目录树数据(获取arrLevel1,arrLevel2,arrLevel3数据)
                    function getArrLevel(data) {
                        for(var i = 0 ; i < data.length ; i++) {
                            arrLevel1['' + i] = data[i];
                            arrLevel2['' + i] = data[i].feeManageTypeResults;
                            for(var j = 0 ; j < data[i].feeManageTypeResults.length ; j++) {
                                arrLevel3[i + ',' + j] = data[i].feeManageTypeResults[j].feeManageTypeResults; 
                            }
                        }                      
                    }

                    //目录树遍历方法
                    function showDomList(arr1,arr2,arr3) {
                        var html = "";

                        //二级菜单dom遍历
                        function showDom2(index) {
                            var html2 = "";
                            //三级菜单dom遍历
                            function showDom3(index,key) {
                                var html3 = "";
                                var arr3Index = index+ ',' +key;

                                for (k = 0; k < arr3[arr3Index].length ; k++) {
                                    html3 += [
                                        '<tr data-arrLevel1="' + index +'" data-arrLevel2="' + key +'" data-arrLevel3="' + k +'" >',
                                            '<td>',
                                                '<div class="typeBox">',
                                                    '<div class="typeLeft spacing3">',
                                                        '<span class="glyphicon"></span>',
                                                    '</div>',
                                                    '<div class="typeRight">',
                                                        '<input type="text" class="form-control className" value="' + arr3[arr3Index][k].feeName + '" disabled>',
                                                    '</div>',
                                                '</div>',
                                            '</td>',
                                            '<td>',
                                                '<div class="input-group">',
                                                    '<select class="form-control classSwitch" value="' + arr3[arr3Index][k].isInuse + '" disabled>',
                                                        '<option value="1">启用</option>',
                                                        '<option value="2">停用</option>',
                                                    '</select>',
                                                '</div>',
                                            '</td>',
                                            '<td>',
                                                '<div class="input-group">',
                                                    '<input type="text" class="form-control classStartFees" value="' + arr3[arr3Index][k].startAmount + '" disabled>',
                                                    '<span class="input-group-addon">至</span>',
                                                    '<input type="text" class="form-control classEndFees" value="' + arr3[arr3Index][k].endAmount + '" disabled>',
                                                '</div>',
                                            '</td>',
                                            '<td>',
                                                '<div class="btn-group btn-group-xs">',
                                                    '<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
                                                        '操作<span class="caret"></span>',
                                                    '</button>',
                                                    '<ul class="dropdown-menu currentDropMenu" role="menu">',
                                                        '<li><a class="modify">修改</a></li>',
                                                    '</ul>',
                                                '</div>',
                                            '</td>',
                                        '</tr>',
                                    ].join("");
                                }
                                
                                return html3;
                            }

                            for (j = 0; j < arr2[index].length ; j++) {
                                html2 += [
                                    '<tr data-arrLevel1="' + index +'" data-arrLevel2="' + j +'" >',
                                        '<td>',
                                            '<div class="typeBox">',
                                                '<div class="typeLeft spacing2">',
                                                    '<span class="glyphicon glyphicon-minus"></span>',
                                                '</div>',
                                                '<div class="typeRight">',
                                                    '<input type="text" class="form-control className" value="' + arr2[index][j].feeName + '" disabled>',
                                                '</div>',
                                            '</div>',
                                        '</td>',
                                        '<td>',
                                            '<div class="input-group">',
                                                '<select class="form-control classSwitch" value="' + arr2[index][j].isInuse + '" disabled>',
                                                    '<option value="1" >启用</option>',
                                                    '<option value="2">停用</option>',
                                                '</select>',
                                            '</div>',
                                        '</td>',
                                        '<td>',
                                            '<div class="input-group">',
                                                '<input type="text" class="form-control classStartFees" value="' + arr2[index][j].startAmount + '" disabled>',
                                                '<span class="input-group-addon">至</span>',
                                                '<input type="text" class="form-control classEndFees" value="' + arr2[index][j].endAmount + '" disabled>',
                                            '</div>',
                                        '</td>',
                                        '<td>',
                                            '<div class="btn-group btn-group-xs">',
                                                '<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
                                                    '操作<span class="caret"></span>',
                                                '</button>',
                                                '<ul class="dropdown-menu currentDropMenu" role="menu">',
                                                    '<li><a class="newSubclass">新增子类</a></li>',
                                                    '<li><a class="modify">修改</a></li>',
                                                '</ul>',
                                            '</div>',
                                        '</td>',
                                    '</tr>',
                                    showDom3(index,j),
                                ].join("");
                            } 
                            
                            return html2;
                        }


                        for (i = 0; i < arr1.length ; i++) {
                            html += [
                                '<tr data-arrLevel1="' + i +'" >',
                                    '<td>',
                                        '<div class="typeBox">',
                                            '<div class="typeLeft spacing">',
                                                '<span class="glyphicon glyphicon-minus"></span>',
                                            '</div>',
                                            '<div class="typeRight">',
                                                '<input type="text" class="form-control className" value="' + arr1[i].feeName + '" disabled>',
                                            '</div>',
                                        '</div>',
                                    '</td>',
                                    '<td>',
                                        '<div class="input-group">',
                                            '<select class="form-control classSwitch" value="' + arr1[i].isInuse + '" disabled>',
                                                '<option value="1">启用</option>',
                                                '<option value="2">停用</option>',
                                            '</select>',
                                        '</div>',
                                    '</td>',
                                    '<td>',
                                        '<div class="input-group">',
                                            '<input type="text" class="form-control classStartFees" value="' + arr1[i].startAmount + '" disabled>',
                                            '<span class="input-group-addon">至</span>',
                                            '<input type="text" class="form-control classEndFees" value="' + arr1[i].endAmount + '" disabled>',
                                        '</div>',
                                    '</td>',
                                    '<td>',
                                        '<div class="btn-group btn-group-xs">',
                                            '<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
                                                '操作<span class="caret"></span>',
                                            '</button>',
                                            '<ul class="dropdown-menu currentDropMenu" role="menu">',
                                                '<li><a class="newSubclass">新增子类</a></li>',
                                                '<li><a class="modify">修改</a></li>',
                                            '</ul>',
                                        '</div>',
                                    '</td>',
                                '</tr>',
                                showDom2(i),
                            ].join("");
                        }
                        $("#feeTable").append(html); 
                    }                  

                    //当前方法内部执行顺序
                    getArrLevel(feeData);
                    showDomList(arrLevel1,arrLevel2,arrLevel3);
                    selectCheck();
                }
                //目录树相关绑定方法
                function showBindDomWay() {
                    //目录树-操作-修改点击事件
                    $(document).on("click", "#feeTable .modify", function () {
                        var index = $("#feeTable .modify").index($(this));
                        $("#feeTable .className").eq(index).attr("disabled",false);
                        $("#feeTable .classSwitch").eq(index).attr("disabled",false);
                        $("#feeTable .classStartFees").eq(index).attr("disabled",false);
                        $("#feeTable .classEndFees").eq(index).attr("disabled",false);
                    });

                    //目录树-操作-新增子类点击事件
                    $(document).on("click", "#feeTable .newSubclass", function () {
                        var index = $("#feeTable .modify").index($(this).parent().next().children('.modify'));
                        var arrlevel1 = $("#feeTable tr").eq(index).attr('data-arrlevel1');
                        var arrlevel2 = $("#feeTable tr").eq(index).attr('data-arrlevel2');
                        var html = "";
                        //在当前tr新增子类,末尾子类增加dom的数量
                        var newTrIndex = 0;                        

                        //第一级主类新增子类
                        if(arrlevel2 === undefined) {
                            //第一级主类新增的子类的数据序号
                            var length = data.feeManageTypeResults[arrlevel1].feeManageTypeResults.length;
                            //第一级主类新增的子类空对象
                            var newClass = {
                                endAmount: 0,
                                feeManageTypeResults: [],
                                feeName: '',
                                id: '',
                                isInuse: 2,
                                startAmount: 0,           
                            }

                            //获取dom增加的数量
                            for (var i = 0; i < data.feeManageTypeResults[arrlevel1].feeManageTypeResults.length; i++) {
                                newTrIndex = newTrIndex + 1 + data.feeManageTypeResults[arrlevel1].feeManageTypeResults[i].feeManageTypeResults.length;                                                            
                            }                      
                    
                            data.feeManageTypeResults[arrlevel1].feeManageTypeResults.push(newClass);
                    
                            html = [
                                '<tr data-arrLevel1="' + arrlevel1 +'" data-arrLevel2="' + length +'" >',
                                    '<td>',
                                        '<div class="typeBox">',
                                            '<div class="typeLeft spacing2">',
                                                '<span class="glyphicon glyphicon-minus"></span>',
                                            '</div>',
                                            '<div class="typeRight">',
                                                '<input type="text" class="form-control className" value="">',
                                            '</div>',
                                        '</div>',
                                    '</td>',
                                    '<td>',
                                        '<div class="input-group">',
                                            '<select class="form-control classSwitch" value="2">',
                                                '<option value="1" >启用</option>',
                                                '<option value="2">停用</option>',
                                            '</select>',
                                        '</div>',
                                    '</td>',
                                    '<td>',
                                        '<div class="input-group">',
                                            '<input type="text" class="form-control classStartFees" value="0">',
                                            '<span class="input-group-addon">至</span>',
                                            '<input type="text" class="form-control classEndFees" value="0">',
                                        '</div>',
                                    '</td>',
                                    '<td>',
                                        '<div class="btn-group btn-group-xs">',
                                            '<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
                                                '操作<span class="caret"></span>',
                                            '</button>',
                                            '<ul class="dropdown-menu currentDropMenu" role="menu">',
                                                '<li><a class="newSubclass">新增子类</a></li>',
                                                '<li><a class="modify">修改</a></li>',
                                            '</ul>',
                                        '</div>',
                                    '</td>',
                                '</tr>',
                            ].join("");                         
                        }

                        //第二级主类新增子类
                        if(arrlevel2 !== undefined) {
                            //第二级主类新增的子类的数据序号
                            var length = data.feeManageTypeResults[arrlevel1].feeManageTypeResults[arrlevel2].feeManageTypeResults.length;
                            //第二级主类新增的子类空对象
                            var newClass = {
                                endAmount: 0,
                                feeManageTypeResults: [],
                                feeName: '',
                                id: '',
                                isInuse: 2,
                                startAmount: 0,           
                            }
                            
                            //获取dom增加的数量
                            newTrIndex = newTrIndex + data.feeManageTypeResults[arrlevel1].feeManageTypeResults[arrlevel2].feeManageTypeResults.length;                           
                    
                            data.feeManageTypeResults[arrlevel1].feeManageTypeResults[arrlevel2].feeManageTypeResults.push(newClass);
                    
                            html = [
                                '<tr data-arrLevel1="' + arrlevel1 +'" data-arrLevel2="' + arrlevel2 +'" data-arrLevel3="' + length +'" >',
                                    '<td>',
                                        '<div class="typeBox">',
                                            '<div class="typeLeft spacing3">',
                                                '<span class="glyphicon"></span>',
                                            '</div>',
                                            '<div class="typeRight">',
                                                '<input type="text" class="form-control className" value="">',
                                            '</div>',
                                        '</div>',
                                    '</td>',
                                    '<td>',
                                        '<div class="input-group">',
                                            '<select class="form-control classSwitch" value="2">',
                                                '<option value="1">启用</option>',
                                                '<option value="2">停用</option>',
                                            '</select>',
                                        '</div>',
                                    '</td>',
                                    '<td>',
                                        '<div class="input-group">',
                                            '<input type="text" class="form-control classStartFees" value="0">',
                                            '<span class="input-group-addon">至</span>',
                                            '<input type="text" class="form-control classEndFees" value="0">',
                                        '</div>',
                                    '</td>',
                                    '<td>',
                                        '<div class="btn-group btn-group-xs">',
                                            '<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
                                                '操作<span class="caret"></span>',
                                            '</button>',
                                            '<ul class="dropdown-menu currentDropMenu" role="menu">',
                                                '<li><a class="modify">修改</a></li>',
                                            '</ul>',
                                        '</div>',
                                    '</td>',
                                '</tr>',
                            ].join("");
                        }

                        $("#feeTable tr").eq(index+newTrIndex).after(html);
                        selectCheck();                        

                    });  
                    
                    //目录树-减号-子类隐藏-点击事件
                    $(document).on("click", "#feeTable .glyphicon-minus", function () {
                        var index = $("#feeTable .glyphicon").index($(this));
                        var arrlevel1 = $("#feeTable tr").eq(index).attr('data-arrlevel1');
                        var arrlevel2 = $("#feeTable tr").eq(index).attr('data-arrlevel2');
                        //要隐藏的菜单数
                        var newTrIndex = 0;                        
                        
                        //一级菜单隐藏
                        if(arrlevel2 === undefined) {
                            //获取dom隐藏的数量
                            for (var i = 0; i < data.feeManageTypeResults[arrlevel1].feeManageTypeResults.length; i++) {
                                newTrIndex = newTrIndex + 1 + data.feeManageTypeResults[arrlevel1].feeManageTypeResults[i].feeManageTypeResults.length;                                                            
                            }
                            for (var j = 1; j <= newTrIndex; j++) {
                                $("#feeTable tr").eq(index+j).addClass('hidden1');
                            }                                                    
                        }

                        //二级菜单隐藏
                        if(arrlevel2 !== undefined) {
                            //获取dom隐藏的数量
                            newTrIndex = newTrIndex + data.feeManageTypeResults[arrlevel1].feeManageTypeResults[arrlevel2].feeManageTypeResults.length;
                            for (var j = 1; j <= newTrIndex; j++) {
                                $("#feeTable tr").eq(index+j).addClass('hidden2');
                            }                            
                        }                        

                        $(this).removeClass('glyphicon-minus').addClass('glyphicon-plus');
                    });

                    //目录树-加号-子类显示-点击事件
                    $(document).on("click", "#feeTable .glyphicon-plus", function () {
                        var index = $("#feeTable .glyphicon").index($(this));
                        var arrlevel1 = $("#feeTable tr").eq(index).attr('data-arrlevel1');
                        var arrlevel2 = $("#feeTable tr").eq(index).attr('data-arrlevel2');
                        //要显示的菜单数
                        var newTrIndex = 0;                        
                        
                        //一级菜单显示
                        if(arrlevel2 === undefined) {
                            //获取dom显示的数量
                            for (var i = 0; i < data.feeManageTypeResults[arrlevel1].feeManageTypeResults.length; i++) {
                                newTrIndex = newTrIndex + 1 + data.feeManageTypeResults[arrlevel1].feeManageTypeResults[i].feeManageTypeResults.length;                                                            
                            }
                            for (var j = 1; j <= newTrIndex; j++) {
                                $("#feeTable tr").eq(index+j).removeClass('hidden1');
                            }                                                   
                        }

                        //二级菜单显示
                        if(arrlevel2 !== undefined) {
                            //获取dom显示的数量
                            newTrIndex = newTrIndex + data.feeManageTypeResults[arrlevel1].feeManageTypeResults[arrlevel2].feeManageTypeResults.length;
                            for (var j = 1; j <= newTrIndex; j++) {
                                $("#feeTable tr").eq(index+j).removeClass('hidden2');
                            }                            
                        }                        

                        $(this).removeClass('glyphicon-plus').addClass('glyphicon-minus');       
                    });
                   
                    //每个主类,子类-类型名称-修改事件
                    $(document).on("blur", "#feeTable .className", function () {
                        var index = $("#feeTable .className").index($(this));
                        var arrlevel1 = $("#feeTable tr").eq(index).attr('data-arrlevel1');
                        var arrlevel2 = $("#feeTable tr").eq(index).attr('data-arrlevel2');
                        var arrlevel3 = $("#feeTable tr").eq(index).attr('data-arrlevel3');
                        var value = $(this).val();

                        if(value === '') {
                            tip({ content: '每个费用管理主类和子类的名称不能为空!' });
                        }

                        //修改第一级主类名称
                        if(arrlevel2 === undefined && arrlevel3 === undefined) {
                            data.feeManageTypeResults[arrlevel1].feeName = value;
                        }

                        //修改第二级主类名称
                        if(arrlevel2 !== undefined && arrlevel3 === undefined) {
                            data.feeManageTypeResults[arrlevel1].feeManageTypeResults[arrlevel2].feeName = value;
                        }
                        
                        //修改第三级主类名称
                        if(arrlevel2 !== undefined && arrlevel3 !== undefined) {
                            data.feeManageTypeResults[arrlevel1].feeManageTypeResults[arrlevel2].feeManageTypeResults[arrlevel3].feeName = value;
                        }                        
                    });

                    //每个主类,子类-启用状态-修改事件
                    $(document).on("change", "#feeTable .classSwitch", function () {
                        var index = $("#feeTable .classSwitch").index($(this));
                        var arrlevel1 = $("#feeTable tr").eq(index).attr('data-arrlevel1');
                        var arrlevel2 = $("#feeTable tr").eq(index).attr('data-arrlevel2');
                        var arrlevel3 = $("#feeTable tr").eq(index).attr('data-arrlevel3');
                        var value = $(this).val();

                        //修改第一级主类启用状态
                        if(arrlevel2 === undefined && arrlevel3 === undefined) {
                            data.feeManageTypeResults[arrlevel1].isInuse = value;
                        }

                        //修改第二级主类启用状态
                        if(arrlevel2 !== undefined && arrlevel3 === undefined) {
                            data.feeManageTypeResults[arrlevel1].feeManageTypeResults[arrlevel2].isInuse = value;
                        }
                        
                        //修改第三级主类启用状态
                        if(arrlevel2 !== undefined && arrlevel3 !== undefined) {
                            data.feeManageTypeResults[arrlevel1].feeManageTypeResults[arrlevel2].feeManageTypeResults[arrlevel3].isInuse = value;
                        }                        
                    });                    

                    //每个主类,子类-取值范围开始值-修改事件
                    $(document).on("blur", "#feeTable .classStartFees", function () {
                        var index = $("#feeTable .classStartFees").index($(this));
                        var arrlevel1 = $("#feeTable tr").eq(index).attr('data-arrlevel1');
                        var arrlevel2 = $("#feeTable tr").eq(index).attr('data-arrlevel2');
                        var arrlevel3 = $("#feeTable tr").eq(index).attr('data-arrlevel3');
                        var value = $(this).val();

                        if(value === '') {
                            tip({ content: '每个费用管理主类和子类的取值范围开始值不能为空!' });
                        }

                        //修改第一级主类取值范围开始值
                        if(arrlevel2 === undefined && arrlevel3 === undefined) {
                            data.feeManageTypeResults[arrlevel1].startAmount = value;
                        }

                        //修改第二级主类取值范围开始值
                        if(arrlevel2 !== undefined && arrlevel3 === undefined) {
                            data.feeManageTypeResults[arrlevel1].feeManageTypeResults[arrlevel2].startAmount = value;
                        }
                        
                        //修改第三级主类取值范围开始值
                        if(arrlevel2 !== undefined && arrlevel3 !== undefined) {
                            data.feeManageTypeResults[arrlevel1].feeManageTypeResults[arrlevel2].feeManageTypeResults[arrlevel3].startAmount = value;
                        } 
                    });
                    
                    //每个主类,子类-取值范围结束值-修改事件
                    $(document).on("blur", "#feeTable .classEndFees", function () {
                        var index = $("#feeTable .classEndFees").index($(this));
                        var arrlevel1 = $("#feeTable tr").eq(index).attr('data-arrlevel1');
                        var arrlevel2 = $("#feeTable tr").eq(index).attr('data-arrlevel2');
                        var arrlevel3 = $("#feeTable tr").eq(index).attr('data-arrlevel3');
                        var value = $(this).val();

                        if(value === '') {
                            tip({ content: '每个费用管理主类和子类的取值范围结束值不能为空!' });
                        }

                        //修改第一级主类取值范围结束值
                        if(arrlevel2 === undefined && arrlevel3 === undefined) {
                            data.feeManageTypeResults[arrlevel1].endAmount = value;
                        }

                        //修改第二级主类取值范围结束值
                        if(arrlevel2 !== undefined && arrlevel3 === undefined) {
                            data.feeManageTypeResults[arrlevel1].feeManageTypeResults[arrlevel2].endAmount = value;
                        }
                        
                        //修改第三级主类取值范围结束值
                        if(arrlevel2 !== undefined && arrlevel3 !== undefined) {
                            data.feeManageTypeResults[arrlevel1].feeManageTypeResults[arrlevel2].feeManageTypeResults[arrlevel3].endAmount = value;
                        }
                    });                    
                }

                data.feeManageTypeResults = res.data;
                showFeeManageTypeList(data.feeManageTypeResults);
                showBindDomWay();
            }
        });        
    } 
    
    //新增主类按钮事件
    $('#addClass').bind('click', function () {
        var html = "";
        //主类增加的数组序号
        var length = data.feeManageTypeResults.length;
        //主类增加空对象
        var newMainClass = {
            endAmount: 0,
            feeManageTypeResults: [],
            feeName: '',
            id: '',
            isInuse: 2,
            startAmount: 0,           
        }

        data.feeManageTypeResults.push(newMainClass);

        html = [
            '<tr data-arrLevel1="' + length + '" >',
                '<td>',
                    '<div class="typeBox">',
                        '<div class="typeLeft spacing">',
                            '<span class="glyphicon glyphicon-minus"></span>',
                        '</div>',
                        '<div class="typeRight">',
                            '<input type="text" class="form-control className" value="" >',
                        '</div>',
                    '</div>',
                '</td>',
                '<td>',
                    '<div class="input-group">',
                        '<select class="form-control classSwitch" value="2" >',
                            '<option value="1">启用</option>',
                            '<option value="2">停用</option>',
                        '</select>',
                    '</div>',
                '</td>',
                '<td>',
                    '<div class="input-group">',
                        '<input type="text" class="form-control classStartFees" value="0" >',
                        '<span class="input-group-addon">至</span>',
                        '<input type="text" class="form-control classEndFees" value="0" >',
                    '</div>',
                '</td>',
                '<td>',
                    '<div class="btn-group btn-group-xs">',
                        '<button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-expanded="false">',
                            '操作<span class="caret"></span>',
                        '</button>',
                        '<ul class="dropdown-menu currentDropMenu" role="menu">',
                            '<li><a class="newSubclass">新增子类</a></li>',
                            '<li><a class="modify">修改</a></li>',
                        '</ul>',
                    '</div>',
                '</td>',
            '</tr>'
        ].join("");

        $("#feeTable").append(html);
        selectCheck();
    }); 

    //保存按钮点击事件
    $('#btnSave').bind('click', function () {
        //判断是否包含有空值的input
        function judgeValueHasNull() {
            var isNull = false;

            $('#feeTable input').each(function (index) {
                if($(this).val() === '') {
                    isNull = true;
                }                               
            });

            return isNull;
        }

        if(judgeValueHasNull()) {
            tip({ content: '每个费用管理主类和子类的名称,取值范围不能为空!' });
            return;
        }

        console.log(data)
        comn.ajax({
            url: interUrl.systemSettings.feeManageTypeSave,
            data: { 
                feeManageTypeResults: JSON.stringify(data),
            },
            success: function (res) {
                tip({ content: '保存成功' });
                location.reload();
            }
        });
    })

    //首次加载
    getInfo();
})