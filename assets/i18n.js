(() => {
    const supportedLanguages = {
        fr: { htmlLang: "fr", ogLocale: "fr_FR" },
        en: { htmlLang: "en", ogLocale: "en_US" },
        es: { htmlLang: "es", ogLocale: "es_ES" },
        zh: { htmlLang: "zh-Hans", ogLocale: "zh_CN" }
    };

    const mailto = (subject, body) => {
        const params = new URLSearchParams();
        if (subject) params.set("subject", subject);
        if (body) params.set("body", body);
        return "mailto:contact@hyle-labs.net?" + params.toString();
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
        ["hero.card.id", ".dc-id", "text"],
        ["hero.card.stamp", ".dc-stamp", "text"],
        ["hero.card.quote", ".dc-mark", "text"],
        ["hero.card.source", ".dc-source", "text"],
        ["hero.card.action.label", ".dc-action-label", "text"],
        ["hero.card.action.text", ".dc-action-text", "text"],
        ["hero.card.action.meta", ".dc-action-meta", "text"],
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
        ["pipeline.shot.alt", ".doc-frame img", "attr:alt"],
        ["pipeline.shot.label", ".doc-frame-label", "text"],
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
            title: "Taveni — vos réunions transformées en décisions et actions suivies | Hyle Labs",
            description: "Taveni capte vos réunions, retrouve les décisions prises et les transforme en actions claires (qui, quoi, pour quand), prêtes à rejoindre vos outils — CRM, support, gestion de projet — après validation par vos équipes. Édité par Hyle Labs, en France.",
            ogTitle: "Taveni — de la réunion à l'action, sans rien perdre",
            ogDescription: "Taveni retrouve les décisions de vos réunions et les transforme en actions claires, prêtes à rejoindre vos outils après validation par vos équipes. Rien ne se perd.",
            ogImageAlt: "Interface Taveni montrant l'ajout de contexte avant une transcription.",
            schemaDescription: "Taveni transforme vos réunions en décisions retrouvables et actions claires (responsable, échéance, destination), envoyées dans vos outils après validation par vos équipes."
        },
        en: {
            title: "Taveni — turn your meetings into decisions and tracked actions | Hyle Labs",
            description: "Taveni captures your meetings, recovers the decisions made, and turns them into clear actions (who, what, by when), ready to flow into your tools — CRM, support, project management — after your teams validate. Built by Hyle Labs, in France.",
            ogTitle: "Taveni — from meeting to action, with nothing lost",
            ogDescription: "Taveni recovers the decisions from your meetings and turns them into clear actions, ready to flow into your tools after your teams validate. Nothing gets lost.",
            ogImageAlt: "Taveni interface showing context added before a transcription.",
            schemaDescription: "Taveni turns your meetings into recoverable decisions and clear actions (owner, deadline, destination), sent into your tools after your teams validate."
        },
        es: {
            title: "Taveni — convierte tus reuniones en decisiones y acciones con seguimiento | Hyle Labs",
            description: "Taveni capta tus reuniones, recupera las decisiones tomadas y las convierte en acciones claras (quién, qué, para cuándo), listas para llegar a tus herramientas — CRM, soporte, gestión de proyectos — tras la validación de tus equipos. Desarrollado por Hyle Labs, en Francia.",
            ogTitle: "Taveni — de la reunión a la acción, sin perder nada",
            ogDescription: "Taveni recupera las decisiones de tus reuniones y las convierte en acciones claras, listas para llegar a tus herramientas tras la validación de tus equipos. Nada se pierde.",
            ogImageAlt: "Interfaz de Taveni mostrando la incorporación de contexto antes de una transcripción.",
            schemaDescription: "Taveni convierte tus reuniones en decisiones recuperables y acciones claras (responsable, plazo, destino), enviadas a tus herramientas tras la validación de tus equipos."
        },
        zh: {
            title: "Taveni — 将会议转化为决策与可追踪任务 | Hyle Labs",
            description: "Taveni 精准捕捉会议内容，提取已敲定的决策，并将其转化为明确的待办任务（包含负责人、具体事项与截止时间），经团队确认后同步至您的 CRM、客服及项目管理等业务系统。由法国 Hyle Labs 出品。",
            ogTitle: "Taveni — 从会议到执行，决策零遗漏",
            ogDescription: "Taveni 提取会议决策并转化为清晰的任务，经团队确认后同步至您的业务工具，确保每个决策都能落地。",
            ogImageAlt: "Taveni 界面：展示在语音转写前注入业务上下文的过程。",
            schemaDescription: "Taveni 将您的会议转化为可追溯的决策与清晰任务（包含负责人、截止日期与目标系统），经团队确认后自动同步至您的业务工具。"
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
            "hero.title": "Your meetings become <span class=\"accent-teal\">decisions and tracked actions</span>.",
            "hero.lead": "After a meeting, the essentials get lost: who decided what, by when, in which tool. <strong>Taveni recovers the decisions and turns them into clear actions</strong>, validated by your teams before they reach your CRM, support desk, or project tool.",
            "hero.primary": "Request an evaluation",
            "hero.primary.href": mailto("Taveni evaluation", "Hello Hyle Labs,\n\nContext / need:\nTools to connect:\nGDPR / security constraints:\n\nThanks,"),
            "hero.secondary": "See how it works",
            "hero.keyline": "Decisions linked to their evidence · Actions with who, what, by when · Human validation before sending",
            "hero.card.id": "decision #142",
            "hero.card.stamp": "validated",
            "hero.card.quote": "“We approve the Q3 budget at €180k.”",
            "hero.card.source": "Product committee · 00:17:42 · audio evidence",
            "hero.card.action.label": "action created",
            "hero.card.action.text": "Notify the finance team",
            "hero.card.action.meta": "Nathalie D. · by Jul 12 · → CRM",
            "hero.signal.1": "<strong>Less wasted AI cost.</strong> After transcription, Taveni relies on structured information, not the raw verbatim re-sent at every step.",
            "hero.signal.2": "<strong>Your corrections belong to you.</strong> They enrich your Taveni workspace and are not used to train third-party models.",
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
            "truth.note": "Every meeting produces value. Taveni keeps it from getting lost in people's heads or forgotten PDFs: every decision becomes a reliable, sourced asset ready to reach your tools — what we call Capital Token.",
            "difference.kicker": "Positioning",
            "difference.title": "Taveni starts where automatic notes stop.",
            "difference.lead": "Automatic notes tell you what was said. Taveni identifies what should produce a concrete effect: the source, the owner, the status, the access rights, and the destination in your tools.",
            "difference.market.title": "Why sending everything to AI gets expensive.",
            "difference.market.text.1": "The cheaper AI gets, the more everything is sent without filtering — and spend climbs for little value. Taveni reuses only what has been qualified: agents and tools receive validated information, enough to create an action, evidence, or a reusable decision, without paying again for the raw verbatim.",
            "difference.jevons.summary": "The Jevons paradox, in a nutshell",
            "difference.jevons.text": "When a resource gets cheaper, we consume more of it — not less. For AI: the lower the cost per request, the more calls we make, and total spend rises. Taveni applies the opposite effect by processing only what's useful.",
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
            "difference.row.3.taveni": "Syncs only the useful item, after validation, to the intended tool.",
            "difference.row.4.subject": "Control",
            "difference.row.4.classic": "Mostly manages access to the meeting, note, or transcript.",
            "difference.row.4.taveni": "Filters by right, tool, assistant, retention, and inference cost.",
            "tco.kicker": "The cost of AI",
            "tco.title": "Re-feeding everything to AI is expensive. Taveni reuses only the essentials.",
            "tco.lead.1": "AI that works continuously costs far more than a simple chatbot. Sending it a raw transcript means paying for useless context.",
            "tco.more.summary": "How context gets qualified",
            "tco.more.text": "Context is not poured in wholesale. Meeting profile, business vocabulary, and org context pushed through A2A/MCP are qualified before extraction. Anything without a source, owner, access right, or destination stays out of sync.",
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
            "tco.result.3.title": "rule",
            "tco.result.3.text": "unnecessary tokens avoided",
            "ontology.kicker": "Trust & sovereignty",
            "ontology.title": "Delegate the task, not the learning.",
            "ontology.lead": "An AI proposal has value only once a human validates it. Every correction teaches your rules to your own system: sourced decisions, protected sensitive data, assistants limited to what's needed — and that knowledge stays yours, even if you switch AI tomorrow.",
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
            "ontology.note": "If you change models tomorrow, your qualified decisions, corrections, and access rules remain your capital.",
            "pipeline.kicker": "How it works",
            "pipeline.title": "Capture › Qualify › Review › Sync.",
            "pipeline.lead": "At every step, you see what was said, filtered, validated by your teams, and sent to a business tool. Oral memory becomes a working base.",
            "pipeline.step.1.title": "Capture.",
            "pipeline.step.1.text": "Capture a meeting, call, or existing source without losing the oral context.",
            "pipeline.step.2.title": "Qualify.",
            "pipeline.step.2.text": "Add roles, projects, vocabulary, access rules, evidence, and expected destination.",
            "pipeline.step.3.title": "Review.",
            "pipeline.step.3.text": "Confirm important decisions and actions or keep incomplete items pending.",
            "pipeline.step.4.title": "Synchronize.",
            "pipeline.step.4.text": "Send validated actions to business tools, then follow their status.",
            "pipeline.more.summary": "See how it works in detail",
            "pipeline.more.1": "Capture — the meeting audio (or an existing file) is transcribed and timestamped, to link every passage to the exact moment it was said.",
            "pipeline.more.2": "Qualification — Taveni spots decisions, actions, and risks, then attaches an owner, a deadline, access rights, and the destination tool.",
            "pipeline.more.3": "Review — your teams confirm, complete, or reject in one click; nothing is synced to your tools until it is validated.",
            "pipeline.more.4": "Sync — only validated actions reach your tools (CRM, support, project), and their status keeps being tracked.",
            "pipeline.shot.alt": "Taveni interface: importing a meeting and adding business context before transcription.",
            "pipeline.shot.label": "taveni — import & meeting context",
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
            "start.row.2.outcome": "Commercial commitments become reviewed actions before moving into the CRM, support queue, or a follow-up.",
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
            "architecture.point.1.text": "Critical decisions stay linked to their evidence before sharing or synchronization.",
            "architecture.point.2.title": "Share the minimum useful context.",
            "architecture.point.2.text": "Tools and assistants receive only the information intended for them, even when context comes from a connected agent.",
            "architecture.point.3.title": "Sensitive data.",
            "architecture.point.3.text": "Access rights are checked before information feeds an assistant.",
            "architecture.point.4.title": "Learning loop.",
            "architecture.point.4.text": "Your validations, rejections, and corrections make future suggestions closer to how the team actually works.",
            "trust.measure.title": "Measure value, not hype.",
            "trust.measure.text": "A Taveni evaluation does not promise full automation. On one of your real processes, it measures four simple things:",
            "trust.measure.criteria": "search time saved · re-entry avoided · risks controlled · AI cost under control",
            "company.kicker": "Hyle Labs",
            "company.title": "AI products that turn speech into capital.",
            "company.text.1": "We build products for teams whose decisions and actions move between conversations, tools, and assistants. Taveni turns oral decisions into qualified decisions, evidence, and actions before they become noise cost.",
            "company.text.2": "Our guiding line is simple: delegate the task, not the learning. AI should reduce manual entry without taking away the team's ability to review, limit, and decide what gets executed.",
            "founder.quote": "“I created Taveni because our teams' most important decisions lived in recaps nobody reread. We're building the tool that makes them executable — without ever taking the decision away from humans.”",
            "founder.sig": "Adryan Perez — founder, Hyle Labs · Lyon",
            "company.facts": "French SASU · RCS Lyon · GDPR by design · Data processed in Europe",
            "contact.kicker": "Talk with us",
            "contact.title": "Measure Taveni on a real workflow?",
            "contact.text": "Send us your context: meeting type, target tool, GDPR constraints, and success criteria. We'll reply with an evaluation scope quantified on search time, re-entry, risk, and AI cost.",
            "contact.meta": "Reply within 48h · Evaluation on a real process · No commitment",
            "contact.href": mailto("Taveni evaluation", "Hello Hyle Labs,\n\nContext / need:\nTools to connect:\nGDPR / security constraints:\n\nThanks,"),
            "faq.title": "Straight answers",
            "faq.1.q": "Do we need to change tools to use Taveni?",
            "faq.1.a": "No. Taveni adds to what you have: it pushes validated actions to the CRM, support desk, or project tool you already use. You start with one connector, then expand if the value is proven.",
            "faq.2.q": "Where does the data go? (GDPR)",
            "faq.2.a": "Hyle Labs is a French company: consent, security, and deployment constraints are handled by design. Access rights are checked before any information feeds an assistant, and your corrections are not used to train third-party models.",
            "faq.3.q": "What happens if we switch AI models?",
            "faq.3.a": "Your qualified decisions, corrections, and access rules remain your capital, whatever model you use. Switching AI does not send you back to square one.",
            "faq.4.q": "How much does it cost?",
            "faq.4.a": "Taveni is in a scoped evaluation phase: we first quantify, on one of your real processes, the search time saved, re-entry avoided, risks reduced, and AI cost kept under control. Then you decide with real numbers.",
            "faq.5.q": "Which tools do you connect?",
            "faq.5.a": "The first flows target CRM, support, and project management. Tell us which tools matter to you: the evaluation scope is built around one genuinely useful connector.",
            "footer.info": "<strong>Hyle Labs SASU</strong><br>254 rue Vendôme 69003 LYON · contact@hyle-labs.net<br>© <span id=\"year\">2026</span> Hyle Labs. Taveni is published by Hyle Labs.",
            "footer.contact": "Contact",
            "footer.legal": "Legal notice",
            "legal.title": "Legal notice",
            "legal.item.1.label": "Company",
            "legal.item.1.value": "HYLE LABS · SASU",
            "legal.item.2.label": "Public registered office",
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
            "hero.title": "Tus reuniones se convierten en <span class=\"accent-teal\">decisiones y acciones con seguimiento</span>.",
            "hero.lead": "Después de una reunión, lo esencial se pierde: quién decidió qué, para cuándo, en qué herramienta. <strong>Taveni recupera las decisiones y las convierte en acciones claras</strong>, validadas por tus equipos antes de llegar a tu CRM, soporte o herramienta de proyectos.",
            "hero.primary": "Solicitar una evaluación",
            "hero.primary.href": mailto("Evaluación de Taveni", "Hola Hyle Labs,\n\nContexto / necesidad:\nHerramientas a conectar:\nRestricciones RGPD / seguridad:\n\nGracias,"),
            "hero.secondary": "Ver cómo funciona",
            "hero.keyline": "Decisiones vinculadas a su prueba · Acciones con quién, qué, para cuándo · Validación humana antes del envío",
            "hero.card.id": "decisión #142",
            "hero.card.stamp": "validada",
            "hero.card.quote": "«Aprobamos el presupuesto del Q3: 180 k€.»",
            "hero.card.source": "Comité de producto · 00:17:42 · prueba de audio",
            "hero.card.action.label": "acción creada",
            "hero.card.action.text": "Avisar a la dirección financiera",
            "hero.card.action.meta": "Nathalie D. · para el 12/07 · → CRM",
            "hero.signal.1": "<strong>Menos coste de IA inútil.</strong> Tras la transcripción, Taveni se apoya en información estructurada, no en el verbatim bruto reenviado en cada procesamiento.",
            "hero.signal.2": "<strong>Tus correcciones te pertenecen.</strong> Enriquecen tu espacio Taveni y no sirven para entrenar modelos de terceros.",
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
            "truth.note": "Cada reunión produce valor. Taveni evita que se pierda en la memoria de los equipos o en PDF olvidados: cada decisión se convierte en un activo fiable, con fuente y listo para llegar a tus herramientas — lo que llamamos Capital Token.",
            "difference.kicker": "Posicionamiento",
            "difference.title": "Taveni empieza donde termina la nota automática.",
            "difference.lead": "La nota automática cuenta lo que se dijo. Taveni identifica lo que debe producir un efecto concreto: la fuente, el responsable, el estado, los derechos de acceso y el destino en tus herramientas.",
            "difference.market.title": "Por qué enviarlo todo a la IA sale caro.",
            "difference.market.text.1": "Cuanto más barata se vuelve la IA, más se le envía todo sin filtrar — y el gasto sube para poco valor. Taveni solo reutiliza lo que ha sido cualificado: los agentes y las herramientas reciben información validada, suficiente para crear una acción, una prueba o una decisión reutilizable, sin volver a pagar por el verbatim bruto.",
            "difference.jevons.summary": "La paradoja de Jevons, en dos palabras",
            "difference.jevons.text": "Cuando un recurso se abarata, se consume más — no menos. Para la IA: cuanto más baja el coste por petición, más llamadas se hacen y más sube el gasto total. Taveni aplica el efecto contrario al procesar solo lo útil.",
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
            "difference.row.3.taveni": "Sincroniza solo el elemento útil, tras validación, hacia la herramienta prevista.",
            "difference.row.4.subject": "Control",
            "difference.row.4.classic": "Gestiona sobre todo el acceso a la reunión, nota o transcripción.",
            "difference.row.4.taveni": "Filtra por derecho, herramienta, asistente, duración y coste de inferencia.",
            "tco.kicker": "El coste de la IA",
            "tco.title": "Reinyectarlo todo en la IA sale caro. Taveni solo reutiliza lo esencial.",
            "tco.lead.1": "Una IA que trabaja en continuo cuesta mucho más que un simple chatbot. Enviarle una transcripción bruta es pagar por contexto inútil.",
            "tco.more.summary": "Cómo se cualifica el contexto",
            "tco.more.text": "El contexto no se vierte en bloque. Perfil de reunión, vocabulario de negocio y contexto de organización enviado por A2A/MCP se cualifican antes de la extracción. Lo que no tiene fuente, responsable, derecho de acceso ni destino queda fuera de la sincronización.",
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
            "tco.result.3.title": "regla",
            "tco.result.3.text": "tokens innecesarios evitados",
            "ontology.kicker": "Confianza y soberanía",
            "ontology.title": "Se delega la tarea, no el aprendizaje.",
            "ontology.lead": "Una propuesta de la IA solo tiene valor una vez que un humano la valida. Cada corrección enseña tus reglas a tu propio sistema: decisiones con fuente, datos sensibles protegidos, asistentes limitados a lo necesario — y ese saber es tuyo, aunque cambies de IA mañana.",
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
            "ontology.note": "Si cambias de modelo mañana, tus decisiones cualificadas, correcciones y reglas de acceso siguen siendo tu capital.",
            "pipeline.kicker": "Cómo funciona",
            "pipeline.title": "Captura › Cualifica › Revisa › Sincroniza.",
            "pipeline.lead": "En cada etapa, ves lo que se dijo, lo filtrado, lo validado por tus equipos y lo enviado a una herramienta de negocio. La memoria oral se convierte en base de trabajo.",
            "pipeline.step.1.title": "Capturar.",
            "pipeline.step.1.text": "Captura una reunión, llamada o fuente existente sin perder el contexto oral.",
            "pipeline.step.2.title": "Cualificar.",
            "pipeline.step.2.text": "Añade roles, proyectos, vocabulario, reglas de acceso, prueba y destino esperado.",
            "pipeline.step.3.title": "Revisar.",
            "pipeline.step.3.text": "Confirma decisiones y acciones importantes o mantén pendientes los elementos incompletos.",
            "pipeline.step.4.title": "Sincronizar.",
            "pipeline.step.4.text": "Envía acciones validadas a herramientas de negocio y sigue su estado.",
            "pipeline.more.summary": "Ver el funcionamiento en detalle",
            "pipeline.more.1": "Captura — el audio de la reunión (o un archivo existente) se transcribe y se marca con la hora, para vincular cada pasaje al momento exacto en que se dijo.",
            "pipeline.more.2": "Cualificación — Taveni detecta decisiones, acciones y riesgos, y les asocia un responsable, un plazo, derechos de acceso y la herramienta de destino.",
            "pipeline.more.3": "Revisión — tus equipos confirman, completan o rechazan con un clic; nada se sincroniza con tus herramientas hasta que se valida.",
            "pipeline.more.4": "Sincronización — solo las acciones validadas llegan a tus herramientas (CRM, soporte, proyecto), y su estado se sigue.",
            "pipeline.shot.alt": "Interfaz de Taveni: importación de una reunión y adición de contexto de negocio antes de la transcripción.",
            "pipeline.shot.label": "taveni — importación y contexto de reunión",
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
            "start.row.2.outcome": "Los compromisos comerciales se convierten en acciones revisadas antes de pasar al CRM, al soporte o a un seguimiento.",
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
            "architecture.point.1.text": "Los arbitrajes críticos permanecen vinculados a su prueba antes de compartirse o sincronizarse.",
            "architecture.point.2.title": "Compartir el mínimo útil.",
            "architecture.point.2.text": "Herramientas y asistentes reciben solo la información prevista para ellos, incluso cuando el contexto llega desde un agente conectado.",
            "architecture.point.3.title": "Datos sensibles.",
            "architecture.point.3.text": "Los derechos de acceso se verifican antes de que una información alimente un asistente.",
            "architecture.point.4.title": "Bucle de aprendizaje.",
            "architecture.point.4.text": "Tus validaciones, rechazos y correcciones acercan las próximas propuestas al funcionamiento real del equipo.",
            "trust.measure.title": "Medir el valor, no la hype.",
            "trust.measure.text": "Una evaluación Taveni no promete una automatización total. Sobre uno de tus procesos reales, mide cuatro cosas simples:",
            "trust.measure.criteria": "tiempo de búsqueda ganado · recapturas evitadas · riesgos controlados · coste de IA bajo control",
            "company.kicker": "Hyle Labs",
            "company.title": "Productos de IA para convertir lo oral en capital.",
            "company.text.1": "Construimos productos para equipos cuyas decisiones y acciones circulan entre conversaciones, herramientas y asistentes. Taveni transforma arbitrajes orales en decisiones, pruebas y acciones cualificadas antes de que cuesten en ruido.",
            "company.text.2": "Nuestra línea directriz es simple: delegar la tarea, no el aprendizaje. La IA debe reducir la captura manual sin quitar a los equipos la capacidad de revisar, limitar y decidir qué se ejecuta.",
            "founder.quote": "«Creé Taveni porque las decisiones más importantes de nuestros equipos vivían en actas que nadie releía. Construimos la herramienta que las hace ejecutables — sin quitarles nunca la decisión a las personas.»",
            "founder.sig": "Adryan Perez — fundador, Hyle Labs · Lyon",
            "company.facts": "SASU francesa · RCS Lyon · RGPD desde el diseño · Datos tratados en Europa",
            "contact.kicker": "Hablemos",
            "contact.title": "¿Medir Taveni en un flujo de trabajo real?",
            "contact.text": "Envíanos tu contexto: tipo de reunión, herramienta objetivo, restricciones RGPD y criterios de éxito. Te responderemos con un alcance de evaluación cuantificado sobre tiempo de búsqueda, recaptura, riesgo y coste de IA.",
            "contact.meta": "Respuesta en 48 h · Evaluación sobre un proceso real · Sin compromiso",
            "contact.href": mailto("Evaluación de Taveni", "Hola Hyle Labs,\n\nContexto / necesidad:\nHerramientas a conectar:\nRestricciones RGPD / seguridad:\n\nGracias,"),
            "faq.title": "Respuestas directas",
            "faq.1.q": "¿Hay que cambiar de herramientas para usar Taveni?",
            "faq.1.a": "No. Taveni se añade a lo existente: envía acciones validadas al CRM, al soporte o a la herramienta de proyectos que ya usas. Se empieza con un primer conector y se amplía si el valor queda demostrado.",
            "faq.2.q": "¿A dónde van los datos? (RGPD)",
            "faq.2.a": "Hyle Labs es una empresa francesa: consentimiento, seguridad y restricciones de despliegue se tratan desde el diseño. Los derechos de acceso se verifican antes de que una información alimente un asistente, y tus correcciones no sirven para entrenar modelos de terceros.",
            "faq.3.q": "¿Qué pasa si cambiamos de modelo de IA?",
            "faq.3.a": "Tus decisiones cualificadas, tus correcciones y tus reglas de acceso siguen siendo tu capital, sea cual sea el modelo. Cambiar de IA no te hace empezar de cero.",
            "faq.4.q": "¿Cuánto cuesta?",
            "faq.4.a": "Taveni está en fase de evaluación acotada: primero cuantificamos, sobre uno de tus procesos reales, el tiempo de búsqueda ganado, las recapturas evitadas, los riesgos reducidos y el coste de IA controlado. Después decides con datos reales.",
            "faq.5.q": "¿Qué herramientas conectáis?",
            "faq.5.a": "Los primeros flujos apuntan al CRM, al soporte y a la gestión de proyectos. Dinos qué herramientas te importan: el alcance de la evaluación se construye alrededor de un primer conector útil.",
            "footer.info": "<strong>Hyle Labs SASU</strong><br>254 rue Vendôme 69003 LYON · contact@hyle-labs.net<br>© <span id=\"year\">2026</span> Hyle Labs. Taveni es desarrollado por Hyle Labs.",
            "footer.contact": "Contacto",
            "footer.legal": "Aviso legal",
            "legal.title": "Aviso legal",
            "legal.item.1.label": "Sociedad",
            "legal.item.1.value": "HYLE LABS · SASU",
            "legal.item.2.label": "Sede pública",
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
            "hero.title": "让您的会议变成<span class=\"accent-teal\">决策与可追踪的任务</span>。",
            "hero.lead": "会议一结束，关键信息就开始流失：谁拍板了什么、期限是什么、该进哪个系统。<strong>Taveni 找回这些决策，并将其转化为清晰的任务</strong>，经团队确认后再同步至您的 CRM、客服或项目管理工具。",
            "hero.primary": "申请评估",
            "hero.primary.href": mailto("Taveni 评估", "Hyle Labs 您好：\n\n背景 / 需求:\n需要对接的工具:\nGDPR / 安全要求:\n\n谢谢！"),
            "hero.secondary": "了解工作原理",
            "hero.keyline": "决策关联原始依据 · 任务明确负责人与期限 · 人工确认后才会同步",
            "hero.card.id": "决策 #142",
            "hero.card.stamp": "已确认",
            "hero.card.quote": "“Q3 预算定为 18 万欧元。”",
            "hero.card.source": "产品委员会 · 00:17:42 · 音频依据",
            "hero.card.action.label": "已生成任务",
            "hero.card.action.text": "通知财务负责人",
            "hero.card.action.meta": "Nathalie D. · 7月12日前 · → CRM",
            "hero.signal.1": "<strong>减少无谓的 AI 开销。</strong>转写完成后，Taveni 依托结构化信息工作，而不是在每次处理时重复发送原始逐字稿。",
            "hero.signal.2": "<strong>您的修正只属于您。</strong>它们沉淀在您的 Taveni 空间中，绝不会用于训练第三方模型。",
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
            "truth.note": "每次会议都在产生价值。Taveni 防止这些价值流失在人脑记忆或被遗忘的 PDF 中：每个决策都成为可靠、可溯源的资产，随时可推送至您的工具——我们称之为“数字资产”。",
            "difference.kicker": "核心定位",
            "difference.title": "Taveni 的起点，正是传统会议纪要的终点。",
            "difference.lead": "普通纪要工具只告诉你“说了什么”。Taveni 识别出“能产生实际效用”的内容：信息来源、负责人、状态、访问权限以及您工具中的目标系统。",
            "difference.market.title": "为什么把所有内容都扔给 AI 会很贵？",
            "difference.market.text.1": "AI 越便宜，人们就越倾向于不加过滤地发送所有内容——开销随之攀升，价值却寥寥。Taveni 只复用经过定性的内容：代理和工具接收的是已验证的信息，足以生成行动、凭证或可复用的决策，无需为原始逐字稿反复付费。",
            "difference.jevons.summary": "杰文斯悖论（Jevons Paradox）简述",
            "difference.jevons.text": "当资源变便宜时，我们消耗得更多而非更少。对于 AI 而言：单次请求成本越低，调用次数就越多，总支出反而上升。Taveni 通过只处理有用信息来逆转这一效应。",
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
            "difference.row.3.taveni": "仅同步经验证的有效事项到指定工具。",
            "difference.row.4.subject": "管控",
            "difference.row.4.classic": "主要管理会议、笔记或转写记录的访问权限。",
            "difference.row.4.taveni": "按权限、工具、助手、留存率和推理成本进行过滤。",
            "tco.kicker": "AI 成本",
            "tco.title": "将所有内容反复喂给 AI 代价高昂。Taveni 只复用核心精华。",
            "tco.lead.1": "持续运行的 AI 成本远高于简单的聊天机器人。将原始转写记录发给它，意味着您在为无用的上下文买单。",
            "tco.more.summary": "上下文如何被定性",
            "tco.more.text": "上下文不会被整包倒入模型。会议画像、业务词表，以及通过 A2A/MCP 推送的组织上下文，都会先经过定性再进入抽取流程。没有来源、负责人、访问权限或目标系统的信息，不会被同步。",
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
            "tco.result.3.title": "规则",
            "tco.result.3.text": "避免无意义的 Token 消耗",
            "ontology.kicker": "信任与数据主权",
            "ontology.title": "委派任务，而非交出学习权。",
            "ontology.lead": "AI 的提议只有在人工验证后才具有价值。您的每一次修正都在为专属系统注入业务规则：决策可溯源、敏感数据受保护、AI 助手只接触必要信息——即使明天更换 AI 模型，这些知识也完全属于您。",
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
            "ontology.note": "即使您明天更换模型，您沉淀的定性决策、修正记录和访问规则，依然是您的核心资产。",
            "pipeline.kicker": "工作原理",
            "pipeline.title": "捕捉 › 定性 › 审核 › 同步。",
            "pipeline.lead": "在每个环节，您都能看到说了什么、过滤了什么、团队验证了什么，以及发送到了哪个业务工具。口头沟通变成了坚实的工作基础。",
            "pipeline.step.1.title": "捕捉。",
            "pipeline.step.1.text": "捕捉会议、通话或现有素材，不丢失任何口头上下文。",
            "pipeline.step.2.title": "定性。",
            "pipeline.step.2.text": "添加角色、项目、词汇表、访问权限、凭证和预期目标系统。",
            "pipeline.step.3.title": "审核。",
            "pipeline.step.3.text": "确认重要决策和行动，或将不完整的事项保持挂起。",
            "pipeline.step.4.title": "同步。",
            "pipeline.step.4.text": "将验证后的行动发送到业务工具，并持续追踪状态。",
            "pipeline.more.summary": "查看详细工作原理",
            "pipeline.more.1": "捕捉——会议音频（或现有文件）被转写并加上时间戳，将每段话关联到确切的发言时刻。",
            "pipeline.more.2": "定性——Taveni 识别决策、行动和风险，随后附加负责人、截止日期、访问权限和目标工具。",
            "pipeline.more.3": "审核——您的团队一键确认、完善或拒绝；在验证之前，任何内容都不会同步到工具。",
            "pipeline.more.4": "同步——只有验证后的行动才会进入您的工具（CRM、客服、项目管理），并持续追踪其状态。",
            "pipeline.shot.alt": "Taveni 界面：导入会议并在转写前注入业务上下文。",
            "pipeline.shot.label": "taveni — 导入与会议上下文",
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
            "start.row.2.outcome": "商业承诺先经审核成为任务，再流入 CRM、客服队列或跟进流程。",
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
            "architecture.point.1.text": "在共享或同步之前，关键决策始终保持与其凭证的关联。",
            "architecture.point.2.title": "共享最小有效上下文。",
            "architecture.point.2.text": "工具和助手只接收指定给它们的信息，即便上下文来自已连接的代理。",
            "architecture.point.3.title": "敏感数据。",
            "architecture.point.3.text": "在信息喂给助手之前，会进行访问权限校验。",
            "architecture.point.4.title": "学习闭环。",
            "architecture.point.4.text": "您的验证、拒绝和修正，让未来的建议更贴合团队实际的工作方式。",
            "trust.measure.title": "衡量实际价值，拒绝噱头。",
            "trust.measure.text": "Taveni 的评估不承诺完全自动化。它在您的一个真实流程中，衡量四件简单的事：",
            "trust.measure.criteria": "节省的检索时间 · 避免的重复录入 · 可控的风险 · 受控的 AI 成本",
            "company.kicker": "Hyle Labs",
            "company.title": "将语音转化为资产的 AI 产品。",
            "company.text.1": "我们为那些决策和行动游走在对话、工具和助手之间的团队打造产品。Taveni 在口头决策变成噪音成本之前，将其转化为定性决策、凭证和行动。",
            "company.text.2": "我们的指导原则很简单：委派任务，而非交出学习权。AI 应该减少人工录入，而不是剥夺团队审核、限制和决定执行内容的权力。",
            "founder.quote": "“我创立 Taveni，是因为团队里最重要的决策都躺在无人重读的会议纪要里。我们要做的，是让决策真正可执行的工具——而决定权始终留在人的手中。”",
            "founder.sig": "Adryan Perez — 创始人，Hyle Labs · 里昂",
            "company.facts": "法国 SASU 公司 · 里昂 RCS 商业登记 · 原生 GDPR 合规 · 数据在欧洲处理",
            "contact.kicker": "与我们交流",
            "contact.title": "在真实业务流中衡量 Taveni？",
            "contact.text": "发送您的上下文：会议类型、目标工具、GDPR 约束和成功标准。我们将回复一份评估范围，量化检索时间、重复录入、风险和 AI 成本。",
            "contact.meta": "48 小时内回复 · 基于真实流程的评估 · 无任何约束",
            "contact.href": mailto("Taveni 评估", "您好 Hyle Labs，\n\n业务背景/需求：\n需连接的工具：\nGDPR/安全约束：\n\n谢谢，"),
            "faq.title": "直接问答",
            "faq.1.q": "使用 Taveni 需要更换现有工具吗？",
            "faq.1.a": "不需要。Taveni 是在现有基础上叠加：它把验证后的任务推送到您已在使用的 CRM、客服或项目工具中。先从一个连接器开始，价值得到验证后再扩大范围。",
            "faq.2.q": "数据去了哪里？（GDPR）",
            "faq.2.a": "Hyle Labs 是一家法国公司：知情同意、安全与部署约束从设计之初就已纳入。任何信息在进入 AI 助手前都会核验访问权限，您的修正也绝不会用于训练第三方模型。",
            "faq.3.q": "如果我们更换 AI 模型会怎样？",
            "faq.3.a": "您的定性决策、修正记录和访问规则始终是您的资产，与所用模型无关。更换 AI 不会让您从零开始。",
            "faq.4.q": "价格是多少？",
            "faq.4.a": "Taveni 目前处于限定范围的评估阶段：我们先在您的一个真实流程中，量化节省的检索时间、避免的重复录入、降低的风险和受控的 AI 成本。之后您再依据真实数据做决定。",
            "faq.5.q": "你们支持连接哪些工具？",
            "faq.5.a": "首批流程面向 CRM、客服和项目管理。告诉我们哪些工具对您重要：评估范围将围绕一个真正有用的连接器来构建。",
            "footer.info": "<strong>Hyle Labs SASU</strong><br>254 rue Vendôme 69003 LYON · contact@hyle-labs.net<br>© <span id=\"year\">2026</span> Hyle Labs. Taveni 由 Hyle Labs 发行。",
            "footer.contact": "联系我们",
            "footer.legal": "法律声明",
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
            const software = data["@graph"]?.find((item) => item["@type"] === "SoftwareApplication");
            if (software) software.description = pageMeta[language].schemaDescription;
            script.textContent = JSON.stringify(data, null, 2);
        } catch {
            // Keep the existing JSON-LD if a browser cannot parse it.
        }
    };

    const updateYear = () => {
        const year = document.getElementById("year");
        if (year) year.textContent = String(new Date().getFullYear());
    };

    // Purge le choix de langue persistant historique (localStorage) : il écrasait la
    // détection du navigateur entre les visites. La langue suit désormais le navigateur,
    // un changement manuel ne valant que pour la session en cours (sessionStorage).
    try {
        localStorage.removeItem("hyle-labs-language");
    } catch {
        // Ignore private browsing or blocked storage.
    }

    const safeStorage = {
        get() {
            try {
                return sessionStorage.getItem("hyle-labs-language");
            } catch {
                return null;
            }
        },
        set(value) {
            try {
                sessionStorage.setItem("hyle-labs-language", value);
            } catch {
                // Ignore private browsing or blocked storage.
            }
        }
    };

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

    const updateUrl = (language) => {
        try {
            const url = new URL(window.location.href);
            if (language === "fr") {
                url.searchParams.delete("lang");
            } else {
                url.searchParams.set("lang", language);
            }
            window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
        } catch {
            // file:// previews and older browsers may refuse history updates.
        }
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

    const applyLanguage = (language, options = {}) => {
        const lang = supportedLanguages[language] ? language : "fr";
        document.documentElement.lang = supportedLanguages[lang].htmlLang;
        document.documentElement.dir = "ltr";

        bindings.forEach(([key, selector, type]) => {
            const value = lang === "fr" ? sourceValues[key] : translations[lang]?.[key] ?? sourceValues[key];
            writeBinding(getElement(selector), type, value);
        });

        applyMeta(lang);
        updateYear();

        document.querySelectorAll(".language-button").forEach((button) => {
            const isActive = button.dataset.lang === lang;
            button.setAttribute("aria-pressed", String(isActive));
        });

        if (options.persist) safeStorage.set(lang);
        if (options.updateUrl) updateUrl(lang);
    };

    bindings.forEach(([key, selector, type]) => {
        sourceValues[key] = readBinding(getElement(selector), type);
    });

    const prefersReducedMotion = () =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.querySelectorAll(".language-button").forEach((button) => {
        button.addEventListener("click", () => {
            const run = () => applyLanguage(button.dataset.lang, { persist: true, updateUrl: true });
            if (typeof document.startViewTransition === "function" && !prefersReducedMotion()) {
                document.startViewTransition(run);
            } else {
                run();
            }
        });
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
    const storedLanguage = normalizeLanguage(safeStorage.get());
    const browserLanguage = normalizeLanguage(navigator.languages?.[0] || navigator.language);
    const initialLanguage = queryLanguage || storedLanguage || browserLanguage || "fr";

    applyLanguage(initialLanguage, { persist: Boolean(queryLanguage), updateUrl: false });
})();
