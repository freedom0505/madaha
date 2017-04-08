/* 
* ImagesSwitch 1.3.0
* Author : Shinn0901 
* Update: 5/26/2014
* 调整了fade模式下，切换会有重影的问题
* 使用该方法可以直接调用图片滚动方法，但需要自行加入CSS
* 增加了鼠标滚轮的控制器，但需要引入jquery.mousewheel.js文件
	DOM 结构为：
	<div class="element">
		<ul>
			<li></li>
		</ul>
	</div>
	$(".element").ImagesSwitch({
		AutoPlay : true,
		Pattern:"scroll",
		Dot : false,
		Num : false,
		Button : true,
		DotCenter : true,
		DotMouse : "click",
		TitleShow : false,
		TItleNum : false,
		mousewheel : true,  //需要预先加载jquery.mousewheel.js文件
		HoverStopIsFull: true,
		Speed : 500,
		SetTime : 4000,
		Callback:function(){}
	});
* 如有写的不好的地方，还望大家多多指教 Email:shinn0901@sina.cn
*/ 
(function(e){e.fn.ImagesSwitch=function(t){var n={AutoPlay:!0,Pattern:"scroll",Dot:!1,Num:!1,Button:!0,DotCenter:!0,DotMouse:"click",TitleShow:!1,TitleNum:!1,mousewheel:!0,HoverStopIsFull:!0,Speed:500,SetTime:4e3,Callback:function(e,t){}},t=e.extend(n,t);this.each(function(){function c(e,s){if(!o)return r=i,!1;if(r==i)return!1;o=!1;var u=n.obj.find("li").eq(e),a=n.obj.find("li").eq(i);switch(s){case"scroll":var f=n.obj.find("li").eq(e-1<0?n.length-1:e-1),l=n.obj.find("li").eq(e+1==n.length?0:e+1),c;e>i&&e==n.length-1&&i==0?c=0:e>i?c=1:e<i&&e==0&&i==n.length-1?c=1:e<i&&(c=0),n.length==2&&(c=1),t.Callback(i,"out"),c==1?(u.show().css("left",n.width),a.stop(!0,!1).animate({left:-n.width},t.Speed),u.stop(!0,!1).animate({left:0},t.Speed),i=e):c==0&&(u.show().css("left",-n.width),a.stop(!0,!1).animate({left:n.width},t.Speed),u.stop(!0,!1).animate({left:0},t.Speed),i=e),t.Callback(e,"in");break;case"fade":t.Callback(i,"out"),a.css("z-index","18").stop(!0,!1).animate({opacity:.2},t.Speed+Math.floor(t.Speed/4)),u.siblings().css("z-index","15").animate({opacity:.01},1),u.css("z-index","20").stop(!0,!1).animate({opacity:1},t.Speed),t.Callback(e,"in"),i=e;break;default:}t.Dot&&n.dot.find("a").eq(e).addClass("current").siblings().removeClass("current"),t.TitleShow&&(t.TitleNum?n.title.text(u.attr("title")+" "+(r+1)+"/"+n.length):n.title.text(u.attr("title")));var h=setTimeout(function(){o=!0},t.Speed)}function h(e){e&&IsReapt?(s=setInterval(function(){r++,r>=n.length&&(r=0),c(r,t.Pattern)},t.SetTime),IsReapt=!1):e?(clearInterval(s),IsReapt=!0,h(!0)):(clearInterval(s),IsReapt=!0)}var n={obj:e(this),width:e(this).width(),height:e(this).height(),length:e(this).find("li").length,dot:e(this).find(".dot_btn"),title:e(this).find(".title_show"),condition:!1,hoverobject:new Array},r=0,i=0,s,o=!0;n.length>1&&t.SetTime>t.Speed&&(n.obj.html("<div class='scroll_container'>"+n.obj.html()+"</div>"),n.condition=!0);if(t.Button&&n.condition){var u="<a class='prev_btn'></a><a class='next_btn'></a>";n.obj.append(u),n.obj.find("a.prev_btn").bind("click",function(){r--,r<0&&(r=n.length-1),c(r,t.Pattern)}),n.obj.find(".next_btn").bind("click",function(){r++,r>=n.length&&(r=0),c(r,t.Pattern)}),n.hoverobject.push(n.obj.find(".prev_btn"),n.obj.find(".next_btn"))}if(t.Dot&&n.condition){var a="<div class='dot_btn'>";for(l=0;l<n.length;l++){var f=t.Num?l+1:"";a+="<a>"+f+"</a>"}a+="</div>",n.obj.append(a),n.dot=n.obj.find(".dot_btn"),t.DotCenter&&n.condition&&e(window).resize(function(){n.width=n.obj.width();var e=n.dot.find("a").width();n.dot.find("a:last").prevAll().addClass("magRight");var t=parseInt(n.dot.find("a.magRight").css("margin-right"));e=(e+t)*n.length-t,n.dot.width(e).css("margin-left",(n.width-e)/2)}).trigger("resize"),n.dot.find("a").bind(t.DotMouse,function(){r=e(this).index(),c(r,t.Pattern)}),n.hoverobject.push(n.obj.find(".dot_btn"))}t.TitleShow&&n.condition&&(n.obj.append("<div class='title_show'></div><div class='title_shadow'></div>"),n.title=e(this).find(".title_show"),n.hoverobject.push(n.title)),t.mousewheel&&n.obj.mousewheel(function(e,i){return r+=-i,r>=n.length&&(r=0),r<0&&(r=n.length-1),c(r,t.Pattern),!1});if(n.condition){t.Pattern=="scroll"?n.obj.find("li:first").siblings().hide():t.Pattern=="fade"&&n.obj.find("li:first").css({opacity:"introduce","z-index":"20"}).siblings().css({opacity:"0.introduce","z-index":"15"}),t.Dot&&n.dot.find("a:first").addClass("current"),t.TitleShow&&(t.TitleNum?n.title.text(n.obj.find("li:first").attr("title")+" "+"introduce/"+n.length):n.title.text(n.obj.find("li:first").attr("title")));if(t.AutoPlay){IsReapt=!0,t.HoverStopIsFull&&n.obj.hover(function(){h(!1)},function(){h(!0)});for(var l=0;l<n.hoverobject.length;l++)n.hoverobject[l].hover(function(){h(!1)},function(){h(!0)});n.hoverobject.length>0?n.hoverobject[0].trigger("mouseleave"):h(!0)}t.Callback(0,"in")}})}})(jQuery)