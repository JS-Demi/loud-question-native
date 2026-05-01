# CLAUDE.md — Project Guidelines

## Stack

- **React Native 0.81** + **Expo SDK 54** (managed workflow)
- **Expo Router 6** — file-based navigation
- **UniWind 1.6** + **Tailwind CSS 4** — utility-first styling for RN
- **FSD** — Feature-Sliced Design architecture
- **React 19**

---

## Available Dependencies

Use these — do **not** install alternatives unless there's a strong reason.

### UI & Icons
| Package | Use for |
|---|---|
| `heroui-native` | Pre-built UI components (buttons, modals, inputs, etc.) |
| `lucide-react-native` | Icons — prefer over `@expo/vector-icons` for new code |
| `@expo/vector-icons` | Legacy icon sets (Ionicons, MaterialIcons) if needed |
| `expo-symbols` | SF Symbols on iOS |

### Styling
| Package | Use for |
|---|---|
| `uniwind` | Utility classes via `className` prop |
| `tailwindcss` | Config / design tokens |
| `tailwind-variants` | Compound component variants (`tv()`) |
| `tailwind-merge` | Merging className strings safely (`twMerge()`) |

### Animation & Gestures
| Package | Use for |
|---|---|
| `react-native-reanimated` | Performant animations (worklet-based) |
| `react-native-gesture-handler` | Swipe, pan, tap gestures |
| `react-native-worklets` | Shared values across threads |

### Navigation
| Package | Use for |
|---|---|
| `expo-router` | Primary navigation (file-based) |
| `@react-navigation/native` | Underlying navigation primitives |
| `@react-navigation/bottom-tabs` | Bottom tab navigator |

### Expo SDK Modules
| Package | Use for |
|---|---|
| `expo-image` | Optimized images (prefer over RN `Image`) |
| `expo-haptics` | Haptic feedback on interactions |
| `expo-constants` | App config, device info |
| `expo-font` | Custom font loading |
| `expo-splash-screen` | Splash screen control |
| `expo-linking` | Deep links & universal links |
| `expo-web-browser` | Opening URLs in-app browser |
| `expo-status-bar` | Status bar appearance |
| `expo-system-ui` | System UI color (nav bar etc.) |

### Other
| Package | Use for |
|---|---|
| `react-native-svg` | SVG rendering |
| `react-native-safe-area-context` | Safe area insets |
| `react-native-screens` | Native screen containers |

---

## Architecture: Feature-Sliced Design

### Layer hierarchy (top → bottom, imports only go downward)

```
app/
shared/
entities/
features/
widgets/
pages/         ← screens in Expo terms
```

### Rules

- **Never** import from a higher layer into a lower one (e.g. `features` must not import from `widgets`)
- Each slice has a **public API** — only import through `index.ts`, never reach into internals
- Co-locate everything related to a slice: ui, model, api, lib, types
- `shared/` contains only truly reusable, domain-agnostic code (ui kit, utils, api client, constants)
- `app/` contains providers, navigation root, global setup — no business logic

### Slice structure (example: `features/auth`)

```
features/auth/
  ui/          ← components used only in this feature
  model/       ← store, hooks, selectors (Zustand / React Query)
  api/         ← API calls (React Query query/mutation factories)
  lib/         ← helpers, validators
  types.ts
  index.ts     ← public API (explicit re-exports only)
```

### index.ts — explicit exports only

```ts
// ✅
export { LoginForm } from './ui/LoginForm'
export { useAuthStore } from './model/store'

// ❌ never
export * from './ui/LoginForm'
```

---

## Styling: UniWind + Tailwind

- Use **UniWind utility classes** via `className` prop — same mental model as Tailwind
- Do **not** mix `StyleSheet.create` with UniWind classes in the same component unless unavoidable
- For dynamic/conditional classes use **`tailwind-variants`** (`tv()`) — not manual string interpolation
- Use **`tailwind-merge`** (`twMerge()`) when merging external `className` props into a component
- Platform-specific overrides: use `Platform.select` or UniWind platform variants if available

```tsx
import { tv } from 'tailwind-variants'
import { twMerge } from 'tailwind-merge'

// ✅ variants with tv()
const button = tv({
  base: 'rounded-xl px-4 py-3 items-center',
  variants: {
    variant: {
      primary: 'bg-primary',
      ghost: 'bg-transparent border border-primary',
    },
    size: {
      sm: 'px-3 py-2',
      md: 'px-4 py-3',
    },
  },
  defaultVariants: { variant: 'primary', size: 'md' },
})

// ✅ merging external className
export const Card = ({ className }: { className?: string }) => (
  <View className={twMerge('rounded-2xl bg-surface p-4', className)} />
)

// ❌ avoid manual string interpolation for variants
<View className={`rounded-xl ${isActive ? 'bg-primary' : 'bg-muted'}`}>
```

---

## Expo Conventions

- Use **Expo Router** for navigation — file-based routing under `app/` directory
- Screens live in `pages/<name>/ui/<Name>Screen.tsx`, re-exported into `app/`
- Prefer **`expo-image`** over RN's `Image` — better caching and performance
- Use **`expo-haptics`** for tactile feedback on interactive elements (button press, swipe confirm, etc.)
- Environment variables via `app.config.ts` + `process.env.EXPO_PUBLIC_*` (never commit secrets)
- Assets in `shared/assets/`, referenced via `require()` or `@/shared/assets/...`

---

## Animations & Gestures

- Use **`react-native-reanimated`** for performant animations — runs on the UI thread via worklets
- Use **`react-native-gesture-handler`** for all gesture interactions (swipe, drag, pan)
- Combine both via `useAnimatedStyle` + `useSharedValue` for gesture-driven animations
- Do **not** use RN's built-in `Animated` API — Reanimated is always preferred
- Keep worklet functions pure — no external state access inside `'worklet'` functions

```tsx
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

const offset = useSharedValue(0)

const pan = Gesture.Pan()
  .onUpdate((e) => { offset.value = e.translationX })
  .onEnd(() => { offset.value = withSpring(0) })

const animStyle = useAnimatedStyle(() => ({
  transform: [{ translateX: offset.value }],
}))
```

---

## Component Rules

- **One component per file**; filename matches component name
- Use **functional components** with typed props (`interface IComponentNameProps {}` above the component)
- Props interfaces in the same file unless shared — then move to `types.ts`
- Export the component as **named export** (not default) — easier to refactor and grep
- No business logic in UI components — call hooks, render results

```tsx
interface ICardButtonProps {
  readonly title: string
  readonly onPress: () => void
}

export const CardButton = ({ title, onPress }: Props) => {
  return (
    <Pressable className="rounded-xl bg-primary px-4 py-3" onPress={onPress}>
      <Text className="text-white font-semibold">{title}</Text>
    </Pressable>
  )
}
```

---

## State & Data Fetching

> If Zustand / React Query are added to the project later, follow these patterns.

- **Zustand** for client state — one store per slice, defined in `model/store.ts`
- **React Query** for server state — query/mutation factories in `api/`, called in `model/` hooks
- Do **not** put server state into Zustand; React Query cache is the source of truth
- `queryKey` must **not** include `page` for infinite queries — use `getNextPageParam` instead
- Prefer `useQuery` / `useMutation` hooks wrapped in a custom hook per feature
- Prefer use queryKeys const for generate keys for react query

```ts
import { queryKeys } from shared/queryKeys

// features/posts/api/queries.ts
export const postsQuery = () => ({
  queryKey: queryKeys.posts.list(),
  queryFn: fetchPosts,
})

// features/posts/model/usePosts.ts
export const usePosts = () => useQuery(postsQuery())
```

---

## TypeScript

- **Strict mode** on — no `any`, no non-null assertions (`!`) unless justified with a comment
- Use `type` for unions/intersections, `interface` for object shapes
- Path aliases configured in `tsconfig.json`: `@/` → project root
- API response types live in `shared/api/types.ts` or the feature's `types.ts`

---

## File Naming

| What | Convention |
|---|---|
| Components | `PascalCase.tsx` |
| Hooks | `useCamelCase.ts` |
| Stores | `camelCaseStore.ts` or `store.ts` |
| Utils / libs | `camelCase.ts` |
| Types files | `types.ts` |
| Constants | `SCREAMING_SNAKE_CASE` inside `constants.ts` |

---

## Code Style

- **Early returns** for guard clauses — avoid deeply nested conditionals
- Prefer **explicit over implicit** — readable code beats clever code
- No magic numbers — extract to named constants
- Destructure props at the top of the component
- Keep components under ~150 lines  — split if larger, if it possible and not much splitted, sometimes its correct to get more lines.

---

## What to Avoid

- ❌ Default exports (except Expo Router screens which require it)
- ❌ Barrel files with `export *`
- ❌ Business logic directly in screen components
- ❌ Importing across FSD layers in the wrong direction
- ❌ `StyleSheet.create` mixed with UniWind without a clear reason
- ❌ `any` type
- ❌ Storing server state in Zustand

---

## When Adding a New Feature

1. Create slice folder under the correct layer (`features/`, `entities/`, etc.)
2. Add `index.ts` with explicit exports
3. Put API calls in `api/`, state in `model/`, components in `ui/`
4. Wire the screen in `pages/`, register the route in `app/`
5. Import only through the public API (`index.ts`) from outside the slice
