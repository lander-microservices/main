const initVolumScript = (url) => {
    (function (c, a, f, q, b, m, r, g, h, k, d, n, e, p) {
        p = "https:" === c.location.protocol ? "secure; " : "";
        c[b] ||
          ((c[b] = function (a) {
            c[b].state.callbackQueue.push(a);
          }),
          (c[b].state = { callbackQueue: [] }),
          (c[b].registerConversion = function (a) {
            c[b].state.callbackQueue.push(a);
          }),
          (function () {
            (k = /[?&]cpid(=([^&#]*)|&|#|$)/.exec(c.location.href)) &&
              k[2] &&
              ((d = k[2]),
              (n = a.cookie.match(new RegExp("(^| )vl-" + d + "=([^;]+)"))));
            var b = a.cookie.match(/(^| )vl-cid=([^;]+)/),
              l;
            "savedCid" !== r ||
              !b ||
              (d && "undefined" !== typeof d) ||
              (l = b.pop());
            g = a.createElement("script");
            h = a.scripts[0];
            g.src =
              m +
              (-1 === m.indexOf("?") ? "?" : "&") +
              "oref=" +
              f(a.referrer) +
              "&ourl=" +
              f(location[q]) +
              "&opt=" +
              f(a.title) +
              "&vtm=" +
              new Date().getTime() +
              (l ? "&cid=" + l : "") +
              (n ? "&uw=no" : "");
            h.parentNode.insertBefore(g, h);
            d &&
              ((e = new Date()),
              e.setTime(e.getTime() + 864e5),
              (a.cookie =
                "vl-" +
                d +
                "=1; " +
                p +
                "samesite=Strict; expires=" +
                e.toGMTString() +
                "; path=/"));
          })());
      })(
        window,
        document,
        encodeURIComponent,
        "href",
        "dtpCallback",
        url,
        "savedCid"
      );
      var clickId;
      window.dtpCallback(() => {
          clickId = window.dtpCallback.params.click_id;
          sessionStorage.setItem("clickId", clickId);
      });
}

initVolumScript( window.domain_settings.volum.url);