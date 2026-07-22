import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const runtimeSource = readFileSync(resolve(repoRoot, "assets/site.js"), "utf8");

const legacyRedirect = (href) => {
    let destination = null;
    const currentUrl = new URL(href);
    const window = {
        location: {
            href,
            protocol: currentUrl.protocol,
            search: currentUrl.search,
            replace: (value) => {
                destination = value;
            }
        }
    };
    const storage = { removeItem: () => {} };
    const document = { getElementById: () => null };

    vm.runInNewContext(runtimeSource, {
        URL,
        URLSearchParams,
        document,
        localStorage: storage,
        sessionStorage: storage,
        window
    }, {
        filename: resolve(repoRoot, "assets/site.js")
    });
    return destination;
};

test("legacy locale URLs redirect to fixed same-origin routes and preserve unrelated state", () => {
    assert.equal(
        legacyRedirect("https://hyle-labs.net/?lang=en-US&campaign=audit#contact"),
        "/en/?campaign=audit#contact"
    );
    assert.equal(legacyRedirect("https://hyle-labs.net/en/?lang=es"), "/es/");
    assert.equal(legacyRedirect("https://hyle-labs.net/?lang=zh-Hans"), "/zh/");
    assert.equal(legacyRedirect("https://hyle-labs.net/?lang=cn"), "/zh/");
    assert.equal(legacyRedirect("https://hyle-labs.net/?lang=https://evil.example"), null);
    assert.equal(legacyRedirect("file:///tmp/index.html?lang=en"), null);
});
