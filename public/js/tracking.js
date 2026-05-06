(function () {
  var config = window.SOREN_TRACKING || {};
  var gaId = config.ga4MeasurementId || "";
  var pixelId = config.metaPixelId || "";

  function addScript(src) {
    var script = document.createElement("script");
    script.async = true;
    script.src = src;
    document.head.appendChild(script);
  }

  window.sorenTrack = function (name, params) {
    params = params || {};
    if (typeof window.gtag === "function") window.gtag("event", name, params);
    if (typeof window.fbq === "function") window.fbq("trackCustom", name, params);
  };

  if (gaId) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", gaId);
    addScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(gaId));
  }

  if (pixelId) {
    window.fbq = window.fbq || function () {
      window.fbq.callMethod ? window.fbq.callMethod.apply(window.fbq, arguments) : window.fbq.queue.push(arguments);
    };
    if (!window._fbq) window._fbq = window.fbq;
    window.fbq.push = window.fbq;
    window.fbq.loaded = true;
    window.fbq.version = "2.0";
    window.fbq.queue = [];
    window.fbq("init", pixelId);
    window.fbq("track", "PageView");
    addScript("https://connect.facebook.net/en_US/fbevents.js");
  }

  document.addEventListener("click", function (event) {
    var target = event.target.closest("a, button");
    if (!target) return;
    var href = target.getAttribute("href") || "";
    var label = (target.textContent || target.getAttribute("aria-label") || "").trim();
    var params = { label: label, href: href, location: window.location.pathname };

    if (href.indexOf("discord.com/oauth2") !== -1) window.sorenTrack("add_to_discord_click", params);
    else if (href.indexOf("/docs") !== -1) window.sorenTrack("view_commands_click", params);
    else if (href.indexOf("/features") !== -1) window.sorenTrack("view_features_click", params);
    else if (href.indexOf("ko-fi.com") !== -1) window.sorenTrack("premium_purchase_click", params);
    else if (href.indexOf("github.com") !== -1) window.sorenTrack("github_click", params);
    else if (target.classList.contains("btn")) window.sorenTrack("cta_click", params);
  });
})();
