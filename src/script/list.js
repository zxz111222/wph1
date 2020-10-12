;
! function($) {
    // nav三级菜单
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


    //前端传递对应的页面给后端，后端根据页面返回对应的数据。
    //注意：一开始应该渲染第一页的数据(接口)
    //约定每页的数据条数。
    //总的数据计算分页。


    //排序
    let array_default = []; //排序前的li数组
    let array = []; //排序中的数组
    //冒泡排序，比较相邻的两个数字。
    let prev = null; //前一个商品价格
    let next = null; //后一个商品价格
    //1.渲染列表页的数据-默认渲染第一页
    const $list = $('.list');
    $.ajax({
        url: 'http://192.168.11.12/wph/php/listdata.php',
        dataType: 'json'
    }).done(function(data) {
        let $strhtml = '<ul>';
        $.each(data, function(index, value) {
            $strhtml += `
                <a href="detail.html?sid=${value.sid}">
                    <li>
                        <img class="lazy" data-original="${value.url}" width="217" height="218" >

                        <div class="item">
                            <span class="tmj">特卖价</span>
                            <span class="price">${value.price}</span>
                            <span class="zk cost">${value.cost}</span>
                            <span class="zk last">${value.zhekou}</span>
                        </div>
                        <p>${value.title}</p>
                    </li>
                </a>
            `;
        });
        $strhtml += '</ul>';
        $list.html($strhtml);
        //添加懒加载
        $(function() {
            $("img.lazy").lazyload({ effect: "fadeIn" });
        });
        array_default = []; //排序前的li数组
        array = []; //排序中的数组
        prev = null;
        next = null;
        //将页面的li元素加载到两个数组中
        $('.list li').each(function(index, element) {
            array[index] = $(this);
            array_default[index] = $(this);
        });
    });


    //2.分页思路:根据传输的页码，后端返回对应的接口数据，渲染出来。
    $('.page').pagination({
        pageCount: 3, //总的页数
        jump: true, //是否开启跳转到指定的页数，布尔值。
        prevContent: '上一页', //将图标改成上一页下一页。
        nextContent: '下一页',
        callback: function(api) {
            console.log(api.getCurrent()); //获取当前的点击的页码。
            $.ajax({
                url: 'http://192.168.11.12/wph/php/listdata.php',
                data: {
                    page: api.getCurrent() //传输数据
                },
                dataType: 'json'
            }).done(function(data) {
                let $strhtml = '<ul>';
                $.each(data, function(index, value) {
                    $strhtml += `
                        <a href="detail.html?sid=${value.sid}">
                            <li>
                                <img class="lazy" data-original="${value.url}" width="217" height="218" >

                                <div class="item">
                                    <span class="tmj">特卖价</span>
                                    <span class="price">${value.price}</span>
                                    <span class="zk cost">${value.cost}</span>
                                    <span class="zk last">${value.zhekou}</span>
                                </div>
                                <p>${value.title}</p>
                            </li>
                        </a>
                    `;
                });
                $strhtml += '</ul>';
                $list.html($strhtml);
                //添加懒加载
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });
                array_default = []; //排序前的li数组
                array = []; //排序中的数组
                prev = null;
                next = null;
                //将页面的li元素加载到两个数组中
                $('.list li').each(function(index, element) {
                    array[index] = $(this);
                    array_default[index] = $(this);
                });
            });
        }

    });


    //3.排序，排序前的数组都已经具有li元素
    // 默认
    $('button').eq(0).on('click', function() {
        $.each(array_default, function(index, value) {
            $('.list ul').append(value);
        });
        return;
    });
    // 升序
    $('button').eq(1).on('click', function() {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price').html().substring(1)); //取上个价格
                next = parseFloat(array[j + 1].find('.price').html().substring(1)); //下一个的价格
                //通过价格的判断，改变的是数组li的位置。
                if (prev > next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        $('.list ul').empty(); //清空原来的列表
        $.each(array, function(index, value) {
            $('.list ul').append(value);
        });
    });

    // 降序
    $('button').eq(2).on('click', function() {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                prev = parseFloat(array[j].find('.price').html().substring(1)); //取上个价格
                next = parseFloat(array[j + 1].find('.price').html().substring(1)); //下一个的价格
                //通过价格的判断，改变的是数组li的位置。
                if (prev < next) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        $('.list ul').empty(); //清空原来的列表
        $.each(array, function(index, value) {
            $('.list ul').append(value);
        });
    });



}(jQuery);