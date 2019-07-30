$.fn.extend({
	getBanks: function(value) {
    comn.ajax({
      url: interUrl.common.bankList,
      success: (function(_this) {
        return function(res) {
          var o;
          return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
            var j, len, ref, results;
            ref = res.data;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              o = ref[j];
              results.push("<option value='" + o.id + "'>" + o.bankName + "</option>");
            }
            return results;
          })()).join("")).val(value || "");
        };
      })(this)
    });
    return this;
  },
  getOrgs: function(value) {
    comn.ajax({
      url: interUrl.common.orgsList,
      success: (function(_this) {
        return function(res) {
          var o;
          return $(_this).html("<option value=''>--请选择--</option>" + ((function() {
            var j, len, ref, results;
            ref = res.data;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              o = ref[j];
              results.push("<option value='" + o.id	 + "'>" + o.name + "</option>");
            }
            return results;
          })()).join("")).val(value || "");
        };
      })(this)
    });
    return this;
  },
});