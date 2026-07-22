(() => {
    "use strict";

    const languagePaths = Object.freeze({
        fr: "/",
        en: "/en/",
        es: "/es/",
        zh: "/zh/"
    });

    const normalizeLanguage = (value) => {
        if (!value) return null;
        const normalized = String(value).trim().toLowerCase();
        if (normalized.startsWith("fr")) return "fr";
        if (normalized.startsWith("en")) return "en";
        if (normalized.startsWith("es")) return "es";
        if (
            normalized.startsWith("zh") ||
            normalized === "cn" ||
            normalized === "mandarin" ||
            normalized === "中文"
        ) {
            return "zh";
        }
        return null;
    };

    // Preserve old ?lang= links while keeping one crawlable URL per locale.
    const queryLanguage = normalizeLanguage(
        new URLSearchParams(window.location.search).get("lang")
    );
    if (queryLanguage && window.location.protocol !== "file:") {
        const legacyUrl = new URL(window.location.href);
        legacyUrl.searchParams.delete("lang");
        window.location.replace(
            `${languagePaths[queryLanguage]}${legacyUrl.search}${legacyUrl.hash}`
        );
        return;
    }

    // Remove locale choices used by the former client-side translation runtime.
    try {
        localStorage.removeItem("hyle-labs-language");
        sessionStorage.removeItem("hyle-labs-language");
    } catch {
        // Storage can be unavailable in private browsing or hardened browsers.
    }

    const year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    const navMenu = document.getElementById("nav-menu");
    if (navMenu) {
        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => navMenu.removeAttribute("open"));
        });
        document.addEventListener("click", (event) => {
            if (navMenu.hasAttribute("open") && !navMenu.contains(event.target)) {
                navMenu.removeAttribute("open");
            }
        });
    }

    // Wayfinding : marque le chapitre en cours dans la navigation.
    // Amélioration progressive — sans IntersectionObserver, rien ne change.
    const sectionIds = ["probleme", "fonctionnement", "difference", "cout-ia", "souverainete"];
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if ("IntersectionObserver" in window && sections.length) {
        const currentLinks = () =>
            document.querySelectorAll('.nav a[aria-current="location"], .nav-menu-panel a[aria-current="location"]');
        let currentId = null;
        const setCurrent = (id) => {
            if (id === currentId) return;
            currentId = id;
            currentLinks().forEach((link) => link.removeAttribute("aria-current"));
            if (!id) return;
            document
                .querySelectorAll(`.nav a[href="#${id}"], .nav-menu-panel a[href="#${id}"]`)
                .forEach((link) => link.setAttribute("aria-current", "location"));
        };
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) setCurrent(entry.target.id);
                    else if (entry.target.id === currentId) setCurrent(null);
                }
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        );
        sections.forEach((section) => observer.observe(section));
    }

    const dialog = document.getElementById("legal-dialog");
    const openButton = document.getElementById("legal-open");
    const closeButton = document.getElementById("legal-close");
    if (dialog && openButton && closeButton) {
        const closeDialog = () => {
            if (typeof dialog.close === "function") dialog.close();
            else dialog.removeAttribute("open");
        };
        openButton.addEventListener("click", () => {
            if (typeof dialog.showModal === "function") dialog.showModal();
            else dialog.setAttribute("open", "");
        });
        closeButton.addEventListener("click", closeDialog);
        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) closeDialog();
        });
    }
})();
