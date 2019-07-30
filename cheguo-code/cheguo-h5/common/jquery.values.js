(function($) {
  $.fn.values = function(data) {
      var inputs = $(this).find('input').get(), selects = $(this).find('select').get(), textareas = $(this).find('textarea').get(), els = [].concat(inputs, selects, textareas) 
      if(typeof data != 'object') {
          // return all data
          data = {};

          $.each(els, function() {
              if (this.name && !this.disabled && (this.checked
                              || /select|textarea/i.test(this.nodeName)
                              || /text|hidden|password/i.test(this.type))) {
                  data[this.name] = $(this).val();
              }
          });
          return data;
      } else {
          $.each(els, function() {
              if (this.name && (data[this.name] + "") && typeof(data[this.name]) != "undefined") {
                  if(this.type == 'checkbox' || this.type == 'radio') {
                      $(this).attr("checked", (data[this.name] == $(this).val()));
                  } else {
                      $(this).val(data[this.name]);
                  }
              }
          });
          return $(this);
      }
  };
})($);
