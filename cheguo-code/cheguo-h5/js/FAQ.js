 $(function() {
     var args;
     args = common.getArgs();
     return common.Ajax({
         url: 'question/common/getInfo',
         data: args,
         success: function(data) {
             $("#page").nameValues(data);
         }
     });
 });


