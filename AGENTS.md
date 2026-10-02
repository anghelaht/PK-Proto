# PacKit Design And Domain Rules

Apply these rules to every task in this repository.

## UI Changes Require Three Design Skills

Before creating, editing, moving, renaming, or removing any user-interface page, section, navigation item, component, control, state, message, or visual element, use all three skills:

1. `information-architecture-designer`
2. `application-ux-designer`
3. `winUI3-designer`

This requirement applies to large page restructuring and to small component-level changes. Do not skip a skill because the requested edit appears visually narrow.

Use them in this order:

1. **Information Architecture** determines object scope, page archetype, navigation ownership, information grouping, placement, and cross-application consistency.
2. **Application UX/UI** determines task clarity, interaction behavior, hierarchy, layout, feedback, accessibility, and responsive behavior.
3. **WinUI PacKit Designer** determines the WinUI 3 control or web-prototype equivalent, Fluent iconography, theme resources, control states, keyboard behavior, and design-system fidelity.

Resolve conflicts at the appropriate layer. A correct WinUI component must not preserve incorrect information architecture, and a visually coherent layout must not replace native interaction semantics.

## PacKit Domain Questions Require Domain Knowledge

Use `packit-knowledge` whenever the user asks how PacKit should handle a situation requiring expertise in application packaging, update automation, Intune, Configuration Manager/MECM, WinGet, PowerShell, PSAppDeployToolkit, assignments, detection, requirements, wrappers, deployment, publishing, workflow execution, or related product terminology and states.

Use the skill for domain reasoning even when the user requests discussion only and no prototype changes.

When a domain decision is translated into interface behavior or implementation, use all four skills:

1. `packit-knowledge` establishes the domain rules, prerequisites, object relationships, and outcomes.
2. `information-architecture-designer` places those rules at the correct product and navigation level.
3. `application-ux-designer` shapes the understandable task flow and interaction states.
4. `winUI3-designer` implements the result with appropriate WinUI 3 patterns and components.

Do not let the design skills invent domain behavior. Do not let current prototype behavior override confirmed PacKit requirements or current authoritative platform rules.

## Discussion Versus Implementation

When the user explicitly asks for discussion, analysis, or a recommendation without changing the prototype, use the required skills but do not edit application files.

When the user asks for implementation, carry the work through page-level consistency, interaction states, theme behavior, accessibility, and validation rather than changing only the directly mentioned component.

## Validation

After UI changes:

- compare the changed screen with equivalent pages or components across the application;
- verify location, object scope, selected state, actions, and route back;
- test rest, hover, pressed, focus, selected, disabled, loading, empty, success, warning, and error states when applicable;
- verify light and dark themes and representative wide and compact viewports;
- run the WinUI prototype audit, JavaScript syntax checks, and visual browser checks available in the repository;
- preserve unrelated user changes and keep modifications local unless the user explicitly asks to push.

## PacKit Page Surface Contract

Use this composition template across the application unless a documented task-specific exception is necessary:

1. The right content area is a continuous Mica canvas. It is structural background, not a card.
2. A top-level destination places its identity header directly on the Mica canvas by default: icon when meaningful, title, description, page status, and page-scoped actions. It is not a card unless the whole region is itself interactive or status-bearing.
3. A contextual object workspace uses one command-bar card containing object identity, state, and object-scoped actions instead of adding a second page header.
4. Horizontal tabs or pivots use a separate navigation card directly below the identity or command card.
5. Tables, operational groups, setting rows, inspectors, and editor canvases use layered task surfaces when grouping or readability requires them. Section labels and passive structure may remain directly on Mica.
6. Do not wrap several task-region cards in another visible full-page card. Structural wrappers must remain transparent and borderless.
7. Repeated-item cards may appear only when the items themselves are the collection, not as decoration inside another visual card.
8. Use the shared 12px compact spacing rhythm between sibling task surfaces and align their outer edges. Use the appropriate larger content inset at the page or navigation boundary.

When auditing a page, identify the canvas, identity/command region, optional local navigation, and task regions. Every visible border or filled surface must correspond to one of those responsibilities.
