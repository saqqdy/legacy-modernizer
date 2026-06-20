# JS → TypeScript Migration

## Progressive Migration Path

Legacy Modernizer recommends a 4-stage approach:

### Stage 1: @ts-check + JSDoc
Add `// @ts-check` to .js files, supplement with JSDoc types.

### Stage 2: .d.ts Declaration Files
Create type declarations for third-party modules.

### Stage 3: .js → .ts Rename
Gradually rename files and add inline types.

### Stage 4: Strict Mode
Enable `strict: true`, eliminate all `any` types.

## Vue Component Typing

### Props

```ts
// Before (JS + PropTypes)
export default {
  props: {
    title: String,
    count: { type: Number, default: 0 },
  }
}

// After (TS + defineProps)
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
})
```

### Emits

```ts
const emit = defineEmits<{
  update: [value: string]
  delete: [id: number]
}>()
```
