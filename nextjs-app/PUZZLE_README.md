# LogicDistributionPuzzle Component

Ein interaktives, kindgerechtes React-Komponente für Logik-Rätsel vom Typ "Verteilung von Items an Personen mit Einschränkungen".

## 🎯 Übersicht

Diese Komponente ermöglicht es Kindern (8-12 Jahre), Verteilungs-Rätsel spielerisch mit Drag-and-Drop zu lösen. Sie ist generisch aufgebaut und kann für verschiedene Aufgabentypen wiederverwendet werden.

## 🚀 Installation

Die erforderlichen Dependencies sind bereits installiert:
- `@dnd-kit/core` - Drag-and-Drop Funktionalität
- `@dnd-kit/sortable` - Sortierbare Listen
- `@dnd-kit/utilities` - Helper-Funktionen
- `react-confetti` - Konfetti-Animation bei Erfolg

## 📋 Verwendung

### Basis-Beispiel

```typescript
import LogicDistributionPuzzle, { PuzzleData } from "@/components/LogicDistributionPuzzle";

const myPuzzle: PuzzleData = {
  entities: ["Kind1", "Kind2", "Kind3"],
  items: ["Apfel", "Birne", "Kirsche"],
  itemIcons: [
    "https://example.com/apple.png",
    "https://example.com/pear.png",
    "https://example.com/cherry.png"
  ],
  entityIcons: "https://example.com/child.png",
  minPerEntity: 1,
  maxPerEntity: 2,
  fixedAssignments: [
    { entity: "Kind1", items: ["Apfel"] }
  ],
  conditions: [
    "Birne = 2 × Apfel",
    "Kirsche = Birne + 1"
  ],
  totalEntities: 3,
  description: "Verteile das Obst gerecht!"
};

export default function MyPage() {
  return <LogicDistributionPuzzle puzzle={myPuzzle} />;
}
```

## 🎨 PuzzleData Interface

### Eigenschaften

| Eigenschaft | Typ | Beschreibung |
|------------|-----|--------------|
| `entities` | `string[]` | Liste der Personen/Entitäten (z.B. Kindernamen) |
| `items` | `string[]` | Kategorien der zu verteilenden Items |
| `itemIcons` | `string[]` | URLs zu den Icons für jeden Item-Typ (gleiche Reihenfolge wie `items`) |
| `entityIcons` | `string` | URL zum Icon für Personen/Plätze |
| `minPerEntity` | `number` | Minimale Anzahl Items pro Person |
| `maxPerEntity` | `number` | Maximale Anzahl Items pro Person |
| `fixedAssignments` | `FixedAssignment[]` | Vordefinierte, nicht änderbare Zuweisungen |
| `conditions` | `string[]` | Mathematische Bedingungen als Strings |
| `totalEntities` | `number` | Gesamtzahl der Entitäten |
| `description?` | `string` | Optionale Aufgabenbeschreibung |

### FixedAssignment Interface

```typescript
interface FixedAssignment {
  entity: string;  // Name der Person
  items: string[]; // Zugewiesene Items
}
```

## 🧮 Bedingungen (Conditions)

Bedingungen werden als mathematische Ausdrücke in Strings angegeben:

### Unterstützte Operatoren
- `=` - Gleichheit
- `×` oder `*` - Multiplikation
- `+` - Addition
- `-` - Subtraktion
- `/` - Division

### Beispiele

```typescript
conditions: [
  "Honig-Brötchen = 2 × Schokocreme-Brötchen",  // Honig ist doppelt so viel wie Schoko
  "Marmelade-Brötchen = Honig-Brötchen - 2",    // Marmelade ist Honig minus 2
  "Apfel + Birne = 10",                          // Summe von Äpfeln und Birnen ist 10
]
```

## 🖼️ Icon-URLs finden

### Kostenlose Icon-Quellen:
- **Vecteezy**: https://www.vecteezy.com (cute cartoon characters)
- **Flaticon**: https://www.flaticon.com (simple icons)
- **Freepik**: https://www.freepik.com (illustrations)
- **Shutterstock Free**: https://www.shutterstock.com/search/free

### Tipps:
- Suche nach "cute cartoon [item] vector"
- Bevorzuge quadratische Bilder (1:1 Ratio)
- PNG oder SVG mit transparentem Hintergrund
- Mindestens 200x200px Auflösung

## 📝 Neue Rätsel erstellen

### Schritt 1: Puzzle-Daten definieren

Erstelle ein neues Puzzle-Objekt:

```typescript
const fruitPuzzle: PuzzleData = {
  entities: ["Alice", "Bob", "Carol", "Dave", "Eve"],
  items: ["Apfel", "Banane", "Orange"],
  itemIcons: [
    "https://example.com/apple-icon.png",
    "https://example.com/banana-icon.png",
    "https://example.com/orange-icon.png",
  ],
  entityIcons: "https://example.com/child-icon.png",
  minPerEntity: 2,
  maxPerEntity: 3,
  fixedAssignments: [
    { entity: "Alice", items: ["Apfel", "Apfel"] }
  ],
  conditions: [
    "Banane = Apfel + 1",
    "Orange = 2 × Banane"
  ],
  totalEntities: 5,
  description: "Fünf Freunde teilen sich Obst. Jeder bekommt 2-3 Früchte. Alice hat schon 2 Äpfel. Verteile den Rest!"
};
```

### Schritt 2: In Page einbinden

```typescript
// app/fruit-puzzle/page.tsx
import LogicDistributionPuzzle from "@/components/LogicDistributionPuzzle";
import { fruitPuzzle } from "@/data/puzzles";

export default function FruitPuzzlePage() {
  return <LogicDistributionPuzzle puzzle={fruitPuzzle} />;
}
```

### Schritt 3: Puzzle-Sammlung organisieren (Optional)

Erstelle eine zentrale Datei für alle Puzzles:

```typescript
// data/puzzles.ts
import { PuzzleData } from "@/components/LogicDistributionPuzzle";

export const allPuzzles: Record<string, PuzzleData> = {
  breadRolls: { /* ... */ },
  fruits: { /* ... */ },
  toys: { /* ... */ },
};
```

## 🎮 Features

### Interaktive Elemente
- ✅ **Drag-and-Drop**: Touch-freundlich mit dnd-kit
- ✅ **Live-Feedback**: Sofortige Validierung der Bedingungen
- ✅ **Konfetti-Animation**: Bei korrekter Lösung
- ✅ **Visuelle Indikatoren**: Grün/Rot für erfüllte/nicht erfüllte Bedingungen
- ✅ **Item-Zähler**: Live-Anzeige der Verteilung
- ✅ **Neustart-Button**: Puzzle zurücksetzen
- ✅ **Fixierte Items**: Nicht verschiebbare Elemente mit 🔒-Icon

### Styling
- 🎨 Tailwind CSS
- 🌈 Bunte, kindgerechte Farben
- 📱 Responsive Design (Mobile/Tablet/Desktop)
- ⭕ Abgerundete Ecken und Schatten
- 🎯 Große Touch-Targets für Kinder

## 🛠️ Anpassungen

### Farben ändern

Die Komponente verwendet Tailwind-Klassen. Hauptfarben:
- **Vorrat**: `from-green-100 to-teal-100`
- **Platten**: `from-blue-100 to-purple-100`
- **Validierung**: `from-pink-100 to-red-100`
- **Erfolg**: `from-green-400 to-blue-400`

### Anzahl der Entitäten anpassen

```typescript
// Grid-Spalten in EntityPlate-Section ändern:
// 2 Entitäten: grid-cols-2
// 5 Entitäten: grid-cols-3 md:grid-cols-5
// 10 Entitäten: grid-cols-2 md:grid-cols-3 lg:grid-cols-5
```

### Layout ändern

Die Komponente verwendet ein 3-Spalten-Grid auf Desktop:
- Spalte 1: Vorrat (links)
- Spalte 2-3: Platten (Mitte)
- Spalte 4: Validierung (rechts)

Auf Mobile wird alles vertikal gestapelt.

## 🧪 Beispiel-Szenarien

### 1. Pizza-Verteilung
```typescript
const pizzaPuzzle: PuzzleData = {
  entities: ["Team A", "Team B", "Team C", "Team D"],
  items: ["Margherita", "Salami", "Vegetarisch"],
  // ...
  conditions: ["Salami = Margherita", "Vegetarisch = Salami + 2"]
};
```

### 2. Spielzeug-Verteilung
```typescript
const toyPuzzle: PuzzleData = {
  entities: ["Kindergarten Gruppe 1", "Kindergarten Gruppe 2", "Kindergarten Gruppe 3"],
  items: ["Bälle", "Puppen", "Autos"],
  // ...
  conditions: ["Bälle = 3 × Puppen", "Autos = Bälle - 4"]
};
```

### 3. Bücher-Verteilung
```typescript
const bookPuzzle: PuzzleData = {
  entities: ["Klasse 3A", "Klasse 3B", "Klasse 4A", "Klasse 4B"],
  items: ["Märchenbücher", "Sachbücher", "Comics"],
  // ...
  conditions: ["Comics = 2 × Märchenbücher", "Sachbücher = Comics + Märchenbücher"]
};
```

## 🐛 Troubleshooting

### Icons werden nicht angezeigt
- ✅ Prüfe, ob die URLs korrekt sind
- ✅ Verwende direkte Bild-URLs, keine Website-Links
- ✅ Teste URLs im Browser
- ✅ Manche Sites blockieren Hotlinking - verwende dann lokale Dateien

### Drag-and-Drop funktioniert nicht
- ✅ Stelle sicher, dass `"use client"` am Anfang der Komponente steht
- ✅ Prüfe, ob dnd-kit korrekt installiert ist
- ✅ Auf Mobile: Touch-Events können durch andere Listener blockiert werden

### Bedingungen werden nicht validiert
- ✅ Prüfe die Syntax der Bedingungen
- ✅ Item-Namen müssen exakt übereinstimmen (Case-sensitive)
- ✅ Verwende nur unterstützte Operatoren

## 📦 Projektstruktur

```
nextjs-app/
├── app/
│   ├── page.tsx              # Haupt-Seite mit Brötchen-Puzzle
│   └── ...
├── components/
│   └── LogicDistributionPuzzle.tsx  # Hauptkomponente
└── README.md                 # Diese Datei
```

## 🚀 Development

### Lokal starten
```bash
cd nextjs-app
npm run dev
```

Die App läuft auf `http://localhost:3000`

### Build für Production
```bash
npm run build
npm start
```

## 🎓 Pädagogischer Wert

Diese Komponente fördert:
- 🧮 **Mathematisches Denken**: Gleichungen lösen
- 🎯 **Logisches Denken**: Bedingungen erfüllen
- 🤔 **Problemlösung**: Trial-and-Error Ansatz
- 👆 **Feinmotorik**: Drag-and-Drop Interaktion
- 🎨 **Visuelles Lernen**: Farbcodierung und Icons

## 📄 Lizenz

Dieses Projekt kann frei verwendet und angepasst werden.

## 🤝 Beitragen

Verbesserungsvorschläge sind willkommen! Mögliche Erweiterungen:
- [ ] Schwierigkeitsgrade (Leicht/Mittel/Schwer)
- [ ] Hint-System für Kinder
- [ ] Lösungsvorschläge
- [ ] Zeitlimit-Modus
- [ ] Highscore/Statistiken
- [ ] Sound-Effekte
- [ ] Mehrsprachigkeit
- [ ] Druckbare Arbeitsblätter generieren
