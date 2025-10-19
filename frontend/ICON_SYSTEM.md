# Icon System Documentation

## Overview

The app now uses **Lucide React** icons instead of emojis for a more professional and consistent look.

## Usage

### In Components

Import the `TaskIcon` component:

```jsx
import { TaskIcon } from '../utils/iconMap';

// Basic usage
<TaskIcon name="Activity" size={20} className="text-red-500" />

// With background
<div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
  <TaskIcon name="Laptop" size={20} className="text-red-500" />
</div>
```

### In Zustand Store

When creating or updating tasks, use icon names instead of emojis:

```js
addTask({
  title: 'New Task',
  icon: 'FileText',  // ✅ Use icon name
  // emoji: '📝',    // ❌ Don't use emoji anymore
  status: 'todo',
  // ... other fields
});
```

## Available Task Icons

Common icons you can use (from `taskIcons` in `utils/iconMap.jsx`):

| Icon Name | Description |
|-----------|-------------|
| `Activity` | Running, fitness, exercise |
| `Users` | Team, collaboration, people |
| `Laptop` | Coding, design, computer work |
| `Code` | Programming, development |
| `FileText` | Documents, writing, notes |
| `Mail` | Email, messages |
| `Phone` | Calls, communication |
| `Calendar` | Events, scheduling |
| `Coffee` | Break, social |
| `ShoppingCart` | Shopping, purchases |
| `Home` | House, domestic tasks |
| `Briefcase` | Work, business |
| `Book` | Reading, learning |
| `Heart` | Health, favorites |
| `Music` | Audio, entertainment |
| `Camera` | Photos, media |
| `MessageCircle` | Chat, messaging |
| `Send` | Shipping, sending |
| `DollarSign` | Finance, money |
| `Target` | Goals, objectives |

## All Lucide Icons Available

You can use **any** Lucide React icon! The full list is at:
https://lucide.dev/icons/

Just use the PascalCase name (e.g., `CheckCircle`, `AlertTriangle`, `Clock`, etc.)

## Examples

### Task with Activity Icon
```js
{
  id: 1,
  title: '5km run',
  icon: 'Activity',
  status: 'todo'
}
```

### Task with Laptop Icon
```js
{
  id: 2,
  title: 'Code review',
  icon: 'Laptop',
  status: 'in-progress'
}
```

### Task with Custom Icon
```js
{
  id: 3,
  title: 'Schedule meeting',
  icon: 'CalendarPlus',  // Any Lucide icon works!
  status: 'todo'
}
```

## Dynamic Icon Rendering

The `TaskIcon` component automatically:
- Maps icon names to Lucide components
- Falls back to `FileText` if icon not found
- Accepts size and className props
- Works with all Tailwind classes

## Migration from Emojis

**Before:**
```js
{ title: '4km jog', emoji: '🏃' }
```

**After:**
```js
{ title: '4km jog', icon: 'Activity' }
```

## Benefits

✅ **Consistent**: All icons match in style and weight  
✅ **Customizable**: Easy to change size, color, stroke  
✅ **Professional**: Modern, clean appearance  
✅ **Accessible**: Better screen reader support  
✅ **Flexible**: Huge library of icons available  

---

**Updated:** All task icons now use Lucide React 🎨
