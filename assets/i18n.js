(() => {
    const supportedLanguages = {
        fr: { htmlLang: "fr", ogLocale: "fr_FR" },
        en: { htmlLang: "en", ogLocale: "en_US" },
        es: { htmlLang: "es", ogLocale: "es_ES" },
        zh: { htmlLang: "zh-Hans", ogLocale: "zh_CN" }
    };
    const languagePaths = {
        fr: "/",
        en: "/en/",
        es: "/es/",
        zh: "/zh/"
    };

    const mailto = (subject, body) => {
        const params = new URLSearchParams();
        if (subject) params.set("subject", subject);
        if (body) params.set("body", body);
        return "mailto:contact@hyle-labs.net?" + params.toString();
    };

    const taveniContact = (subject, message) => {
        const params = new URLSearchParams({
            source_page: "/hyle-labs",
            subject,
            message,
            plan_interest: "enterprise"
        });
        return "https://taveni.ai/contact?" + params.toString();
    };

    const bindings = [
        ["skip", ".skip-link", "text"],
        ["logo.aria", ".logo", "attr:aria-label"],
        ["nav.aria", ".nav", "attr:aria-label"],
        ["language.aria", ".language-switcher", "attr:aria-label"],
        ["nav.problem", ".nav > a:nth-of-type(1)", "text"],
        ["nav.how", ".nav > a:nth-of-type(2)", "text"],
        ["nav.cost", ".nav > a:nth-of-type(3)", "text"],
        ["nav.data", ".nav > a:nth-of-type(4)", "text"],
        ["nav.cta", ".nav > a:nth-of-type(5)", "text"],
        ["nav.menu", ".nav-menu-label", "text"],
        ["nav.problem", ".nav-menu-panel .nav-m1", "text"],
        ["nav.how", ".nav-menu-panel .nav-m2", "text"],
        ["nav.vsnotes", ".nav-menu-panel .nav-m3", "text"],
        ["nav.cost", ".nav-menu-panel .nav-m4", "text"],
        ["nav.data", ".nav-menu-panel .nav-m5", "text"],
        ["nav.cta", ".nav-menu-panel .nav-m6", "text"],
        ["nav.cta", ".mobile-cta span", "text"],
        ["nav.cta", ".mobile-cta", "attr:aria-label"],
        ["theme.toggle", ".theme-toggle", "attr:aria-label"],
        ["theme.toggle", ".theme-toggle", "attr:title"],
        ["hero.eyebrow", ".hero .eyebrow", "text"],
        ["hero.title", "#hero-title", "html"],
        ["hero.lead", ".hero-copy > p", "html"],
        ["hero.primary", ".hero-actions .button-primary", "label"],
        ["hero.primary.href", ".hero-actions .button-primary", "attr:href"],
        ["hero.secondary", ".hero-actions .button-secondary", "label"],
        ["hero.keyline", ".hero-keyline", "text"],
        ["hero.shot.alt", ".doc-frame--hero img", "attr:alt"],
        ["hero.shot.label", ".doc-frame--hero .doc-frame-label", "text"],
        ["hero.signal.1", ".hero-signal:nth-child(1) .hero-signal-text", "html"],
        ["hero.signal.2", ".hero-signal:nth-child(2) .hero-signal-text", "html"],
        ["truth.kicker", ".truth-section .section-kicker", "text"],
        ["truth.title", "#preuve-title", "text"],
        ["truth.lead", ".truth-section .section-lead", "text"],
        ["problem.1.title", ".problem-item:nth-child(1) h3", "text"],
        ["problem.1.text", ".problem-item:nth-child(1) p", "text"],
        ["problem.2.title", ".problem-item:nth-child(2) h3", "text"],
        ["problem.2.text", ".problem-item:nth-child(2) p", "text"],
        ["problem.3.title", ".problem-item:nth-child(3) h3", "text"],
        ["problem.3.text", ".problem-item:nth-child(3) p", "text"],
        ["problem.more.summary", ".problem-more > summary", "text"],
        ["problem.more.1", ".problem-more .more-list li:nth-child(1)", "text"],
        ["problem.more.2", ".problem-more .more-list li:nth-child(2)", "text"],
        ["truth.note", ".truth-note", "text"],
        ["difference.kicker", ".difference .section-kicker", "text"],
        ["difference.title", "#difference-title", "text"],
        ["difference.lead", ".difference .section-lead", "text"],
        ["difference.market.title", ".market-note h3", "text"],
        ["difference.market.text.1", ".market-note p:nth-of-type(1)", "text"],
        ["difference.board.aria", ".difference-board", "attr:aria-label"],
        ["difference.header.subject", ".difference-row.header span:nth-child(1)", "text"],
        ["difference.header.classic", ".difference-row.header span:nth-child(2)", "text"],
        ["difference.header.taveni", ".difference-row.header span:nth-child(3)", "text"],
        ["difference.row.1.subject", ".difference-row:nth-child(2) b", "text"],
        ["difference.row.1.classic", ".difference-row:nth-child(2) span:nth-of-type(1)", "text"],
        ["difference.ai.label", ".difference-row:nth-child(2) span:nth-of-type(1)", "attr:data-label"],
        ["difference.row.1.taveni", ".difference-row:nth-child(2) span:nth-of-type(2)", "text"],
        ["difference.taveni.label", ".difference-row:nth-child(2) span:nth-of-type(2)", "attr:data-label"],
        ["difference.row.2.subject", ".difference-row:nth-child(3) b", "text"],
        ["difference.row.2.classic", ".difference-row:nth-child(3) span:nth-of-type(1)", "text"],
        ["difference.ai.label", ".difference-row:nth-child(3) span:nth-of-type(1)", "attr:data-label"],
        ["difference.row.2.taveni", ".difference-row:nth-child(3) span:nth-of-type(2)", "text"],
        ["difference.taveni.label", ".difference-row:nth-child(3) span:nth-of-type(2)", "attr:data-label"],
        ["difference.row.3.subject", ".difference-row:nth-child(4) b", "text"],
        ["difference.row.3.classic", ".difference-row:nth-child(4) span:nth-of-type(1)", "text"],
        ["difference.ai.label", ".difference-row:nth-child(4) span:nth-of-type(1)", "attr:data-label"],
        ["difference.row.3.taveni", ".difference-row:nth-child(4) span:nth-of-type(2)", "text"],
        ["difference.taveni.label", ".difference-row:nth-child(4) span:nth-of-type(2)", "attr:data-label"],
        ["difference.row.4.subject", ".difference-row:nth-child(5) b", "text"],
        ["difference.row.4.classic", ".difference-row:nth-child(5) span:nth-of-type(1)", "text"],
        ["difference.ai.label", ".difference-row:nth-child(5) span:nth-of-type(1)", "attr:data-label"],
        ["difference.row.4.taveni", ".difference-row:nth-child(5) span:nth-of-type(2)", "text"],
        ["difference.taveni.label", ".difference-row:nth-child(5) span:nth-of-type(2)", "attr:data-label"],
        ["difference.jevons.summary", ".market-note details.more summary", "text"],
        ["difference.jevons.text", ".market-note details.more p", "text"],
        ["tco.kicker", ".tco-section .section-kicker", "text"],
        ["tco.title", ".tco-copy .section-title", "text"],
        ["tco.lead.1", ".tco-copy .section-lead", "text"],
        ["tco.more.summary", ".tco-more > summary", "text"],
        ["tco.more.text", ".tco-more > p", "text"],
        ["tco.panel.aria", ".tco-panel", "attr:aria-label"],
        ["tco.file", ".panel-topbar code", "text"],
        ["tco.code", ".tco-object code", "html"],
        ["tco.result.aria", ".tco-result", "attr:aria-label"],
        ["tco.result.1.title", ".result-cell:nth-child(1) b", "text"],
        ["tco.result.1.text", ".result-cell:nth-child(1) span", "text"],
        ["tco.result.2.title", ".result-cell:nth-child(2) b", "text"],
        ["tco.result.2.text", ".result-cell:nth-child(2) span", "text"],
        ["tco.result.3.title", ".result-cell:nth-child(3) b", "text"],
        ["tco.result.3.text", ".result-cell:nth-child(3) span", "text"],
        ["ontology.kicker", ".ontology .section-kicker", "text"],
        ["ontology.title", ".ontology .section-title", "text"],
        ["ontology.lead", ".ontology .section-lead", "text"],
        ["ontology.board.aria", ".semantic-board", "attr:aria-label"],
        ["ontology.header.1", ".semantic-row:nth-child(1) span:nth-child(1)", "text"],
        ["ontology.header.2", ".semantic-row:nth-child(1) span:nth-child(2)", "text"],
        ["ontology.header.3", ".semantic-row:nth-child(1) span:nth-child(3)", "text"],
        ["ontology.row.1.proposal", ".semantic-row:nth-child(2) span:nth-child(1)", "text"],
        ["ontology.row.1.check", ".semantic-row:nth-child(2) span:nth-child(2)", "text"],
        ["ontology.row.1.status", ".semantic-row:nth-child(2) .decision", "text"],
        ["ontology.row.2.proposal", ".semantic-row:nth-child(3) span:nth-child(1)", "text"],
        ["ontology.row.2.check", ".semantic-row:nth-child(3) span:nth-child(2)", "text"],
        ["ontology.row.2.status", ".semantic-row:nth-child(3) .decision", "text"],
        ["ontology.row.3.proposal", ".semantic-row:nth-child(4) span:nth-child(1)", "text"],
        ["ontology.row.3.check", ".semantic-row:nth-child(4) span:nth-child(2)", "text"],
        ["ontology.row.3.status", ".semantic-row:nth-child(4) .decision", "text"],
        ["ontology.note", ".ontology-note", "text"],
        ["pipeline.kicker", "section.pipeline .section-kicker", "text"],
        ["pipeline.title", "section.pipeline .section-title", "text"],
        ["pipeline.lead", "section.pipeline .section-lead", "text"],
        ["pipeline.step.1.title", ".pipeline-steps .step:nth-child(1) h3", "text"],
        ["pipeline.step.1.text", ".pipeline-steps .step:nth-child(1) p", "text"],
        ["pipeline.step.2.title", ".pipeline-steps .step:nth-child(2) h3", "text"],
        ["pipeline.step.2.text", ".pipeline-steps .step:nth-child(2) p", "text"],
        ["pipeline.step.3.title", ".pipeline-steps .step:nth-child(3) h3", "text"],
        ["pipeline.step.3.text", ".pipeline-steps .step:nth-child(3) p", "text"],
        ["pipeline.step.4.title", ".pipeline-steps .step:nth-child(4) h3", "text"],
        ["pipeline.step.4.text", ".pipeline-steps .step:nth-child(4) p", "text"],
        ["pipeline.more.summary", ".pipeline-more > summary", "text"],
        ["pipeline.more.1", ".pipeline-more .more-list li:nth-child(1)", "text"],
        ["pipeline.more.2", ".pipeline-more .more-list li:nth-child(2)", "text"],
        ["pipeline.more.3", ".pipeline-more .more-list li:nth-child(3)", "text"],
        ["pipeline.more.4", ".pipeline-more .more-list li:nth-child(4)", "text"],
        ["pipeline.shot1.alt", ".doc-frame--validation img", "attr:alt"],
        ["pipeline.shot1.label", ".doc-frame--validation .doc-frame-label", "text"],
        ["pipeline.shot2.alt", ".doc-frame--transcription img", "attr:alt"],
        ["pipeline.shot2.label", ".doc-frame--transcription .doc-frame-label", "text"],
        ["pipeline.shot3.alt", ".doc-frame--correction img", "attr:alt"],
        ["pipeline.shot3.label", ".doc-frame--correction .doc-frame-label", "text"],
        ["pipeline.shot4.alt", ".doc-frame--push-integrations img", "attr:alt"],
        ["pipeline.shot4.label", ".doc-frame--push-integrations .doc-frame-label", "text"],
        ["pipeline.shot5.alt", ".doc-frame--push-apercu img", "attr:alt"],
        ["pipeline.shot5.label", ".doc-frame--push-apercu .doc-frame-label", "text"],
        ["pipeline.shot6.alt", ".doc-frame--push-reliee img", "attr:alt"],
        ["pipeline.shot6.label", ".doc-frame--push-reliee .doc-frame-label", "text"],
        ["pipeline.actions.alt", ".doc-frame--actions img", "attr:alt"],
        ["pipeline.actions.label", ".doc-frame--actions .doc-frame-label", "text"],
        ["start.title", ".start-title", "text"],
        ["start.aria", ".start-table", "attr:aria-label"],
        ["start.header.1", ".start-row.header span:nth-child(1)", "text"],
        ["start.header.2", ".start-row.header span:nth-child(2)", "text"],
        ["start.header.3", ".start-row.header span:nth-child(3)", "text"],
        ["start.row.1.role", ".start-table .start-row:nth-child(2) b", "text"],
        ["start.row.1.meeting", ".start-table .start-row:nth-child(2) .start-meeting", "text"],
        ["start.row.1.outcome", ".start-table .start-row:nth-child(2) .start-outcome", "text"],
        ["start.row.2.role", ".start-table .start-row:nth-child(3) b", "text"],
        ["start.row.2.meeting", ".start-table .start-row:nth-child(3) .start-meeting", "text"],
        ["start.row.2.outcome", ".start-table .start-row:nth-child(3) .start-outcome", "text"],
        ["start.row.3.role", ".start-table .start-row:nth-child(4) b", "text"],
        ["start.row.3.meeting", ".start-table .start-row:nth-child(4) .start-meeting", "text"],
        ["start.row.3.outcome", ".start-table .start-row:nth-child(4) .start-outcome", "text"],
        ["architecture.ledger.aria", ".ledger", "attr:aria-label"],
        ["architecture.ledger.header.1", ".ledger-row:nth-child(1) span:nth-child(1)", "text"],
        ["architecture.ledger.header.2", ".ledger-row:nth-child(1) span:nth-child(2)", "text"],
        ["architecture.ledger.header.3", ".ledger-row:nth-child(1) span:nth-child(3)", "text"],
        ["architecture.ledger.1.info", ".ledger-row:nth-child(2) span:nth-child(1)", "text"],
        ["architecture.ledger.1.origin", ".ledger-row:nth-child(2) span:nth-child(2)", "text"],
        ["architecture.ledger.1.state", ".ledger-row:nth-child(2) span:nth-child(3)", "text"],
        ["architecture.ledger.2.info", ".ledger-row:nth-child(3) span:nth-child(1)", "text"],
        ["architecture.ledger.2.origin", ".ledger-row:nth-child(3) span:nth-child(2)", "text"],
        ["architecture.ledger.2.state", ".ledger-row:nth-child(3) span:nth-child(3)", "text"],
        ["architecture.ledger.3.info", ".ledger-row:nth-child(4) span:nth-child(1)", "text"],
        ["architecture.ledger.3.origin", ".ledger-row:nth-child(4) span:nth-child(2)", "text"],
        ["architecture.ledger.3.state", ".ledger-row:nth-child(4) span:nth-child(3)", "text"],
        ["architecture.point.1.title", ".trust-list li:nth-child(1) strong", "text"],
        ["architecture.point.1.text", ".trust-list li:nth-child(1) span", "text"],
        ["architecture.point.2.title", ".trust-list li:nth-child(2) strong", "text"],
        ["architecture.point.2.text", ".trust-list li:nth-child(2) span", "text"],
        ["architecture.point.3.title", ".trust-list li:nth-child(3) strong", "text"],
        ["architecture.point.3.text", ".trust-list li:nth-child(3) span", "text"],
        ["architecture.point.4.title", ".trust-list li:nth-child(4) strong", "text"],
        ["architecture.point.4.text", ".trust-list li:nth-child(4) span", "text"],
        ["trust.measure.title", ".measure-note h3", "text"],
        ["trust.measure.text", ".measure-note > p:nth-of-type(1)", "text"],
        ["trust.measure.criteria", ".measure-note .measure-criteria", "text"],
        ["company.kicker", ".company .section-kicker", "text"],
        ["company.title", "#company-title", "text"],
        ["company.text.1", ".company-copy > p:nth-of-type(1)", "text"],
        ["company.text.2", ".company-copy > p:nth-of-type(2)", "text"],
        ["founder.quote", ".founder-quote", "text"],
        ["founder.sig", ".founder-sig", "text"],
        ["company.facts", ".company-facts-line", "text"],
        ["contact.kicker", ".contact .section-kicker", "text"],
        ["contact.title", ".contact-box h2", "text"],
        ["contact.text", ".contact-box p:not(.contact-meta)", "text"],
        ["contact.meta", ".contact-meta", "text"],
        ["contact.href", ".contact-box .button-primary", "attr:href"],
        ["faq.title", ".faq-title", "text"],
        ["faq.1.q", ".faq-1 > summary", "text"],
        ["faq.1.a", ".faq-1 > p", "text"],
        ["faq.2.q", ".faq-2 > summary", "text"],
        ["faq.2.a", ".faq-2 > p", "text"],
        ["faq.3.q", ".faq-3 > summary", "text"],
        ["faq.3.a", ".faq-3 > p", "text"],
        ["faq.4.q", ".faq-4 > summary", "text"],
        ["faq.4.a", ".faq-4 > p", "text"],
        ["faq.5.q", ".faq-5 > summary", "text"],
        ["faq.5.a", ".faq-5 > p", "text"],
        ["footer.info", ".footer-inner > div:first-child", "html"],
        ["footer.contact", ".footer-links a", "text"],
        ["footer.legal", ".footer-links button", "text"],
        ["footer.nav.aria", ".footer-nav", "attr:aria-label"],
        ["nav.problem", ".footer-nav .nav-f1", "text"],
        ["nav.how", ".footer-nav .nav-f2", "text"],
        ["nav.vsnotes", ".footer-nav .nav-f3", "text"],
        ["nav.cost", ".footer-nav .nav-f4", "text"],
        ["nav.data", ".footer-nav .nav-f5", "text"],
        ["legal.title", "#legal-title", "text"],
        ["legal.item.1.label", "#legal-dialog .legal-item:nth-child(1) b", "text"],
        ["legal.item.1.value", "#legal-dialog .legal-item:nth-child(1) span", "text"],
        ["legal.item.2.label", "#legal-dialog .legal-item:nth-child(2) b", "text"],
        ["legal.item.2.value", "#legal-dialog .legal-item:nth-child(2) span", "text"],
        ["legal.item.3.label", "#legal-dialog .legal-item:nth-child(3) b", "text"],
        ["legal.item.3.value", "#legal-dialog .legal-item:nth-child(3) span", "text"],
        ["legal.item.4.label", "#legal-dialog .legal-item:nth-child(4) b", "text"],
        ["legal.item.4.value", "#legal-dialog .legal-item:nth-child(4) span", "text"],
        ["legal.item.5.label", "#legal-dialog .legal-item:nth-child(5) b", "text"],
        ["legal.item.5.value", "#legal-dialog .legal-item:nth-child(5) span", "text"],
        ["legal.item.6.label", "#legal-dialog .legal-item:nth-child(6) b", "text"],
        ["legal.item.6.value", "#legal-dialog .legal-item:nth-child(6) span", "text"],
        ["legal.item.7.label", "#legal-dialog .legal-item:nth-child(7) b", "text"],
        ["legal.item.7.value", "#legal-dialog .legal-item:nth-child(7) span", "text"],
        ["legal.item.8.label", "#legal-dialog .legal-item:nth-child(8) b", "text"],
        ["legal.item.8.value", "#legal-dialog .legal-item:nth-child(8) span", "text"],
        ["legal.close", "#legal-close", "text"]
    ];

    const pageMeta = {
        fr: {
            title: "Taveni — évaluer une mémoire opérationnelle pour vos réunions | Hyle Labs",
            description: "Taveni structure décisions, actions et contexte issus des réunions. Dans une évaluation cadrée, les équipes relisent chaque élément avant tout envoi externe, selon un chemin vérifié. Édité par Hyle Labs, en France.",
            ogTitle: "Taveni — évaluer le passage de la réunion à l'action",
            ogDescription: "Taveni structure les décisions et actions à relire. Tout envoi externe reste soumis à une approbation humaine explicite et à un chemin vérifié dans l'évaluation.",
            ogImage: "assets/og-fr.png",
            ogImageAlt: "Carte Taveni : vos réunions structurées en décisions et actions à relire, avec une fiche de décision en attente de revue.",
            schemaDescription: "Taveni est conçu pour structurer les décisions, actions et contexte issus des réunions. Tout envoi vers un outil externe reste soumis à une approbation humaine explicite et à un chemin vérifié dans l'évaluation."
        },
        en: {
            title: "Taveni — evaluate operational memory for your meetings | Hyle Labs",
            description: "Taveni structures decisions, actions, and context from meetings. In a scoped evaluation, teams review each item before any external handoff through a verified path. Built by Hyle Labs in France.",
            ogTitle: "Taveni — evaluate the path from meeting to action",
            ogDescription: "Taveni structures decisions and actions for review. Any external handoff requires explicit human approval and a path verified during the evaluation.",
            ogImage: "assets/og-en.png",
            ogImageAlt: "Taveni card: your meetings structured as decisions and actions to review, with a decision slip awaiting review.",
            schemaDescription: "Taveni is designed to structure decisions, actions, and meeting context. Any handoff to an external tool requires explicit human approval and a path verified during the evaluation."
        },
        es: {
            title: "Taveni — evalúa la memoria operativa de tus reuniones | Hyle Labs",
            description: "Taveni estructura decisiones, acciones y contexto de las reuniones. En una evaluación acotada, el equipo revisa cada elemento antes de cualquier envío externo por una vía verificada. Desarrollado por Hyle Labs en Francia.",
            ogTitle: "Taveni — evalúa el paso de la reunión a la acción",
            ogDescription: "Taveni estructura decisiones y acciones para revisión. Todo envío externo exige aprobación humana explícita y una vía verificada durante la evaluación.",
            ogImage: "assets/og-es.png",
            ogImageAlt: "Tarjeta Taveni: tus reuniones estructuradas como decisiones y acciones por revisar, con una ficha de decisión pendiente de revisión.",
            schemaDescription: "Taveni está diseñado para estructurar decisiones, acciones y contexto de reuniones. Todo envío a una herramienta externa exige aprobación humana explícita y una vía verificada durante la evaluación."
        },
        zh: {
            title: "Taveni — 评估会议的运营记忆流程 | Hyle Labs",
            description: "Taveni 用于结构化会议中的决策、行动与上下文。在限定范围的评估中，团队会先审核每个条目；任何外部交接都必须经过明确人工批准并使用已验证的路径。由法国 Hyle Labs 出品。",
            ogTitle: "Taveni — 评估从会议到行动的路径",
            ogDescription: "Taveni 将决策和行动结构化以供审核。任何外部交接都需要明确的人工批准，以及评估期间验证过的路径。",
            ogImage: "assets/og-zh.png",
            ogImageAlt: "Taveni 卡片：将会议结构化为待审核的决策与行动，附待审核的决策卡。",
            schemaDescription: "Taveni 旨在结构化会议中的决策、行动与上下文。任何向外部工具的交接都需要明确的人工批准，并使用评估期间验证过的路径。"
        }
    };

    const translations = {
        en: {
            "skip": "Skip to content",
            "logo.aria": "Hyle Labs — home",
            "nav.aria": "Main navigation",
            "language.aria": "Choose language",
            "nav.problem": "The problem",
            "nav.how": "How it works",
            "nav.vsnotes": "Taveni vs AI notes",
            "nav.cost": "AI cost",
            "nav.data": "Trust & data",
            "nav.cta": "Request an evaluation",
            "nav.menu": "Menu",
            "theme.toggle": "Toggle light or dark theme",
            "hero.eyebrow": "French software · built by Hyle Labs",
            "hero.title": "Your meetings, structured as <span class=\"accent-teal\">decisions and actions to review</span>.",
            "hero.lead": "After a meeting, the essentials get lost: who decided what, by when, in which tool. <strong>Taveni is designed to structure decisions and actions</strong> for your teams to review before any external handoff. The path to a business tool is verified and scoped during the evaluation.",
            "hero.primary": "Request an evaluation",
            "hero.primary.href": taveniContact("Taveni evaluation", "Hello Hyle Labs,\n\nContext / need:\nTools to connect:\nGDPR / security constraints:\n\nThanks,"),
            "hero.secondary": "See how it works",
            "hero.keyline": "Decisions linked to their evidence · Actions with who, what, by when · Human validation before sending",
            "hero.shot.alt": "Taveni interface: timestamped transcript of a sales review — the decision “We approve the Q3 budget at €180,000” and the proposed action with its CRM target.",
            "hero.shot.label": "taveni — decision linked to its evidence",
            "hero.signal.1": "<strong>Goal: less unnecessary context.</strong> The evaluation measures what structured context avoids reprocessing without claiming savings before observation.",
            "hero.signal.2": "<strong>Your corrections stay under your control.</strong> Their storage, use, and any sharing with third-party models or tools are scoped before the evaluation.",
            "truth.kicker": "The problem",
            "truth.title": "Your best decisions are made out loud. Then they vanish.",
            "truth.lead": "Summary tools produce recaps that nobody reopens. The real value is elsewhere: in the decisions your teams make out loud, own, and need to find, review, and execute.",
            "problem.1.title": "The decision evaporates.",
            "problem.1.text": "Budget, priority, an exception granted to a customer: the decision is made out loud, then lost inside a long transcript.",
            "problem.2.title": "The next step is too vague.",
            "problem.2.text": "\"I'll handle it\" is not clear enough to create a reliable task in a project or support tool.",
            "problem.3.title": "Nothing reaches the tools.",
            "problem.3.text": "The recap exists, but the action reaches neither the CRM, support desk, nor project tool — and nobody controls who can see what.",
            "problem.more.summary": "Two angles often forgotten: access rights and the AI bill",
            "problem.more.1": "Sensitive information — sharing everything with an assistant or integration is not acceptable for every account, project, or topic: access rights must follow the decision.",
            "problem.more.2": "The AI bill — the cheaper AI gets, the more everything is sent without filtering; you end up paying a lot for noise.",
            "truth.note": "Taveni is designed to turn meeting material into sourced operational memory: decisions and actions to review before any handoff. The evaluation verifies what is actually retained, useful, and reusable in your workflow.",
            "difference.kicker": "Positioning",
            "difference.title": "Taveni starts where automatic notes stop.",
            "difference.lead": "Automatic notes tell you what was said. Taveni aims to structure what deserves operational review: source, owner, status, access rule, and proposed destination. The evaluation verifies this behavior on a bounded workflow.",
            "difference.market.title": "Why sending everything to AI gets expensive.",
            "difference.market.text.1": "As AI gets cheaper, more unfiltered context may be sent back through it. Taveni is designed to separate raw verbatim from qualified information. The context avoided and its cost effect must be measured during the evaluation, not promised in advance.",
            "difference.jevons.summary": "The Jevons paradox, in a nutshell",
            "difference.jevons.text": "When a resource gets cheaper, its use may increase. For AI, that makes calls and processed context worth measuring; the Taveni evaluation compares the baseline with the observed scope without assuming the outcome.",
            "difference.board.aria": "Taveni positioning versus AI note-taking tools",
            "difference.header.subject": "Topic",
            "difference.header.classic": "Classic AI notes tool",
            "difference.header.taveni": "Taveni angle",
            "difference.ai.label": "AI notes",
            "difference.taveni.label": "Taveni",
            "difference.row.1.subject": "Summary",
            "difference.row.1.classic": "Produces a readable summary, often detached from execution.",
            "difference.row.1.taveni": "Isolates the decisions, actions, risks, and evidence worth keeping.",
            "difference.row.2.subject": "Qualification",
            "difference.row.2.classic": "Detects tasks or next steps from the conversation.",
            "difference.row.2.taveni": "Requires source, owner, right, review status, and destination.",
            "difference.row.3.subject": "Execution",
            "difference.row.3.classic": "Sends notes or actions based on available integrations.",
            "difference.row.3.taveni": "Prepares a handoff after validation; the actual path is verified during the evaluation.",
            "difference.row.4.subject": "Control",
            "difference.row.4.classic": "Controls vary by product and configuration.",
            "difference.row.4.taveni": "Requires access, destination, retention, and cost to be scoped before the handoff.",
            "tco.kicker": "The cost of AI",
            "tco.title": "Measure the context that is actually useful before reprocessing it.",
            "tco.lead.1": "Cost depends on the model, volume, and workflow. The evaluation compares a baseline with the context actually processed without promising savings before measurement.",
            "tco.more.summary": "How context gets qualified",
            "tco.more.text": "When an A2A/MCP context flow is included and verified, meeting profile, business vocabulary, and organizational context are qualified before extraction. Source, owner, access, and destination rules are tested in scope; they do not prove general availability.",
            "tco.panel.aria": "Business context example",
            "tco.file": "processing.context.json",
            "tco.code": `{
  <span class="key">"meeting_title"</span>: <span class="str">"Q3 sales review"</span>,
  <span class="key">"participants"</span>: [
    { <span class="key">"name"</span>: <span class="str">"Nathalie Dupont"</span>,
      <span class="key">"role"</span>: <span class="str">"CFO"</span> },
    { <span class="key">"name"</span>: <span class="str">"Karim Benali"</span>,
      <span class="key">"role"</span>: <span class="str">"Sales Lead"</span> }
  ],
  <span class="key">"user_profile"</span>: {
    <span class="key">"company"</span>: <span class="str">"Hyle Labs"</span>,
    <span class="key">"job_title"</span>: <span class="str">"Finance lead"</span>
  },
  <span class="key">"vocabulary"</span>: [
    <span class="str">"ARR"</span>, <span class="str">"renewal"</span>, <span class="str">"Q3 committee"</span>
  ],
  <span class="key">"org_projects"</span>: [<span class="str">"Q3 Expansion"</span>],
  <span class="key">"org_clients"</span>: [<span class="str">"Acme Corp"</span>],
  <span class="key">"org_products"</span>: [<span class="str">"Taveni"</span>],
  <span class="key">"output_instruction"</span>: <span class="str">"Prioritize decisions, actions, and evidence."</span>,
  <span class="note">"routing_rules"</span>: <span class="str">"Do not send without owner, source, or right"</span>
}`,
            "tco.result.aria": "Expected result from business context",
            "tco.result.1.title": "who",
            "tco.result.1.text": "directory and roles clarified",
            "tco.result.2.title": "what",
            "tco.result.2.text": "projects, clients, vocabulary retained",
            "tco.result.3.title": "measure",
            "tco.result.3.text": "processed context compared with baseline",
            "ontology.kicker": "Trust & sovereignty",
            "ontology.title": "Delegate the task, not the learning.",
            "ontology.lead": "An AI proposal has operational value only after human review. The evaluation documents how decisions, corrections, and rules are stored, protected, and reused; it assumes no absolute portability or protection.",
            "ontology.board.aria": "Example of intentional validation",
            "ontology.header.1": "Detected phrase",
            "ontology.header.2": "Question to resolve",
            "ontology.header.3": "Next step",
            "ontology.row.1.proposal": "\"We approve the Q3 budget\"",
            "ontology.row.1.check": "Can we find the excerpt that supports this decision?",
            "ontology.row.1.status": "to verify",
            "ontology.row.2.proposal": "\"I'll handle it Monday\"",
            "ontology.row.2.check": "Are the owner, deadline, and subject clear enough?",
            "ontology.row.2.status": "to complete",
            "ontology.row.3.proposal": "\"Confidential account topic\"",
            "ontology.row.3.check": "Should this information remain limited to certain people?",
            "ontology.row.3.status": "to confirm",
            "ontology.note": "If the model changes, the evaluation verifies which decisions, corrections, and rules remain exportable and reusable within the agreed scope.",
            "pipeline.kicker": "Workflow to evaluate",
            "pipeline.title": "Capture › Qualify › Review › Prepare the handoff.",
            "pipeline.lead": "The evaluation verifies what can be captured, structured, and reviewed. A handoff to a business tool is included only after human approval and verification of the destination path.",
            "pipeline.step.1.title": "Capture.",
            "pipeline.step.1.text": "Capture a meeting, call, or existing source without losing the oral context.",
            "pipeline.step.2.title": "Qualify.",
            "pipeline.step.2.text": "Add roles, projects, vocabulary, access rules, evidence, and expected destination.",
            "pipeline.step.3.title": "Review.",
            "pipeline.step.3.text": "Confirm important decisions and actions or keep incomplete items pending.",
            "pipeline.step.4.title": "Prepare the handoff.",
            "pipeline.step.4.text": "After approval, use the connector verified in scope or a documented manual export.",
            "pipeline.more.summary": "See how it works in detail",
            "pipeline.more.1": "Capture — the meeting audio (or an existing file) is transcribed and timestamped, to link every passage to the exact moment it was said.",
            "pipeline.more.2": "Qualification — Taveni proposes decisions, actions, and risks with an owner, deadline, access rule, and destination to verify.",
            "pipeline.more.3": "Review — your teams confirm, complete, or reject; this review never grants implicit permission to write elsewhere.",
            "pipeline.more.4": "Handoff — after explicit approval, the result follows the path verified during the evaluation: an included connector or documented manual export.",
            "pipeline.shot1.alt": "Taveni interface: the review queue of decisions, commitments and risks extracted from a meeting, with confidence level and status.",
            "pipeline.shot1.label": "taveni — human review of decisions and actions",
            "pipeline.shot2.alt": "Taveni transcript timestamped per speaker, with detected and validated entities.",
            "pipeline.shot2.label": "taveni — timestamped transcript and qualified entities",
            "pipeline.shot3.alt": "Taveni dialog to correct an item before validating it.",
            "pipeline.shot3.label": "taveni — human correction before validation",
            "pipeline.shot4.alt": "Taveni interface, Integrations page: the ClickUp card shows Connected, Sollice workspace, destination Commercial / Actions commerciales; every outgoing task requires exact approval.",
            "pipeline.shot4.label": "taveni — ClickUp connection with a controlled destination",
            "pipeline.shot5.alt": "Taveni dialog: review of the ClickUp task before creation, with the destination list and the reminder that any change requires a new preview.",
            "pipeline.shot5.label": "taveni — human approval before sending to ClickUp",
            "pipeline.shot6.alt": "Taveni interface: a qualified action carries the ClickUp mark of its created task, while the other actions remain to be sent.",
            "pipeline.shot6.label": "taveni — action linked to its ClickUp task",
            "pipeline.actions.alt": "Taveni interface: actions extracted from a sales review, with priority, confidence level, deadline and review threshold.",
            "pipeline.actions.label": "taveni — qualified actions awaiting review",
            "start.title": "Where to start",
            "start.aria": "First use cases by team",
            "start.header.1": "Team",
            "start.header.2": "Typical meeting",
            "start.header.3": "What Taveni does with it",
            "start.row.1.role": "Leadership",
            "start.row.1.meeting": "Committees and trade-offs",
            "start.row.1.outcome": "Find why a priority, budget, or date was approved, with the excerpt and expected next steps.",
            "start.row.2.role": "Sales & CS",
            "start.row.2.meeting": "Customer meetings",
            "start.row.2.outcome": "Commercial commitments become proposed actions to review; the CRM, support, or follow-up handoff is selected and verified during the evaluation.",
            "start.row.3.role": "Product & ops",
            "start.row.3.meeting": "Operational decisions",
            "start.row.3.outcome": "What was decided across teams stays visible, including actions without a clear owner.",
            "architecture.ledger.aria": "Traceability example",
            "architecture.ledger.header.1": "Information",
            "architecture.ledger.header.2": "Origin",
            "architecture.ledger.header.3": "State",
            "architecture.ledger.1.info": "decision",
            "architecture.ledger.1.origin": "meeting · 00:17:42 · oral proof",
            "architecture.ledger.1.state": "validated",
            "architecture.ledger.2.info": "commitment",
            "architecture.ledger.2.origin": "speaker · excerpt · confidence",
            "architecture.ledger.2.state": "needs review",
            "architecture.ledger.3.info": "risk",
            "architecture.ledger.3.origin": "access rules · confidentiality",
            "architecture.ledger.3.state": "restricted",
            "architecture.point.1.title": "Sourced decisions.",
            "architecture.point.1.text": "The evaluation checks the link between a decision and its evidence before sharing or handoff.",
            "architecture.point.2.title": "Share the minimum useful context.",
            "architecture.point.2.text": "The scope states which information each tool or assistant may receive.",
            "architecture.point.3.title": "Sensitive data.",
            "architecture.point.3.text": "Access, services used, retention, and sending rules are documented before the evaluation.",
            "architecture.point.4.title": "Learning loop.",
            "architecture.point.4.text": "The evaluation measures whether validations, rejections, and corrections improve later suggestions.",
            "trust.measure.title": "Measure value, not hype.",
            "trust.measure.text": "A Taveni evaluation does not promise full automation. On one of your real processes, it measures four simple things:",
            "trust.measure.criteria": "search time · manual re-entry · qualified incidents · observed AI cost",
            "company.kicker": "Hyle Labs",
            "company.title": "AI products that turn speech into capital.",
            "company.text.1": "We build products for teams whose decisions and actions move between conversations, tools, and assistants. Taveni is designed to structure oral decisions as decisions, evidence, and actions to review within a verified scope.",
            "company.text.2": "Our guiding line is simple: delegate the task, not the learning. AI should reduce manual entry without taking away the team's ability to review, limit, and decide what gets executed.",
            "founder.quote": "“I created Taveni because our teams' most important decisions lived in recaps nobody reread. We're building the tool that makes them executable — without ever taking the decision away from humans.”",
            "founder.sig": "Adryan Perez — founder, Hyle Labs · Lyon",
            "company.facts": "French SASU · RCS Lyon · Taveni in scoped evaluation",
            "contact.kicker": "Talk with us",
            "contact.title": "Measure Taveni on a real workflow?",
            "contact.text": "Send us your context: meeting type, target tool, GDPR constraints, and success criteria. We'll reply with a proposed scope, measurement criteria, and the conditions required for the evaluation.",
            "contact.meta": "Evaluation on a real process · Scoped engagement · No commitment",
            "contact.href": mailto("Taveni evaluation", "Hello Hyle Labs,\n\nContext / need:\nTools to connect:\nGDPR / security constraints:\n\nThanks,"),
            "faq.title": "Straight answers",
            "faq.1.q": "Do we need to change tools to use Taveni?",
            "faq.1.a": "Not necessarily. The evaluation starts from your current toolset and defines one handoff. Depending on verified availability, that handoff uses an in-scope connector or a documented manual export.",
            "faq.2.q": "Where does the data go? (GDPR)",
            "faq.2.a": "Processing depends on the agreed scope. Before an evaluation, we document the data involved, services used, access, retention, and deployment constraints.",
            "faq.3.q": "What happens if we switch AI models?",
            "faq.3.a": "The evaluation documents what remains stored, exportable, and reusable if the model changes. Portability depends on the verified product scope, formats, and contract terms.",
            "faq.4.q": "How much does it cost?",
            "faq.4.a": "Taveni is in a scoped evaluation phase. Scope, success criteria, required resources, and commercial terms are defined before anything starts.",
            "faq.5.q": "Which tools do you connect?",
            "faq.5.a": "Evaluations target one handoff to a CRM, support, or project-management tool. Connector availability is checked during scoping; a manual export may be used as a fallback.",
            "footer.info": "<strong>Hyle Labs SASU</strong><br>254 rue Vendôme 69003 LYON · contact@hyle-labs.net<br>© <span id=\"year\">2026</span> Hyle Labs. Taveni is published by Hyle Labs.",
            "footer.contact": "Contact",
            "footer.legal": "Legal notice",
            "footer.nav.aria": "Site map",
            "legal.title": "Legal notice",
            "legal.item.1.label": "Company",
            "legal.item.1.value": "HYLE LABS · SASU",
            "legal.item.2.label": "Registered office",
            "legal.item.2.value": "254 rue Vendôme 69003 LYON",
            "legal.item.3.label": "SIREN",
            "legal.item.3.value": "101 857 431 · RCS Lyon",
            "legal.item.4.label": "Intra-community VAT",
            "legal.item.4.value": "FR92101857431",
            "legal.item.5.label": "Publication director",
            "legal.item.5.value": "Adryan Perez, President",
            "legal.item.6.label": "Hosting",
            "legal.item.6.value": "GitHub Pages · GitHub, Inc.",
            "legal.item.7.label": "Email",
            "legal.item.7.value": "contact@hyle-labs.net",
            "legal.item.8.label": "Publisher",
            "legal.item.8.value": "Hyle Labs, publisher of Taveni",
            "legal.close": "Close"
        },
        es: {
            "skip": "Ir al contenido",
            "logo.aria": "Hyle Labs — inicio",
            "nav.aria": "Navegación principal",
            "language.aria": "Elegir idioma",
            "nav.problem": "El problema",
            "nav.how": "Cómo funciona",
            "nav.vsnotes": "Taveni vs notas IA",
            "nav.cost": "Coste de IA",
            "nav.data": "Confianza y datos",
            "nav.cta": "Solicitar una evaluación",
            "nav.menu": "Menú",
            "theme.toggle": "Cambiar tema claro u oscuro",
            "hero.eyebrow": "Software francés · creado por Hyle Labs",
            "hero.title": "Tus reuniones, estructuradas como <span class=\"accent-teal\">decisiones y acciones por revisar</span>.",
            "hero.lead": "Después de una reunión, lo esencial se pierde: quién decidió qué, para cuándo y en qué herramienta. <strong>Taveni está diseñado para estructurar decisiones y acciones</strong> para que el equipo las revise antes de cualquier envío externo. La vía hacia una herramienta de negocio se verifica y delimita durante la evaluación.",
            "hero.primary": "Solicitar una evaluación",
            "hero.primary.href": taveniContact("Evaluación de Taveni", "Hola Hyle Labs,\n\nContexto / necesidad:\nHerramientas a conectar:\nRestricciones RGPD / seguridad:\n\nGracias,"),
            "hero.secondary": "Ver cómo funciona",
            "hero.keyline": "Decisiones vinculadas a su prueba · Acciones con quién, qué, para cuándo · Validación humana antes del envío",
            "hero.shot.alt": "Interfaz de Taveni: transcripción con marcas de tiempo de una revisión comercial — la decisión «Aprobamos el presupuesto del Q3: 180 000 €» y la acción propuesta con su destino CRM.",
            "hero.shot.label": "taveni — decisión vinculada a su prueba",
            "hero.signal.1": "<strong>Objetivo: menos contexto innecesario.</strong> La evaluación mide qué reprocesamiento evita el contexto estructurado, sin anunciar ahorros antes de observarlos.",
            "hero.signal.2": "<strong>Tus correcciones permanecen bajo tu control.</strong> Su almacenamiento, uso y posible intercambio con modelos o herramientas de terceros se delimitan antes de la evaluación.",
            "truth.kicker": "El problema",
            "truth.title": "Tus mejores decisiones se toman en voz alta. Y luego desaparecen.",
            "truth.lead": "Las herramientas de resumen producen actas que nadie reabre. El valor real está en otra parte: en las decisiones que tus equipos toman en voz alta, asumen y necesitan poder encontrar, revisar y ejecutar.",
            "problem.1.title": "La decisión se evapora.",
            "problem.1.text": "Presupuesto, prioridad, una excepción concedida a un cliente: la decisión se toma en voz alta y luego se pierde en una larga transcripción.",
            "problem.2.title": "El siguiente paso es demasiado vago.",
            "problem.2.text": "«Me ocupo» no basta para crear una tarea fiable en una herramienta de proyecto o soporte.",
            "problem.3.title": "Nada llega a las herramientas.",
            "problem.3.text": "El resumen existe, pero la acción no llega ni al CRM, ni al soporte, ni a la herramienta de proyecto — y nadie controla quién puede ver qué.",
            "problem.more.summary": "Dos ángulos que se olvidan a menudo: los derechos de acceso y la factura de IA",
            "problem.more.1": "Información sensible — compartirlo todo con un asistente o una integración no es aceptable para cada cuenta, proyecto o tema: los derechos de acceso deben acompañar a la decisión.",
            "problem.more.2": "Factura de IA — cuanto más barata es la IA, más se le envía todo sin filtrar; se acaba pagando mucho por ruido.",
            "truth.note": "Taveni está diseñado para convertir el material de una reunión en memoria operativa con fuente: decisiones y acciones por revisar antes de cualquier entrega. La evaluación verifica qué se conserva y resulta realmente útil y reutilizable en tu flujo.",
            "difference.kicker": "Posicionamiento",
            "difference.title": "Taveni empieza donde termina la nota automática.",
            "difference.lead": "La nota automática cuenta lo que se dijo. Taveni busca estructurar lo que merece revisión operativa: fuente, responsable, estado, regla de acceso y destino propuesto. La evaluación verifica este comportamiento en un flujo acotado.",
            "difference.market.title": "Por qué enviarlo todo a la IA sale caro.",
            "difference.market.text.1": "A medida que la IA se abarata, puede reenviarse más contexto sin filtrar. Taveni está diseñado para separar el verbatim bruto de la información cualificada. El contexto evitado y su efecto en el coste deben medirse durante la evaluación, no prometerse de antemano.",
            "difference.jevons.summary": "La paradoja de Jevons, en dos palabras",
            "difference.jevons.text": "Cuando un recurso se abarata, su uso puede aumentar. Para la IA, conviene medir las llamadas y el contexto procesado; la evaluación Taveni compara la línea base con el alcance observado sin dar por hecho el resultado.",
            "difference.board.aria": "Posicionamiento de Taveni frente a herramientas de notas con IA",
            "difference.header.subject": "Tema",
            "difference.header.classic": "Herramienta clásica de notas con IA",
            "difference.header.taveni": "Enfoque Taveni",
            "difference.ai.label": "Notas con IA",
            "difference.taveni.label": "Taveni",
            "difference.row.1.subject": "Resumen",
            "difference.row.1.classic": "Produce un resumen legible, a menudo separado de la ejecución.",
            "difference.row.1.taveni": "Aísla los arbitrajes, acciones, riesgos y pruebas que merecen conservarse.",
            "difference.row.2.subject": "Cualificación",
            "difference.row.2.classic": "Detecta tareas o siguientes pasos a partir de la conversación.",
            "difference.row.2.taveni": "Exige fuente, responsable, derecho, estado de revisión y destino.",
            "difference.row.3.subject": "Ejecución",
            "difference.row.3.classic": "Envía notas o acciones según las integraciones disponibles.",
            "difference.row.3.taveni": "Prepara una entrega tras la validación; la vía efectiva se verifica durante la evaluación.",
            "difference.row.4.subject": "Control",
            "difference.row.4.classic": "Los controles varían según el producto y su configuración.",
            "difference.row.4.taveni": "Exige delimitar acceso, destino, conservación y coste antes de la entrega.",
            "tco.kicker": "El coste de la IA",
            "tco.title": "Mide el contexto realmente útil antes de volver a procesarlo.",
            "tco.lead.1": "El coste depende del modelo, el volumen y el flujo. La evaluación compara una línea base con el contexto procesado sin prometer ahorros antes de medirlos.",
            "tco.more.summary": "Cómo se cualifica el contexto",
            "tco.more.text": "Cuando un flujo de contexto A2A/MCP está incluido y verificado, el perfil de reunión, el vocabulario de negocio y el contexto de organización se cualifican antes de la extracción. Las reglas de fuente, responsable, acceso y destino se prueban dentro del alcance; no demuestran disponibilidad general.",
            "tco.panel.aria": "Ejemplo de contexto de negocio",
            "tco.file": "processing.context.json",
            "tco.code": `{
  <span class="key">"meeting_title"</span>: <span class="str">"Revisión comercial Q3"</span>,
  <span class="key">"participants"</span>: [
    { <span class="key">"name"</span>: <span class="str">"Nathalie Dupont"</span>,
      <span class="key">"role"</span>: <span class="str">"CFO"</span> },
    { <span class="key">"name"</span>: <span class="str">"Karim Benali"</span>,
      <span class="key">"role"</span>: <span class="str">"Sales Lead"</span> }
  ],
  <span class="key">"user_profile"</span>: {
    <span class="key">"company"</span>: <span class="str">"Hyle Labs"</span>,
    <span class="key">"job_title"</span>: <span class="str">"Dirección financiera"</span>
  },
  <span class="key">"vocabulary"</span>: [
    <span class="str">"ARR"</span>, <span class="str">"renovación"</span>, <span class="str">"comité Q3"</span>
  ],
  <span class="key">"org_projects"</span>: [<span class="str">"Expansión Q3"</span>],
  <span class="key">"org_clients"</span>: [<span class="str">"Acme Corp"</span>],
  <span class="key">"org_products"</span>: [<span class="str">"Taveni"</span>],
  <span class="key">"output_instruction"</span>: <span class="str">"Priorizar decisiones, acciones y pruebas."</span>,
  <span class="note">"routing_rules"</span>: <span class="str">"No enviar sin responsable, fuente ni derecho"</span>
}`,
            "tco.result.aria": "Resultado esperado del contexto de negocio",
            "tco.result.1.title": "quién",
            "tco.result.1.text": "directorio y roles aclarados",
            "tco.result.2.title": "qué",
            "tco.result.2.text": "proyectos, clientes y vocabulario retenidos",
            "tco.result.3.title": "medida",
            "tco.result.3.text": "contexto procesado frente a la línea base",
            "ontology.kicker": "Confianza y soberanía",
            "ontology.title": "Se delega la tarea, no el aprendizaje.",
            "ontology.lead": "Una propuesta de IA solo tiene valor operativo tras la revisión humana. La evaluación documenta cómo se almacenan, protegen y reutilizan decisiones, correcciones y reglas; no presupone portabilidad ni protección absolutas.",
            "ontology.board.aria": "Ejemplo de validación intencional",
            "ontology.header.1": "Frase detectada",
            "ontology.header.2": "Pregunta a resolver",
            "ontology.header.3": "Siguiente paso",
            "ontology.row.1.proposal": "\"Validamos el presupuesto Q3\"",
            "ontology.row.1.check": "¿Se puede encontrar el extracto que justifica esta decisión?",
            "ontology.row.1.status": "por verificar",
            "ontology.row.2.proposal": "\"Me ocupo el lunes\"",
            "ontology.row.2.check": "¿El responsable, el plazo y el tema están suficientemente claros?",
            "ontology.row.2.status": "por completar",
            "ontology.row.3.proposal": "\"Tema confidencial de cuenta\"",
            "ontology.row.3.check": "¿Esta información debe quedar limitada a ciertas personas?",
            "ontology.row.3.status": "por confirmar",
            "ontology.note": "Si cambia el modelo, la evaluación verifica qué decisiones, correcciones y reglas siguen siendo exportables y reutilizables dentro del alcance acordado.",
            "pipeline.kicker": "Flujo por evaluar",
            "pipeline.title": "Captura › Cualifica › Revisa › Prepara la entrega.",
            "pipeline.lead": "La evaluación verifica qué puede capturarse, estructurarse y revisarse. Una entrega a una herramienta de negocio solo se incluye tras la aprobación humana y la verificación de la vía de destino.",
            "pipeline.step.1.title": "Capturar.",
            "pipeline.step.1.text": "Captura una reunión, llamada o fuente existente sin perder el contexto oral.",
            "pipeline.step.2.title": "Cualificar.",
            "pipeline.step.2.text": "Añade roles, proyectos, vocabulario, reglas de acceso, prueba y destino esperado.",
            "pipeline.step.3.title": "Revisar.",
            "pipeline.step.3.text": "Confirma decisiones y acciones importantes o mantén pendientes los elementos incompletos.",
            "pipeline.step.4.title": "Preparar la entrega.",
            "pipeline.step.4.text": "Tras la aprobación, usa el conector verificado en el alcance o una exportación manual documentada.",
            "pipeline.more.summary": "Ver el funcionamiento en detalle",
            "pipeline.more.1": "Captura — el audio de la reunión (o un archivo existente) se transcribe y se marca con la hora, para vincular cada pasaje al momento exacto en que se dijo.",
            "pipeline.more.2": "Cualificación — Taveni propone decisiones, acciones y riesgos con responsable, plazo, regla de acceso y destino por verificar.",
            "pipeline.more.3": "Revisión — el equipo confirma, completa o rechaza; esta revisión nunca concede permiso implícito para escribir en otro sistema.",
            "pipeline.more.4": "Entrega — tras la aprobación explícita, el resultado sigue la vía verificada durante la evaluación: un conector incluido o una exportación manual documentada.",
            "pipeline.shot1.alt": "Interfaz de Taveni: cola de revisión de decisiones, compromisos y riesgos extraídos de una reunión, con nivel de confianza y estado.",
            "pipeline.shot1.label": "taveni — revisión humana de decisiones y acciones",
            "pipeline.shot2.alt": "Transcripción de Taveni con marcas de tiempo por interviniente, con entidades detectadas y validadas.",
            "pipeline.shot2.label": "taveni — transcripción con marcas de tiempo y entidades cualificadas",
            "pipeline.shot3.alt": "Diálogo de Taveni para corregir un elemento antes de validarlo.",
            "pipeline.shot3.label": "taveni — corrección humana antes de la validación",
            "pipeline.shot4.alt": "Interfaz de Taveni, página Integraciones: la tarjeta ClickUp indica Conectado, espacio Sollice, destino Commercial / Actions commerciales; cada tarea saliente exige una aprobación exacta.",
            "pipeline.shot4.label": "taveni — conexión ClickUp con destino controlado",
            "pipeline.shot5.alt": "Diálogo de Taveni: revisión de la tarea de ClickUp antes de su creación, con la lista de destino y el aviso de que cualquier cambio exige una nueva vista previa.",
            "pipeline.shot5.label": "taveni — aprobación humana antes del envío a ClickUp",
            "pipeline.shot6.alt": "Interfaz de Taveni: una acción cualificada lleva la marca ClickUp de su tarea creada, mientras las demás acciones siguen por enviar.",
            "pipeline.shot6.label": "taveni — acción vinculada a su tarea de ClickUp",
            "pipeline.actions.alt": "Interfaz de Taveni: acciones extraídas de una revisión comercial, con prioridad, nivel de confianza, fecha límite y umbral de revisión.",
            "pipeline.actions.label": "taveni — acciones cualificadas pendientes de revisión",
            "start.title": "Por dónde empezar",
            "start.aria": "Primeros casos de uso por equipo",
            "start.header.1": "Equipo",
            "start.header.2": "Reunión tipo",
            "start.header.3": "Qué hace Taveni con ella",
            "start.row.1.role": "Dirección",
            "start.row.1.meeting": "Comités y arbitrajes",
            "start.row.1.outcome": "Recuperar por qué se aprobó una prioridad, un presupuesto o una fecha, con el extracto y los siguientes pasos esperados.",
            "start.row.2.role": "Ventas y CS",
            "start.row.2.meeting": "Reuniones con clientes",
            "start.row.2.outcome": "Los compromisos comerciales se convierten en acciones propuestas por revisar; la entrega a CRM, soporte o seguimiento se elige y verifica durante la evaluación.",
            "start.row.3.role": "Producto y ops",
            "start.row.3.meeting": "Decisiones operativas",
            "start.row.3.outcome": "Lo decidido entre equipos sigue visible, incluidas las acciones sin responsable claro.",
            "architecture.ledger.aria": "Ejemplo de trazabilidad",
            "architecture.ledger.header.1": "Información",
            "architecture.ledger.header.2": "Origen",
            "architecture.ledger.header.3": "Estado",
            "architecture.ledger.1.info": "decisión",
            "architecture.ledger.1.origin": "reunión · 00:17:42 · prueba oral",
            "architecture.ledger.1.state": "validada",
            "architecture.ledger.2.info": "compromiso",
            "architecture.ledger.2.origin": "interviniente · extracto · confianza",
            "architecture.ledger.2.state": "por revisar",
            "architecture.ledger.3.info": "riesgo",
            "architecture.ledger.3.origin": "reglas de acceso · confidencialidad",
            "architecture.ledger.3.state": "restringido",
            "architecture.point.1.title": "Decisiones con fuente.",
            "architecture.point.1.text": "La evaluación comprueba el vínculo entre una decisión y su prueba antes de compartirla o entregarla.",
            "architecture.point.2.title": "Compartir el mínimo útil.",
            "architecture.point.2.text": "El alcance especifica qué información puede recibir cada herramienta o asistente.",
            "architecture.point.3.title": "Datos sensibles.",
            "architecture.point.3.text": "Los accesos, servicios utilizados, conservación y reglas de envío se documentan antes de la evaluación.",
            "architecture.point.4.title": "Bucle de aprendizaje.",
            "architecture.point.4.text": "La evaluación mide si las validaciones, rechazos y correcciones mejoran las propuestas posteriores.",
            "trust.measure.title": "Medir el valor, no la hype.",
            "trust.measure.text": "Una evaluación Taveni no promete una automatización total. Sobre uno de tus procesos reales, mide cuatro cosas simples:",
            "trust.measure.criteria": "tiempo de búsqueda · recaptura manual · incidentes cualificados · coste de IA observado",
            "company.kicker": "Hyle Labs",
            "company.title": "Productos de IA para convertir lo oral en capital.",
            "company.text.1": "Construimos productos para equipos cuyas decisiones y acciones circulan entre conversaciones, herramientas y asistentes. Taveni está diseñado para estructurar arbitrajes orales como decisiones, pruebas y acciones por revisar dentro de un alcance verificado.",
            "company.text.2": "Nuestra línea directriz es simple: delegar la tarea, no el aprendizaje. La IA debe reducir la captura manual sin quitar a los equipos la capacidad de revisar, limitar y decidir qué se ejecuta.",
            "founder.quote": "«Creé Taveni porque las decisiones más importantes de nuestros equipos vivían en actas que nadie releía. Construimos la herramienta que las hace ejecutables — sin quitarles nunca la decisión a las personas.»",
            "founder.sig": "Adryan Perez — fundador, Hyle Labs · Lyon",
            "company.facts": "SASU francesa · RCS Lyon · Taveni en evaluación acotada",
            "contact.kicker": "Hablemos",
            "contact.title": "¿Medir Taveni en un flujo de trabajo real?",
            "contact.text": "Envíanos tu contexto: tipo de reunión, herramienta objetivo, restricciones RGPD y criterios de éxito. Te responderemos con una propuesta de alcance, criterios de medición y las condiciones necesarias para la evaluación.",
            "contact.meta": "Evaluación sobre un proceso real · Alcance definido · Sin compromiso",
            "contact.href": mailto("Evaluación de Taveni", "Hola Hyle Labs,\n\nContexto / necesidad:\nHerramientas a conectar:\nRestricciones RGPD / seguridad:\n\nGracias,"),
            "faq.title": "Respuestas directas",
            "faq.1.q": "¿Hay que cambiar de herramientas para usar Taveni?",
            "faq.1.a": "No necesariamente. La evaluación parte de tus herramientas actuales y define una entrega. Según la disponibilidad verificada, utiliza un conector incluido en el alcance o una exportación manual documentada.",
            "faq.2.q": "¿A dónde van los datos? (RGPD)",
            "faq.2.a": "El tratamiento depende del alcance acordado. Antes de una evaluación, documentamos los datos implicados, los servicios utilizados, los accesos, la conservación y las restricciones de despliegue.",
            "faq.3.q": "¿Qué pasa si cambiamos de modelo de IA?",
            "faq.3.a": "La evaluación documenta qué se conserva y sigue siendo exportable y reutilizable si cambia el modelo. La portabilidad depende del alcance de producto, los formatos y las condiciones contractuales verificados.",
            "faq.4.q": "¿Cuánto cuesta?",
            "faq.4.a": "Taveni está en fase de evaluación acotada. El alcance, los criterios de éxito, los recursos necesarios y las condiciones comerciales se definen antes de empezar.",
            "faq.5.q": "¿Qué herramientas conectáis?",
            "faq.5.a": "Las evaluaciones se centran en una entrega hacia un CRM, soporte o gestión de proyectos. La disponibilidad del conector se comprueba durante el alcance; una exportación manual puede servir de alternativa.",
            "footer.info": "<strong>Hyle Labs SASU</strong><br>254 rue Vendôme 69003 LYON · contact@hyle-labs.net<br>© <span id=\"year\">2026</span> Hyle Labs. Taveni es desarrollado por Hyle Labs.",
            "footer.contact": "Contacto",
            "footer.legal": "Aviso legal",
            "footer.nav.aria": "Mapa del sitio",
            "legal.title": "Aviso legal",
            "legal.item.1.label": "Sociedad",
            "legal.item.1.value": "HYLE LABS · SASU",
            "legal.item.2.label": "Domicilio social",
            "legal.item.2.value": "254 rue Vendôme 69003 LYON",
            "legal.item.3.label": "SIREN",
            "legal.item.3.value": "101 857 431 · RCS Lyon",
            "legal.item.4.label": "IVA intracom.",
            "legal.item.4.value": "FR92101857431",
            "legal.item.5.label": "Director de publicación",
            "legal.item.5.value": "Adryan Perez, Presidente",
            "legal.item.6.label": "Alojamiento",
            "legal.item.6.value": "GitHub Pages · GitHub, Inc.",
            "legal.item.7.label": "Email",
            "legal.item.7.value": "contact@hyle-labs.net",
            "legal.item.8.label": "Editor",
            "legal.item.8.value": "Hyle Labs, editor de Taveni",
            "legal.close": "Cerrar"
        },
        zh: {
            "skip": "跳转至正文",
            "logo.aria": "Hyle Labs — 首页",
            "nav.aria": "主导航",
            "language.aria": "选择语言",
            "nav.problem": "痛点解析",
            "nav.how": "工作原理",
            "nav.vsnotes": "Taveni 与 AI 笔记",
            "nav.cost": "AI 成本",
            "nav.data": "信任与数据",
            "nav.cta": "申请评估",
            "nav.menu": "菜单",
            "theme.toggle": "切换日间/夜间模式",
            "hero.eyebrow": "法国软件 · 由 Hyle Labs 研发",
            "hero.title": "将会议结构化为<span class=\"accent-teal\">待审核的决策与行动</span>。",
            "hero.lead": "会议结束后，关键信息容易流失：谁决定了什么、期限是什么、目标系统在哪里。<strong>Taveni 旨在结构化这些决策与行动</strong>，供团队在任何外部交接前审核。通往业务工具的路径会在评估期间验证并限定范围。",
            "hero.primary": "申请评估",
            "hero.primary.href": taveniContact("Taveni 评估", "Hyle Labs 您好：\n\n背景 / 需求:\n需要对接的工具:\nGDPR / 安全要求:\n\n谢谢！"),
            "hero.secondary": "了解工作原理",
            "hero.keyline": "决策关联原始依据 · 行动明确负责人与期限 · 任何外部交接前须人工确认",
            "hero.shot.alt": "Taveni 界面：销售复盘的时间戳转写——决策“Q3 预算定为 18 万欧元”及附带 CRM 目标的建议行动。",
            "hero.shot.label": "taveni — 决策及其证据",
            "hero.signal.1": "<strong>目标：减少不必要的上下文。</strong>评估会测量结构化上下文避免了哪些重复处理，不会在观察前宣称节省效果。",
            "hero.signal.2": "<strong>您的修正始终由您掌控。</strong>在评估开始前，我们会明确其存储、使用方式，以及是否会与第三方模型或工具共享。",
            "truth.kicker": "痛点剖析",
            "truth.title": "最重要的决策往往在口头沟通中诞生，随后却销声匿迹。",
            "truth.lead": "常规摘要工具生成的会议纪要无人问津。真正的价值在于：您团队在口头沟通中做出的、需要被查找、审查和执行的决策。",
            "problem.1.title": "决策凭空蒸发。",
            "problem.1.text": "预算、优先级、给客户的特批……决策在口头达成后，便淹没在冗长的会议记录中。",
            "problem.2.title": "下一步模糊不清。",
            "problem.2.text": "一句“我来处理”无法在项目或客服工具中生成可靠的任务。",
            "problem.3.title": "信息无法触达系统。",
            "problem.3.text": "纪要虽在，但行动并未进入 CRM、客服或项目管理工具——而且没有人掌控谁能看到什么。",
            "problem.more.summary": "两个常被忽视的角度：访问权限与 AI 账单",
            "problem.more.1": "敏感信息——将所有信息全盘托给 AI 助手或集成工具，对某些客户、项目或话题而言是不可接受的：访问权限必须与决策同行。",
            "problem.more.2": "AI 账单——AI 越便宜，人们就越倾向于不加过滤地发送所有内容，最终为大量无用信息买单。",
            "truth.note": "Taveni 旨在把会议材料转化为带来源的运营记忆：在任何交接前供人审核的决策与行动。评估会验证哪些内容在您的流程中确实被保留、有效并可复用。",
            "difference.kicker": "核心定位",
            "difference.title": "Taveni 的起点，正是传统会议纪要的终点。",
            "difference.lead": "自动纪要说明“说了什么”。Taveni 旨在结构化值得运营审核的内容：来源、负责人、状态、访问规则和建议目标。评估会在限定流程中验证这一行为。",
            "difference.market.title": "为什么把所有内容都扔给 AI 会很贵？",
            "difference.market.text.1": "随着 AI 成本下降，更多未筛选的上下文可能被重复处理。Taveni 旨在区分原始逐字稿和已定性的内容。避免处理的上下文及其成本影响必须在评估中测量，不能预先承诺。",
            "difference.jevons.summary": "杰文斯悖论（Jevons Paradox）简述",
            "difference.jevons.text": "当资源变便宜时，使用量可能增加。对于 AI，应测量调用次数和处理的上下文；Taveni 评估会比较基线与实际范围，不预设结果。",
            "difference.board.aria": "Taveni 与传统 AI 纪要工具的定位对比",
            "difference.header.subject": "对比维度",
            "difference.header.classic": "传统 AI 纪要工具",
            "difference.header.taveni": "Taveni 视角",
            "difference.ai.label": "AI 纪要",
            "difference.taveni.label": "Taveni",
            "difference.row.1.subject": "摘要",
            "difference.row.1.classic": "生成可读摘要，通常与实际执行脱节。",
            "difference.row.1.taveni": "剥离出值得保留的决策、行动、风险和凭证。",
            "difference.row.2.subject": "定性",
            "difference.row.2.classic": "从对话中检测任务或后续步骤。",
            "difference.row.2.taveni": "强制要求来源、负责人、权限、审核状态和目标系统。",
            "difference.row.3.subject": "执行",
            "difference.row.3.classic": "基于可用集成发送笔记或行动。",
            "difference.row.3.taveni": "在审核后准备交接；实际路径会在评估期间验证。",
            "difference.row.4.subject": "管控",
            "difference.row.4.classic": "控制能力取决于具体产品和配置。",
            "difference.row.4.taveni": "要求在交接前明确访问、目标、保留期限和成本范围。",
            "tco.kicker": "AI 成本",
            "tco.title": "再次处理前，先测量真正有用的上下文。",
            "tco.lead.1": "成本取决于模型、数据量和流程。评估会比较基线与实际处理的上下文，不会在测量前承诺节省。",
            "tco.more.summary": "上下文如何被定性",
            "tco.more.text": "当 A2A/MCP 上下文流程已纳入范围并完成验证时，会议画像、业务词表和组织上下文会在抽取前定性。来源、负责人、访问和目标规则只在约定范围内测试，并不证明普遍可用。",
            "tco.panel.aria": "业务上下文示例",
            "tco.file": "processing.context.json",
            "tco.code": `{
    <span class="key">"meeting_title"</span>: <span class="str">"Q3 销售回顾"</span>,
    <span class="key">"participants"</span>: [
        { <span class="key">"name"</span>: <span class="str">"Nathalie Dupont"</span>,
        <span class="key">"role"</span>: <span class="str">"CFO"</span> },
        { <span class="key">"name"</span>: <span class="str">"Karim Benali"</span>,
        <span class="key">"role"</span>: <span class="str">"销售主管"</span> }
    ],
    <span class="key">"user_profile"</span>: {
        <span class="key">"company"</span>: <span class="str">"Hyle Labs"</span>,
        <span class="key">"job_title"</span>: <span class="str">"财务负责人"</span>
    },
    <span class="key">"vocabulary"</span>: [
        <span class="str">"ARR"</span>, <span class="str">"续约"</span>, <span class="str">"Q3 委员会"</span>
    ],
    <span class="key">"org_projects"</span>: [<span class="str">"Q3 扩张"</span>],
    <span class="key">"org_clients"</span>: [<span class="str">"Acme Corp"</span>],
    <span class="key">"org_products"</span>: [<span class="str">"Taveni"</span>],
    <span class="key">"output_instruction"</span>: <span class="str">"优先保留决策、行动和凭证。"</span>,
    <span class="note">"routing_rules"</span>: <span class="str">"无负责人、来源或权限不得发送"</span>
    }`,
            "tco.result.aria": "业务上下文的预期结果",
            "tco.result.1.title": "谁",
            "tco.result.1.text": "明确人员目录与角色",
            "tco.result.2.title": "什么",
            "tco.result.2.text": "保留项目、客户和词表",
            "tco.result.3.title": "测量",
            "tco.result.3.text": "实际处理上下文与基线对比",
            "ontology.kicker": "信任与数据主权",
            "ontology.title": "委派任务，而非交出学习权。",
            "ontology.lead": "AI 建议只有经过人工审核后才具有运营价值。评估会记录决策、修正和规则如何存储、保护与复用；不会预设绝对的可移植性或保护能力。",
            "ontology.board.aria": "主动验证示例",
            "ontology.header.1": "检测到的短语",
            "ontology.header.2": "待解决问题",
            "ontology.header.3": "后续步骤",
            "ontology.row.1.proposal": "“我们批准 Q3 预算”",
            "ontology.row.1.check": "能找到支持该决策的原话片段吗？",
            "ontology.row.1.status": "待核实",
            "ontology.row.2.proposal": "“我周一来处理”",
            "ontology.row.2.check": "负责人、截止日期和主题足够清晰吗？",
            "ontology.row.2.status": "待完善",
            "ontology.row.3.proposal": "“机密客户话题”",
            "ontology.row.3.check": "此信息是否应限制在特定人员范围内？",
            "ontology.row.3.status": "待确认",
            "ontology.note": "如果模型发生变化，评估会验证哪些决策、修正和规则在约定范围内仍可导出和复用。",
            "pipeline.kicker": "待评估流程",
            "pipeline.title": "捕捉 › 定性 › 审核 › 准备交接。",
            "pipeline.lead": "评估会验证哪些内容可以捕捉、结构化和审核。只有在人工批准并验证目标路径后，才会把向业务工具的交接纳入范围。",
            "pipeline.step.1.title": "捕捉。",
            "pipeline.step.1.text": "捕捉会议、通话或现有素材，不丢失任何口头上下文。",
            "pipeline.step.2.title": "定性。",
            "pipeline.step.2.text": "添加角色、项目、词汇表、访问权限、凭证和预期目标系统。",
            "pipeline.step.3.title": "审核。",
            "pipeline.step.3.text": "确认重要决策和行动，或将不完整的事项保持挂起。",
            "pipeline.step.4.title": "准备交接。",
            "pipeline.step.4.text": "批准后，使用范围内已验证的连接器，或采用有记录的手动导出。",
            "pipeline.more.summary": "查看详细工作原理",
            "pipeline.more.1": "捕捉——会议音频（或现有文件）被转写并加上时间戳，将每段话关联到确切的发言时刻。",
            "pipeline.more.2": "定性——Taveni 提出决策、行动和风险，并附上待验证的负责人、截止日期、访问规则和目标。",
            "pipeline.more.3": "审核——团队确认、完善或拒绝；该审核绝不构成向其他系统写入的默示许可。",
            "pipeline.more.4": "交接——明确批准后，结果沿评估中验证的路径交付：范围内连接器或有记录的手动导出。",
            "pipeline.shot1.alt": "Taveni 界面：从会议中提取的决策、承诺与风险复审队列，含置信度与状态。",
            "pipeline.shot1.label": "taveni — 决策与行动的人工复审",
            "pipeline.shot2.alt": "Taveni 按发言人标注时间戳的转写，包含已检测并验证的实体。",
            "pipeline.shot2.label": "taveni — 带时间戳的转写与合格实体",
            "pipeline.shot3.alt": "Taveni 对话框，用于在验证前修正条目。",
            "pipeline.shot3.label": "taveni — 验证前的人工修正",
            "pipeline.shot4.alt": "Taveni 界面（集成页面）：ClickUp 卡片显示已连接，工作区 Sollice，目标 Commercial / Actions commerciales；每个外发任务都需要逐一确认。",
            "pipeline.shot4.label": "taveni — ClickUp 连接，目标受控",
            "pipeline.shot5.alt": "Taveni 对话框：在创建前复核 ClickUp 任务，显示目标列表，并提醒任何修改都需重新生成预览。",
            "pipeline.shot5.label": "taveni — 发送至 ClickUp 前的人工确认",
            "pipeline.shot6.alt": "Taveni 界面：一条合格行动带有其已创建 ClickUp 任务的标记，其余行动仍待发送。",
            "pipeline.shot6.label": "taveni — 已关联 ClickUp 任务的行动",
            "pipeline.actions.alt": "Taveni 界面：从销售复盘中提取的行动，含优先级、置信度、截止日期与复审阈值。",
            "pipeline.actions.label": "taveni — 待复审的合格行动",
            "start.title": "从哪里开始",
            "start.aria": "按团队划分的首批应用场景",
            "start.header.1": "团队",
            "start.header.2": "典型会议",
            "start.header.3": "Taveni 能做什么",
            "start.row.1.role": "管理层",
            "start.row.1.meeting": "委员会与决策会议",
            "start.row.1.outcome": "查明某项优先级、预算或日期获批的原因，并附带原话片段和预期的后续步骤。",
            "start.row.2.role": "销售与客户成功",
            "start.row.2.meeting": "客户会议",
            "start.row.2.outcome": "商业承诺会成为待审核的建议行动；CRM、客服或跟进交接路径将在评估期间选择并验证。",
            "start.row.3.role": "产品与运营",
            "start.row.3.meeting": "运营决策会议",
            "start.row.3.outcome": "跨团队敲定的事项保持可见，包括没有明确负责人的任务。",
            "architecture.ledger.aria": "可追溯性示例",
            "architecture.ledger.header.1": "信息",
            "architecture.ledger.header.2": "来源",
            "architecture.ledger.header.3": "状态",
            "architecture.ledger.1.info": "决策",
            "architecture.ledger.1.origin": "会议 · 00:17:42 · 口头凭证",
            "architecture.ledger.1.state": "已验证",
            "architecture.ledger.2.info": "承诺",
            "architecture.ledger.2.origin": "发言人 · 片段 · 置信度",
            "architecture.ledger.2.state": "需审核",
            "architecture.ledger.3.info": "风险",
            "architecture.ledger.3.origin": "访问规则 · 保密性",
            "architecture.ledger.3.state": "受限",
            "architecture.point.1.title": "可溯源决策。",
            "architecture.point.1.text": "评估会在共享或交接前检查决策与其依据之间的关联。",
            "architecture.point.2.title": "共享最小有效上下文。",
            "architecture.point.2.text": "评估范围会说明每个工具或助手可以接收哪些信息。",
            "architecture.point.3.title": "敏感数据。",
            "architecture.point.3.text": "访问方式、所用服务、保留期限和发送规则会在评估前记录。",
            "architecture.point.4.title": "学习闭环。",
            "architecture.point.4.text": "评估会测量验证、拒绝和修正是否改善后续建议。",
            "trust.measure.title": "衡量实际价值，拒绝噱头。",
            "trust.measure.text": "Taveni 的评估不承诺完全自动化。它在您的一个真实流程中，衡量四件简单的事：",
            "trust.measure.criteria": "检索时间 · 手动重复录入 · 已确认事件 · 实际 AI 成本",
            "company.kicker": "Hyle Labs",
            "company.title": "将语音转化为资产的 AI 产品。",
            "company.text.1": "我们为决策和行动跨越对话、工具与助手的团队打造产品。Taveni 旨在限定且已验证的范围内，将口头决策结构化为待审核的决策、依据和行动。",
            "company.text.2": "我们的指导原则很简单：委派任务，而非交出学习权。AI 应该减少人工录入，而不是剥夺团队审核、限制和决定执行内容的权力。",
            "founder.quote": "“我创立 Taveni，是因为团队里最重要的决策都躺在无人重读的会议纪要里。我们要做的，是让决策真正可执行的工具——而决定权始终留在人的手中。”",
            "founder.sig": "Adryan Perez — 创始人，Hyle Labs · 里昂",
            "company.facts": "法国 SASU 公司 · 里昂 RCS 商业登记 · Taveni 处于限定评估阶段",
            "contact.kicker": "与我们交流",
            "contact.title": "在真实业务流中衡量 Taveni？",
            "contact.text": "发送您的上下文：会议类型、目标工具、GDPR 约束和成功标准。我们将回复建议的评估范围、衡量标准以及开展评估所需的条件。",
            "contact.meta": "基于真实流程的评估 · 范围明确 · 无任何约束",
            "contact.href": mailto("Taveni 评估", "您好 Hyle Labs，\n\n业务背景/需求：\n需连接的工具：\nGDPR/安全约束：\n\n谢谢，"),
            "faq.title": "直接问答",
            "faq.1.q": "使用 Taveni 需要更换现有工具吗？",
            "faq.1.a": "不一定。评估从您现有的工具开始，并定义一个交接路径。根据已验证的可用性，该路径可使用范围内连接器，或采用有记录的手动导出。",
            "faq.2.q": "数据去了哪里？（GDPR）",
            "faq.2.a": "数据处理方式取决于双方确认的范围。评估开始前，我们会记录涉及的数据、使用的服务、访问权限、保留期限和部署约束。",
            "faq.3.q": "如果我们更换 AI 模型会怎样？",
            "faq.3.a": "评估会记录模型变化后哪些内容仍被保存、可导出和复用。可移植性取决于已验证的产品范围、格式和合同条件。",
            "faq.4.q": "价格是多少？",
            "faq.4.a": "Taveni 目前处于限定范围的评估阶段。开始前会明确评估范围、成功标准、所需资源和商务条件。",
            "faq.5.q": "你们支持连接哪些工具？",
            "faq.5.a": "评估会围绕向 CRM、客服或项目管理工具的一次交接展开。连接器可用性在范围确认时检查；必要时可使用手动导出作为替代。",
            "footer.info": "<strong>Hyle Labs SASU</strong><br>254 rue Vendôme 69003 LYON · contact@hyle-labs.net<br>© <span id=\"year\">2026</span> Hyle Labs. Taveni 由 Hyle Labs 发行。",
            "footer.contact": "联系我们",
            "footer.legal": "法律声明",
            "footer.nav.aria": "网站地图",
            "legal.title": "法律声明",
            "legal.item.1.label": "公司",
            "legal.item.1.value": "HYLE LABS · SASU",
            "legal.item.2.label": "注册地址",
            "legal.item.2.value": "254 rue Vendôme 69003 LYON",
            "legal.item.3.label": "SIREN 号码",
            "legal.item.3.value": "101 857 431 · RCS Lyon",
            "legal.item.4.label": "欧盟增值税号",
            "legal.item.4.value": "FR92101857431",
            "legal.item.5.label": "出版总监",
            "legal.item.5.value": "Adryan Perez, 总裁",
            "legal.item.6.label": "托管服务",
            "legal.item.6.value": "GitHub Pages · GitHub, Inc.",
            "legal.item.7.label": "电子邮箱",
            "legal.item.7.value": "contact@hyle-labs.net",
            "legal.item.8.label": "发行方",
            "legal.item.8.value": "Hyle Labs, Taveni 发行商",
            "legal.close": "关闭"
        }
    };

    const sourceValues = {};

    const localizedValue = (language, key) =>
        language === "fr" ? sourceValues[key] : translations[language]?.[key] ?? sourceValues[key];

    const getElement = (selector) => document.querySelector(selector);

    const getDirectTextNode = (element) => {
        if (!element) return null;
        return Array.from(element.childNodes).find((node) =>
            node.nodeType === Node.TEXT_NODE && node.textContent.trim()
        );
    };

    const readBinding = (element, type) => {
        if (!element) return "";
        if (type === "html") return element.innerHTML;
        if (type === "label") return getDirectTextNode(element)?.textContent.trim() || "";
        if (type.startsWith("attr:")) return element.getAttribute(type.slice(5)) || "";
        return element.textContent.trim();
    };

    const setLabel = (element, value) => {
        const textNode = getDirectTextNode(element);
        if (!textNode) {
            element.insertBefore(document.createTextNode(value), element.firstChild);
            return;
        }
        const leading = textNode.textContent.match(/^\s*/)?.[0] || "";
        const trailing = textNode.textContent.match(/\s*$/)?.[0] || "";
        textNode.textContent = `${leading}${value}${trailing}`;
    };

    const writeBinding = (element, type, value) => {
        if (!element || value === undefined) return;
        if (type === "html") {
            element.innerHTML = value;
            return;
        }
        if (type === "label") {
            setLabel(element, value);
            return;
        }
        if (type.startsWith("attr:")) {
            element.setAttribute(type.slice(5), value);
            return;
        }
        element.textContent = value;
    };

    const setMeta = (selector, attribute, value) => {
        const element = document.querySelector(selector);
        if (element) element.setAttribute(attribute, value);
    };

    const updateStructuredData = (language) => {
        const script = document.querySelector('script[type="application/ld+json"]');
        if (!script) return;
        try {
            const data = JSON.parse(script.textContent);
            const graph = data["@graph"];
            const software = graph?.find((item) => item["@type"] === "SoftwareApplication");
            if (software) {
                software.description = pageMeta[language].schemaDescription;
                software.inLanguage = supportedLanguages[language].htmlLang;
            }

            const faq = graph?.find((item) => item["@type"] === "FAQPage");
            if (faq) {
                faq.inLanguage = supportedLanguages[language].htmlLang;
                faq.mainEntity = [1, 2, 3, 4, 5].map((number) => ({
                    "@type": "Question",
                    name: localizedValue(language, `faq.${number}.q`),
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: localizedValue(language, `faq.${number}.a`)
                    }
                }));
            }
            script.textContent = JSON.stringify(data, null, 2);
        } catch {
            // Keep the existing JSON-LD if a browser cannot parse it.
        }
    };

    const updateYear = () => {
        const year = document.getElementById("year");
        if (year) year.textContent = String(new Date().getFullYear());
    };

    // Purge les anciens choix persistants : chaque URL statique porte désormais sa langue.
    try {
        localStorage.removeItem("hyle-labs-language");
        sessionStorage.removeItem("hyle-labs-language");
    } catch {
        // Ignore private browsing or blocked storage.
    }

    const normalizeLanguage = (value) => {
        if (!value) return null;
        const normalized = String(value).trim().toLowerCase();
        if (normalized.startsWith("fr")) return "fr";
        if (normalized.startsWith("en")) return "en";
        if (normalized.startsWith("es")) return "es";
        if (normalized.startsWith("zh") || normalized === "cn" || normalized === "mandarin" || normalized === "中文") {
            return "zh";
        }
        return null;
    };

    const applyMeta = (language) => {
        const meta = pageMeta[language];
        document.title = meta.title;
        setMeta('meta[name="description"]', "content", meta.description);
        setMeta('meta[property="og:title"]', "content", meta.ogTitle);
        setMeta('meta[property="og:description"]', "content", meta.ogDescription);
        setMeta('meta[property="og:image:alt"]', "content", meta.ogImageAlt);
        setMeta('meta[property="og:locale"]', "content", supportedLanguages[language].ogLocale);
        updateStructuredData(language);
    };

    const applyLanguage = (language) => {
        const lang = supportedLanguages[language] ? language : "fr";
        document.documentElement.lang = supportedLanguages[lang].htmlLang;
        document.documentElement.dir = "ltr";

        bindings.forEach(([key, selector, type]) => {
            writeBinding(getElement(selector), type, localizedValue(lang, key));
        });

        applyMeta(lang);
        updateYear();

        document.querySelectorAll(".language-button").forEach((link) => {
            if (link.dataset.lang === lang) link.setAttribute("aria-current", "page");
            else link.removeAttribute("aria-current");
        });
    };

    bindings.forEach(([key, selector, type]) => {
        sourceValues[key] = readBinding(getElement(selector), type);
    });

    // Menu mobile <details> : se referme après le choix d'une ancre.
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

    const dialog = document.getElementById("legal-dialog");
    const open = document.getElementById("legal-open");
    const close = document.getElementById("legal-close");
    if (dialog instanceof HTMLDialogElement && open && close) {
        open.addEventListener("click", () => dialog.showModal());
        close.addEventListener("click", () => dialog.close());
        dialog.addEventListener("click", (event) => {
            if (event.target === dialog) dialog.close();
        });
    }

    const queryLanguage = normalizeLanguage(new URLSearchParams(window.location.search).get("lang"));
    const staticLanguage = normalizeLanguage(document.documentElement.dataset.siteLocale) || "fr";

    // Compatibilité des anciens liens ?lang=. Les pages canoniques restent les routes statiques ;
    // un navigateur capable d'exécuter JS remplace l'ancienne URL sans créer de contenu dupliqué.
    if (queryLanguage && window.location.protocol !== "file:") {
        const legacyUrl = new URL(window.location.href);
        legacyUrl.searchParams.delete("lang");
        window.location.replace(
            `${languagePaths[queryLanguage]}${legacyUrl.search}${legacyUrl.hash}`
        );
        return;
    }

    applyLanguage(staticLanguage);
})();
