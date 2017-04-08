$(function () {
    var sWidth = $(".roll_box ul li").outerWidth(true);
    var len = $(".roll_box  ul li").length; 
    var index = 0;
    var picTimer;
    $(".roll_box ul li").clone(true).appendTo($(".roll_box ul"));

    $(".roll_box ul").hover(
		function () {
		    clearInterval(picTimer);
		},
		function () {
		    picTimer = setInterval(function () {
		        showPicsleft()
		    }, 4000);
		}
	).trigger("mouseleave");

    $(".roll_box ul").css({ "width": sWidth * (len) * 2, "left": -(sWidth * (len)) });
    $(".left").click(function () {
        showPicsright();
    });
    $(".right").click(function () {
        showPicsleft()
    });

    function showPicsleft() { 
        $(".roll_box ul").stop(true, false).animate({ "left": -sWidth * len - sWidth }, 500, function () {
            $(".roll_box ul li:first").appendTo($(".roll_box ul"));
            $(".roll_box ul").css({ "left": -(sWidth * (len)) });
        });
    }
    function showPicsright() { 
        $(".roll_box ul").stop(true, false).animate({ "left": -sWidth * len + sWidth }, 500, function () {
            $(".roll_box ul li:last").prependTo($(".roll_box ul"));
            $(".roll_box ul").css({ "left": -(sWidth * (len)) });
        });
    }

});