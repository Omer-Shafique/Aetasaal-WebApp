var App = function () {
    var uiInit = function () {
        $('.collapse').collapse();

        $('.popup-close').click(function () {
            $('.popup-window').fadeOut();

        });

        $('.popup-close1').click(function () {
            $('.popup-window1').fadeOut();

        });

        $('.popup-close2').click(function () {
            $('.popup-window2').fadeOut();

        });

        $('.popup-close3').click(function () {
            $('.popup-window3').fadeOut();

        });

        $('.popup-close4').click(function () {
            $('.popup-window4').fadeOut();

        });

        $('.popup-close5').click(function () {
            $('.popup-window5').fadeOut();

        });

        $('.dropdown-toggle').click(function () {
            $(this).next('.dropdown-menu').slideToggle(500);
        });

        //*****************************
        // Mobile Navigation
        //*****************************
        $('.mobile-nav-btn').click(function () {
            $('.mobile-nav-btn, .mobile-nav, .app-container').toggleClass('active');

            $(document).mouseup(function (e) {
                var container = $(".mobile-nav, .mobile-nav-btn");

                // if the target of the click isn't the container nor a descendant of the container
                if (!container.is(e.target) && container.has(e.target).length === 0) {
                    $('.mobile-nav-btn, .mobile-nav, .app-container').removeClass('active');
                }
            });
        });

        

        //*****************************
        // Match Height Functions
        //*****************************
        $('.matchheight').matchHeight();

        //*****************************
        // Default Function
        //*****************************
        $('[href="#"]').attr("href", "javascript:;");

        $('.mainnav > li > a').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).parents('li').children('.sub-menu').slideUp();
            } else {
                $(this).addClass('active');
                $(this).parents('li').children('.sub-menu').slideDown();
                $(this).parents('li').siblings('li').children('a').removeClass('active');
                $(this).parents('li').siblings('li').children('.sub-menu').slideUp();
            }
        });

        $('.mainnav > li > ul > li > a').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).siblings('.sub-menu').slideUp();
            } else {
                $(this).addClass('active');
                $(this).parents('li').children('.sub-menu').slideDown();
                $(this).parents('li').siblings('li').children('a').removeClass('active');
                $(this).parents('li').siblings('li').children('.sub-menu').slideUp();
            }
        });

        $('.mainnav > li > ul > li > ul > li > a').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).siblings('.sub-menu').slideUp();
            } else {
                $(this).addClass('active');
                $(this).parents('li').children('.sub-menu').slideDown();
                $(this).parents('li').siblings('li').children('a').removeClass('active');
                $(this).parents('li').siblings('li').children('.sub-menu').slideUp();
            }
        });
        $('.togglebtn').on('click', function (e) {
            $('.togglemain').toggleClass("toggle"); //you can list several class names 
            e.preventDefault("auto");
        });
    };

    //*****************************
    // ACCORDION
    //***************************** 

    var initAccordian = function () {
        (function ($) {
            if (typeof FLBuilderLayout != 'undefined') {
                return;
            }
            FLBuilderLayout = {
                init: function () {
                    FLBuilderLayout._destroy();
                    FLBuilderLayout._initClasses();
                    FLBuilderLayout._initBackgrounds();
                    if (0 === $('.fl-builder-edit').length) {
                        FLBuilderLayout._initAnchorLinks();
                        FLBuilderLayout._initHash();
                        FLBuilderLayout._initModuleAnimations();
                        FLBuilderLayout._initForms();
                    }
                },
                refreshGalleries: function (element) {
                    var $element = 'undefined' == typeof element ? $('body') : $(element),
                        mfContent = $element.find('.fl-mosaicflow-content'),
                        wmContent = $element.find('.fl-gallery'),
                        mfObject = null;
                    if (mfContent) {
                        mfObject = mfContent.data('mosaicflow');
                        if (mfObject) {
                            mfObject.columns = $([]);
                            mfObject.columnsHeights = [];
                            mfContent.data('mosaicflow', mfObject);
                            mfContent.mosaicflow('refill');
                        }
                    }
                    if (wmContent) {
                        wmContent.trigger('refreshWookmark');
                    }
                },
                _destroy: function () {
                    var win = $(window);
                    win.off('scroll.fl-bg-parallax');
                    win.off('resize.fl-bg-video');
                },
                _isTouch: function () {
                    if (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)) {
                        return true;
                    }
                    return false;
                },
                _isMobile: function () {
                    return /Mobile|Android|Silk\/|Kindle|BlackBerry|Opera Mini|Opera Mobi|webOS/i.test(navigator.userAgent);
                },
                _initClasses: function () {
                    var body = $('body');
                    if (body.hasClass('archive')) {
                        return;
                    }
                    body.addClass('fl-builder');
                    if (FLBuilderLayout._isTouch()) {
                        body.addClass('fl-builder-touch');
                    }
                    if (FLBuilderLayout._isMobile()) {
                        body.addClass('fl-builder-mobile');
                    }
                },
                _initBackgrounds: function () {
                    var win = $(window);
                    if ($('.fl-row-bg-parallax').length > 0 && !FLBuilderLayout._isMobile()) {
                        FLBuilderLayout._scrollParallaxBackgrounds();
                        FLBuilderLayout._initParallaxBackgrounds();
                        win.on('scroll.fl-bg-parallax', FLBuilderLayout._scrollParallaxBackgrounds);
                    }
                    if ($('.fl-bg-video').length > 0) {
                        FLBuilderLayout._initBgVideos();
                        FLBuilderLayout._resizeBgVideos();
                        win.on('resize.fl-bg-video', FLBuilderLayout._resizeBgVideos);
                    }
                },
                _initParallaxBackgrounds: function () {
                    $('.fl-row-bg-parallax').each(FLBuilderLayout._initParallaxBackground);
                },
                _initParallaxBackground: function () {
                    var row = $(this),
                        content = row.find('.fl-row-content-wrap'),
                        src = row.data('parallax-image'),
                        loaded = row.data('parallax-loaded'),
                        img = new Image();
                    if (loaded) {
                        return;
                    } else if (typeof src != 'undefined') {
                        $(img).on('load', function () {
                            content.css('background-image', 'url(' + src + ')');
                            row.data('parallax-loaded', true);
                        });
                        img.src = src;
                    }
                },
                _scrollParallaxBackgrounds: function () {
                    $('.fl-row-bg-parallax').each(FLBuilderLayout._scrollParallaxBackground);
                },
                _scrollParallaxBackground: function () {
                    var win = $(window),
                        row = $(this),
                        content = row.find('.fl-row-content-wrap'),
                        speed = row.data('parallax-speed'),
                        offset = content.offset(),
                        yPos = -((win.scrollTop() - offset.top) / speed);
                    content.css('background-position', 'center ' + yPos + 'px');
                },
                _initBgVideos: function () {
                    $('.fl-bg-video').each(FLBuilderLayout._initBgVideo);
                },
                _initBgVideo: function () {
                    var wrap = $(this),
                        width = wrap.data('width'),
                        height = wrap.data('height'),
                        mp4 = wrap.data('mp4'),
                        mp4Type = wrap.data('mp4-type'),
                        webm = wrap.data('webm'),
                        webmType = wrap.data('webm-type'),
                        fallback = wrap.data('fallback'),
                        loaded = wrap.data('loaded'),
                        fallbackTag = '',
                        videoTag = null,
                        mp4Tag = null,
                        webmTag = null;
                    if (loaded) {
                        return;
                    } else if (!FLBuilderLayout._isMobile()) {
                        videoTag = $('<video autoplay loop muted preload></video>');
                        if ('undefined' != typeof mp4) {
                            mp4Tag = $('<source />');
                            mp4Tag.attr('src', mp4);
                            mp4Tag.attr('type', mp4Type);
                            if ('undefined' == typeof webm) {
                                mp4Tag.on('error', FLBuilderLayout._videoBgSourceError);
                            }
                            videoTag.append(mp4Tag);
                        }
                        if ('undefined' != typeof webm) {
                            webmTag = $('<source />');
                            webmTag.attr('src', webm);
                            webmTag.attr('type', webmType);
                            if ('undefined' != typeof mp4) {
                                webmTag.on('error', FLBuilderLayout._videoBgSourceError);
                            }
                            videoTag.append(webmTag);
                        }
                        wrap.append(videoTag);
                    } else if ('' !== fallback) {
                        fallbackTag = $('<div></div>');
                        fallbackTag.addClass('fl-bg-video-fallback');
                        fallbackTag.css('background-image', 'url(' + fallback + ')');
                        wrap.append(fallbackTag);
                    }
                    wrap.data('loaded', true);
                },
                _videoBgSourceError: function (e) {
                    var source = $(e.target),
                        wrap = source.closest('.fl-bg-video'),
                        vid = wrap.find('video'),
                        fallback = wrap.data('fallback'),
                        fallbackTag = '';
                    if ('' !== fallback) {
                        fallbackTag = $('<div></div>');
                        fallbackTag.addClass('fl-bg-video-fallback');
                        fallbackTag.css('background-image', 'url(' + fallback + ')');
                        wrap.append(fallbackTag);
                        vid.remove();
                    }
                },
                _resizeBgVideos: function () {
                    $('.fl-bg-video').each(function () {
                        FLBuilderLayout._resizeBgVideo.apply(this);
                        if ($(this).parent().find('img').length > 0) {
                            $(this).parent().imagesLoaded($.proxy(FLBuilderLayout._resizeBgVideo, this));
                        }
                    });
                },
                _resizeBgVideo: function () {
                    if (0 === $(this).find('video').length) {
                        return;
                    }
                    var wrap = $(this),
                        wrapHeight = wrap.outerHeight(),
                        wrapWidth = wrap.outerWidth(),
                        vid = wrap.find('video'),
                        vidHeight = wrap.data('height'),
                        vidWidth = wrap.data('width'),
                        newWidth = wrapWidth,
                        newHeight = Math.round(vidHeight * wrapWidth / vidWidth),
                        newLeft = 0,
                        newTop = 0;
                    if (vidHeight === '' || vidWidth === '') {
                        vid.css({
                            'left': '0px',
                            'top': '0px',
                            'width': newWidth + 'px'
                        });
                    } else {
                        if (newHeight < wrapHeight) {
                            newHeight = wrapHeight;
                            newWidth = Math.round(vidWidth * wrapHeight / vidHeight);
                            newLeft = -((newWidth - wrapWidth) / 2);
                        } else {
                            newTop = -((newHeight - wrapHeight) / 2);
                        }
                        vid.css({
                            'left': newLeft + 'px',
                            'top': newTop + 'px',
                            'height': newHeight + 'px',
                            'width': newWidth + 'px'
                        });
                    }
                },
                _initModuleAnimations: function () {
                    if (typeof jQuery.fn.waypoint !== 'undefined' && !FLBuilderLayout._isMobile()) {
                        $('.fl-animation').waypoint({
                            offset: '80%',
                            handler: FLBuilderLayout._doModuleAnimation
                        });
                    }
                },
                _doModuleAnimation: function () {
                    var module = $(this),
                        delay = parseFloat(module.data('animation-delay'));
                    if (!isNaN(delay) && delay > 0) {
                        setTimeout(function () {
                            module.addClass('fl-animated');
                        }, delay * 1000);
                    } else {
                        module.addClass('fl-animated');
                    }
                },
                _initHash: function () {
                    var hash = window.location.hash.replace('#', '').split('/').shift(),
                        element = null,
                        tabs = null,
                        responsiveLabel = null,
                        tabIndex = null,
                        label = null;
                    if ('' !== hash) {
                        element = $('#' + hash);
                        if (element.length > 0) {
                            if (element.hasClass('fl-accordion-item')) {
                                setTimeout(function () {
                                    element.find('.fl-accordion-button').trigger('click');
                                }, 100);
                            }
                            if (element.hasClass('fl-tabs-panel')) {
                                setTimeout(function () {
                                    tabs = element.closest('.fl-tabs');
                                    responsiveLabel = element.find('.fl-tabs-panel-label');
                                    tabIndex = responsiveLabel.data('index');
                                    label = tabs.find('.fl-tabs-labels .fl-tabs-label[data-index=' + tabIndex + ']');
                                    if (responsiveLabel.is(':visible')) {
                                        responsiveLabel.trigger('click');
                                    } else {
                                        FLBuilderLayout._scrollToElement(label);
                                        label.trigger('click');
                                    }
                                }, 100);
                            }
                        }
                    }
                },
                _initAnchorLinks: function () {
                    $('a').each(FLBuilderLayout._initAnchorLink);
                },
                _initAnchorLink: function () {
                    var link = $(this),
                        href = link.attr('href'),
                        loc = window.location,
                        id = null,
                        element = null;
                    if ('undefined' != typeof href && href.indexOf('#') > -1) {
                        if (loc.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && loc.hostname == this.hostname) {
                            try {
                                id = href.split('#').pop();
                                element = $('#' + id);
                                if (element.length > 0) {
                                    if (link.hasClass('fl-scroll-link') || element.hasClass('fl-row') || element.hasClass('fl-col') || element.hasClass('fl-module')) {
                                        $(link).on('click', FLBuilderLayout._scrollToElementOnLinkClick);
                                    }
                                    if (element.hasClass('fl-accordion-item')) {
                                        $(link).on('click', FLBuilderLayout._scrollToAccordionOnLinkClick);
                                    }
                                    if (element.hasClass('fl-tabs-panel')) {
                                        $(link).on('click', FLBuilderLayout._scrollToTabOnLinkClick);
                                    }
                                }
                            } catch (e) { }
                        }
                    }
                },
                _scrollToElementOnLinkClick: function (e, callback) {
                    var element = $('#' + $(this).attr('href').split('#').pop());
                    FLBuilderLayout._scrollToElement(element, callback);
                    e.preventDefault();
                },
                _scrollToElement: function (element, callback) {
                    var config = FLBuilderLayoutConfig.anchorLinkAnimations,
                        dest = 0,
                        win = $(window),
                        doc = $(document);
                    if (element.length > 0) {
                        if (element.offset().top > doc.height() - win.height()) {
                            dest = doc.height() - win.height();
                        } else {
                            dest = element.offset().top - config.offset;
                        }
                        $('html, body').animate({
                            scrollTop: dest
                        }, config.duration, config.easing, function () {
                            if ('undefined' != typeof callback) {
                                callback();
                            }
                            if (history.pushState) {
                                history.pushState(null, null, '#' + element.attr('id'));
                            } else {
                                window.location.hash = element.attr('id');
                            }
                        });
                    }
                },
                _scrollToAccordionOnLinkClick: function (e) {
                    var element = $('#' + $(this).attr('href').split('#').pop());
                    if (element.length > 0) {
                        var callback = function () {
                            if (element) {
                                element.find('.fl-accordion-button').trigger('click');
                                element = false;
                            }
                        };
                        FLBuilderLayout._scrollToElementOnLinkClick.call(this, e, callback);
                    }
                },
                _scrollToTabOnLinkClick: function (e) {
                    var element = $('#' + $(this).attr('href').split('#').pop()),
                        tabs = null,
                        label = null,
                        responsiveLabel = null;
                    if (element.length > 0) {
                        tabs = element.closest('.fl-tabs');
                        responsiveLabel = element.find('.fl-tabs-panel-label');
                        tabIndex = responsiveLabel.data('index');
                        label = tabs.find('.fl-tabs-labels .fl-tabs-label[data-index=' + tabIndex + ']');
                        if (responsiveLabel.is(':visible')) {
                            var callback = function () {
                                if (element) {
                                    responsiveLabel.trigger('click');
                                    element = false;
                                }
                            };
                            FLBuilderLayout._scrollToElementOnLinkClick.call(this, e, callback);
                        } else {
                            FLBuilderLayout._scrollToElement(label);
                            label.trigger('click');
                        }
                        e.preventDefault();
                    }
                },
                _initForms: function () {
                    if (!FLBuilderLayout._hasPlaceholderSupport) {
                        $('.fl-form-field input').each(FLBuilderLayout._initFormFieldPlaceholderFallback);
                    }
                    $('.fl-form-field input').on('focus', FLBuilderLayout._clearFormFieldError);
                },
                _hasPlaceholderSupport: function () {
                    var input = document.createElement('input');
                    return 'undefined' != input.placeholder;
                },
                _initFormFieldPlaceholderFallback: function () {
                    var field = $(this),
                        val = field.val(),
                        placeholder = field.attr('placeholder');
                    if ('undefined' != placeholder && '' === val) {
                        field.val(placeholder);
                        field.on('focus', FLBuilderLayout._hideFormFieldPlaceholderFallback);
                        field.on('blur', FLBuilderLayout._showFormFieldPlaceholderFallback);
                    }
                },
                _hideFormFieldPlaceholderFallback: function () {
                    var field = $(this),
                        val = field.val(),
                        placeholder = field.attr('placeholder');
                    if (val == placeholder) {
                        field.val('');
                    }
                },
                _showFormFieldPlaceholderFallback: function () {
                    var field = $(this),
                        val = field.val(),
                        placeholder = field.attr('placeholder');
                    if ('' === val) {
                        field.val(placeholder);
                    }
                },
                _clearFormFieldError: function () {
                    var field = $(this);
                    field.removeClass('fl-form-error');
                    field.siblings('.fl-form-error-message').hide();
                }
            };
            $(function () {
                FLBuilderLayout.init();
            });
        })(jQuery);
        (function ($) {
            FLBuilderAccordion = function (settings) {
                this.settings = settings;
                this.nodeClass = '.fl-node-' + settings.id;
                this._init();
            };
            FLBuilderAccordion.prototype = {
                settings: {},
                nodeClass: '',
                _init: function () {
                    $(this.nodeClass + ' .fl-accordion-button').click($.proxy(this._buttonClick, this));
                },
                _buttonClick: function (e) {
                    var button = $(e.target).closest('.fl-accordion-button'),
                        accordion = button.closest('.fl-accordion'),
                        item = button.closest('.fl-accordion-item'),
                        allContent = accordion.find('.fl-accordion-content'),
                        allIcons = accordion.find('.fl-accordion-button i.fl-accordion-button-icon'),
                        content = button.siblings('.fl-accordion-content'),
                        icon = button.find('i.fl-accordion-button-icon');
                    if (accordion.hasClass('fl-accordion-collapse')) {
                        accordion.find('.fl-accordion-item-active').removeClass('fl-accordion-item-active');
                        allContent.slideUp('normal');
                        allIcons.removeClass('fa-minus');
                        allIcons.addClass('fa-plus');
                    }
                    if (content.is(':hidden')) {
                        item.addClass('fl-accordion-item-active');
                        content.slideDown('normal', this._slideDownComplete);
                        icon.addClass('fa-minus');
                        icon.removeClass('fa-plus');
                    } else {
                        item.removeClass('fl-accordion-item-active');
                        content.slideUp('normal', this._slideUpComplete);
                        icon.addClass('fa-plus');
                        icon.removeClass('fa-minus');
                    }
                },
                _slideUpComplete: function () {
                    var content = $(this),
                        accordion = content.closest('.fl-accordion');
                    accordion.trigger('fl-builder.fl-accordion-toggle-complete');
                },
                _slideDownComplete: function () {
                    var content = $(this),
                        accordion = content.closest('.fl-accordion'),
                        item = content.parent(),
                        win = $(window);
                    FLBuilderLayout.refreshGalleries(content);
                    if (item.offset().top < win.scrollTop() + 100) {
                        $('html, body').animate({
                            scrollTop: item.offset().top - 100
                        }, 500, 'swing');
                    }
                    accordion.trigger('fl-builder.fl-accordion-toggle-complete');
                }
            };
        })(jQuery);
        (function ($) {
            $(function () {
                new FLBuilderAccordion({
                    id: '5764257758f2d'
                });
            });
        })(jQuery);
    }

    var initMatchHeight = function () {
        $('.matchheight').matchHeight();
    }

    return {
        init: function () {
            uiInit();
        },
        initAccordian: function () {
            initAccordian();
        },
        initMatchHeight: function () {
            initMatchHeight();
        }
    };

}();

module.exports = App;
