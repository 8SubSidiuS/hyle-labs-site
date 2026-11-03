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

    // Démo du hero (3 temps, ~5 s) ; sans demo-live, l'état final reste affiché.
    const root = document.documentElement;
    const demo = document.getElementById("demo");
    if (demo && root.classList.contains("demo-live")) {
        root.dataset.demo = "js";
        const steps = [...demo.querySelectorAll(".demo-steps li")];
        const caption = demo.querySelector(".demo-caption");
        const replay = demo.querySelector(".demo-replay");
        // Étape légendée par état 0 → 5.
        const activeStep = [null, 0, 0, 1, 2, null];
        const stepTimesMs = [600, 1500, 2400, 3600, 4700];
        let timers = [];
        const describe = (index) => {
            const text = steps[index]?.querySelector(".demo-step-body")?.textContent || "";
            if (!caption || caption.textContent === text) return;
            caption.textContent = text;
            caption.classList.remove("is-fresh");
            void caption.offsetWidth;
            caption.classList.add("is-fresh");
        };
        const show = (state) => {
            for (let k = 1; k <= 5; k += 1) demo.classList.toggle(`s${k}`, k <= state);
            demo.classList.toggle("is-playing", state < 5);
            const active = activeStep[state];
            steps.forEach((step, index) => {
                if (index === active) step.setAttribute("aria-current", "step");
                else step.removeAttribute("aria-current");
            });
            describe(active ?? (state >= 5 ? 2 : 0));
        };
        const play = () => {
            timers.forEach((timer) => window.clearTimeout(timer));
            show(0);
            timers = stepTimesMs.map((delay, index) =>
                window.setTimeout(() => show(index + 1), delay)
            );
        };
        show(0);
        // Départ quand la source est lisible (sous la ligne de flottaison en mobile).
        const start = demo.querySelector(".demo-source") || demo;
        let starter = null;
        if ("IntersectionObserver" in window) {
            starter = new IntersectionObserver((entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) return;
                starter.disconnect();
                play();
            }, { threshold: 0.6 });
            starter.observe(start);
        } else {
            play();
        }
        if (replay) {
            replay.addEventListener("click", () => {
                starter?.disconnect();
                play();
            });
        }
    }

    // Capture réelle à la place de la démo (sans JS : le lien descend vers elle).
    const real = document.getElementById("demo-real");
    const proof = document.getElementById("demo-proof");
    if (real && proof) {
        const back = real.querySelector("button");
        const toggle = (open) => {
            real.hidden = !open;
            proof.setAttribute("aria-expanded", String(open));
            (open ? back : proof).focus({ preventScroll: open });
            if (open && real.getBoundingClientRect().top < 72) real.scrollIntoView({ block: "start" });
        };
        proof.setAttribute("aria-expanded", "false");
        proof.addEventListener("click", (event) => {
            event.preventDefault();
            toggle(real.hidden);
        });
        back.addEventListener("click", () => toggle(false));
        real.addEventListener("keydown", (event) => {
            if (event.key === "Escape") toggle(false);
        });
    }

    // CTA mobile masqué sur #contact : il y couvrait le bouton e-mail.
    const contact = document.getElementById("contact");
    if (contact && "IntersectionObserver" in window) {
        new IntersectionObserver(([entry]) => {
            document.body.classList.toggle("at-contact", entry.isIntersecting);
        }).observe(contact);
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
