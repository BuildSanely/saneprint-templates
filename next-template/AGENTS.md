# Working with AI in saneprint Projects

This guide helps you get the most out of AI assistants (Cursor, Claude, Copilot) when building features in a saneprint project.

## Philosophy

**Show, don't tell.** This codebase is designed so AI can learn from existing patterns rather than needing extensive documentation.

## Before You Prompt

### 1. Reference Existing Patterns

**Always point AI to similar code:**

```
❌ Bad: "Create a settings page"
✅ Good: "Create a SettingsPage in src/features/protected/settings/pages/. 
Follow the same structure as src/features/auth/pages/LoginPage.tsx – 
use react-hook-form, Zod validation, and the existing Button/Input from @core."
```

### 2. Check What's Already Built

Before asking AI to create something:

- Visit `/styleguide` to see all UI components
- Browse `src/features/core/components` for primitives
- Look at `src/features/auth` as a reference feature
- Check `src/utils` for existing helpers

### 3. Be Specific About Location

```
❌ Vague: "Add a user profile feature"
✅ Specific: "Create src/features/protected/profile/ with:
  - pages/ProfilePage.tsx
  - components/ProfileForm.tsx
  - hooks/useProfileForm.ts
  - schemas/profileSchema.ts"
```

## Common Prompting Patterns

### Creating a New Feature

```
"Create a new feature in src/features/protected/[feature-name]/ following 
the auth feature structure. Include:
- pages/ directory with [Feature]Page.tsx
- components/ for feature-specific UI
- hooks/ for business logic
- schemas/ for Zod validation
- index.ts exporting the public API

Use @core components (Button, Input, DataTable) and the existing theme 
tokens (bg-brand, text-muted, etc.)"
```

### Adding a Data Table

```
"Create a [Entity]Table component using the DataTable from @core/components/data.
Reference src/features/[existing]/components/[Existing]Table.tsx for the pattern.
Define columns in a separate table-columns/ folder."
```

### Building a Form

```
"Create a [Purpose]Form using react-hook-form + zodResolver.
Follow the pattern in src/features/auth/components/LoginForm.tsx:
- Define schema in schemas/
- Extract form logic to hooks/
- Use Input, Button, Checkbox from @core
- Handle loading and error states"
```

## What AI Should Never Do

### ❌ Hardcode Design Values

```typescript
// ❌ NEVER
className="bg-blue-500 text-white px-4 py-2"
style={{ color: '#3b82f6' }}

// ✅ ALWAYS use semantic tokens
className="bg-brand text-on-brand px-4 py-2"
```

### ❌ Invent New Folder Structures

```
❌ src/components/auth/
❌ src/lib/utils/formatting.ts
❌ src/helpers/

✅ src/features/auth/components/
✅ src/utils/formatting.ts (extend existing)
```

### ❌ Create Primitive Components

```
❌ "Create a new Button component"
✅ "Use Button from @core, create a SubmitButton wrapper if needed"
```

### ❌ Mix Responsibilities

```typescript
// ❌ Component with API calls, state, AND UI
function UserDashboard() {
  const [users, setUsers] = useState([]);
  useEffect(() => { /* fetch */ }, []);
  return <div>{/* 200 lines of JSX */}</div>
}

// ✅ Separated concerns
function UserDashboard() {
  const { users } = useUsers(); // hook handles fetching
  return <UserDashboardView users={users} />; // component handles UI
}
```

## Effective Correction

When AI generates code that doesn't match the patterns:

```
"This doesn't follow the project structure. Please:
1. Move logic from [Component] to a custom hook in hooks/
2. Replace hardcoded colors with semantic tokens (bg-brand, text-muted)
3. Use existing @core/Input instead of creating a custom input
4. Follow the validation pattern from auth/schemas/"
```

## Preventing Hallucination

### Point to Concrete Examples

```
"Look at src/features/auth/components/SignupFlow.tsx as a reference 
for multi-step forms with state management"
```

### Specify Existing Tools

```
"Use TanStack Query for data fetching (see src/features/auth/hooks/useAuth.ts)
Use @services/apiClient for HTTP calls (not fetch or axios directly)"
```

### Reference the Styleguide

```
"Check /styleguide to see all available components before creating new ones"
```

## Pro Tips

### 1. Leverage Type Safety

Let TypeScript guide AI:
```
"The createSiteMetadata helper in @utils/seo expects specific fields. 
Use that for all page metadata."
```

### 2. Use Existing Patterns for New Features

```
"Clone the structure of src/features/auth/ for this new feature.
Keep the same folder organization, just update the domain logic."
```

### 3. Reference Redux Patterns

```
"If this needs global state, follow the pattern in src/features/auth/redux/.
Otherwise, keep state local with TanStack Query."
```

### 4. Point to Hooks for Logic

```
"Extract this validation logic into hooks/ following the pattern of 
useSignupFlow.ts – keep the component focused on rendering."
```

## Quick Reference

**Need to create?** → Check these first:
- UI Component → `/styleguide`, `@core/components`
- Form → `auth/components/*Form.tsx`
- Data fetching → `auth/hooks/useAuth.ts`
- Validation → `auth/schemas/*.ts`
- API call → `@services/apiClient.ts`
- Utility function → `@utils/`

**Feature structure template:**
```
src/features/[feature-name]/
├── components/         # Feature-specific UI
├── hooks/             # Business logic, form handling
├── pages/             # Page compositions
├── schemas/           # Zod validation
├── redux/             # Global state (if needed)
├── services/          # API functions (if needed)
└── index.ts           # Public exports
```

---

**Remember**: The code is the documentation. Point AI to examples, and it will follow the patterns naturally.
