function optionsSvgSlider() {
    var wW = $(window).width(),
        wH = $(window).height(),
        scX = Math.ceil((wW / 1920) * 10) / 10,
        scY = (wH * 1.1 / 1000).toFixed(1) * 1;

    $('.svg-group').css({
        '-webkit-transform': 'translate(-50%,0) translateZ(0) scale' + '(' + scX + ',' + scY + ')',
        '-moz-transform': 'translate(-50%,0) translateZ(0) scale' + '(' + scX + ',' + scY + ')',
        '-o-transform': 'translate(-50%,0) translateZ(0) scale' + '(' + scX + ',' + scY + ')',
        'transform': 'translate(-50%,0) translateZ(0) scale' + '(' + scX + ',' + scY + ')'
    });
    $('.flexslider .item').css('height', wH + 'px');

}

function sizeAnimateHome() {
    var wH = $(window).height(),
        wW = $(window).width(),
        scY = (wH / 800).toFixed(1) * 1;

    if (scY < 1) {
        $('.wrapper-animate-action').css({
            '-webkit-transform': 'translate(-50%, -50%) scale' + '(' + scY + ',' + scY + ')',
            '-moz-transform': 'translate(-50%, -50%) scale' + '(' + scY + ',' + scY + ')',
            '-o-transform': 'translate(-50%, -50%) scale' + '(' + scY + ',' + scY + ')',
            'transform': 'translate(-50%, -50%) scale' + '(' + scY + ',' + scY + ')'
        });
    } else {
        if (wW < 1200) {
            $('.wrapper-animate-action').css({
                '-webkit-transform': 'translate(-50%, -50%) scale(0.7,0.7)',
                '-moz-transform': 'translate(-50%, -50%) scale(0.7,0.7))',
                '-o-transform': 'translate(-50%, -50%) scale(0.7,0.7))',
                'transform': 'translate(-50%, -50%) scale(0.7,0.7))'
            });
        } else {
            $('.wrapper-animate-action').css({
                '-webkit-transform': 'translate(-50%, -50%) scale(1,1)',
                '-moz-transform': 'translate(-50%, -50%) scale(1,1)',
                '-o-transform': 'translate(-50%, -50%) scale(1,1)',
                'transform': 'translate(-50%, -50%) scale(1,1)'
            });
        }

    }


}

function qtyScrollPage() {
    var ind = 1;
    $('.item-scroll').each(function () {
        var target = $(this),
            group = $(this).attr('data-group'),
            navWrap = $('.scroll-navigate');
        target.attr('data-number', ind);
        if (target.hasClass('first-page')) {
            navWrap.append('<a class="first-control can-scroll active" data-number="' + ind + '"></a>');
        }
        if (target.hasClass('content-item')) {
            if (group == '2') {
                navWrap.append('<a class="second-control" data-number="' + ind + '"></a>');
            } else {
                navWrap.append('<a class="last-control" data-number="' + ind + '"></a>');
            }
        }
        ind += 1;
    });
}

function heightIndicators() {
    var sumH = $('.slide-indicators').height(),
        qty = $(document).find('.item-indicator').length,
        topIt = 0,
        topG = 0;
    $(document).find('.item-indicator').css('height', (sumH / qty) + 'px');
    $(document).find('.item-indicator').each(function () {
        $(this).attr('data-top', topIt);
        $(this).attr('data-bottom', topIt + (sumH / qty));
        topIt += sumH / qty;
    });
    $('.slide-indicators .group').each(function () {
        var qtyIt = $(this).find('.item-indicator').length;
        $(this).attr('data-top', topG);
        $(this).attr('data-bottom', topG + (sumH / qty) * qtyIt);
        topG += (sumH / qty) * qtyIt;
    });
}

function Indicators() {
    var indItem = $('.indicator-item'),
        indScroll = 1;
    indItem.each(function () {
        var dataG = $(this).attr('data-group');
        if (dataG !== '1') {
            indScroll += 1;
            $('.slide-indicators .group' + dataG).append('<div class="item-indicator" data-number="' + indScroll + '"></div>');
        } else {
            $('.slide-indicators .group' + dataG).append('<div class="item-indicator"></div>');
        }

    });

    heightIndicators();

    var numberG = 1;
    $('.slide-indicators .group').each(function () {
        if (!$(this).find('.item-indicator').length) {
            $(this).remove();
        } else {
            $(this).find('.number-group').text('0' + numberG);
            numberG += 1;
        }
    });
    $('.slide-indicators .group1').addClass('active');

}

function moveActiveIndicator() {
    var top = $(document).find('.slide-indicators .active').attr('data-top'),
        hMark = $(document).find('.slide-indicators .active').attr('data-bottom') - top;
    $('.active-mark').css({
        'top': top + 'px',
        'height': hMark + 'px'
    })
}

function pageNavigate() {
    $('.scroll-navigate').on('click', 'a', function () {
        var numB = $(this).attr('data-number');
        $(document).find('.item-indicator').removeClass('active');
        $('.slide-indicators .group').removeClass('active');
        $('.scroll-navigate a').removeClass('active');
        $(this).addClass('active');
        $('.item-scroll').removeClass('active');
        $('.item-scroll[data-number="' + numB + '"]').addClass('active');

        if ($(this).hasClass('second-control')) {
            $('.second-page').addClass('active');
            $(document).find('.group2 .item-indicator[data-number="' + numB + '"]').addClass('active');
            $('.second-control').removeClass('can-scroll');
            setTimeout(function () {
                $(document).find('.second-control[data-number="' + numB + '"]').addClass('can-scroll');
            }, 1600);
        } else {
            $('.second-page').removeClass('active');
            $('.second-control').removeClass('can-scroll');

        }

        if ($(this).hasClass('last-control')) {
            $('.third-page').addClass('active');
            $(document).find('.group3 .item-indicator[data-number="' + numB + '"]').addClass('active');
            $('.last-control').removeClass('can-scroll');
            setTimeout(function () {
                $(document).find('.last-control[data-number="' + numB + '"]').addClass('can-scroll');
            }, 1200);
        } else {
            $('.third-page').removeClass('active');
            $('.last-control').removeClass('can-scroll');

        }

        if ($(this).hasClass('first-control')) {
            $('.logo-slideshow').find('.flex-control-paging li:first-child a').trigger('click');
            $('.logo-slideshow').find('.flex-play').trigger('click');
            $('.logo-slideshow').removeClass('hide-show');
            $('.group1').addClass('active');
            $('.right-panel').addClass('dark-theme');
        } else {
            $('.logo-slideshow').find('.flex-pause').trigger('click');
            $('.logo-slideshow').find('.flex-control-paging li:last-child a').trigger('click');
            $('.logo-slideshow').addClass('hide-show');
            $('.right-panel').removeClass('dark-theme');
        }

        moveActiveIndicator();

    });
}

function SwipeNavigate() {
    if ($('section').is('.home-page')) {
        var directionSwipe = "";
        $(".home-page").swipe({
            swipeUp: function (direction) {
                directionSwipe = "down";
                SliderNavigate(directionSwipe);
            },
            swipeDown: function (direction) {
                directionSwipe = "up";
                SliderNavigate(directionSwipe);
            }

        });


    }
}
function SliderNavigate(dR) {
    var target = $('.scroll-navigate a.active');
    if (dR == "up") {
        if (target.prev('a').length && target.hasClass('can-scroll')) {
            target.prev('a').trigger('click');
        }

    } else if (dR == "down") {
        if (target.next('a').length && target.hasClass('can-scroll')) {
            target.next('a').trigger('click');

        }

    }
}

function navHeight() {
    var innerH = $('.inner-menu').height(),
        wW = $(window).width(),
        calcH = 0;
    $('.calc-height').each(function () {
        calcH += $(this).height();
    });
    var maxH = innerH - calcH;
    if (wW > 767) {
        $('nav').css({
            'height': maxH + 'px'
        });
    } else {
        $('nav').css({
            'height': 'auto'
        });
    }
    if (wW < 451) {
        $('.home-body .menu-toggle').css('left', (wW / 2 - 66) + 'px');
        $('.menu-panel').attr('style', 'width:' + wW + 'px');
    } else {
        $('.home-body  .menu-toggle').css('left', '17px');
        $('.menu-panel').attr('style', '');
    }
}

function sliderObjectHeight() {
    var wH = $(window).height(),
        wW = $(window).width(),
        hH = $('header').outerHeight(),
        sH = wH - hH;

    if (wW < 768 && wH < wW) {
        $('.object-slideshow').css('height', wH + 'px');
        $('.object-slideshow .item').css('height', wH + 'px');
    } else if (wW > 991) {
        $('.object-slideshow').css('height', sH + 'px');
        $('.object-slideshow .item').css('height', sH + 'px');
    } else {
        $('.object-slideshow').css('height', '');
        $('.object-slideshow .item').css('height', '');
    }
}

function scrollanimate() {
    $(window).scroll(function () {

        animateItems();

    });
}
function animateItems() {

    $ele = $('.show-effect');
    $.each($ele, function () {
        $thisele = $(this);

        if (verge.inY($thisele)) {

            $thisele.addClass('animated');

        }
    });


}

function linesInfo() {

    var wW = $(window).width();
    if (wW > 767) {
        $('.line-button-item').on('click', function () {
            var number = $(this).attr('data-line');
            $('.line-button-item').removeClass('active');
            $('.line-text-item').removeClass('active');
            $(this).addClass('active');
            $('.line-text-item[data-line="' + number + '"]').addClass('active');
        });
    }
}

function welcomeProgress() {
    $('.welcome-carousel .percent-block').each(function () {
        var widthLine = $(this).find('.num').text();
        $(this).find('.progress-line').css('width', widthLine + '%');
    });
}
function initSvg() {
    $('.clipping').attr('data-animate', 'animateIn');
    setTimeout(function () {
        $('.clipping').attr('data-animate', 'no');
    }, 1850);

}

$(document).ready(function () {

    if ($('.home-page').length) {
        $('body').addClass('home-body');
        $('.right-panel').addClass('dark-theme');
        var directionResult = "";
        var indicator = new WheelIndicator({
            elem: document.querySelector('.home-page'),
            callback: function (e) {
                directionResult = e.direction;
                SliderNavigate(directionResult);
            }
        });

        indicator.getOption('preventMouse');

        qtyScrollPage();
        Indicators();
        pageNavigate();
        optionsSvgSlider();
        sizeAnimateHome();
        moveActiveIndicator();
        SwipeNavigate();
    } else {
        $('body').addClass('sub-body');
        sliderObjectHeight();
        linesInfo();
        welcomeProgress();
    }


    navHeight();


    $(".logo-slideshow").flexslider({
        animation: "fade",
        slideshow: true,
        controlNav: true,
        directionNav: false,
        pauseOnAction: false,
        pauseOnHover: false,
        animationLoop: true,
        pausePlay: true,
        animationSpeed: 1000,
        slideshowSpeed: 6000,
        start: funcStop,
        before: callbackSvg

    });
    $(".object-slideshow").flexslider({
        animation: "fade",
        slideshow: true,
        controlNav: false,
        directionNav: true,
        pauseOnAction: true,
        pauseOnHover: true,
        animationLoop: true,
        pausePlay: false,
        touch: true,
        animationSpeed: 800,
        slideshowSpeed: 3600
    });
    function funcStop() {
        $('.logo-slideshow').find('.flex-pause').trigger('click');

    }


    function callbackSvg() {
        $('.clipping').attr('data-animate', 'animate');
        setTimeout(function () {
            $('.clipping').attr('data-animate', 'no');
        }, 1850);

    }

    function MenuShow() {

        $('.menu-toggle').on('click', function () {
            $('.right-panel').toggleClass('open-panel');
            $('.menu-overlay').toggleClass('open-overlay');
            $('header').toggleClass('open-panel-header');
            var wW = $(window).width();
            if (wW < 451) {
                if ($('.right-panel').hasClass('open-panel')) {
                    $('.right-panel').attr('style', 'left:' + (wW - 1) + 'px');
                } else {
                    $('.right-panel').attr('style', '');
                }

            } else {
                $('.right-panel').attr('style', '');
            }

        });
        $('.menu-overlay').on('click', function () {
            $('.right-panel').removeClass('open-panel');
            $('.menu-overlay').removeClass('open-overlay');
            $('header').removeClass('open-panel-header');
            $('.right-panel').attr('style', '');

        });
    }

    MenuShow();

    $(window).resize(function () {
        var wW = $(window).width();
        if ($('.home-page').length) {
            optionsSvgSlider();
            heightIndicators();
            sizeAnimateHome();
            moveActiveIndicator();
        } else {
            sliderObjectHeight();
            linesInfo();
        }
        navHeight();

        if (wW < 451) {
            if ($('.right-panel').hasClass('open-panel')) {
                $('.right-panel').attr('style', 'left:' + (wW - 1) + 'px');
            } else {
                $('.right-panel').attr('style', '');
            }

        } else {
            $('.right-panel').attr('style', '');
        }

    });


    /*******************Remove other images on preview objects***********************/

    if ($(window).width() < 1200 && $('html').hasClass('touchevents')) {
        $('.products-list .product-inner img:nth-child(2), .products-list .product-inner img:nth-child(3)').remove();
    }


    /****************Scroll page to Top***************/

    $().UItoTop({
        easingType: 'easeOutQuart',
        scrollSpeed: 800

    });
    $("body").on('click', '.anchor[href^=#]', function () {

        $('html, body').animate({
            scrollTop: $('div[id="' + this.hash.slice(1) + '"]').offset().top
        }, 800);

        return false;

    });


    /**************Mapping**********************/
    function initMap(target, ident) {
        target.mapster({
            stroke: false,
            mapKey: 'data-key',
            fadeDuration: 150,
            highlight: true,
            isDeselectable: false,
            render_highlight: {
                fillColor: '5eb8e8',
                fillOpacity: 0.5
            },
            render_select: {
                fillColor: '939393',
                fillOpacity: 0.2
            },

            areas: [
                {
                    key: 'sold',
                    highlight: true,
                    render_select: {
                        fillOpacity: 0.5,
                        fillColor: '000000',
                    },
                    render_highlight: {
                        fillColor: '5eb8e8',
                        fillOpacity: 0
                    },
                }]

        });
        $('map#' + ident + ' area').mapster('set', true);

    }

    function destroyMap(target) {
        target.mapster('snapshot');
    }

    function areasMap(flats) {
        $('map').empty();
        $.each(flats, function () {
            var coord = this.coords,
                num = this.number,
                sold = this.sold,
                key;
            if (sold) {
                key = 'sold,' + num;
                $('map').prepend('<area href="#" class="disabled" data-key="' + key + '"  data-flat="' + num + '" shape="poly" coords="' + coord + '">');
            } else {
                key = num;
                $('map').prepend('<area href="#" data-key="' + key + '"  data-flat="' + num + '" shape="poly" coords="' + coord + '">');
            }


        });

    }

    function resizeMapping() {
        $('.floor-fancy-block .floor-item').each(function () {
            var canvW = 815,
                maxW = $('.floor-fancy-block .tabs-content').width(),
                zoomH = 1274;
            $(this).find('.schema').css({
                '-webkit-transform': 'scale' + '(' + maxW / canvW + ',' + maxW / canvW + ')',
                '-moz-transform': 'scale' + '(' + maxW / canvW + ',' + maxW / canvW + ')',
                '-o-transform': 'scale' + '(' + maxW / canvW + ',' + maxW / canvW + ')',
                'transform': 'scale' + '(' + maxW / canvW + ',' + maxW / canvW + ')'
            });
            $(this).find('.schema').css('height', zoomH * (maxW / canvW) + 'px');

        });

    }

    /**************Fancy popups**********************/
    (function ($, F) {
        F.transitions.resizeIn = function () {
            var previous = F.previous,
                current = F.current,
                startPos = previous.wrap.stop(true).position(),
                endPos = $.extend({opacity: 1}, current.pos);

            startPos.width = previous.wrap.width();
            startPos.height = previous.wrap.height();

            previous.wrap.stop(true).trigger('onReset').remove();

            delete endPos.position;

            current.inner.hide();

            current.wrap.css(startPos).animate(endPos, {
                duration: current.nextSpeed,
                easing: current.nextEasing,
                step: F.transitions.step,
                complete: function () {
                    F._afterZoomIn();

                    current.inner.fadeIn(300);
                }
            });
        };

    }(jQuery, jQuery.fancybox));
    function fancyPops() {
        var windowW = $(window).width(),
            windowH = $(window).height();


        $(".fancy").fancybox({
            helpers: {
                overlay: {
                    locked: false
                },
                title: {type: 'inside'}
            },
            fitToView: false,
            nextEffect: 'none',
            prevEffect: 'none',
            nextMethod: 'resizeIn',
            nextEasing: "linear",
            nextSpeed: 250,
            prevMethod: false,
            beforeLoad: function () {
                if ($(this.element).attr('caption')) {
                    this.title = $(this.element).attr('caption');
                }


            },
            afterLoad: function () {
                if (windowW < 768) {
                    $.extend(this, {
                        autoCenter: 0
                    });
                }
                if ($(this.element).hasClass('flat-pop')) {
                    $.extend(this, {
                        autoCenter: 0
                    });
                    $('.fancybox-wrap').addClass('floor-fancy-block');
                    var house = $(this.element).attr('data-house'),
                        currentStage = $(this.element).attr('data-stage'),
                        ident = house + currentStage;

                    $('.floor_window .tabs-content').html('');
                    $('.floor_window .buttons-stage').html('');
                    $('.owl-item:not(.cloned) .flat-pop[data-house="' + house + '"]').each(function () {
                        var schema = $(this).attr('data-schema'),
                            img = $(this).attr('data-image'),
                            stage = $(this).attr('data-stage'),
                            floorObject = '<div class="floor-item" data-stage="' + stage + '">' +
                                '<div class="schema tab-img active"><img src="' + schema + '" alt=""></div>' +
                                '<div class="view tab-img"><img src="' + img + '" alt=""></div>' +
                                '</div>';
                        $('.floor_window .buttons-stage').append('<li><a data-house="' + house + '" data-stage="' + stage + '">' + stage + '</a></li>');
                        $('.floor_window .tabs-content').append(floorObject);
                    });
                    $('.floor_window .buttons-stage').find('a[data-stage="' + currentStage + '"]').addClass('active');
                    $('.floor_window .tabs-content').find('.floor-item[data-stage="' + currentStage + '"]').addClass('active-tab');
                    var mapImg = $('.floor_window .tabs-content').find('.floor-item[data-stage="' + currentStage + '"]').find('.schema img');

                    mapImg.attr('usemap', '#' + ident);
                    var arrFlats = objectData[house].stages[currentStage].flats;
                    areasMap(arrFlats);
                    $('map').attr('name', ident);
                    $('map').attr('id', ident);
                    $('map area').attr('data-house', house);
                    $('map area').attr('data-stage', currentStage);

                    initMap(mapImg, ident);


                }
                if ($(this.element).hasClass('single-flat')) {
                    $.extend(this, {
                        autoCenter: 0
                    });
                    $('.fancybox-wrap').addClass('flat-fancy-block');
                    var house = $(this.element).attr('data-house'),
                        stage = $(this.element).attr('data-stage'),
                        flatN = $(this.element).attr('data-flat'),
                        objFlat = objectData[house].stages[stage].flats.filter(function (obj) {
                            return obj.number == flatN;
                        })[0],
                        rooms = objFlat.rooms,
                        price = objFlat.price,
                        line = objFlat.line,
                        describe = objFlat.describe;
                    $('.flat_window h2 span, .flat_window .data-price, .flat_window .data-house, .flat_window .data-rooms, .flat_window .data-stage, .flat_window .data-line').text('');
                    $('.flat_window .text-inner,.flat_window .schema,.flat_window .view').html('');
                    $('.flat_window h2 span').text(flatN);
                    $('.flat_window .data-price').text(price);
                    $('.flat_window .data-house').text(house);
                    $('.flat_window .data-rooms').text(rooms);
                    $('.flat_window .data-stage').text(stage);
                    $('.flat_window .data-line').text(line);
                    $('.flat_window .text-inner').html(describe);
                    $.each(objFlat.schema, function () {
                        $('.flat_window .schema').prepend('<img src="' + this + '" alt="">').addClass('active');
                    });
                    $.each(objFlat.view, function () {
                        $('.flat_window .view').prepend('<img src="' + this + '" alt="">').removeClass('active');
                    });
                    $('.flat_window .back-to-stage').attr('data-house', house).attr('data-stage', stage);

                }


            },
            beforeShow: function () {
                if (this.type == "image") {
                    if ($(this.element).attr('caption')) {
                        $(".fancybox-outer").addClass('with-title');
                    } else {
                        $(".fancybox-outer").removeClass('with-title');
                    }
                    if (windowW > 1367) {
                        $(".fancybox-inner img").css({
                            'height': windowH - 120 + 'px'
                        });
                    } else {

                        if (windowW < 768) {
                            $(".fancybox-outer").css({
                                'height': windowH + 'px'
                            });
                            $(".fancybox-image").css({
                                'max-height': windowH - 60 + 'px',
                                'height': "auto",
                                'max-width': windowW + 'px'
                            });
                        } else {
                            $(".fancybox-outer").css({
                                'height': 'auto'
                            });
                            if (windowW > 1199) {
                                $(".fancybox-image").css({
                                    'height': windowH - 90 + 'px',
                                    'max-width': windowW - 60 + 'px',
                                    'max-height': 'auto'
                                });

                            } else {
                                $(".fancybox-image").css({
                                    'max-height': windowH - 90 + 'px',
                                    'max-width': windowW - 60 + 'px',
                                    'height': 'auto'
                                });
                            }
                        }
                    }
                    if (windowH < 661) {
                        $(".fancybox-inner img").css({
                            'max-height': windowH - 60 + 'px',
                            'max-width': windowW + 'px'
                        });
                    }


                }

            },
            afterShow: function () {
                var posPop = $('.fancybox-wrap').css('position');
                if (posPop == 'absolute') {

                    $.extend(this, {
                        autoCenter: 0
                    });
                }
                $(window).resize(function () {
                    windowW = $(window).width();
                    windowH = $(window).height();

                    var posPop = $('.fancybox-wrap').css('position');
                    if (posPop == 'absolute') {

                        $.extend(this, {
                            autoCenter: 0
                        });
                    }
                });
                if ($(this.element).hasClass('flat-pop')) {
                    resizeMapping();
                }


            },
            beforeClose: function () {
                if ($(this.element).hasClass('single-flat') || $(this.element).hasClass('flat-pop')) {
                    $('html, body').animate({
                        scrollTop: $('div[id="plans-anchor"]').offset().top
                    }, 0);
                }
            }
        });

    }

    fancyPops();
    $(window).resize(function () {
        fancyPops();
        var windowW = $(window).width();
        var windowH = $(window).height();
        if (windowW > 1367) {
            $(".fancybox-inner img").css({
                'height': windowH - 120 + 'px'
            });
        } else {

            if (windowW < 768) {
                $(".fancybox-outer").css({
                    'height': windowH + 'px'
                });
                $(".fancybox-image").css({
                    'max-height': windowH - 60 + 'px',
                    'height': "auto",
                    'max-width': windowW + 'px'
                });
            } else {
                $(".fancybox-outer").css({
                    'height': 'auto'
                });
                if (windowW > 1199) {
                    $(".fancybox-image").css({
                        'height': windowH - 90 + 'px',
                        'max-width': windowW - 60 + 'px',
                        'max-height': 'auto'
                    });

                } else {
                    $(".fancybox-image").css({
                        'max-height': windowH - 90 + 'px',
                        'max-width': windowW - 60 + 'px',
                        'height': 'auto'
                    });
                }
            }
        }
        if (windowH < 661) {
            $(".fancybox-inner img").css({
                'max-height': windowH - 60 + 'px',
                'max-width': windowW + 'px'
            });
        }


        resizeMapping();

    });


    function actionStageFlatWindow() {
        $('.floor_window .tab-pop-floor, .flat_window .tab-pop-flat').on('click', function () {
            var data = $(this).attr('data-tab');
            $('.tabs-content').find('.tab-img').removeClass('active');
            if (data == "1") {
                $('.tabs-content').find('.schema').addClass('active');
            } else {
                $('.tabs-content').find('.view').addClass('active');
            }
        });
        $('.floor_window .buttons-stage').on('click', 'a', function () {
            var stage = $(this).attr('data-stage'),
                house = $(this).attr('data-house'),
                ident = house + stage;
            $('.floor_window .buttons-stage').find('a').removeClass('active');
            $(this).addClass('active');
            $('.tabs-content').find('.floor-item').removeClass('active-tab');
            $('.tabs-content').find('.floor-item[data-stage="' + stage + '"]').addClass('active-tab');
            var mapImg = $('.tabs-content').find('.floor-item[data-stage="' + stage + '"]').find('.schema img');
            $('.tabs-content').find('.schema img').attr('usemap', '');
            destroyMap($('.tabs-content').find('.schema img'));
            var arrFlats = objectData[house].stages[stage].flats;
            areasMap(arrFlats);
            mapImg.attr('usemap', '#' + ident);
            $('map').attr('name', ident);
            $('map').attr('id', ident);
            $('map area').attr('data-house', house);
            $('map area').attr('data-stage', stage);
            initMap(mapImg, ident);

            resizeMapping();


        });
        $('.left-pagination .down').on('click', function () {
            var target = $('.floor_window .buttons-stage').find('a.active');
            if (target.parent('li').next('li').length) {
                target.parent('li').next('li').find('a').trigger('click');

            }
        });
        $('.left-pagination .up').on('click', function () {
            var target = $('.floor_window .buttons-stage').find('a.active');
            if (target.parent('li').prev('li').length) {
                target.parent('li').prev('li').find('a').trigger('click');

            }
        });
        $('.flat_window .back-to-stage').on('click', function () {
            var stage = $(this).attr('data-stage'),
                house = $(this).attr('data-house');

            $('.flat-fancy-block .fancybox-close').trigger('click');
            $('.owl-item:not(.cloned) .floors-list[data-house="' + house + '"] a.fancy[data-stage="' + stage + '"]').trigger('click');
        });

        $('map').on('click touchend', 'area', function () {
            var house = $(this).attr('data-house'),
                stage = $(this).attr('data-stage'),
                flat = $(this).attr('data-flat');
            $('.floor-fancy-block .fancybox-close').trigger('click');
            $('a.fancy.single-flat').attr('data-house', house).attr('data-stage', stage).attr('data-flat', flat);
            $('a.fancy.single-flat').trigger('click');
        });


    }


    actionStageFlatWindow();

    if (location.hash != '') {
        var url = location.hash;
        if (url.indexOf('apartment') >= 0) {

            var flat = url.split('&')[1],
                stage = url.split('&')[2],
                house = url.split('&')[3];
            $('a.fancy.single-flat').attr('data-house', house).attr('data-stage', stage).attr('data-flat', flat);
            $('a.fancy.single-flat').trigger('click');
        }

    }

    $('.trigger-gallery').on('click', function () {
        $('.genplan-banner.fancy').trigger('click');
    });

    /***************Carousels**************************/

    $(".welcome-carousel, .carousel-lines, .construction-progress-carousel").owlCarousel({

        autoplay: false,
        navSpeed: 700,
        dragEndSpeed: 700,
        loop: true,
        margin: 0,
        items: 1

    });


    var owlFlat = $(".flats-plans-carousel");
    owlFlat.owlCarousel({

        autoplay: false,
        navSpeed: 700,
        dragEndSpeed: 700,
        loop: true,
        margin: 0,
        items: 1,
        onInitialized: initBanner
    });
    function initBanner() {
        var hB = $('.flats-plans-carousel').height();
        $('.banners-wrap').css('height', hB + 'px');
    }

    owlFlat.on('changed.owl.carousel', function (property) {
        var current = property.item.index;
        var ind = $(property.target).find(".owl-item").eq(current).find(".item").attr('data-banner');
        $('.banners-wrap .banner-flat').removeClass('active');
        $('.banners-wrap .banner-flat[data-banner="' + ind + '"]').addClass('active');
    });


    /********************Full text***************/

    $(".seo-wrapper").on('click', '.show-full-text', function () {

        $(".seo-wrapper .show-full-text").text('Згорнути').removeClass('show-full-text').addClass('hide-full-text');

        $('.seo-wrapper .seo-text').animate({
            height: $('.seo-wrapper .seo-text')[0].scrollHeight
        }, 400);
    });
    $(".seo-wrapper").on('click', '.hide-full-text', function () {

        $(".seo-wrapper .hide-full-text").text('Додаткова інформація').removeClass('hide-full-text').addClass('show-full-text');

        $('.seo-wrapper .seo-text').animate({
            height: 0
        }, 400);
    });

    $('.team-item .show-more').on('click', function () {
        $(this).closest('.team-text').find('p').css({
            "height": "auto",
            "opacity": "1",
            "visibility": "visible",
            "margin-bottom": "24px"
        });
        $(this).fadeOut(0);
    });

    /*****************Styling selects**********/

    $('select').styler();


    /************Tabs Object page***************/

    $('.tabs-button-wrapper input').on('click', function () {
        var valInput = $(this).val();
        $('.tabs-content-wrapper .tab-content').removeClass('active');
        $('.tabs-content-wrapper .tab-content[data-tab="' + valInput + '"]').addClass('active');
    });


    /**************Tabs on Map Contacts****************/

    $('.map-wrapper .button-default').on('click', function () {
        var ident = $(this).attr('data-address');
        $('.map-wrapper iframe').removeClass('active-map');
        $('.map-wrapper iframe#' + ident).addClass('active-map');
    });


    /**************Attr accordions*********************/

    function Accordion() {

        $('.panel-group').each(function () {
            var indPanel = 1,
                ident = $(this).attr('id');
            $('.panel').each(function () {
                $(this).find('.panel-heading').attr('id', 'question' + ident + indPanel);
                $(this).find('.panel-button').attr('href', '#collapse' + ident + indPanel);
                $(this).find('.panel-button').attr('aria-controls', 'collapse' + ident + indPanel);
                $(this).find('.panel-collapse').attr('id', 'collapse' + ident + indPanel);
                $(this).find('.panel-collapse').attr('aria-labelledby', 'question' + ident + indPanel);
                indPanel += 1;
            });
        });

    }

    Accordion();

    $('.panel-group')
        .on('show.bs.collapse', function (e) {
            $(e.target).closest('.panel').addClass('open');
        })
        .on('hide.bs.collapse', function (e) {
            $(e.target).closest('.panel').removeClass('open');
        });

    /************Tabs Questions page***************/

    $('.questions-tab').on('click', function () {
        var ident = $(this).attr('data-id'),
            activePanel = $('.active-group').attr('id');
        if (ident != activePanel) {
            $('.panel-group').toggleClass('active-group');
            if (ident == 'finance') {
                $('#engineering').fadeOut(0);
                $('#finance').fadeIn(400);
            } else {
                $('#finance').fadeOut(0);
                $('#engineering').fadeIn(400);
            }
        }
    });

})
;