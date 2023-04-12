const initFacebookPixel = (id) => {
    !(function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
            n.callMethod
                ? n.callMethod.apply(n, arguments)
                : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
    })(
        window,
        document,
        "script",
        "https://connect.facebook.net/en_US/fbevents.js"
    );
    const fbPixelId = id;
    fbq("init", fbPixelId);
    window.fbPixelId = fbPixelId;
    window.fbcFunc = fbq;
};

const initGTM = (id) => {
    (function (w, d, s, l, i) {
        w[l] = w[l] || [];
        w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != "dataLayer" ? "&l=" + l : "";
        j.async = true;
        j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
        f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", id);
};

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

const initTikTok = (pixelId) => {
    var queryString = window.location.search;
    var params = new URLSearchParams(queryString);
    var utm_source = params.get("utm_source");
    if (utm_source === "tiktok") {
        !(function (w, d, t) {
            w.TiktokAnalyticsObject = t;
            var ttq = (w[t] = w[t] || []);
            (ttq.methods = [
                "page",
                "track",
                "identify",
                "instances",
                "debug",
                "on",
                "off",
                "once",
                "ready",
                "alias",
                "group",
                "enableCookie",
                "disableCookie",
            ]),
                (ttq.setAndDefer = function (t, e) {
                    t[e] = function () {
                        t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                    };
                });
            for (var i = 0; i < ttq.methods.length; i++)
                ttq.setAndDefer(ttq, ttq.methods[i]);
            (ttq.instance = function (t) {
                for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)
                    ttq.setAndDefer(e, ttq.methods[n]);
                return e;
            }),
                (ttq.load = function (e, n) {
                    var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
                    (ttq._i = ttq._i || {}),
                        (ttq._i[e] = []),
                        (ttq._i[e]._u = i),
                        (ttq._t = ttq._t || {}),
                        (ttq._t[e] = +new Date()),
                        (ttq._o = ttq._o || {}),
                        (ttq._o[e] = n || {});
                    var o = document.createElement("script");
                    (o.type = "text/javascript"),
                        (o.async = !0),
                        (o.src = i + "?sdkid=" + e + "&lib=" + t);
                    var a = document.getElementsByTagName("script")[0];
                    a.parentNode.insertBefore(o, a);
                });
            ttq.load(pixelId);
            ttq.page();
        })(window, document, "ttq");
        window.tikTokPixel = pixelId;
        window.tikTokEvent = ttq;
    }
};


const initMetaDetails = (obj) => {
    const { volumMeta } = obj;
    const headTag = document.getElementsByTagName("HEAD")[0];
    const volumMetaTag = document.createElement("META");
    volumMetaTag.setAttribute("http-equiv", "delegate-ch");
    volumMetaTag.setAttribute(
        "content",
        `sec-ch-ua ${volumMeta}; sec-ch-ua-mobile ${volumMeta}; sec-ch-ua-arch ${volumMeta}; sec-ch-ua-model ${volumMeta}; sec-ch-ua-platform ${volumMeta}; sec-ch-ua-platform-version ${volumMeta}; sec-ch-ua-bitness ${volumMeta}; sec-ch-ua-full-version-list ${volumMeta}; sec-ch-ua-full-version ${volumMeta}`
    );
    headTag.appendChild(volumMetaTag);

    // add meta description and meta title normally . for google

    const ogUrlTag = document.createElement("META");
    ogUrlTag.setAttribute("property", "og:url");
    ogUrlTag.setAttribute("content", window.location.href);
    headTag.appendChild(ogUrlTag);

    const ogTitleTag = document.createElement("META");
    ogTitleTag.setAttribute("property", "og:title");
    ogTitleTag.setAttribute("content", obj["og:title"]);
    headTag.appendChild(ogUrlTag);

    const ogDescriptionTag = document.createElement("META");
    ogDescriptionTag.setAttribute("property", "og:description");
    ogDescriptionTag.setAttribute("content", obj["og:description"]);
    headTag.appendChild(ogDescriptionTag);

    const ogSiteNameTag = document.createElement("META");
    ogSiteNameTag.setAttribute("property", "og:site_name");
    ogSiteNameTag.setAttribute("content", obj["og:site_name"]);
    headTag.appendChild(ogSiteNameTag);

    const titleTag = document.createElement("META");
    titleTag.setAttribute("name", "title");
    titleTag.setAttribute("content", obj["title"]);
    headTag.appendChild(titleTag);

    const descriptionTag = document.createElement("META");
    descriptionTag.setAttribute("name", "description");
    descriptionTag.setAttribute("content", obj["description"]);
    headTag.appendChild(descriptionTag);
};

const initScripts = (domain_settings) => {
    const domain = window.location.hostname;
    const currentDomainSettings = domain_settings.find((i) => {
        return i.name.includes(domain);
    });

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    window.domain_settings = currentDomainSettings;
    if (window.domain_settings) {
        initFacebookPixel(currentDomainSettings.facebookPixel);
        initGTM(currentDomainSettings.gtm);
        initVolumScript(currentDomainSettings.volum.url);
        if (params.get("utm_source") === "tiktok") {
            initTikTok(currentDomainSettings.tikTok);
        }
        // initNoScripts({ volum: currentDomainSettings.volum.noScript });
        initMetaDetails({
            volumMeta: currentDomainSettings.volum.meta,
            "og:title": currentDomainSettings.metaDetails["og:title"],
            "og:description":
                currentDomainSettings.metaDetails["og:description"],
            "og:site_name": currentDomainSettings.metaDetails["og:site_name"],
            title: currentDomainSettings.metaDetails["title"],
            description: currentDomainSettings.metaDetails["description"],
        });
    }

    window.document.title = currentDomainSettings.websiteTitle;
};

// fetch(
//   "https://raw.githubusercontent.com/nikhilwecall/wecallcms/main/json_data/domain_settings.json"
// )
//   .then((response) => response.json())
//   .then((data) => initScripts(data));

const domain_settings = [
    {
        name: "qualifybenefits.co",
        gtm: "GTM-TC59FRB",
        facebookPixel: "687474176447071",
        volumUrl: "https://track.qualifybenefits.co/d/.js",
        tikTok: "",
        industry: "",
        vertical: "medicareaca",
        websiteTitle: "",
        storyblockAccessToken: "gVJgZvajxLWDT0saMgTqswtt",
    },
    {
        name: "localhost",
        gtm: "GTM-THXW4VH",
        facebookPixel: "532418778266412",
        volum: {
            url: "https://track.improveourcredit.com/d/.js",
            noScript:
                "https://track.improveourcredit.com/d/.js?noscript=true&lpurl=",
            meta: "https://track.improveourcredit.com",
        },
        metaDetails: {
            "og:title": "og title",
            "og:description": "og description",
            "og:site_name": "og site_name",
            title: "Meta title",
            description: "Meta Description",
        },
        tikTok: "",
        industry: "",
        websiteTitle: "Localhost",
        vertical: "medicareaca",
        storyblockAccessToken: "gVJgZvajxLWDT0saMgTqswtt",
    },
    {
        name: "lander-main-microservice.netlify.app",
        gtm: "GTM-THXW4VH",
        facebookPixel: "532418778266412",
        volumUrl: "https://track.realseniorbenefits.com/d/.js",
        tikTok: "",
        industry: "",
        websiteTitle: "Localhost",
        vertical: "medicareaca",
        storyblockAccessToken: "gVJgZvajxLWDT0saMgTqswtt",
    },
    {
        name: "lander.improveourcredit.com",
        gtm: "GTM-THXW4VH",
        facebookPixel: "532418778266412",
        volum: {
            url: "https://track.improveourcredit.com/d/.js",
            noScript:
                "https://track.improveourcredit.com/d/.js?noscript=true&lpurl=",
            meta: "https://track.improveourcredit.com",
        },
        metaDetails: {
            "og:title": "og title",
            "og:description": "og description",
            "og:site_name": "og site_name",
            title: "Meta title",
            description: "Meta Description",
        },
        tikTok: "",
        industry: "",
        websiteTitle: "Localhost",
        vertical: "medicareaca",
        storyblockAccessToken: "gVJgZvajxLWDT0saMgTqswtt",
    },
    {
        name: "lander-main-microservice.netlify.app",
        gtm: "GTM-THXW4VH",
        facebookPixel: "532418778266412",
        volum: {
            url: "https://track.improveourcredit.com/d/.js",
            noScript:
                "https://track.improveourcredit.com/d/.js?noscript=true&lpurl=",
            meta: "https://track.improveourcredit.com",
        },
        metaDetails: {
            "og:title": "og title",
            "og:description": "og description",
            "og:site_name": "og site_name",
            title: "Meta title",
            description: "Meta Description",
        },
        tikTok: "",
        industry: "",
        websiteTitle: "Localhost",
        vertical: "medicareaca",
        storyblockAccessToken: "gVJgZvajxLWDT0saMgTqswtt",
    },

    
    {
        name: "prelander.qualifyaca.com",
        gtm: "GTM-M8F8CW4",
        facebookPixel: "3630004413952856",
        volum: {
            url: "https://track.qualifyaca.com/d/.js",
            noScript:
                "https://track.qualifyaca.com/d/.js?noscript=true&lpurl=",
            meta: "https://track.qualifyaca.com",
        },
        metaDetails: {
            "og:title": "og title",
            "og:description": "og description",
            "og:site_name": "og site_name",
            title: "Meta title",
            description: "Meta Description",
        },
        tikTok: "",
        industry: "",
        websiteTitle: "",
        vertical: "aca",
        storyblockAccessToken: "MYnrdyo1glpZZdZtPob0Xgtt",
    },
    {
        name: "prelander.qualifyacanow.com",
        gtm: "GTM-MPCJVTW",
        facebookPixel: "684500325922868",
        volum: {
            url: "https://track.qualifyacanow.com/d/.js",
            noScript:
                "https://track.qualifyacanow.com/d/.js?noscript=true&lpurl=",
            meta: "https://track.qualifyacanow.com",
        },
        metaDetails: {
            "og:title": "og title",
            "og:description": "og description",
            "og:site_name": "og site_name",
            title: "Meta title",
            description: "Meta Description",
        },
        tikTok: "",
        industry: "",
        websiteTitle: "",
        vertical: "aca",
        storyblockAccessToken: "8cbn2vaXyBH39cr807LcEgtt",
    },
    {
        name: "prelander.health-benefits.co",
        gtm: "GTM-NZ2PBFN",
        facebookPixel: "1291684211590181",
        volum: {
            url: "https://track.health-benefits.co/d/.js",
            noScript:
                "https://track.health-benefits.co/d/.js?noscript=true&lpurl=",
            meta: "https://track.health-benefits.co",
        },
        metaDetails: {
            "og:title": "og title",
            "og:description": "og description",
            "og:site_name": "og site_name",
            title: "Meta title",
            description: "Meta Description",
        },
        tikTok: "",
        industry: "",
        websiteTitle: "",
        vertical: "aca",
        storyblockAccessToken: "VcOpj5bMxfZmX8TjWOT4Wwtt",
    },
    {
        name: "prelander.justhealthbenefits.com",
        gtm: "GTM-TRRWZN2",
        facebookPixel: "1558807927960387",
        volum: {
            url: "https://track.justhealthbenefits.com/d/.js",
            noScript:
                "https://track.justhealthbenefits.com/d/.js?noscript=true&lpurl=",
            meta: "https://track.justhealthbenefits.com",
        },
        metaDetails: {
            "og:title": "og title",
            "og:description": "og description",
            "og:site_name": "og site_name",
            title: "Meta title",
            description: "Meta Description",
        },
        tikTok: "",
        industry: "",
        websiteTitle: "",
        vertical: "aca",
        storyblockAccessToken: "QA9CNHDprhz7MJKYzEuQLQtt",
    },
];

initScripts(domain_settings);