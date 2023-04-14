
const initVolumScript = (url) => {
    (function (b, c, l, q, r, e, t, y, d, m, u, z, a, n, g, f, p, v, h, w) {
        function x() {
            for (
                var a = c.querySelectorAll(".dtpcnt"), b = 0, d = a.length;
                b < d;
                b++
            )
                a[b][t] = a[b][t].replace(/(^|\s+)dtpcnt($|\s+)/g, "");
        }
        w = "https:" === b.location.protocol ? "secure; " : "";
        b[d] ||
            ((b[d] = function () {
                (b[d].q = b[d].q || []).push(arguments);
            }),
                (g = c[q]),
                (c[q] = function () {
                    g && g.apply(this, arguments);
                    if (
                        b[d] &&
                        !b[d].hasOwnProperty("params") &&
                        /loaded|interactive|complete/.test(c.readyState)
                    )
                        for (; (a = c[r][m++]);)
                            /\/?click\/?($|(\/[0-9]+)?$)/.test(a.pathname) &&
                                (a[e] =
                                    "javascrip" +
                                    b.postMessage.toString().slice(4, 5) +
                                    ":" +
                                    d +
                                    '.l="' +
                                    a[e] +
                                    '",void 0');
                }),
                setTimeout(function () {
                    (p = /[?&]cpid(=([^&#]*)|&|#|$)/.exec(b.location.href)) &&
                        p[2] &&
                        ((f = p[2]),
                            (v = c.cookie.match(new RegExp("(^| )vl-" + f + "=([^;]+)"))));
                    var d = c.cookie.match(/(^| )vl-cep=([^;]+)/),
                        k = location[e];
                    if (
                        "savedCep" === z &&
                        d &&
                        (!f || "undefined" === typeof f) &&
                        0 > k.indexOf("cep=")
                    ) {
                        var g = -1 < k.indexOf("?") ? "&" : "?";
                        k += g + d.pop();
                    }
                    a = c.createElement("script");
                    n = c.scripts[0];
                    a.defer = 1;
                    a.src =
                        u +
                        (-1 === u.indexOf("?") ? "?" : "&") +
                        "lpref=" +
                        l(c.referrer) +
                        "&lpurl=" +
                        l(k) +
                        "&lpt=" +
                        l(c.title) +
                        "&vtm=" +
                        new Date().getTime() +
                        (v ? "&uw=no" : "");
                    a[y] = function () {
                        for (m = 0; (a = c[r][m++]);)
                            /dtpCallback\.l/.test(a[e]) &&
                                (a[e] = decodeURIComponent(a[e]).match(
                                    /dtpCallback\.l="([^"]+)/
                                )[1]);
                        x();
                    };
                    n.parentNode.insertBefore(a, n);
                    f &&
                        ((h = new Date()),
                            h.setTime(h.getTime() + 864e5),
                            (c.cookie =
                                "vl-" +
                                f +
                                "=1; " +
                                w +
                                "samesite=Strict; expires=" +
                                h.toGMTString() +
                                "; path=/"));
                }, 0),
                setTimeout(x, 7e3));
    })(
        window,
        document,
        encodeURIComponent,
        "onreadystatechange",
        "links",
        "href",
        "className",
        "onerror",
        "dtpCallback",
        0,
        url,
        "savedCep"
    );
    var clickId;
    window.dtpCallback(() => {
        clickId = window.dtpCallback.params.click_id;
        sessionStorage.setItem("clickId", clickId);
    });
};

initVolumScript( window.domain_settings.volum.url);