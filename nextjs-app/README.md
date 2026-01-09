# Interactive Logic Distribution Puzzle - Next.js App

A Next.js application featuring an interactive, child-friendly component for solving logic puzzles about distributing items to entities with mathematical constraints.

## 🎯 Overview

This project contains the **LogicDistributionPuzzle** component - a reusable, generic React component designed for children aged 8-12 to solve distribution puzzles using drag-and-drop interactions.

### Key Features

- ✅ **Touch-friendly Drag-and-Drop** - Built with dnd-kit for smooth interactions
- 🎨 **Colorful, Kid-Friendly UI** - Bright colors, large elements, rounded corners
- 🧮 **Real-time Validation** - Live feedback on mathematical conditions
- 🎉 **Success Animation** - Confetti celebration when puzzle is solved correctly
- 🔒 **Fixed Assignments** - Support for pre-assigned items
- 📊 **Live Counters** - Visual tracking of item distribution
- 📱 **Responsive Design** - Works on mobile, tablet, and desktop
- ♻️ **Fully Reusable** - Generic component that works with any puzzle configuration

## 🚀 Getting Started

### Installation

```bash
cd nextjs-app
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the puzzle in action.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
nextjs-app/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main page with bread roll puzzle
│   └── globals.css          # Global styles
├── components/
│   └── LogicDistributionPuzzle.tsx  # Main puzzle component
├── data/
│   └── puzzles.ts           # Collection of example puzzles
├── PUZZLE_README.md         # Detailed component documentation
└── README.md                # This file
```

## 🎮 Using the Component

### Basic Example

```tsx
import LogicDistributionPuzzle from "@/components/LogicDistributionPuzzle";
import { breadRollPuzzle } from "@/data/puzzles";

export default function Page() {
  return <LogicDistributionPuzzle puzzle={breadRollPuzzle} />;
}
```

### Creating Custom Puzzles

```tsx
import { PuzzleData } from "@/components/LogicDistributionPuzzle";

const myPuzzle: PuzzleData = {
  entities: ["Alice", "Bob", "Carol"],
  items: ["Apples", "Bananas"],
  itemIcons: ["url-to-apple-icon", "url-to-banana-icon"],
  entityIcons: "url-to-person-icon",
  minPerEntity: 1,
  maxPerEntity: 2,
  fixedAssignments: [{ entity: "Alice", items: ["Apples"] }],
  conditions: ["Bananas = Apples + 1"],
  totalEntities: 3,
  description: "Distribute fruit fairly!",
};
```

## 📚 Available Puzzles

The app includes 6 pre-configured puzzles in `/data/puzzles.ts`:

1. **breadRollPuzzle** - Original bread roll distribution (10 children)
2. **simpleFruitPuzzle** - Easy fruit puzzle (4 friends)
3. **pizzaPuzzle** - Pizza distribution (5 teams)
4. **toyPuzzle** - Toy distribution (3 kindergarten groups)
5. **bookPuzzle** - Book distribution (4 classes)
6. **sportsPuzzle** - Sports equipment (5 stations)

## 🎓 Educational Value

This component helps children develop:
- 🧮 **Mathematical Thinking** - Solving equations
- 🎯 **Logical Reasoning** - Meeting multiple conditions
- 🤔 **Problem Solving** - Trial and error approach
- 👆 **Fine Motor Skills** - Drag and drop interaction
- 🎨 **Visual Learning** - Color-coded feedback

## 📖 Documentation

For detailed documentation about the component, puzzle configuration, and customization options, see [PUZZLE_README.md](./PUZZLE_README.md).

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Drag & Drop**: @dnd-kit/core, @dnd-kit/sortable
- **Animations**: react-confetti
- **Runtime**: React 19

## 🔧 Configuration

### Dependencies

Key dependencies are already installed:
- `@dnd-kit/core` - Core drag-and-drop functionality
- `@dnd-kit/sortable` - Sortable items
- `@dnd-kit/utilities` - Helper utilities
- `react-confetti` - Success animation

### Tailwind CSS

The component uses Tailwind utility classes. Main color schemes:
- Storage area: Green/Teal gradient
- Entity plates: Blue/Purple gradient
- Validation panel: Pink/Red gradient
- Success state: Green/Blue gradient

## 🎨 Customization

### Changing Colors

Edit the component's className properties to use different Tailwind color schemes.

### Adjusting Layout

The component uses a responsive grid:
- **Desktop**: 4-column layout (Storage | Entities | Validation)
- **Mobile**: Vertical stack

### Adding New Puzzles

1. Create puzzle configuration in `/data/puzzles.ts`
2. Define entities, items, conditions
3. Add icon URLs (use free sources like Vecteezy, Flaticon)
4. Export and use in your page

## 🐛 Troubleshooting

**Icons not loading?**
- Verify URL accessibility
- Use direct image links, not webpage URLs
- Consider using local images in `/public`

**Drag-and-drop not working?**
- Ensure component has `"use client"` directive
- Check that dnd-kit is properly installed

**Conditions not validating?**
- Verify item names match exactly (case-sensitive)
- Use only supported operators: `=`, `×`, `*`, `+`, `-`, `/`

## 📄 License

This project is part of the learning-tracker repository and can be freely used and modified.

## 🤝 Contributing

Ideas for enhancements:
- [ ] Difficulty levels
- [ ] Hint system
- [ ] Solution suggestions
- [ ] Timer mode
- [ ] Statistics tracking
- [ ] Sound effects
- [ ] Multi-language support

## Learn More About Next.js

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Tutorial](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

## Deploy on Vercel

Deploy easily with [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.
