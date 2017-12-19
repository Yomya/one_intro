$(function() {
    //判断浏览设备函数
    function browserRedirect() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return false;
        } else {
            return true;
        }
    }
    //插件配置
    var isPc = browserRedirect();
    var cn = ['首页', '项目经验', '专业技能', '实习经历', '联系我'];
    var pcBgColor = ['#3399CC', '#666699', '#3399CC', '#666699', '#3399CC'];
    var mBgColor = ['#3399CC', '#666699', '#3399CC', '#666699', '#3399CC'];


    if (isPc) {
        $('#pagePilling').fullpage({
            sectionsColor: isPc ? pcBgColor : mBgColor,
            navigation: true,
            navigationTooltips: cn,
            loopBottom: false,
            loopTop: false,
            // resize: true
        });

    } else {
        $('#pagePilling').fullpage({
            sectionsColor: isPc ? pcBgColor : mBgColor,
            navigation: false,
            // autoScrolling: false,
            // fitToSection: false,
            loopBottom: false,
            loopTop: false
        });
    }

    function autoScrolling() {
        var $ww = $(window).width();
        if ($ww < 1024) {
            $.fn.fullpage.setAutoScrolling(false);
        } else {
            $.fn.fullpage.setAutoScrolling(true);
        }
    }


    function bindEvent() {
        //根据浏览窗口大小决定是否使用滚动条
        $(window).resize(function() {
            autoScrolling();
        });

        // 带二维码的项目并且浏览设备为PC显示弹层
        if (isPc) {
            $(".j-item").on("click", function(e) {
                e.stopPropagation();
                e.preventDefault();
                var title = $(this).find('.title').text();
                var qrcodeSrc = $(this).data('qrcode');
                var desc = '请使用微信扫一扫预览'
                $(".j-imgview").find('img').attr('src', qrcodeSrc);
                $(".j-imgview").find('.title').text(title);
                $(".j-imgview").find('.desc').text(desc);
                $(".j-imgview").show();
            })
        }


        // 关闭弹层
        $(".j-close").on("click", function(e) {
            e.stopPropagation();
            e.preventDefault();
            $(".j-imgview").hide();
        })
    }

    bindEvent();


});