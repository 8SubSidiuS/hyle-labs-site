import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";

import {
    generateLocalizedArtifacts,
    generatedLocaleFiles,
    localeRoutes,
    siteOrigin
} from "./build-locales.mjs";
import { loadSiteContract } from "./site-contract.mjs";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contract = loadSiteContract(repoRoot);
const { supportedLanguages, bindings, pageMeta, translations, i18nSource } = contract;
const languageCodes = Object.keys(supportedLanguages);
assert.deepEqual(languageCodes, ["fr", "en", "es", "zh"]);

const bindingKeys = [...new Set(bindings.map(([key]) => key))];
for (const language of languageCodes) {
    const meta = pageMeta[language];
    assert(meta, `Missing page metadata for ${language}`);
    for (const field of ["title", "description", "ogTitle", "ogDescription", "ogImageAlt", "schemaDescription"]) {
        assert.equal(typeof meta[field], "string", `Missing ${language} metadata field ${field}`);
        assert(meta[field].trim(), `Empty ${language} metadata field ${field}`);
    }

    if (language === "fr") continue;
    const dictionary = translations[language];
    assert(dictionary, `Missing translation dictionary for ${language}`);
    assert.deepEqual(
        bindingKeys.filter((key) => !Object.hasOwn(dictionary, key)),
        [],
        `${language} is missing translation keys`
    );
    assert.deepEqual(
        bindingKeys.filter((key) => typeof dictionary[key] !== "string" || !dictionary[key].trim()),
        [],
        `${language} contains empty translation values`
    );
}

const expectedArtifacts = generateLocalizedArtifacts(repoRoot);
for (const [relativePath, expected] of expectedArtifacts) {
    const outputPath = resolve(repoRoot, relativePath);
    assert(existsSync(outputPath), `Missing generated artifact: ${relativePath}`);
    assert.equal(
        readFileSync(outputPath, "utf8"),
        expected,
        `Generated artifact is stale: ${relativePath}; run npm run build`
    );
}

const pageFiles = {
    fr: "index.html",
    ...generatedLocaleFiles
};
const pages = Object.fromEntries(Object.entries(pageFiles).map(([language, relativePath]) => {
    const html = readFileSync(resolve(repoRoot, relativePath), "utf8");
    return [language, { relativePath, html, $: load(html, { decodeEntities: false }) }];
}));

const directTextNode = ($, element) =>
    element.contents().toArray().find((node) =>
        node.type === "text" && (node.data || "").trim()
    );

const readBinding = ($, selector, type) => {
    const element = $(selector).first();
    assert(element.length, `Missing binding target ${selector}`);
    if (type === "html") return element.html();
    if (type === "label") return directTextNode($, element)?.data.trim() || "";
    if (type.startsWith("attr:")) return element.attr(type.slice(5)) || "";
    return element.text().trim();
};

const normalizeHtml = (value) => load(value, { decodeEntities: false }, false).root().html();

const expectedHreflangs = Object.fromEntries(
    Object.entries(localeRoutes).map(([language, route]) => [
        supportedLanguages[language].htmlLang,
        `${siteOrigin}${route}`
    ])
);
expectedHreflangs["x-default"] = `${siteOrigin}/`;
const languageNames = Object.freeze({
    fr: "Français",
    en: "English",
    es: "Español",
    zh: "中文"
});

const referencedLocalAssets = new Set();
for (const [language, page] of Object.entries(pages)) {
    const { $, html, relativePath } = page;
    const expectedLanguage = supportedLanguages[language];
    const expectedMeta = pageMeta[language];
    const canonicalUrl = `${siteOrigin}${localeRoutes[language]}`;

    assert.equal($("html").attr("lang"), expectedLanguage.htmlLang, `${language} HTML lang mismatch`);
    assert.equal($("html").attr("data-site-locale"), language, `${language} static locale marker mismatch`);
    assert.equal($("title").text(), expectedMeta.title, `${language} title mismatch`);
    assert.equal($('meta[name="description"]').attr("content"), expectedMeta.description);
    assert.equal($('meta[property="og:title"]').attr("content"), expectedMeta.ogTitle);
    assert.equal($('meta[property="og:description"]').attr("content"), expectedMeta.ogDescription);
    assert.equal($('meta[property="og:image:alt"]').attr("content"), expectedMeta.ogImageAlt);
    assert.equal($('meta[property="og:image"]').attr("content"), `${siteOrigin}/${expectedMeta.ogImage}`);
    assert.equal($('meta[property="og:image:type"]').attr("content"), "image/png");
    assert.equal($('meta[property="og:image:width"]').attr("content"), "1200");
    assert.equal($('meta[property="og:image:height"]').attr("content"), "630");
    assert.equal($('meta[property="og:locale"]').attr("content"), expectedLanguage.ogLocale);
    assert.equal($('meta[property="og:url"]').attr("content"), canonicalUrl);
    assert.equal($('meta[name="twitter:card"]').attr("content"), "summary_large_image");
    assert.equal($('meta[name="twitter:title"]').attr("content"), expectedMeta.ogTitle);
    assert.equal($('meta[name="twitter:description"]').attr("content"), expectedMeta.ogDescription);
    assert.equal($('meta[name="twitter:image:alt"]').attr("content"), expectedMeta.ogImageAlt);
    assert.equal(
        $('meta[name="twitter:image"]').attr("content"),
        `${siteOrigin}/${expectedMeta.ogImage}`
    );
    const ogImagePath = resolve(repoRoot, expectedMeta.ogImage);
    assert(existsSync(ogImagePath), `${language} Open Graph image is missing: ${expectedMeta.ogImage}`);
    assert.equal($('link[rel="canonical"]').length, 1, `${language} must have one canonical URL`);
    assert.equal($('link[rel="canonical"]').attr("href"), canonicalUrl);

    const actualOgAlternates = $('meta[property="og:locale:alternate"]')
        .map((_index, node) => $(node).attr("content"))
        .get();
    assert.deepEqual(
        actualOgAlternates,
        languageCodes
            .filter((candidate) => candidate !== language)
            .map((candidate) => supportedLanguages[candidate].ogLocale),
        `${language} Open Graph locale alternates mismatch`
    );

    const actualHreflangs = Object.fromEntries(
        $('link[rel="alternate"][hreflang]').toArray().map((node) => [
            $(node).attr("hreflang"),
            $(node).attr("href")
        ])
    );
    assert.equal(
        $('link[rel="alternate"][hreflang]').length,
        languageCodes.length + 1,
        `${language} hreflang cluster contains duplicates or omissions`
    );
    assert.deepEqual(actualHreflangs, expectedHreflangs, `${language} hreflang cluster mismatch`);
    assert(!html.includes("?lang="), `${language} still links to a query-string locale`);

    if (language !== "fr") {
        for (const [key, selector, type] of bindings) {
            const actual = readBinding($, selector, type);
            const rawExpected = translations[language][key];
            const expected = type === "html" ? normalizeHtml(rawExpected) : rawExpected;
            const normalizedActual = type === "html" ? normalizeHtml(actual) : actual;
            assert.equal(normalizedActual, expected, `${language} static binding mismatch: ${key} at ${selector}`);
        }
    }

    const schemaElements = $('script[type="application/ld+json"]');
    assert.equal(schemaElements.length, 1, `${language} must contain exactly one JSON-LD block`);
    const schema = JSON.parse(schemaElements.first().text());
    const graph = schema["@graph"];
    assert(Array.isArray(graph), `${language} JSON-LD @graph must be an array`);
    const organization = graph.find((item) => item["@type"] === "Organization");
    const software = graph.find((item) => item["@type"] === "SoftwareApplication");
    const faq = graph.find((item) => item["@type"] === "FAQPage");
    assert(organization && software && faq, `${language} JSON-LD graph is incomplete`);
    assert.equal(organization["@id"], `${siteOrigin}/#organization`);
    assert.equal(organization.url, `${siteOrigin}/`);
    assert.equal(organization.vatID, "FR92101857431");
    assert.deepEqual(
        organization.logo,
        {
            "@type": "ImageObject",
            url: `${siteOrigin}/assets/favicon-512.png`,
            contentUrl: `${siteOrigin}/assets/favicon-512.png`,
            width: 512,
            height: 512
        },
        `${language} Organization logo mismatch`
    );
    assert.deepEqual(
        organization.address,
        {
            "@type": "PostalAddress",
            streetAddress: "254 rue Vendôme",
            postalCode: "69003",
            addressLocality: "Lyon",
            addressCountry: "FR"
        },
        `${language} Organization address mismatch`
    );
    assert.equal(software.inLanguage, expectedLanguage.htmlLang);
    assert.equal(software["@id"], `${canonicalUrl}#taveni`);
    assert.equal(software.url, canonicalUrl);
    assert.equal(software.description, expectedMeta.schemaDescription);
    assert.equal(software.publisher?.["@id"], `${siteOrigin}/#organization`);
    assert(
        !Object.hasOwn(software, "offers") &&
        !Object.hasOwn(software, "aggregateRating") &&
        !Object.hasOwn(software, "review"),
        `${language} must not publish unverified commercial or review structured data`
    );
    assert.equal(faq.inLanguage, expectedLanguage.htmlLang);
    assert.equal(faq["@id"], `${canonicalUrl}#faq`);
    assert.equal(faq.mainEntity?.length, 5, `${language} FAQ JSON-LD must expose five questions`);
    for (let number = 1; number <= 5; number += 1) {
        const question = readBinding($, `.faq-${number} summary`, "text");
        const answer = readBinding($, `.faq-${number} p`, "text");
        assert.equal(faq.mainEntity[number - 1].name, question, `${language} FAQ ${number} question mismatch`);
        assert.equal(
            faq.mainEntity[number - 1].acceptedAnswer?.text,
            answer,
            `${language} FAQ ${number} answer mismatch`
        );
    }

    const headerLanguageNodes = $(".language-button[data-lang]").toArray();
    const languageLinks = Object.fromEntries(headerLanguageNodes.map((node) => [
        $(node).attr("data-lang"),
        $(node).attr("href")
    ]));
    assert.deepEqual(languageLinks, localeRoutes, `${language} header locale routes mismatch`);
    for (const node of headerLanguageNodes) {
        const link = $(node);
        const code = link.attr("data-lang");
        assert.equal(link.attr("lang"), supportedLanguages[code].htmlLang);
        assert.equal(link.attr("hreflang"), supportedLanguages[code].htmlLang);
        assert.equal(link.attr("aria-label"), languageNames[code]);
    }
    assert.equal(
        $('.language-button[aria-current="page"]').length,
        1,
        `${language} must expose exactly one current locale`
    );
    assert.equal(
        $('.language-button[aria-current="page"]').attr("data-lang"),
        language,
        `${language} active locale link mismatch`
    );

    for (const selector of [".start-table", ".difference-board"]) {
        const table = $(selector);
        assert.equal(table.attr("role"), "table", `${language} ${selector} is not an accessible table`);
        assert(table.find('[role="row"]').length > 1, `${language} ${selector} has no data rows`);
        assert(table.find('[role="columnheader"]').length > 0, `${language} ${selector} has no headers`);
        assert(table.find('[role="cell"]').length > 0, `${language} ${selector} has no cells`);
    }

    const ids = $("[id]").toArray().map((node) => $(node).attr("id"));
    assert.equal(new Set(ids).size, ids.length, `${language} contains duplicate element IDs`);
    $('a[href^="#"]').each((_index, node) => {
        const fragment = $(node).attr("href").slice(1);
        assert(fragment && $(`#${fragment}`).length === 1, `${language} has a broken fragment link: #${fragment}`);
    });

    $("img").each((_index, node) => {
        const image = $(node);
        assert(Number(image.attr("width")) > 0, `${language} image is missing an explicit width`);
        assert(Number(image.attr("height")) > 0, `${language} image is missing an explicit height`);
        assert.notEqual(image.attr("alt"), undefined, `${language} image is missing an alt attribute`);
    });
    // Hero produit : au-dessus de la ligne de flottaison, chargement immédiat.
    assert.equal($(".doc-frame--hero img").attr("loading"), "eager");
    // Toutes les autres captures produit : différées.
    $(".doc-frame:not(.doc-frame--hero) img").each((_index, node) => {
        assert.equal($(node).attr("loading"), "lazy");
        assert.equal($(node).attr("decoding"), "async");
    });

    $('a[href]').each((_index, node) => {
        const link = $(node);
        const href = link.attr("href");
        assert(!/^javascript:/i.test(href), `${language} contains a javascript: link`);
        assert(!/^http:/i.test(href), `${language} contains an insecure HTTP link: ${href}`);
        if (link.attr("target") === "_blank") {
            const rel = new Set((link.attr("rel") || "").split(/\s+/));
            assert(rel.has("noopener"), `${language} target=_blank link is missing rel=noopener`);
        }
    });

    const evaluationHref = $(".hero-actions .button-primary").attr("href");
    const evaluationUrl = new URL(evaluationHref);
    assert.equal(evaluationUrl.origin, "https://taveni.ai", `${language} evaluation CTA origin mismatch`);
    assert.equal(evaluationUrl.pathname, "/contact", `${language} evaluation CTA path mismatch`);
    assert.equal(evaluationUrl.searchParams.get("source_page"), "/hyle-labs");
    assert.equal(evaluationUrl.searchParams.get("plan_interest"), "enterprise");
    assert(evaluationUrl.searchParams.get("subject")?.trim(), `${language} evaluation subject is empty`);
    assert(evaluationUrl.searchParams.get("message")?.trim(), `${language} evaluation message is empty`);
    assert.deepEqual(
        [...evaluationUrl.searchParams.keys()].sort(),
        ["message", "plan_interest", "source_page", "subject"],
        `${language} evaluation CTA exposes unexpected attribution fields`
    );
    assert(
        $(".contact-box .button-primary").attr("href")?.startsWith("mailto:contact@hyle-labs.net"),
        `${language} contact email fallback is missing`
    );

    const runtimeScripts = $('script[src]').toArray();
    assert.equal(runtimeScripts.length, 1, `${language} must load exactly one external runtime script`);
    const runtimeScript = $(runtimeScripts[0]);
    assert(runtimeScript.is("[defer]"), `${language} runtime script must be deferred`);
    assert(!runtimeScript.attr("src").includes("i18n.js"), `${language} ships the build-time translation catalog`);
    assert(
        /^\/?assets\/site\.js\?v=\d{8}(?:-\d+)?$/.test(runtimeScript.attr("src")),
        `${language} site runtime must carry an explicit cache version`
    );

    const pageDirectory = dirname(resolve(repoRoot, relativePath));
    const collectReference = (reference) => {
        if (!reference || /^(?:https?:|mailto:|tel:|data:|#|%23)/.test(reference)) return;
        const referenceWithoutSuffix = reference.split(/[?#]/, 1)[0];
        const target = referenceWithoutSuffix.startsWith("/")
            ? resolve(repoRoot, `.${referenceWithoutSuffix}`)
            : resolve(pageDirectory, referenceWithoutSuffix);
        assert(existsSync(target), `${language} has a missing local reference: ${reference}`);
        referencedLocalAssets.add(target);
    };
    $("[src], [href]").each((_index, node) => {
        collectReference($(node).attr("src") || $(node).attr("href"));
    });
    for (const match of html.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
        collectReference(match[1]);
    }
}

const forbiddenClaims = [
    ["GDPR by design", /GDPR by design|RGPD par conception|RGPD desde el diseño|原生 GDPR 合规/i],
    ["European processing", /data processed in Europe|données traitées en Europe|datos tratados en Europa|数据在欧洲处理/i],
    ["third-party training absolute", /not used to train third-party models|ne servent pas à entraîner des modèles tiers|no sirven para entrenar modelos de terceros|绝不会用于训练第三方模型/i],
    ["unverified access enforcement", /access rights are checked before information feeds|droits d'accès sont vérifiés avant qu'une information n'alimente|derechos de acceso se verifican antes de que una información alimente|访问权限校验/i],
    ["unverified connector push", /pushes validated actions|pousse des actions validées|envía acciones validadas|推送到您已在使用/i],
    ["unverified connector handoff", /before moving into the CRM|avant de partir dans le CRM|antes de pasar al CRM|再流入 CRM|人工确认后才会同步/i],
    ["absolute model portability", /remain your capital, whatever model|restent votre capital, indépendamment du modèle|siguen siendo tu capital, sea cual sea el modelo|始终是您的资产，与所用模型无关/i],
    ["response SLA", /reply within 48\s*h|réponse sous 48\s*h|respuesta en 48\s*h|48\s*小时内回复/i]
];
const publicSurfaceSource = `${Object.values(pages).map(({ html }) => html).join("\n")}\n${i18nSource}`;
assert(!/Gérard Neyrin|Chaponost|69630/i.test(publicSurfaceSource), "Founder personal address must never be public");
for (const [label, pattern] of forbiddenClaims) {
    assert(!pattern.test(publicSurfaceSource), `Blocked public claim found: ${label}`);
}

const runtimeSource = readFileSync(resolve(repoRoot, "assets/site.js"), "utf8");
assert(
    Buffer.byteLength(runtimeSource, "utf8") <= 8 * 1024,
    "The public site runtime exceeds its 8 KiB uncompressed budget"
);

const sitemap = readFileSync(resolve(repoRoot, "sitemap.xml"), "utf8");
assert.equal(sitemap, expectedArtifacts.get("sitemap.xml"), "Sitemap differs from generated routes");
for (const route of Object.values(localeRoutes)) {
    assert(sitemap.includes(`<loc>${siteOrigin}${route}</loc>`), `Sitemap is missing ${route}`);
}
const robots = readFileSync(resolve(repoRoot, "robots.txt"), "utf8");
assert(robots.includes(`Sitemap: ${siteOrigin}/sitemap.xml`), "robots.txt does not advertise the sitemap");

console.log(
    `Site validation passed: ${bindingKeys.length} bindings, ${languageCodes.length} static locales, ` +
    `20 localized FAQ entries, ${expectedArtifacts.size} generated artifacts, ` +
    `${referencedLocalAssets.size} local targets.`
);
