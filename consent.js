/*
 * Consentimento de cookies (LGPD) e carregamento condicional de rastreadores.
 * Nada de Google Analytics ou Meta Pixel é carregado antes do aceite.
 */
(function () {
    var KEY = "pkboat_consent";
    var GA_ID = "G-LS8NBNZ8ZB";
    var PIXEL_ID = "1403278524679347";

    // Google Consent Mode v2: tudo negado por padrão
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        wait_for_update: 500
    });

    function read() {
        try {
            var v = JSON.parse(localStorage.getItem(KEY));
            if (v && typeof v.analytics === "boolean" && typeof v.marketing === "boolean") return v;
        } catch (e) { }
        return null;
    }

    function save(c) {
        try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) { }
    }

    var gaLoaded = false;
    var pixelLoaded = false;

    function loadAnalytics() {
        if (gaLoaded) return;
        gaLoaded = true;
        gtag("consent", "update", { analytics_storage: "granted" });
        var s = document.createElement("script");
        s.async = true;
        s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
        document.head.appendChild(s);
        gtag("js", new Date());
        gtag("config", GA_ID, { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false });
    }

    function loadPixel() {
        if (pixelLoaded) return;
        pixelLoaded = true;
        (function (f, b, e, v, n, t, s) {
            if (f.fbq) return; n = f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };
            if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0";
            n.queue = []; t = b.createElement(e); t.async = !0;
            t.src = v; s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s);
        })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
        window.fbq("init", PIXEL_ID);
        window.fbq("track", "PageView");
    }

    function apply(c) {
        if (c.analytics) loadAnalytics();
        if (c.marketing) loadPixel();
    }

    function removeBanner() {
        var el = document.getElementById("cookie-banner");
        if (el) el.remove();
    }

    // Se o usuário retira um consentimento já dado, recarrega a página para
    // interromper os scripts que já estavam em execução.
    function commit(c) {
        var before = read();
        save(c);
        removeBanner();
        if (before && ((before.analytics && !c.analytics) || (before.marketing && !c.marketing))) {
            location.reload();
            return;
        }
        apply(c);
    }

    function buildBanner() {
        removeBanner();
        var current = read() || { analytics: false, marketing: false };
        var el = document.createElement("div");
        el.id = "cookie-banner";
        el.setAttribute("role", "dialog");
        el.setAttribute("aria-label", "Preferências de cookies");
        el.innerHTML =
            '<div class="cookie-text">' +
            '<p><strong>Sua privacidade importa.</strong> Usamos cookies para medir o uso do site (Google Analytics) ' +
            'e para publicidade (Meta Pixel). Eles só são ativados com a sua permissão. ' +
            'Saiba mais na <a href="privacidade.html">Política de Privacidade</a>.</p>' +
            '<div class="cookie-prefs" hidden>' +
            '<label><input type="checkbox" id="ck-essential" checked disabled> Essenciais (sempre ativos, não coletam dados pessoais)</label>' +
            '<label><input type="checkbox" id="ck-analytics"' + (current.analytics ? " checked" : "") + '> Análise de uso (Google Analytics)</label>' +
            '<label><input type="checkbox" id="ck-marketing"' + (current.marketing ? " checked" : "") + '> Publicidade (Meta Pixel)</label>' +
            '</div></div>' +
            '<div class="cookie-actions">' +
            '<button type="button" class="ck-btn" data-act="reject">Recusar</button>' +
            '<button type="button" class="ck-btn" data-act="prefs">Preferências</button>' +
            '<button type="button" class="ck-btn" data-act="accept">Aceitar todos</button>' +
            '</div>';
        el.addEventListener("click", function (e) {
            var act = e.target.getAttribute && e.target.getAttribute("data-act");
            if (!act) return;
            if (act === "accept") commit({ analytics: true, marketing: true });
            else if (act === "reject") commit({ analytics: false, marketing: false });
            else if (act === "prefs") {
                var p = el.querySelector(".cookie-prefs");
                if (p.hidden) {
                    p.hidden = false;
                    e.target.textContent = "Salvar escolhas";
                    e.target.setAttribute("data-act", "save");
                }
            } else if (act === "save") {
                commit({
                    analytics: el.querySelector("#ck-analytics").checked,
                    marketing: el.querySelector("#ck-marketing").checked
                });
            }
        });
        document.body.appendChild(el);
    }

    window.openCookiePreferences = function () {
        buildBanner();
        var b = document.querySelector("#cookie-banner [data-act=prefs]");
        if (b) b.click();
    };

    document.addEventListener("DOMContentLoaded", function () {
        var c = read();
        if (c) apply(c); else buildBanner();
        var link = document.getElementById("open-cookie-prefs");
        if (link) link.addEventListener("click", function (e) { e.preventDefault(); window.openCookiePreferences(); });
    });
})();
