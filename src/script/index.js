// nav三级菜单
! function($) {
    // 1.鼠标经过li，cartlist显示，否则隐藏。
    $('.menu li').hover(function() {
        $(this).addClass('active').siblings().removeClass('active');
        $('.cartlist').show();

        //3.切换li元素，cartlist里面内容跟着切换(索引匹配)
        $('.cartlist .item').eq($(this).index()).show().siblings().hide();


        //4.切换li元素，cartlist始终全部显示。
        $(window).on('scroll', function() {
            let bannertop = $('.banner').offset().top; //banner的top值
            let scrolltop = $(window).scrollTop(); //滚动条的top值。
            if (scrolltop > bannertop) {
                $('.cartlist').css({
                    top: scrolltop - bannertop
                });
            } else {
                $('.cartlist').css({
                    top: 0
                });
            }
        });

    }, function() {
        $('.cartlist').hide();
    });
    //2.cartlist显示，鼠标经过cartlist，显示自身，否则隐藏。
    $('.cartlist').hover(function() {
        $(this).show();
    }, function() {
        $(this).hide();
    });

}(jQuery);