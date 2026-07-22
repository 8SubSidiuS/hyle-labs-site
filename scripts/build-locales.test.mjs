import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { load } from "cheerio";

import {
    generateLocalizedArtifacts,
    localeRoutes,
    renderLocalizedPage,
    renderSitemap,
    siteOrigin
} from "./build-locales.mjs";
import { loadSiteContract } from "./site-contract.mjs";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceHtml = readFileSync(resolve(repoRoot, "index.html"), "utf8");
const contract = loadSiteContract(repoRoot);

test("each generated page has localized crawlable content and a self-canonical URL", () => {
    for (const language of ["en", "es", "zh"]) {
        const $ = load(renderLocalizedPage(language, sourceHtml, contract));
        const schema = JSON.parse($('script[type="application/ld+json"]').text());
        const faq = schema["@graph"].find((item) => item["@type"] === "FAQPage");

        assert.equal($("html").attr("lang"), contract.supportedLanguages[language].htmlLang);
        assert.equal($("h1").text().trim(), load(contract.translations[language]["hero.title"]).text());
        assert.equal($('link[rel="canonical"]').attr("href"), `${siteOrigin}${localeRoutes[language]}`);
        assert.equal(faq.mainEntity[0].name, contract.translations[language]["faq.1.q"]);
        assert(!$.html().includes("?lang="));
    }
});

test("a translation change deterministically reaches visible HTML and JSON-LD", () => {
    const sentinelQuestion = "Sentinel crawlable question?";
    const alteredContract = {
        ...contract,
        translations: {
            ...contract.translations,
            en: {
                ...contract.translations.en,
                "faq.1.q": sentinelQuestion
            }
        }
    };
    const $ = load(renderLocalizedPage("en", sourceHtml, alteredContract));
    const schema = JSON.parse($('script[type="application/ld+json"]').text());
    const faq = schema["@graph"].find((item) => item["@type"] === "FAQPage");

    assert.equal($(".faq-1 summary").text().trim(), sentinelQuestion);
    assert.equal(faq.mainEntity[0].name, sentinelQuestion);
});

test("artifact generation is deterministic and keeps the build-time catalog out of pages", () => {
    const first = [...generateLocalizedArtifacts(repoRoot)];
    const second = [...generateLocalizedArtifacts(repoRoot)];

    assert.deepEqual(second, first);
    for (const [relativePath, content] of first) {
        if (!relativePath.endsWith(".html")) continue;
        assert.match(
            content,
            /<script src="\/assets\/site\.js\?v=\d{8}(?:-\d+)?" defer(?:="")?><\/script>/
        );
        assert(!content.includes("assets/i18n.js"));
    }
});

test("generation fails closed when a bound translation is missing", () => {
    const translations = {
        ...contract.translations,
        en: { ...contract.translations.en }
    };
    delete translations.en["hero.title"];

    assert.throws(
        () => renderLocalizedPage("en", sourceHtml, { ...contract, translations }),
        /Missing en translation for hero\.title/
    );
});

test("sitemap exposes a reciprocal hreflang cluster for every locale", () => {
    const sitemap = renderSitemap(contract);
    for (const route of Object.values(localeRoutes)) {
        assert(sitemap.includes(`<loc>${siteOrigin}${route}</loc>`));
    }
    for (const language of Object.keys(localeRoutes)) {
        const hreflang = contract.supportedLanguages[language].htmlLang;
        const occurrences = sitemap.match(new RegExp(`hreflang="${hreflang}"`, "g")) || [];
        assert.equal(occurrences.length, Object.keys(localeRoutes).length);
    }
});
