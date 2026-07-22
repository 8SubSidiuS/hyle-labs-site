import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import vm from "node:vm";

const definitionBoundary = "    const sourceValues = {};";

export const loadSiteContract = (repoRoot) => {
    const i18nPath = resolve(repoRoot, "assets/i18n.js");
    const i18nSource = readFileSync(i18nPath, "utf8");
    const boundaryIndex = i18nSource.indexOf(definitionBoundary);
    assert.notEqual(boundaryIndex, -1, "Cannot locate the i18n definition boundary");

    const definitionSource = `${i18nSource.slice(0, boundaryIndex)}
    globalThis.__siteContract = { supportedLanguages, bindings, pageMeta, translations };
})();`;
    const sandbox = { URLSearchParams };
    vm.runInNewContext(definitionSource, sandbox, { filename: i18nPath });

    return {
        ...sandbox.__siteContract,
        i18nPath,
        i18nSource
    };
};
