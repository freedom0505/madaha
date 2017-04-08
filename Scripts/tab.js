/*
	滑动门插件Switch Tab - http://www.ks-pe.com/Tech/switch-demo.html
	@DOM
		<div>
		<dl class="tab">
		<dt>
		<a href="#">标题一</a>
		<a href="#">标题二</a>
		</dt>
		<dd>内容一</dd>
		<dd>内容二</dd>
		</dl>
		</div>
	@Usage
		$(".tab").switchTab(options);
	@options
		defaultIndex		:0,						//默认选中的标签索引，从0开始
		titOnClassName		:"on",					//标签选中时的样式
		titCell				:"dt span",				//自定义标题标签，支持选择符
		mainCell			:"dd",					//自定义标题标签，支持选择符
		delayTime			:250,					//延迟触发时间. 当这个时间小于切换动画效果时间时, 动画将被禁用
		interTime			:0,						//自动切换时间. 当这个时间大于0时, 标签将定时自动切换
		trigger				:"click",				//滑动触发方式. 默认为click, 可选择mouseover
		effect				:"fade",				//切换动画. 默认不使用动画. 目前仅提供fade(淡出), slide(向下展开)两种
		omitLinks			:false,					//是否忽略带链接标签，默认为否
		debug				:""						//调试模式. 默认关闭


		 $(function(){
            $(".tab").switchTab({ defaultIndex: "0", effect: "fade", titCell: "dt a", trigger: "click", delayTime: 250 });
        });
*/
 jQuery.fn.switchTab = function(settings) {
	settings = jQuery.extend({//可配置参数
		defaultIndex: 0,
		titOnClassName: "on",
		titCell: "dt span",
		mainCell: "dd",
		delayTime: 250,
		interTime: 0,
		trigger: "click",
		effect: "",
		omitLinks: false,
		debug: "",
		ismap: false
	},
	settings,
	{//插件信息
		version: 120
	});

	this.each(function() {
		var st;
		var curTagIndex = -1;
		var obj = jQuery(this);
		if(settings.omitLinks){
			settings.titCell = settings.titCell + "[href^='#']";
		}
		var oTit = obj.find(settings.titCell);
		var oMain = obj.find(settings.mainCell);
		var cellCount = oTit.length;//可切换个数
		var ShowSTCon = function (oi){
			if(oi != curTagIndex || settings.ismap){
				oTit.eq(curTagIndex).removeClass(settings.titOnClassName);
				oMain.hide();
				obj.find(settings.titCell + ":eq(" + oi + ")").addClass(settings.titOnClassName);
				if(settings.delayTime <250 && settings.effect != "")settings.effect = "";
				if(settings.effect == "fade"){
					obj.find(settings.mainCell + ":eq(" + oi + ")").fadeIn({queue: false, duration: 250});
				}else if(settings.effect == "slide"){
					obj.find(settings.mainCell + ":eq(" + oi + ")").slideDown({queue: false, duration: 250});
				}else{
					obj.find(settings.mainCell + ":eq(" + oi + ")").show();
				}
				curTagIndex = oi;
			}
		};
		
		var ShowNext = function (){
			oTit.eq(curTagIndex).removeClass(settings.titOnClassName);
			oMain.hide();
			if(++curTagIndex >= cellCount)curTagIndex = 0;
			oTit.eq(curTagIndex).addClass(settings.titOnClassName);
			oMain.eq(curTagIndex).show();
			//ShowSTCon(curTagIndex);
		};
		
		//根据defaultIndex初始化
		if(!settings.ismap)
		{
		ShowSTCon(settings.defaultIndex);
		}

		//
		if(settings.interTime > 0){
			var sInterval = setInterval(function(){
				ShowNext();
			}, settings.interTime);
		}

		//处理交互事件
		oTit.each(function(i, ele){
			if(settings.trigger=="click"){
				jQuery(ele).click(function(){
					ShowSTCon(i);
					return false;//若有链接而选择了click模式, 链接不起作用
				});
			}else if(settings.delayTime > 0){
				jQuery(ele).hover(function(){
					st = setTimeout(function(){//延时触发
						ShowSTCon(i);
						st = null;
					}, settings.delayTime);
				},function(){
					if(st!=null)clearTimeout(st);
				});
			}else{
				jQuery(ele).mouseover(function(){
					ShowSTCon(i);
				});
			}
		});
	});
	if(settings.debug!="")alert(settings[settings.debug]);
	return this;
};