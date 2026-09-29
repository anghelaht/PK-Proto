# PacKit Design And Domain Rules

Apply these rules to every task in this repository.

## UI Changes Require Three Design Skills

Before creating, editing, moving, renaming, or removing any user-interface page, section, navigation item, component, control, state, message, or visual element, use all three skills:

1. `information-architecture-designer`
2. `application-ux-ui-designer`
3. `winui-packit-designer`

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
3. `application-ux-ui-designer` shapes the understandable task flow and interaction states.
4. `winui-packit-designer` implements the result with appropriate WinUI 3 patterns and components.

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
