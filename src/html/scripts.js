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
    window.facebookPixelLoaded = true
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
    ogUrlTag.setAttribute("content", window.location.host + window.location.pathname);
    headTag.appendChild(ogUrlTag);

    const ogTitleTag = document.createElement("META");
    ogTitleTag.setAttribute("property", "og:title");
    ogTitleTag.setAttribute("content", obj["og:title"] ? obj["og:title"] + window.location.host : "" );
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
    titleTag.setAttribute("content", obj["title"] ? obj["title"] + window.location.host  : "");
    headTag.appendChild(titleTag);

    const descriptionTag = document.createElement("META");
    descriptionTag.setAttribute("name", "description");
    descriptionTag.setAttribute("content", obj["description"]);
    headTag.appendChild(descriptionTag);
};

const initScripts = (domain_settings) => {
    const domain = window.location.hostname;
    console.log("DOmain", domain);
    const currentDomainSettings = domain_settings.find((i) => {
        return i.name.includes(domain);
    });

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    window.domain_settings = currentDomainSettings;
    if (window.domain_settings) {
        initFacebookPixel(currentDomainSettings.facebookPixel);
        initGTM(currentDomainSettings.gtm);
      
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
        gtm: "GTM-MVRS5TM",
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
        tikTok: "CH4QHMRC77UBPA5M9M80",
        industry: "",
        websiteTitle: "Localhost",
        vertical: "medicareaca",
        storyblockAccessToken: "gVJgZvajxLWDT0saMgTqswtt",
    },
    {
        name: "prelandertest.storyblock.improveourcredit.com",
        gtm: "GTM-MVRS5TM",
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
        tikTok: "CH4QHMRC77UBPA5M9M80",
        industry: "",
        websiteTitle: "Localhost",
        vertical: "medicareaca",
        storyblockAccessToken: "gVJgZvajxLWDT0saMgTqswtt",
    },
    {
        name: "prelandertest.improveourcredit.com",
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
        name: "precious-shortbread-c64405.netlify.app",
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
        name: "prelandertest.qualifyaca.com",
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
        name: "prelandertest.qualifyacanow.com",
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
        tikTok: "CG9JBDRC77UFMURDUO70",
        industry: "",
        websiteTitle: "",
        vertical: "aca",
        storyblockAccessToken: "8cbn2vaXyBH39cr807LcEgtt",
    },
    {
        name: "prelandertest.health-benefits.co",
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
        name: "prelandertest.justhealthbenefits.com",
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
    {
        name: "prelandertest.myacaquote.com",
        gtm: "GTM-KT8XQWB",
        facebookPixel: "487439593578874",
        volum: {
            url: "https://track.myacaquote.com/d/.js",
            noScript:
                "https://track.myacaquote.com/d/.js?noscript=true&lpurl=",
            meta: "https://track.myacaquote.com",
        },
        metaDetails: {
            "og:title": "og title",
            "og:description": "og description",
            "og:site_name": "og site_name",
            title: "Meta title",
            description: "Meta Description",
        },
        tikTok: "CHP3RNRC77U441D0E2LG",
        industry: "",
        websiteTitle: "",
        vertical: "aca",
        storyblockAccessToken: "rTose7Mor5RO346LgEd4Cgtt",
    },
    {
        name: "prelandertest.futurehealthcenter.com",
        gtm: "GTM-P4BNZBZ",
        facebookPixel: "1279112236350881",
        volum: {
            url: "https://track.futurehealthcenter.com/d/.js",
            noScript:
                "https://track.futurehealthcenter.com/d/.js?noscript=true&lpurl=",
            meta: "https://track.futurehealthcenter.com",
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
        storyblockAccessToken: "oSLK045XXm1zdlM42pt98gtt",
    },
    {
        name: "prelandertest.quickbenefits.co",
        gtm: "GTM-MVRS5TM",
        facebookPixel: "273512268451425",
        volum: {
            url: "https://track.quickbenefits.co/d/.js",
            noScript:
                "https://track.quickbenefits.co/d/.js?noscript=true&lpurl=",
            meta: "https://track.quickbenefits.co",
        },
        metaDetails: {
            "og:title": "og title",
            "og:description": "og description",
            "og:site_name": "og site_name",
            title: "Meta title",
            description: "Meta Description",
        },
        tikTok: "CH4QHMRC77UBPA5M9M80",
        industry: "",
        websiteTitle: "",
        vertical: "aca",
        storyblockAccessToken: "vv04FKcPsQh1k5joAkJXQgtt",
    },
    {
        name: "prelandertest.qualifybenefits.co",
        gtm: "GTM-TC59FRB",
        facebookPixel: "687474176447071",
        volum: {
            url: "https://track.qualifybenefits.co/d/.js",
            noScript:
                "https://track.qualifybenefits.co/d/.js?noscript=true&lpurl=",
            meta: "https://track.qualifybenefits.co",
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
        storyblockAccessToken: "ZiAQEdps3wsq2TGbciwSYwtt",
    },
    {
        name: "prelandertest.additionalbenefits.org",
        gtm: "GTM-W86TBLG",
        facebookPixel: "1025625051349500",
        volum: {
            url: "https://track.additionalbenefits.org/d/.js",
            noScript:
                "https://track.additionalbenefits.org/d/.js?noscript=true&lpurl=",
            meta: "https://track.additionalbenefits.org",
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
        storyblockAccessToken: "hvQmVeF6CUeAK38sBdj5PAtt",
    },
    {
        name: "prelandertest.qualifyobamacare.com",
        gtm: "GTM-NZ2PBFN",
        facebookPixel: "",
        volum: {
            url: "https://track.qualifyobamacare.com/d/.js",
            noScript:
                "https://track.qualifyobamacare.com/d/.js?noscript=true&lpurl=",
            meta: "https://track.qualifyobamacare.com",
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
        storyblockAccessToken: "DCs5glmk44S4h38Ur1Q2igtt",
    },
    {
        name: "prelandertest.healthytippro.com",
        gtm: "GTM-T5FQD7T",
        facebookPixel: "165447432880733",
        volum: {
            url: "https://track.healthytippro.com/d/.js",
            noScript:
                "https://track.healthytippro.com/d/.js?noscript=true&lpurl=",
            meta: "https://track.healthytippro.com",
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
        storyblockAccessToken: "U0BO3twsfZr5bFjZrvcvdQtt",
    },
    {
        name: "prelandertest.americansubsidy.com",
        gtm: "GTM-PHW6TMX",
        facebookPixel: "1602445023585487",
        volum: {
            url: "https://track.americansubsidy.com/d/.js",
            noScript:
                "https://track.americansubsidy.com/d/.js?noscript=true&lpurl=",
            meta: "https://track.americansubsidy.com",
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
        storyblockAccessToken: "7au4z06U9St7Dd7wQsL5mwtt",
    },
    {
        name: "prelandertest.advantagesenior.org",
        gtm: "GTM-N4LMH4V",
        facebookPixel: "1602445023585487",
        volum: {
            url: "https://track.advantagesenior.org/d/.js",
            noScript:
                "https://track.advantagesenior.org/d/.js?noscript=true&lpurl=",
            meta: "https://track.advantagesenior.org",
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
        storyblockAccessToken: "q6qcySlHvoLuVulG6fHM3gtt",
    },
    {
        name: "prelandertest.advantageamerican.org",
        gtm: "GTM-TJ9MVL9",
        facebookPixel: "1602445023585487",
        volum: {
            url: "https://track.advantageamerican.org/d/.js",
            noScript:
                "https://track.advantageamerican.org/d/.js?noscript=true&lpurl=",
            meta: "https://track.advantageamerican.org",
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
        storyblockAccessToken: "DM8G1kfPVsK9hhl6Fi0sQAtt",
    },
    {
        name: "prelandertest.prohealthypoint.com",
        gtm: "GTM-TJ9MVL9",
        facebookPixel: "632024732266157",
        volum: {
            url: "https://track.prohealthypoint.com/d/.js",
            noScript:
                "https://track.prohealthypoint.com/d/.js?noscript=true&lpurl=",
            meta: "https://track.prohealthypoint.com",
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
        storyblockAccessToken: "CQkbthd8Prfr2bOjPc885Att",
    },
        {
        name: "prelandertest.americanassurance.org",
        gtm: "GTM-TJ9MVL9",
        facebookPixel: "632024732266157",
        volum: {
            url: "https://track.americanassurance.org/d/.js",
            noScript:
                "https://track.americanassurance.org/d/.js?noscript=true&lpurl=",
            meta: "https://track.americanassurance.org",
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
        storyblockAccessToken: "tWQ76Q1L6VnCWJbGxPr4Jwtt",
    },
        {
        name: "prelandertest.timeforacahelp.com",
        gtm: "GTM-5NCTSKB7",
        facebookPixel: "585900857078512",
        volum: {
            url: "https://track.americanassurance.org/d/.js",
            noScript:
                "https://track.americanassurance.org/d/.js?noscript=true&lpurl=",
            meta: "https://track.americanassurance.org",
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
        storyblockAccessToken: "jPS1PqaLIXgBQnzqtjQRAAtt",
    },
        {
        name: "prelandertest.youracahelper.com",
        gtm: "GTM-5NCTSKB7",
        facebookPixel: "1232977270696782",
        volum: {
            url: "https://track.youracahelper.com/d/.js",
            noScript:
                "https://track.youracahelper.com/d/.js?noscript=true&lpurl=",
            meta: "https://track.youracahelper.com",
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
        storyblockAccessToken: "RX8OdQ6aSiMAWhEAjO64xgtt",
    },
        {
        name: "prelandertest.youracaneighbor.com",
        gtm: "GTM-5NCTSKB7",
        facebookPixel: "821363812945964",
        volum: {
            url: "https://track.youracaneighbor.com/d/.js",
            noScript:
                "https://track.youracaneighbor.com/d/.js?noscript=true&lpurl=",
            meta: "https://track.youracaneighbor.com",
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
        storyblockAccessToken: "YD8Bd1PtxQZyLT8OairWSQtt",
    },
    {
        name: "prelandertest.awarenesstips.com",
        gtm: "GTM-TQ5CW45B",
        facebookPixel: "1232977270696782",
        volum: {
            url: "https://track.youracahelper.com/d/.js",
            noScript:
                "https://track.youracahelper.com/d/.js?noscript=true&lpurl=",
            meta: "https://track.youracahelper.com",
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
        storyblockAccessToken: "UXITgcJWoQLBQOqUNJlrpwtt",
    },
    {
        name: "prelandertest.americanhelpers.org",
        gtm: "GTM-TQ5CW45B",
        facebookPixel: "1232977270696782",
        volum: {
            url: "https://track.youracahelper.com/d/.js",
            noScript:
                "https://track.youracahelper.com/d/.js?noscript=true&lpurl=",
            meta: "https://track.youracahelper.com",
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
        storyblockAccessToken: "bgqZlJkSCq6MSox4UJUUuAtt",
    },
     {
        name: "prelandertest.nationwidesubsidy.com",
        gtm: "GTM-N3B82K59",
        facebookPixel: "1232977270696782",
        volum: {
            url: "https://track.nationwidesubsidy.com/d/.js",
            noScript:
                "https://track.nationwidesubsidy.com/d/.js?noscript=true&lpurl=",
            meta: "https://track.nationwidesubsidy.com",
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
        storyblockAccessToken: "hrN1KIrdox1RnNAu1XQQCwtt",
    },
];

initScripts(domain_settings);
