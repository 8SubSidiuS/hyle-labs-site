# Refonte frontend Hyle Labs / Taveni — Cahier de conception 2026

> **Statut** : ✅ IMPLÉMENTÉ le 02/07/2026 (phases P1→P5 exécutées, voir §11). Choix actés en
> autonomie sur les questions du §12 : option A pour les fontes (Bricolage Grotesque + JetBrains
> Mono auto-hébergées, Outfit supprimée) ; mot signé du fondateur sans photo. Résultats mesurés :
> mobile 18 197 → 12 434 px, desktop 10 176 → 9 028 px, premier chargement ~374 KB, i18n 198 clés
> synchronisées ×3 langues (0 manquante), 0 erreur console, JSON-LD Organization + SoftwareApplication
> + FAQPage valide. Ce document reste la référence pour toute évolution ultérieure du frontend.
>
> Brief original rédigé le 02/07/2026 à partir d'un audit complet du code (`index.html`,
> `assets/i18n.js`), de captures d'écran (desktop/mobile, clair/sombre) et de recherches web
> sur les pratiques 2025-2026 (sources en annexe).
>
> **À qui s'adresse ce document** : à tout agent IA (ou humain) chargé d'améliorer le frontend.
> Il est auto-suffisant : contexte produit, contraintes non négociables, audit, direction créative,
> design system cible, spécification section par section, plan d'exécution et critères d'acceptation.
> **Lire les sections 1 et 2 avant d'écrire la moindre ligne de code.**

---

## 1. Contraintes non négociables (à lire avant tout)

Ces règles priment sur toute proposition du présent document. Les violer casse le site.

1. **Site 100 % statique sur GitHub Pages.** Pas de framework, pas de build step, pas de SSR,
   pas de dépendance npm. HTML + CSS natif + JS vanilla minimal. Le domaine est `hyle-labs.net`
   (fichier `CNAME`). Jekyll est actif (pas de `.nojekyll`) : les fichiers/dossiers préfixés `_`
   ne sont pas déployés — c'est pourquoi ce document vit dans `_docs/`.
2. **i18n : le français est la source, dans le DOM.** Le FR est codé en dur dans `index.html` ;
   EN/ES/ZH vivent dans l'objet `translations` de `assets/i18n.js`, appliqués via des tuples
   `bindings` `["clé", "sélecteur CSS", "type"]` (`text` | `html` | `label` | `attr:xxx`).
   Conséquences pratiques :
   - Toute modification d'un texte FR doit être répercutée sur les 3 langues dans `i18n.js`.
   - Tout élément textuel ajouté = un binding + 3 traductions. Tout élément supprimé = binding retiré.
   - **Ne jamais insérer un élément qui décale un sélecteur `:nth-child`/`:nth-of-type` existant.**
     Pour tout nouvel élément, utiliser une classe dédiée comme sélecteur de binding.
   - Un binding `text` écrase le HTML interne (pas de `<strong>` dans un élément bindé `text`).
   - Vérifications : `node -c assets/i18n.js` + croiser les clés `bindings` vs `translations`
     (0 clé manquante par langue).
   - Après toute modification de `assets/i18n.js`, **bumper le `?v=`** du
     `<script src="assets/i18n.js?v=YYYYMMDD">` dans `index.html` (cache GitHub Pages ~600 s).
3. **Langue et thème suivent le navigateur à chaque visite.** Bascule manuelle = `sessionStorage`
   uniquement, jamais `localStorage`. Le script de thème inline dans le `<head>` (anti-FOUC) doit
   rester inline et premier. Ne pas réintroduire de persistance `localStorage`.
4. **RGPD strict** : aucune requête tierce (fonts auto-hébergées, pas d'analytics tiers, pas de CDN).
5. **Refus assumés** (direction validée par le propriétaire, juin 2026) : pas de 3D/WebGL,
   pas de scrolljacking, pas de couleurs « dopamine » saturées, pas de vidéo autoplay en hero.
   La palette teal/ink est un choix de positionnement (souveraineté, confiance B2B) : on la
   raffine, on ne la remplace pas.
6. **Accessibilité** : ne jamais régresser sous WCAG 2.2 AA. `prefers-reduced-motion` respecté
   partout. En mode sombre, tout accent teal foncé bascule sur le cyan `#7ee7d8` (le teal de
   marque tombe à ~2,5:1 sur fond sombre).

---

## 2. Contexte produit et cibles

**Le produit.** Taveni (édité par Hyle Labs, SASU française, Rhône) capte les réunions, retrouve
les **décisions** prises à l'oral et les transforme en **actions qualifiées** (qui, quoi, pour
quand, vers quel outil), envoyées vers les outils métier (CRM, support, projet) **après validation
humaine**. Concepts de marque : « Capital Token » (chaque décision validée devient un actif),
maîtrise du **coût d'IA** (paradoxe de Jevons : on n'envoie pas le verbatim brut aux modèles),
**souveraineté** (le savoir accumulé appartient au client, indépendamment du modèle d'IA).
Statut : pré-commercialisation (`schema.org` : `PreOrder`) — pas encore de clients publics,
pas de pricing public.

**Trois cœurs de cible, à servir simultanément :**

| Cible | Ce qu'elle cherche sur la page | Ce qui la fait fuir |
|---|---|---|
| Dirigeants / décideurs non-tech | « Qu'est-ce que ça fait pour moi ? » en 5 s ; preuve de sérieux ; qui est derrière | Jargon (inférence, ontologie), pages interminables |
| Responsables Ventes / CS / Ops | Cas d'usage concrets (CRM, support, relances), gain de temps, validation avant envoi | Promesses d'automatisation magique, flou sur le fonctionnement |
| Profils IT / Data | Architecture, droits d'accès, RGPD, coût d'IA, réversibilité | Marketing creux, absence de substance technique |

**Gradient éditorial validé** (à conserver dans toute réécriture) : concret d'abord → concept
ensuite → détail en dépliable (`<details class="more">`). Les termes de marque (Capital Token,
Jevons, souveraineté) arrivent **après** la valeur concrète, jamais dans le hero.

**Objectif de conversion.** Une seule action cible : **demander une évaluation sur un processus
réel** (email). Tout le design doit converger vers elle.

---

## 3. Audit de l'existant (02/07/2026)

### 3.1 Ce qui est déjà fort — à préserver

- **Fondations techniques excellentes** : ~420 KB au total (HTML 108 KB, i18n.js 98 KB, image
  hero 29 KB, 4 woff2 ≈ 180 KB), zéro requête tierce, CSS natif moderne (`@layer`, OKLCH + P3,
  `color-mix()`, scroll-driven animations, `interpolate-size`, scroll-state container queries),
  dark mode tokenisé, anti-FOUC inline. LCP/INP/CLS sont structurellement bons. C'est en avance
  sur l'état de l'art — **ne pas « moderniser » en ajoutant du JS.**
- **Copy spécifique et honnête** : pas de « Unlock the power of… ». Les headlines disent ce que
  fait le produit. « Mesurer la valeur, pas la hype » est une vraie voix. C'est la première
  contre-mesure anti-AI-slop et elle est déjà en place.
- **Progressive disclosure** en place (dépliables animés), i18n 4 langues robuste, mode sombre
  soigné (accents cyan ~13:1), sticky CTA mobile (pattern mesuré à +11 % de conversion).
- **Artefact technique différenciant** : le panneau `processing.context.json` (section coût IA)
  montre le produit par la preuve. C'est le genre d'élément qu'aucun template IA ne produit —
  à généraliser (voir §6).

### 3.2 Faiblesses structurelles

**A. Monotonie de gabarit (le vrai sujet).** 9 sections consécutives suivent le même tampon :
`kicker uppercase + titre énorme (clamp 34→58 px) + lead + grille de cartes bordées`. Successivement :
3 proof-cards, 4 signaux, 5 truth-cards, 3 audience-cards, 1 tableau + note, 1 JSON, 4 layers +
1 board, 4 steps, 6 capabilities, 1 ledger + 4 points, 4 facts. **Tout est carte.** La hiérarchie
inter-sections est plate : chaque titre de section crie aussi fort que le H1 ; l'œil n'a plus de
repère d'importance. C'est précisément le pattern « card-grid stamping » que les designers
identifient comme signature des sites générés par IA.

**B. Longueur.** 10 176 px de haut en desktop 1440, **18 197 px en mobile 375** (~22 écrans).
Les sections « Boucle de décision » (ontology) et « Souveraineté » (architecture) se recouvrent
conceptuellement (validation humaine, droits d'accès, capital) ; « Le problème » (5 cartes) et
« Évaluation » (6 cartes) diluent chacune leur message dans des items redondants.

**C. Marqueurs template 2020-2024** (relevés par croisement avec les catalogues anti-slop) :
- Fausse fenêtre macOS avec pastilles rouge/orange/vert, **deux fois** (`.hero-shot-bar`,
  `.panel-topbar` — `index.html:400-418`, `830-854`). Marqueur générique n°1 des mockups.
- Filets colorés sur un bord de carte arrondie (corail en haut des `.proof-item`, en bas des
  `.audience-card`) — répertorié comme « le tell le plus reconnaissable » (Bakaus,
  impeccable.style/slop).
- Pastilles numérotées 1-2-3-4 (`.step::before`) avec 4 couleurs différentes.
- Grilles d'icônes stroke type Lucide + titre + texte (`.capability-grid`), icônes recolorées
  en 5 couleurs par `:nth-child` — l'accent multicolore dilue la palette.
- Kicker uppercase + méga-titre + lead, tamponné 9 fois.

**D. Hero : la preuve ne prouve pas.**
- Le screenshot produit (`taveni-tco-product.webp`) montre… une **modale d'import de fichier**
  (réglages), pas le résultat (décisions extraites, actions qualifiées). Il est affiché en
  `aspect-ratio: 3/2` alors que l'image fait 1280×720 (16:9) → recadrage des bords. Et il est
  `aria-hidden` (invisible aux lecteurs d'écran).
- Les 3 `.proof-item` ressemblent à des KPI (gabarit stat-tile) mais contiennent des mots
  (« Décisions », « Actions », « L'essentiel ») : l'œil attend des chiffres, il n'y en a pas.
  Pattern « fake stats » = perte de crédibilité.
- **Trois CTA concurrents visibles en même temps sur mobile** : « Voir le fonctionnement »
  (primaire, simple ancre), « Demander une démo » (mailto, secondaire), « Évaluer Taveni »
  (sticky + nav). Trois verbes différents pour deux actions réelles. Les études 2026 : 3+ boutons
  en hero = -8 % de conversion ; un seul CTA primaire par page.
- La véritable action de conversion (demander une démo/évaluation) est **secondaire** ; le CTA
  primaire ne fait que scroller.
- Navigation aux libellés conceptuels : « Différence », « Souveraineté » — internes, pas
  orientés visiteur.

**E. Preuve sociale absente.** Aucun client nommé, aucun visage, aucun chiffre d'étude, aucune
mention du fondateur. En pré-lancement on ne fabrique rien, mais l'anonymat total est le
principal déficit de crédibilité B2B (les acheteurs font l'essentiel de leur due diligence
avant de contacter). Voir §7.8 pour les alternatives honnêtes.

**F. Détails d'exécution.**
- Logo « Hyle Labs » casse sur deux lignes à 375 px (`.logo` sans `white-space: nowrap`).
- Corps de microtexte à 12-13 px répandu (proof spans, signals, footer, ledger) — lisibilité
  mobile et seniors ; viser 14 px minimum pour tout texte porteur d'information.
- `--muted #667275` sur `--paper` ≈ 4,7:1 : passe AA, mais sans marge à 13 px.
- Reveals au scroll : amplitude 26 px un peu théâtrale ; surtout, avec `animation-timeline: view()`
  + `both`, le contenu sous la ligne de flottaison est à `opacity: 0` hors défilement →
  **l'impression papier / PDF de la page sort avec des sections vides** (vérifié en capture
  pleine page). Ajouter un reset `@media print`.
- Boutons de langue sans attribut `lang` (`<button data-lang="en">` devrait porter `lang="en"`).
- Le sticky CTA mobile peut masquer un élément focusé en bas d'écran (WCAG 2.4.11 Focus Not
  Obscured) — le `padding-bottom: 84px` du body ne protège qu'en fin de page.
- `hero-shot` : image produit porteuse de sens marquée décorative (`alt=""`+`aria-hidden`).

### 3.3 Verdict

Le site est **au-dessus de la moyenne** (fondations, copy, honnêteté) mais son exécution visuelle
est un empilement de gabarits de cartes qui banalise un produit singulier. La refonte ne consiste
pas à « ajouter du design » : elle consiste à **enlever de l'uniformité**, raccourcir, hiérarchiser,
et remplacer la décoration générique par des **artefacts produits** (la preuve par l'objet).

---

## 4. Direction créative : « le dossier de décision »

### 4.1 Concept directeur

Taveni transforme du flou oral en objets nets : décision, preuve, responsable, échéance,
destination. **Le site doit faire ce que le produit fait** : chaque section présente un
*artefact* — un objet typographique précis qui ressemble aux sorties du produit (fiche de
décision, ligne de registre, contexte JSON, règle d'accès) — plutôt qu'une carte marketing.
Métaphore : un **dossier de décision** qu'on feuillette, pas une brochure.

Ton visuel : **éditorial-technique**. La rigueur d'un document d'audit, la chaleur d'une maison
d'édition. Papier cassé, encre, teal profond, un seul accent chaud (corail) utilisé avec
parcimonie, matière discrète (grain existant), beaucoup d'air.

### 4.2 Principes d'exécution

1. **Un seul objet-héros par section.** Chaque section = un titre + un artefact dominant
   (tableau, fiche, registre, JSON, schéma de flux) + un paragraphe. Fini les grilles de
   3-6 cartes équivalentes : si tout est important, rien ne l'est.
2. **Hiérarchie pyramidale des titres.** Le H1 est seul à sa taille. Les H2 descendent d'un
   cran net (clamp 28→40 px, pas 34→58). Deux sections « chapitre » maximum (Problème,
   Souveraineté) peuvent garder un titre majeur. L'œil doit sentir la différence entre un
   chapitre et un paragraphe.
3. **Asymétrie maîtrisée.** Les layouts 50/50 systématiques deviennent 60/40 ou 40/60 alternés ;
   un artefact peut déborder légèrement de la colonne de texte (max +48 px) pour casser la grille
   sans la nier. Pas de « broken grid » gratuit.
4. **La couleur signifie.** Teal = marque et action. Corail = **uniquement** le fil rouge
   « décision » (voir §4.3). Ambre/bleu disparaissent des accents décoratifs (conservés seulement
   dans la coloration syntaxique du JSON). Supprimer les recolorations `:nth-child` multicolores.
5. **Zéro chrome fictif.** Plus de pastilles macOS. Un artefact est présenté comme un document :
   filet 1 px, étiquette monospace en coin (`décision #142`, `processing.context.json`), fond
   `--surface`.
6. **Motion fonctionnel** : 150-400 ms, translations ≤ 12 px, reveals conservés mais discrets,
   `prefers-reduced-motion` + `@media print` neutralisent tout.
7. **Anti-slop, garde-fous actifs** (interdits) : gradient violet/indigo, texte en dégradé,
   emojis-icônes, glassmorphism décoratif, illustrations 3D isométriques, stock photos,
   pastilles browser, badges « 01/02/03 » colorés, bordure colorée épaisse sur un côté de carte,
   radius uniforme ≥ 16 px partout, headline aspirationnelle vide, animation bounce/elastic.

### 4.3 Le fil rouge corail

Le corail cesse d'être un soulignement décoratif dispersé. Il devient **la couleur de la
décision** : chaque fois qu'une décision apparaît dans un artefact (la ligne « décision » du
registre, le statut « validée » d'une fiche, le passage surligné d'un verbatim), c'est le seul
endroit où le corail vit. Le visiteur apprend inconsciemment : corail = une décision existe ici.
Usage : puce carrée 8 px, surlignage `background: color-mix(in oklch, var(--coral) 14%, transparent)`,
tampon de statut. Jamais en texte < 18 px (contraste ~3:1), jamais sur un CTA.

---

## 5. Design system cible

### 5.1 Couleurs (tokens)

Conserver la base actuelle (elle est bonne et déjà OKLCH sur P3). Ajustements :

```css
:root {
    /* Inchangés : --paper #f7f8f3, --paper-2, --surface, --ink #111418,
       --ink-2, --line, --teal #0f766e, --teal-2 #0b5f59, --coral #f06543,
       --deep #0d1416, --deep-2 */
    --muted: #5d696c;             /* était #667275 — gagne ~0,6 pt de contraste (≈5,3:1) */
    --decision: var(--coral);     /* alias sémantique — voir §4.3 */
    --decision-wash: color-mix(in oklch, var(--coral) 12%, transparent);
    /* --cyan, --amber, --blue : réservés à la coloration syntaxique des artefacts code,
       ne plus les utiliser comme accents d'icônes ou de pastilles. */
}
```

Mode sombre : tokens actuels conservés (ils fonctionnent), y compris la règle cyan `#7ee7d8`
pour tout accent teal. `--decision` reste corail en sombre (contraste 5,5:1 sur `--deep` en
aplat ≥ 18 px ; en dessous, utiliser le wash + texte `--ink`).

Rythme des fonds : alternance claire/sombre conservée mais réduite à **deux** bandes sombres
(au lieu de trois) pour que chacune garde son poids : l'intro-band fusionne avec le hero clair
(voir §7.2).

### 5.2 Typographie

**Recommandation (option A — retenue par défaut) :**

| Rôle | Fonte | Justification |
|---|---|---|
| Display (H1, H2, artefacts titres) | **Bricolage Grotesque** (variable, SIL OFL) | Grotesque expressive à chasse contrastée, dessinée par un designer français — caractère net sans excentricité, quasi absente des sites générés par IA. Sous-ensembles latin + latin-ext à auto-héberger en woff2 (~2 × 20-35 KB). |
| Corps | **Inter** (déjà auto-hébergée) | Inter est « générique » en display, pas en corps : lisibilité maximale, déjà payée (180 KB). La différenciation se joue dans le display et les artefacts. |
| Mono (artefacts : JSON, étiquettes, registre) | **JetBrains Mono** ou **Commit Mono**, sous-ensemble réduit (~15-25 KB) | Le mono actuel dépend du système (`SF Mono, ui-monospace`) : rendu incohérent hors macOS. Le mono devient un pilier identitaire (étiquettes d'artefacts), il doit être stable. |

Option B (coût zéro) : conserver Outfit mais réduire son usage aux H1/H2 uniquement (plus
d'Outfit sur les `b` de cartes, étiquettes et chiffres) et introduire seulement le mono
auto-hébergé. Choisir A si le budget de ~70 KB de fonts supplémentaires est acceptable
(il l'est : total resterait < 500 KB), sinon B.

ZH : les fontes latines ne couvrent pas le mandarin — le fallback system reste la règle ;
vérifier que la pile `--font-display` se dégrade proprement (`"Bricolage Grotesque",
var(--font-body)` → sans-serif système en zh).

**Échelle fluide (remplace les clamp actuels) :**

```css
:root {
    --text-xs: 0.8125rem;                              /* 13px — mentions légales uniquement */
    --text-sm: 0.875rem;                               /* 14px — plancher du texte informatif */
    --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);   /* 16→18px corps */
    --text-lead: clamp(1.125rem, 1.05rem + 0.4vw, 1.3125rem);/* 18→21px leads */
    --text-h3: clamp(1.1875rem, 1.1rem + 0.5vw, 1.375rem);   /* 19→22px */
    --text-h2: clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem);       /* 28→40px sections */
    --text-h2-major: clamp(2.125rem, 1.6rem + 2.6vw, 3.25rem);/* 34→52px chapitres (×2 max) */
    --text-h1: clamp(2.5rem, 1.9rem + 3.2vw, 3.75rem);       /* 40→60px hero uniquement */
}
```

Line-heights : corps 1.6, leads 1.55, titres 1.05-1.1. Mesure : 60-72 caractères max
(`max-width: 62ch` sur les paragraphes). Conserver le tracking existant (+.06em capitales,
-.015em grands titres), `text-wrap: balance/pretty` conservés.

### 5.3 Espacement, rayons, ombres

```css
:root {
    --space-section: clamp(64px, 9vw, 120px);  /* respiration verticale accrue */
    --space-block: clamp(28px, 4vw, 48px);     /* titre → artefact */
    --radius: 8px;         /* boutons, champs */
    --radius-card: 12px;   /* était 14 — artefacts documents, plus sec */
    --radius-lg: 16px;     /* réservé au visuel hero */
}
```

Ombres : conserver `--shadow-card` (juste), supprimer l'élévation au repos sur les petits
éléments (étiquettes, lignes de registre) — l'ombre se mérite : uniquement les artefacts majeurs
(1 par section). Le grain SVG existant sur bandes sombres est conservé (matière discrète, 5 %).

### 5.4 Motion

| Contexte | Spec |
|---|---|
| Hover boutons/liens | 150-200 ms, `ease-out`, translation ≤ 1 px ou fond seul |
| Hover artefacts | bordure + ombre uniquement — **supprimer** le `translateY(-3px)` généralisé sur toutes les cartes |
| Reveals au scroll | conservés (`animation-timeline: view()`), amplitude réduite 26 → 12 px, opacité 0 → 1, `animation-range: entry 0% cover 18%` |
| Dépliables `<details>` | mécanique actuelle conservée (`interpolate-size`, `::details-content`, 300 ms) |
| Sécurités | bloc `prefers-reduced-motion` actuel conservé + **ajouter** `@media print { *, *::before, *::after { animation: none !important; opacity: 1 !important; transform: none !important; } }` |

---

## 6. Architecture de page cible

La page passe de **11 blocs à 8**, avec un objectif : **mobile ≤ 12 000 px** (−35 %).

| # | Section (ancre) | Rôle | Devenir |
|---|---|---|---|
| 0 | Header | naviguer, convertir | refonte libellés + CTA (§7.1) |
| 1 | Hero `#taveni` | comprendre en 5 s + preuve produit | refonte majeure (§7.2) — absorbe l'actuelle intro-band |
| 2 | Le problème `#probleme` | tension, chapitre 1 | 5 cartes → récit + 3 items (§7.3) |
| 3 | Le fonctionnement `#fonctionnement` | montrer le flux + le résultat | fusion pipeline + cas d'usage (§7.4) |
| 4 | La différence `#difference` | positionnement vs notes IA | tableau conservé, dégraissé (§7.5) |
| 5 | Le coût d'IA `#cout-ia` | artefact JSON, cible IT/finance | conservée, resserrée (§7.6) |
| 6 | Confiance & souveraineté `#souverainete` | chapitre 2 — fusion ontology + architecture + capabilities | fusion 3 → 1 (§7.7) |
| 7 | Hyle Labs + contact `#contact` | crédibiliser + convertir | fusion company + contact + FAQ courte (§7.8) |
| — | Footer | légal, langues | enrichi léger (§7.9) |

Sections supprimées en tant que blocs autonomes : `intro-band` (fusionnée au hero),
`audiences` (fusionnée au fonctionnement), `capabilities`/« Évaluation » (fusionnée à
souveraineté + contact), `ontology` et `architecture` (fusionnées entre elles).
**Aucun contenu clé n'est perdu : il est redistribué ou passe en dépliable.**

⚠️ Chaque fusion/suppression implique la mise à jour synchronisée des `bindings` et des 3
langues dans `i18n.js` (contrainte §1.2). Budget clés : viser ~180 clés (244 aujourd'hui).

---

## 7. Spécification section par section

### 7.1 Header

- Libellés nav orientés visiteur : `Le problème` → conservé ; `Taveni` → `Produit` ;
  `Différence` → `Vs notes IA` ; `Coût IA` → conservé ; `Souveraineté` → `Confiance & données`.
  (Mettre à jour ancres + bindings `nav.*`.)
- CTA nav unique : **« Demander une évaluation »** → `#contact`. Le même libellé est utilisé
  partout (hero, sticky mobile, contact) — un seul verbe de conversion sur tout le site.
- `.logo { white-space: nowrap; }` (corrige la casse en 2 lignes à 375 px).
- Le rétrécissement sticky (`scroll-state`) est conservé.
- Mobile < 980 px : les liens disparaissent aujourd'hui sans alternative — ajouter un menu
  déroulant minimal (`<details>` stylé dans le header, CSS pur, pas de JS) listant les 5 ancres.
  Ne pas utiliser de hamburger JS.

### 7.2 Hero (refonte majeure)

Layout : 55/45, copy à gauche. Contenu :

1. Eyebrow conservé (`Logiciel français · édité par Hyle Labs`) — c'est un vrai signal de
   confiance, pas un badge décoratif.
2. H1 raccourci, une promesse : **« Vos réunions deviennent des décisions et des actions
   suivies. »** (le mot Taveni vit dans le logo et l'eyebrow ; le H1 parle au visiteur).
   Garder `accent-teal` sur « décisions » et « actions suivies ».
3. Lead 2 phrases max (aujourd'hui 4) : la mécanique (capte → retrouve → transforme → validation
   humaine) descend dans le fonctionnement.
4. CTA : primaire **« Demander une évaluation »** (mailto enrichi actuel), secondaire fantôme
   **« Voir le fonctionnement »** (ancre). Inversion de la hiérarchie actuelle.
5. **Artefact hero (remplace le screenshot de modale)** : une **fiche de décision Taveni**
   reconstruite en HTML/CSS pur — c'est l'objet que le produit fabrique :

   ```
   ┌─ décision #142 ─────────────── validée ● ─┐   ← étiquette mono + tampon corail
   │ « On valide le budget Q3 à 180 k€ »        │   ← citation, passage surligné wash corail
   │ Réunion comité — 00:17:42 · preuve audio   │   ← source mono
   │ ─────────────────────────────────────────  │
   │ → Action : notifier la direction financière │
   │   Nathalie D. · pour le 12/07 · CRM ✓ sync │   ← qui / quand / destination
   └─────────────────────────────────────────────┘
   ```

   Avantages : traduisible (bindings — le screenshot actuel ne l'est pas), net sur tout écran,
   ~0 KB, accessible (texte réel, plus d'`aria-hidden` sur la preuve), et il montre le
   **résultat**, pas un panneau de réglages. Une seconde fiche « action » peut dépasser
   derrière, décalée (asymétrie §4.2.3). Le webp actuel peut rester plus bas en appui du
   fonctionnement, dans un cadre neutre (filet 1 px + étiquette, sans pastilles macOS).
6. Les 3 `.proof-item` sont remplacés par **une ligne de texte simple** sous les CTA
   (pas un gabarit de stat) : « Décisions reliées à leur preuve · Actions qui, quoi, pour quand ·
   Validation humaine avant envoi » — trois fragments séparés par des puces, 15 px, `--ink-2`.
7. Les 4 `.signal` de l'intro-band : deux montent ici en une bande fine sous le hero (coût d'IA
   maîtrisé, corrections qui vous appartiennent — les deux différenciants), deux redescendent
   dans les sections où ils sont développés. La bande sombre intro-band disparaît.

### 7.3 Le problème (chapitre 1)

- Titre chapitre (`--text-h2-major`) conservé : « Vos meilleures décisions se prennent à l'oral.
  Puis elles disparaissent. » — il est bon.
- Les **5 truth-cards deviennent 3 moments d'un récit** (fusion : « Mémoire orale » + « Action »
  restent ; « Outil » + « Risque » + « Coût » se condensent en un item « Et ce qui compte
  n'arrive ni dans vos outils, ni sous contrôle ») présentés en **liste éditoriale numérotée**
  (chiffre maigre mono, filet, titre, 2 lignes) — pas des cartes, pas de pastilles colorées.
  Les mini-`<ul>` de tags (« décision, extrait, contexte ») sont supprimés (remplissage).
- La `truth-note` (introduction du Capital Token) est conservée telle quelle : c'est le pivot
  concret → concept du gradient éditorial.
- Un dépliable `<details class="more">` reprend les deux angles supprimés (risque d'accès,
  facture d'IA) pour ne rien perdre.

### 7.4 Le fonctionnement (fusion pipeline + cas d'usage)

- Titre : « Capture › Qualifie › Relit › Synchronise. » conservé (bon titre-objet).
- Le flux 4 étapes devient une **frise horizontale continue** (un seul artefact : rail 2 px
  `--line`, 4 jalons ; numéro en mono maigre `01`, pas de pastille pleine multicolore).
  En mobile : rail vertical à gauche, jalons empilés.
- Sous la frise, **le screenshot produit actuel** dans un cadre document neutre (filet,
  étiquette mono `taveni — import & contexte`, `aspect-ratio` corrigé en 16/9, `alt` descriptif
  réel, sans `aria-hidden`).
- Le dépliable « Voir le fonctionnement en détail » est conservé tel quel.
- Les 3 cas d'usage (Direction / Ventes & CS / Produit & ops) deviennent **3 lignes d'un même
  tableau** « Où commencer » (rôle · réunion type · outil de destination) — un artefact,
  pas trois cartes. Contenu textuel actuel conservé (bindings `audiences.*` re-ciblés).

### 7.5 La différence

- Le `difference-board` (tableau 3 colonnes) est le bon artefact : conservé, style document
  (en-tête mono, zébrage léger `--paper-2`), sans hover-lift.
- La `market-note` passe de 2 paragraphes + dépliable à 1 paragraphe + le dépliable Jevons
  conservé. Layout 40/60 (texte/board).

### 7.6 Le coût d'IA

- Conservée quasi telle quelle : le panneau JSON est déjà exemplaire. Changements :
  `panel-topbar` sans pastilles (étiquette mono seule), les 2 leads fusionnent en 1 + un
  dépliable « Comment le contexte est qualifié » (texte A2A/MCP actuel — jargon en
  progressive disclosure, conforme au gradient éditorial).
- Les 3 `result-cell` (qui/quoi/règle) sont conservées mais stylées en pied de document
  (filet supérieur, mono) plutôt qu'en cellules-cartes.

### 7.7 Confiance & souveraineté (chapitre 2 — fusion ontology + architecture + capabilities)

Structure en trois temps sur **une seule bande sombre** :

1. **« On délègue la tâche, pas l'apprentissage. »** (titre chapitre conservé) + lead actuel.
   Le `semantic-board` (phrase détectée → question → suite) est conservé : c'est le meilleur
   artefact du site après le JSON. Les 4 `meaning-layer` se condensent en 2 phrases dans le lead
   (leur contenu recoupe le board).
2. **Le registre** (`ledger`) conservé, enrichi d'une ligne : c'est l'artefact « traçabilité ».
   Les 4 `arch-point` deviennent 4 items d'une liste compacte à droite du registre
   (titre 16 px + 1 ligne, filet, sans cartes).
3. **« Mesurer la valeur, pas la hype. »** devient la conclusion de cette section (2 phrases +
   les 4 critères mesurés en ligne : temps de recherche · ressaisies · risques · coût d'IA),
   et pointe vers le contact. Les 6 capability-cards et leurs icônes sont supprimées ; leurs
   contenus uniques (processus ciblé, connecteur, règles d'accès) alimentent le mailto et la
   FAQ (§7.8).

### 7.8 Hyle Labs + contact (fusion + preuve humaine)

- Les 2 paragraphes « company » sont conservés, resserrés. Le pavé logo `company-mark`
  (360 px de gris) est réduit à une vignette 96 px alignée au titre.
- **Preuve humaine (nouveau, remplace la preuve sociale impossible)** : une ligne signée du
  fondateur — nom, titre (« Adryan Perez, fondateur — Lyon »), 2 phrases à la première personne
  sur pourquoi Taveni existe, et si accepté une photo réelle sobre (pas d'avatar IA ; à défaut,
  pas de photo du tout). Les acheteurs B2B achètent à des gens identifiables. Facts conservés
  en une ligne : `SASU française · RCS Lyon · RGPD par conception · données en Europe`.
- **Contact** : conserver le mailto (contrainte statique assumée) mais l'habiller en
  « périmètre d'évaluation » : 3 mentions au-dessus du bouton — « Réponse sous 48 h ·
  Évaluation sur un processus réel · Sans engagement ». Le corps du mailto actuel (contexte,
  outils, contraintes RGPD) est déjà bon.
- **FAQ courte (nouveau)** : 4-5 `<details class="more">` — « Faut-il changer d'outils ? »,
  « Où vont les données ? (RGPD) », « Que se passe-t-il si on change de modèle d'IA ? »,
  « Combien ça coûte ? » (réponse honnête pré-lancement : évaluation cadrée d'abord),
  « Quels outils connectez-vous ? ». Réutilise le composant existant ; excellent pour l'AEO
  (réponses citées par les assistants IA) ; ajouter le JSON-LD `FAQPage` correspondant,
  et envisager un `llms.txt` à la racine.

### 7.9 Footer

- Ajouter : rappel des 5 ancres + liens langues (`?lang=en|es|zh` — aide SEO/partage,
  les `hreflang` existent déjà) + mention « Fait à Lyon, sans tracker tiers » (signal RGPD
  différenciant, vérifiable). Mentions légales dialog conservé.

---

## 8. Accessibilité (WCAG 2.2 AA — checklist de refonte)

- [ ] Contrastes : tout texte < 18 px ≥ 4,5:1 dans **les deux thèmes** (visés : `--muted`
      corrigé ≈ 5,3:1 ; corail jamais en texte < 18 px ; cyan sombre 13:1 OK).
- [ ] Plancher 14 px pour tout texte informatif (13 px toléré uniquement mentions légales).
- [ ] Cibles tactiles ≥ 24×24 px (2.5.8) — déjà globalement OK (min-height 44 px), vérifier
      les nouveaux liens footer et le menu mobile.
- [ ] Focus non masqué (2.4.11) : `scroll-padding-bottom: 96px` sur `html` en mobile pour que
      le sticky CTA ne recouvre jamais l'élément focusé.
- [ ] `lang="en|es|zh"` sur chaque bouton de langue ; libellés `aria-pressed` conservés.
- [ ] La fiche de décision hero est du texte réel (lue par les lecteurs d'écran) ; le screenshot
      produit reçoit un `alt` descriptif et perd `aria-hidden`.
- [ ] Ordre des headings strict (h1 → h2 → h3, aucun saut).
- [ ] `@media print` : opacité/transformations neutralisées (cf. §5.4).
- [ ] Skip-link, dialog natif, `scroll-margin-top` : conservés.

## 9. Performance (budgets)

| Métrique | Budget | Aujourd'hui |
|---|---|---|
| Poids total (FR, à froid) | < 500 KB | ~420 KB |
| LCP (4G, mobile) | < 1,5 s | ~OK (image 29 KB préchargée) |
| INP | < 200 ms | OK (quasi zéro JS) |
| CLS | < 0,1 | OK (dimensions images, font swap préchargé) |
| Requêtes | ≤ 12, zéro tierce | OK |

Règles : toute fonte ajoutée = woff2 sous-ensemble ≤ 35 KB/fichier, `font-display: swap`,
préload des seuls fichiers latin. La fiche de décision hero en HTML/CSS supprime à terme le
préload image du chemin critique (l'image descend sous la ligne de flottaison → retirer
`fetchpriority="high"` et le `<link rel="preload" as="image">`).

## 10. Process i18n obligatoire (rappel opérationnel)

Pour **chaque** lot de modifications :
1. Modifier le FR dans `index.html` (classes dédiées pour tout nouvel élément bindé).
2. Mettre à jour `bindings` (clés retirées/ajoutées) dans `assets/i18n.js`.
3. Écrire EN, ES, ZH pour chaque clé nouvelle/modifiée (ZH : refonte récente de qualité —
   maintenir le registre naturel, pas du mot-à-mot).
4. `node -c assets/i18n.js` + script de croisement clés/bindings : 0 manquante × 3 langues.
5. Bumper `?v=` du script dans `index.html`.
6. Mettre à jour `pageMeta` (title/description/og/schema) si le hero ou le positionnement bouge.

## 11. Plan d'exécution par phases

Chaque phase est shippable indépendamment, i18n synchronisée à chaque fois.

| Phase | Contenu | Critères d'acceptation |
|---|---|---|
| **P1 — Fondations** | Tokens (§5.1, §5.3), échelle typo (§5.2), fontes (option A ou B), motion réduite, fixes rapides : logo nowrap, `--muted`, `lang` sur boutons, `@media print`, `scroll-padding-bottom`, aspect-ratio hero 16/9, alt du screenshot | Aucun texte < 4,5:1 ; page identique en structure ; les 4 langues passent ; captures clair/sombre sans régression |
| **P2 — Hero + header** | §7.1, §7.2 : fiche de décision HTML/CSS, CTA unifiés, nav renommée, menu mobile `<details>`, suppression intro-band (redistribution des signaux) | 1 seul CTA primaire visible par écran mobile ; hero complet < 1 écran desktop ; LCP < 1,5 s ; bindings à jour |
| **P3 — Corps** | §7.3 à §7.6 : récit problème, frise fonctionnement + tableau cas d'usage, différence resserrée, coût IA dégraissé | Mobile ≤ 14 000 px ; plus aucune pastille macOS ni grille > 3 items équivalents |
| **P4 — Confiance + contact** | §7.7, §7.8, §7.9 : fusion souveraineté, mot du fondateur, FAQ + JSON-LD FAQPage, footer | Mobile ≤ 12 000 px ; FAQ valide (rich results test) ; clés i18n ~180, 0 manquante |
| **P5 — QA finale** | Audit navigateur complet (ci-dessous), relecture 3 cibles (§2), captures des 4 langues × 2 thèmes × 2 viewports | Tous budgets §9 tenus ; checklist §8 cochée |

**QA reproductible (skill browse / navigateur headless) :**

```bash
# serveur local
python3 -m http.server 8931 --bind 127.0.0.1 &
B goto "http://127.0.0.1:8931/index.html?lang=fr"   # puis en, es, zh
B js "window.__setTheme('dark')"                     # bascule thème
B viewport 375x812 ; B viewport 1440x900             # 2 viewports
B screenshot ... ; B console --errors                # rendu + erreurs
B js "document.documentElement.scrollHeight"         # budget hauteur
# ⚠️ pour les captures pleine page : injecter un style qui neutralise les
# animations (les reveals view() laissent le contenu hors-viewport à opacity:0)
```

## 12. Ce que ce document ne décide pas (à trancher avec le propriétaire)

1. **Fontes** : option A (Bricolage Grotesque + mono, ~70 KB) vs option B (Outfit conservée).
2. **Photo du fondateur** : oui/non (le mot signé fonctionne sans).
3. Le H1 exact et les microcopies finales (des propositions sont faites, la voix appartient
   au propriétaire).
4. L'ajout d'un `llms.txt` et le contenu précis de la FAQ pricing.

---

## Annexe — Sources (recherches du 02/07/2026)

**Tendances & techniques** : web.dev/articles/vitals (seuils CWV : LCP ≤ 2,5 s, INP ≤ 200 ms,
CLS ≤ 0,1, p75) · Smashing Magazine « CSS Wrapped 2025 » (scroll-driven animations, view
transitions, OKLCH standard des design systems) · NN/g « Scrolljacking 101 », « B2B Usability » ·
Studio Meyer « Webdesign trends 2026 reality check » (bento ~67 % des top SaaS, +23 % scroll
depth ; couche de lisibilité IA/llms.txt) · Pope Tech (motion accessible 150-400 ms) ·
Digital Applied, étude 2 000 landing pages Q4 2025-Q1 2026 (médiane B2B SaaS 4,1 % ;
3+ CTA hero = −8 % ; sticky bottom CTA +11 % ; clients nommés +22 % ; vidéo autoplay −7 % ;
stock photos −11 % ; LCP < 1 s → 4,4 % de conversion) · Genesys Growth (structure de page B2B) ·
W3C « What's new in WCAG 2.2 » (2.5.8 Target Size, 2.4.11 Focus Not Obscured, 3.3.7 Redundant
Entry) ; WCAG 3 = draft ~2028+, ne pas s'y réorganiser · Creative Boom / Made Good Designs
(perception des fontes 2026 : Inter = défaut omniprésent ; pairing mono + humaniste) ·
UXPin (mesure 50-75 caractères) · Evil Martians (OKLCH).

**Anti-AI-slop** : Adrian Krebs, analyse de 1 590 soumissions Show HN (22 % avec 4+ patterns
slop) · dataset « vibecoded-design-tells » (3,2 M posts Reddit ; tell n°1 : « they all look the
same » ; gradient indigo « VibeCode Purple ») · Paul Bakaus, impeccable.style/slop (46 patterns ;
« colored border on rounded card » = tell le plus reconnaissable) · 925 Studios « AI slop web
design guide 2026 » (« specificity is the antidote to slop » ; distributional convergence) ·
dev.to/alanwest « How to fix the AI-generated look » (bannir les défauts : Inter display,
indigo, rounded-2xl uniforme, icônes Lucide empilées) · Webstacks / Trajectory (crédibilité B2B :
produit réel montré, humains identifiables, preuve vérifiable) · Youware « Escaping the purple
prison » (Stripe/Linear : headlines spécifiques vs moyennées).
