$(document).ready(function () {
    $(".pager .jump .jumpgo").click(function () {
        var pattern = /^[0-9]*[1-9][0-9]*$/;
        if ($(".pager .jump .jumppage").val() == "" || !pattern.test($(".pager .jump .jumppage").val())) {
            alert("请输入要跳转的页号");
        } else {
            var href = $(".pager .jump .jumpPagedUrlRule").val().replace("{0}", $(".pager .jump .jumppage").val());
            location.href = href;
        }
    });

 $(".table .group .sl-more").toggle(function(){
	 $(this).addClass("on");
	 $(this).next(".float-l").css("height","auto");
	 $(this).find("em").html("收起");
 },function(){
	 $(this).removeClass("on");
	 $(this).next(".float-l").css("height","30px");
	 $(this).find("em").html("展开");
})
    /*底部js*/
    $(".foot_right a").hover(
        function () { $(this).find("img").stop(true,false).fadeIn();},
        function () { $(this).find("img").stop(true,false).hide(); }
    );

    // 广告管理系统专用[2011-09-20]
    // create xhtml strict friendly iframe
    $('div.ad_box').each(
		function (i) {
		    $(this).replaceWith("<iframe class='ad_box' src='" + $(this).attr("ad-href") + "?slot=" + $(this).attr("ad-slot") + "&node=" + $(this).attr("ad-node") + "&cachetag=" + ($(this).attr("ad-cache") == "true" ? (new Date()).toDateString() : Math.random()) + "&position=" + $(this).attr("ad-position") + "' width='" + $(this).attr("ad-width") + "' height='" + $(this).attr("ad-height") + "' frameborder='0' scrolling='no'></iframe>");
		}
	);
	// 广告管理系统专用[2011-09-20]

    // 页面主导航二级导航显示切换[2011-08-25]
    $("#nav dd").hover(
        function () {
            $(this).find("ul").show();
        },
        function () {
            $(this).find("ul").hide();
        }
    );


    /*导航特效*/
    //window.onload = function () {
    document.ready = function () {
        'use strict';
        var tagNav, tagBar, tagLi, timer, i, n, m, speed, changeWidth;
        tagNav = document.getElementById('nav');
        tagBar = document.getElementById('navBar');
        tagLi = tagNav.getElementsByTagName('dl')[0].getElementsByTagName('dd');
        speed = 0;





        tagBar.style.width = tagLi[0].offsetWidth + 'px';

        function sports(n, m) {
            timer = setInterval(function () {
                speed = (n - tagBar.offsetLeft) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (tagBar.offsetLeft === n) {
                    clearInterval(timer);
                } else {
                    tagBar.style.left = tagBar.offsetLeft + speed + 'px';
                }

                changeWidth = m - tagBar.offsetWidth;
                changeWidth = changeWidth > 0 ? Math.ceil(speed) : Math.floor(speed);
                tagBar.style.width = m + changeWidth + 'px';
            }, 20);
        }

        for (i = 0; i < tagLi.length; i += 1) {
            tagLi[i].onmouseover = function () {
                clearInterval(timer);
                sports(this.offsetLeft, this.offsetWidth);



            };
            tagLi[i].onmouseout = function () {
                clearInterval(timer);
                if ($("#path .link a:eq(1)").text() == "走进天高") {
                sports(56, tagLi[1].offsetWidth);
                } else if ($("#path .link a:eq(1)").text() == "技术中心") {
                    sports(144, tagLi[2].offsetWidth);
                } else if ($("#path .link a:eq(1)").text() == "新闻中心") {
                    sports(232, tagLi[3].offsetWidth);
                } else if ($("#path .link a:eq(1)").text() == "产品服务") {
                    sports(320, tagLi[4].offsetWidth);
                } else if ($("#path .link a:eq(1)").text() == "联系我们") {
                    sports(408, tagLi[5].offsetWidth);
                } else {

                    sports(0, tagLi[0].offsetWidth);
                }

            };
        }




        if ($("#path .link a:eq(1)").text() == "走进天高") {
            sports(56, tagLi[1].offsetWidth);
        } else if ($("#path .link a:eq(1)").text() == "技术中心") {
            sports(144, tagLi[2].offsetWidth);
        } else if ($("#path .link a:eq(1)").text() == "新闻中心") {
            sports(232, tagLi[3].offsetWidth);
        } else if ($("#path .link a:eq(1)").text() == "产品服务") {
            sports(320, tagLi[4].offsetWidth);
        } else if ($("#path .link a:eq(1)").text() == "联系我们") {
            sports(408, tagLi[5].offsetWidth);
        } else {

            sports(0, tagLi[0].offsetWidth);
        }


        








    };
    // 页面主导航二级导航显示切换[2011-08-25]


	/*
    // 解决IE6/7的zIndex的BUG[2011-09-07]
	var zIndexNumber = 1000;
    // Put your target element(s) in the selector below!
    $("div,ul").each(function () {
        $(this).css('zIndex', zIndexNumber);
        zIndexNumber -= 10;
    });
    // 解决IE6/7的zIndex的BUG[2011-09-07]
	*/
});


function Load(path, elem, cache) {
    var cacheBool = true;
    if (cache == null || cache == undefined || (!cache)) { cacheBool = false; }
    $.ajax({
        url: path,
        cache: cacheBool,
        success: function (html) {
            $(elem).replaceWith(html)
        }
    });
}

//IE和firefox通用的复制到剪贴板的JS函数
function copyToClipboard(txt) {
    if (window.clipboardData) {
        window.clipboardData.clearData();
        window.clipboardData.setData("Text", txt);
    } else if (navigator.userAgent.indexOf("Opera") != -1) {
        window.location = txt;
    } else if (window.netscape) {
        try {
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        } catch (e) {
            alert("“复制到剪贴板操作”被浏览器拒绝！您的浏览器可能安全设置比较严格。\n要启动此操作，请在浏览器地址栏输入'about:config'并回车\n然后将'signed.applets.codebase_principal_support'设置为'true'");
        }
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard);
        if (!clip)
            return;
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable);
        if (!trans)
            return;
        trans.addDataFlavor('text/unicode');
        var str = new Object();
        var len = new Object();
        var str = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
        var copytext = txt;
        str.data = copytext;
        trans.setTransferData("text/unicode", str, copytext.length * 2);
        var clipid = Components.interfaces.nsIClipboard;
        if (!clip)
            return false;
        clip.setData(trans, null, clipid.kGlobalClipboard);
        //alert("复制成功！")
    }
}

function startmarquee(lh, speed, delay, index) {
    var t;
    var p = false;
    var o = document.getElementById("marqueebox" + index);
    o.innerHTML += o.innerHTML;
    o.onmouseover = function () { p = true }
    o.onmouseout = function () { p = false }
    o.scrollTop = 0;
    function start() {
        t = setInterval(scrolling, speed);
        if (!p) o.scrollTop += 2;
    }
    function scrolling() {
        if (o.scrollTop % lh != 0) {
            o.scrollTop += 2;
            if (o.scrollTop >= o.scrollHeight / 2) o.scrollTop = 0;
        } else {
            clearInterval(t);
            setTimeout(start, delay);
        }
    }
    setTimeout(start, delay);
}

//http://jqueryfordesigners.com/jquery-infinite-carousel/
(function () {
    $.fn.infiniteCarousel = function () {
        function repeat(str, n) {
            return new Array(n + 1).join(str);
        }

        return this.each(function () {
            // magic!
            var $wrapper = $('> div', this).css('overflow', 'hidden'),
                $slider = $wrapper.find('> ul').width(9999),
                $items = $slider.find('> li'),
                $single = $items.filter(':first')

            singleWidth = $single.outerWidth(),
                visible = Math.ceil($wrapper.innerWidth() / singleWidth),
                currentPage = 1,
                pages = Math.ceil($items.length / visible);

            /* TASKS */

            // 1. pad the pages with empty element if required
            if ($items.length % visible != 0) {
                // pad
                $slider.append(repeat('<li class="empty" />', visible - ($items.length % visible)));
                $items = $slider.find('> li');
            }

            // 2. create the carousel padding on left and right (cloned)
            $items.filter(':first').before($items.slice(-visible).clone().addClass('cloned'));
            $items.filter(':last').after($items.slice(0, visible).clone().addClass('cloned'));
            $items = $slider.find('> li');

            // 3. reset scroll
            $wrapper.scrollLeft(singleWidth * visible);

            // 4. paging function
            function gotoPage(page) {
                var dir = page < currentPage ? -1 : 1,
                    n = Math.abs(currentPage - page),
                    left = singleWidth * dir * visible * n;

                $wrapper.filter(':not(:animated)').animate({
                    scrollLeft: '+=' + left
                }, 1400, function () {
                    // if page == last page - then reset position
                    if (page > pages) {
                        $wrapper.scrollLeft(singleWidth * visible);
                        page = 1;
                    } else if (page == 0) {
                        page = pages;
                        $wrapper.scrollLeft(singleWidth * visible * pages);
                    }

                    currentPage = page;
                });
            }

            // 5. insert the back and forward link
            $wrapper.after('<a href="#" class="arrow back"></a><a href="#" class="arrow forward"></a>');

            // 6. bind the back and forward links
            $('a.back', this).click(function () {
                gotoPage(currentPage - 1);
                return false;
            });

            $('a.forward', this).click(function () {
                gotoPage(currentPage + 1);
                return false;
            });

            $(this).bind('goto', function (event, page) {
                gotoPage(page);
            });

            // THIS IS NEW CODE FOR THE AUTOMATIC INFINITE CAROUSEL
            $(this).bind('next', function () {
                gotoPage(currentPage + 1);
            });
        });
    };
})(jQuery);

function GetUrlParms() {
    var args = new Object();
    var query = location.search.substring(1); //获取查询串   
    var pairs = query.split("&"); //在逗号处断开   
    for (var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('='); //查找name=value   
        if (pos == -1) continue; //如果没有找到就跳过   
        var argname = pairs[i].substring(0, pos); //提取name   
        var value = pairs[i].substring(pos + 1); //提取value   
        args[argname] = unescape(value); //存为属性   
    }
    return args;
}

///*首页*/
//$("#out_div .search_form .text").focus(
//    function () {
//        $(this).attr("value", "")
//    }
//);
//$("#out_div .search_form .text").blur(
//    function () {
//        $(this).attr("value", "请输入您要查询的关键字")
//    }
//);

