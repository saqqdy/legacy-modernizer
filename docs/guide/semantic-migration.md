# Semantic Migration

## What Makes It Different?

Traditional codemods operate on AST patterns — they see syntax trees. Legacy Modernizer operates on **code semantics** — it understands what the code *does*.

### Example: this.$refs

A codemod sees `this.$refs.input` and doesn't know:
- Is this a template ref or a component ref?
- Is it used in mounted, in a method, or in a watcher?
- Should it become `ref()` or `useTemplateRef()`?

Legacy Modernizer reads the surrounding context:
- "This ref is used in `mounted()` to call `focus()`"
- → Generate `useTemplateRef<HTMLInputElement>('input')` + `onMounted(() => inputRef.value?.focus())`

## How It Works

1. **Pattern Detection** — Regex rules identify candidate patterns
2. **Context Extraction** — AI reads surrounding code to understand intent
3. **Semantic Transformation** — Generate semantically equivalent modern code
4. **Verification** — Compare before/after for behavioral equivalence

This is why Legacy Modernizer is implemented as a Claude Code Skill — AI reasoning is core to the product, not an add-on.
