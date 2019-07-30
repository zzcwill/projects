$(function() {
  var args;
  args = common.getArgs();
  return common.Ajax({
    url: 'loanApproval/faceComparision/result',
    data: args,
    success: function(data) {
		var html = "";
		for (var i = 0, len = data.length; i < len; i++) {
			o = data[i];
			html += ['<div class="am-flexbox" style="background-color: #FFF;">',
				'<div class="leftImg">',
					'<div class="img" style="background-image: url(' +o.filePath+  '); "></div>',
				'</div>',
				'<div class="am-flexbox-item right">',
					'<p> '+ ((o.relationshipWithLoaner == 1 && "主贷人") || (o.relationshipWithLoaner == 2 && "共同还款人") || (o.guarantyRelationship == 1 && "担保人") || (o.guarantyRelationship == 2 && "反担保人")) +':',
					'<span>'+ o.guarantorName +'</span>',
					'</p>',
					'<p>相似度:<span>'+ (o.similarityDegree || "") +'</span></p>',
					'<p>对比结论: <span style="color: #3bc995;">'+ (o.result || "") +'</span></p>',
					'<p>更新时间:<span>' + o.modifyTime + '</span></p>',
				'</div>',
			'</div>'].join("") 
		} 

		$("#page").html(html);

    }
  });
});

