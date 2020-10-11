;
! function($) {

    // 搜索框效果
    // const search = document.querySelector('.c-input');
    // let search = $('.c-input');
    // const list_search = document.querySelector('#search-list');
    // let list_search = $('#search-list');

    // class Search {
    //     constructor() {
    //         this.search = $('.c-input');
    //         this.list_search = $('#search-list');
    //     }
    //     init() {
    //         function taobao(data) {
    //             let arr = data.result;
    //             let str = '';
    //             for (let value of arr) {
    //                 str += `
    //                     <li>${value[0]}</li>
    //                 `;
    //             }
    //             list_search.html(str);
    //         }
    //         this.search.on('input', function() {
    //             let scriptelement = $('#scriptelement');
    //             if (scriptelement) { //如果存在script元素，删除
    //                 $('html').remove(scriptelement);
    //             }
    //             $('html').append('<script id="scriptelement"></script>');
    //             scriptelement.attr({
    //                 src: `https://suggest.taobao.com/sug?code=utf-8&q=${this.value}&_ksTS=1600326651998_256&callback=taobao`
    //             })
    //         });
    //     }
    // }
    // new Search().init();

    // function taobao(data) {
    //     console.log(data.result);
    //     let arr = data.result;
    //     let str = '';
    //     for (let value of arr) {
    //         str += `
    //         <li>${value[0]}</li>
    //     `;
    //     }
    //     list_search.innerHTML = str;
    // }
    // search.oninput = function() {
    //     //随着用户的输入，数据接口发送变化。
    //     let scriptelement = document.querySelector('#scriptelement');
    //     //如果存在上面的元素对象，带有此id名的script已经创建了。
    //     if (scriptelement) { //如果存在script元素，删除
    //         document.body.removeChild(scriptelement);
    //     }
    //     let cS = document.createElement('script');
    //     cS.src = 'https://suggest.taobao.com/sug?code=utf-8&q=' + this.value + '&_ksTS=1600326651998_256&callback=taobao';
    //     cS.id = 'scriptelement';
    //     document.body.appendChild(cS);
    // };


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



    // 轮播图效果
    class Lunbo {
        constructor() {
            this.lunbo = $('.lunbo');
            this.piclist = $('.lunbo ul li');
            this.btnlist = $('.lunbo ol li');
            this.leftarrow = $('#left');
            this.rightarrow = $('#right');
            this.index = 0;
            this.timer = null;
        }
        init() {
            // 1.鼠标移入lunbo,显示左右箭头，反之隐藏
            //事件里面的this指向当前操作的元素对象。方法里面的this指向实例。
            let _this = this; //实例对象
            this.lunbo.hover(function() {
                _this.leftarrow.show();
                _this.rightarrow.show();
                // 5.鼠标移入lunbo,停止。
                clearInterval(_this.timer);
            }, function() {
                _this.leftarrow.hide();
                _this.rightarrow.hide();
                //继续轮播
                this.timer = window.setInterval(function() {
                    _this.rightarrowclick();
                }, 5000);
            });
            // 2.点击对应得小圆圈，当前点击的小圆圈添加类名，其他的隐藏（和小圆圈对应的图片显示）
            this.btnlist.on('click', function() {
                _this.index = $(this).index(); //将当前按钮对应的索引存储下来
                _this.tabswitch();
            });

            //3.点击左右箭头进行图片切换
            this.rightarrow.on('click', function() {
                _this.rightarrowclick();
            });

            this.leftarrow.on('click', function() {
                _this.leftarrowclick();
            });

            //4.自动轮播
            this.timer = window.setInterval(function() {
                _this.rightarrowclick();
            }, 5000);
        }

        tabswitch() {
            this.btnlist.eq(this.index).addClass('active').siblings().removeClass('active');
            this.piclist.eq(this.index).stop(true).animate({
                opacity: 1
            }).siblings().stop(true).animate({
                opacity: 0
            });
        }

        rightarrowclick() {
            this.index++;
            if (this.index > this.btnlist.size() - 1) {
                this.index = 0;
            }
            this.tabswitch();
        }

        leftarrowclick() {
            this.index--;
            if (this.index < 0) {
                this.index = this.btnlist.size() - 1;
            }
            this.tabswitch();
        }
    }
    new Lunbo().init();


    // 楼梯效果
    function scroll() {
        //滚动条的top值。
        let top = $(window).scrollTop();
        // 如果大于1000就显示，否则隐藏
        top >= 1000 ? $('#loutinav').show() : $('#loutinav').hide();
        // each遍历
        $('.louceng').each(function(index, element) {
            let loucengtop = $(this).offset().top; //每一个楼层的top值
            // 如果loucengtop大于滚动条的值，
            // 给第一个移除，第二个添加
            if (loucengtop >= top) {
                $('#loutinav li').removeClass('active');
                $('#loutinav li').eq($(this).index()).addClass('active');
                //返回 'false' 将停止循环，有一个满足条件终止循环。
                return false;
            }
        });
    }
    scroll();
    //滚轮事件触发
    $(window).on('scroll', function() {
        scroll();
    });

    // 2.点击左侧楼梯上面的按钮，右侧楼层运动到对应的位置。
    // 求每一个楼层top位置。将固定的top值给滚动条的top值。
    // document.documentElement.scrollTop

    $('#loutinav li').not('.last').on('click', function() {
        $(this).addClass('active').siblings().removeClass('active');
        let loucengtop = $('.louceng').eq($(this).index()).offset().top;
        $('html').animate({
            scrollTop: loucengtop
        });
    });

    // 4.回到顶部。
    $('.last').on('click', function() {
        $('html').animate({
            scrollTop: 0
        });
    });





    // main部分数据渲染(时尚女装)
    // http://192.168.11.12/wph/php/piclist.php
    const list = $('.list ul');
    $.ajax({ //获取远程接口的值
        url: 'http://192.168.11.12/wph/php/piclist.php',
        dataType: 'json'
    }).done(function(data) {
        console.log(data);
        let strhtml = '';
        $.each(data, function(index, value) { //遍历数组和对象
            strhtml += `
            <a href="detail.html?sid=${value.sid}">
                <li>
                    <img class="lazy" data-original="${value.url}" width="238" height="219" >
                    <p>${value.title}</p>
                    <div class="zhe">
                        <span class="k">${value.zhekou}</span>
                        <span class="q">${value.zheqi}</span>
                    </div>
                    <a class="button" href="list.html">立即抢购</a>
                </li>
            </a>
            `;
        });
        list.html(strhtml); //追加数据
        //实现懒加载效果
        $("img.lazy").lazyload({
            effect: "fadeIn" //图片显示方式
        });
    })


}(jQuery);