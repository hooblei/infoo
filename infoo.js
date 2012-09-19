
window.infoo = (function ($) {

    var self = {},
        id = 'infoo-' + String(Math.random()).substr(2),
        defaults = {
            title: null,
            message: null,
            icon: null,
            clss: null,
            timeout: 4000,
            pos: 'top-right',
            width: 300
        };

    var container = function () {
        var $elem = $('#' + id),
            width;

        if (!$elem.length) {
            width = (defaults.width > 0) ? defaults.width + 'px' : 'auto';
            $elem = $('<div/>', {
                id: id,
                'class': 'infoo ' + defaults.pos,
                style: 'width: ' + width
            }).appendTo($('body'));
        }

        return $elem;
    };

    var handler = self.handler = function (options) {

        options = $.extend({}, defaults, options);

        return function (msg, title, opts) {
            var nargs = arguments.length,
                tid = null,
                $elem;

            if (nargs === 1) {
                title = null;
                opts = {};
            } else if (nargs === 2) {
                if (typeof title === 'string') {
                    opts = {};
                } else {
                    opts = title;
                    title = null;
                }
            }

            if ($.isNumeric(opts)) {
                opts = { timeout: +opts };
            }

            opts = $.extend({}, options, opts, {
                title: title,
                message: msg
            });
            $elem = $('<div/>', {
                'class': 'alert fade in ' + opts.clss
            });

            if (opts.icon) {
                $elem.addClass('icon');
                $('<span/>', { 'class': 'icon' })
                    .append($('<i/>', { 'class': opts.icon }))
                    .appendTo($elem);
            }

            if (opts.title) {
                $elem.append($('<h4/>', { text: title }));
            }

            if (opts.message) {
                $elem.append(opts.message);
            }

            var dismiss = function (timeout) {
                if (tid) {
                    clearTimeout(tid);
                }
                tid = setTimeout(function () {
                    $elem.alert('close');
                    tid = null;
                }, timeout);
            };

            $elem.hover(
                function (ev) {
                    clearTimeout(tid);
                    tid = null;
                },
                function (ev) {
                    dismiss(1000);
                }
            );

            $elem.on('click', function (ev) {
                $elem.off('mouseenter mouseleave click');
                dismiss(0);
            });

            $elem.on('closed', function () { // bs alert event
                setTimeout(function () {
                    $elem.remove();
                    $elem = null;
                });
            });

            if (opts.timeout > 0) {
                dismiss(opts.timeout);
            }

            return $elem.prependTo(container());
        };
    };

    self.info = handler({
        clss: 'alert-info',
        icon: 'icon-info-sign'
    });

    self.success = handler({
        clss: 'alert-success',
        icon: 'icon-ok'
    });

    self.error = handler({
        clss: 'alert-error',
        icon: 'icon-fire',
        timeout: 0
    });

    return self;

}(jQuery));

