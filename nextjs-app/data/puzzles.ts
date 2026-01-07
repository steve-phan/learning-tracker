import { PuzzleData } from "@/components/LogicDistributionPuzzle";

/**
 * Collection of example puzzles for the LogicDistributionPuzzle component
 * 
 * Each puzzle demonstrates different scenarios and difficulty levels.
 * Use these as templates for creating new puzzles.
 */

// ==================== BREAD ROLLS PUZZLE ====================
// Original example from the problem statement
export const breadRollPuzzle: PuzzleData = {
  entities: [
    "Sophia",
    "Meike",
    "Anna",
    "Tom",
    "Lena",
    "Max",
    "Emma",
    "Leon",
    "Mia",
    "Felix",
  ],
  items: ["Schokocreme-Brötchen", "Honig-Brötchen", "Marmelade-Brötchen"],
  itemIcons: [
    "https://www.shutterstock.com/image-vector/chocolate-spread-hazelnuts-piece-toast-600nw-2343303677.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/041/334/793/small_2x/cute-funny-toast-with-honey-hand-drawn-cartoon-kawaii-character-illustration-icon-isolated-brown-background-toast-with-honey-character-concept-vector.jpg",
    "https://media.istockphoto.com/id/1399177521/vector/orange-jam-set-spread-on-piece-of-toast-bread-knife-glass-jar-with-marmalade-and-fresh.jpg?s=612x612",
  ],
  entityIcons:
    "https://static.vecteezy.com/system/resources/thumbnails/020/291/021/small/cute-kids-eating-cartoon-vector.jpg",
  minPerEntity: 1,
  maxPerEntity: 2,
  fixedAssignments: [
    { entity: "Sophia", items: ["Marmelade-Brötchen"] },
    { entity: "Meike", items: ["Marmelade-Brötchen"] },
  ],
  conditions: [
    "Honig-Brötchen = 2 × Schokocreme-Brötchen",
    "Marmelade-Brötchen = Honig-Brötchen - 2",
  ],
  totalEntities: 10,
  description:
    "Zehn Kinder teilen sich Brötchen mit verschiedenen Belägen. Jedes Kind bekommt 1 oder 2 Brötchen. Sophia und Meike haben bereits je ein Marmelade-Brötchen. Kannst du die restlichen Brötchen so verteilen, dass alle Bedingungen erfüllt sind?",
};

// ==================== SIMPLE FRUIT PUZZLE ====================
// Easier puzzle for younger children (ages 6-8)
export const simpleFruitPuzzle: PuzzleData = {
  entities: ["Alice", "Bob", "Carol", "Dave"],
  items: ["Äpfel", "Bananen"],
  itemIcons: [
    "https://static.vecteezy.com/system/resources/thumbnails/024/558/463/small/red-apple-cartoon-illustration-ai-generative-free-png.png",
    "https://static.vecteezy.com/system/resources/thumbnails/024/127/843/small/banana-cartoon-illustration-ai-generative-free-png.png",
  ],
  entityIcons:
    "https://static.vecteezy.com/system/resources/thumbnails/020/291/021/small/cute-kids-eating-cartoon-vector.jpg",
  minPerEntity: 1,
  maxPerEntity: 2,
  fixedAssignments: [{ entity: "Alice", items: ["Äpfel"] }],
  conditions: ["Bananen = Äpfel + 1"],
  totalEntities: 4,
  description:
    "Vier Freunde teilen sich Obst. Jeder bekommt 1-2 Früchte. Alice hat schon einen Apfel. Wie viele Bananen werden gebraucht?",
};

// ==================== PIZZA DISTRIBUTION ====================
// Medium difficulty puzzle
export const pizzaPuzzle: PuzzleData = {
  entities: ["Team A", "Team B", "Team C", "Team D", "Team E"],
  items: ["Margherita", "Salami", "Vegetarisch"],
  itemIcons: [
    "https://static.vecteezy.com/system/resources/thumbnails/027/144/320/small/margherita-pizza-slice-cartoon-illustration-ai-generative-free-png.png",
    "https://static.vecteezy.com/system/resources/thumbnails/024/558/609/small/pepperoni-pizza-cartoon-illustration-ai-generative-free-png.png",
    "https://static.vecteezy.com/system/resources/thumbnails/024/558/473/small/vegetable-pizza-cartoon-illustration-ai-generative-free-png.png",
  ],
  entityIcons:
    "https://static.vecteezy.com/system/resources/thumbnails/011/999/370/small/people-team-icon-isolated-contour-symbol-illustration-vector.jpg",
  minPerEntity: 2,
  maxPerEntity: 3,
  fixedAssignments: [
    { entity: "Team A", items: ["Margherita", "Margherita"] },
  ],
  conditions: [
    "Salami = Margherita",
    "Vegetarisch = Salami + 2",
  ],
  totalEntities: 5,
  description:
    "Fünf Teams bestellen Pizza zum Mittagessen. Jedes Team bekommt 2-3 Pizzastücke. Team A hat schon 2 Margherita bestellt. Verteile die restlichen Pizzen!",
};

// ==================== TOY DISTRIBUTION ====================
// For kindergarten scenario
export const toyPuzzle: PuzzleData = {
  entities: ["Gruppe Rot", "Gruppe Blau", "Gruppe Grün"],
  items: ["Bälle", "Puppen", "Autos"],
  itemIcons: [
    "https://static.vecteezy.com/system/resources/thumbnails/024/558/521/small/soccer-ball-cartoon-illustration-ai-generative-free-png.png",
    "https://static.vecteezy.com/system/resources/thumbnails/027/144/476/small/cute-doll-cartoon-illustration-ai-generative-free-png.png",
    "https://static.vecteezy.com/system/resources/thumbnails/024/558/585/small/toy-car-cartoon-illustration-ai-generative-free-png.png",
  ],
  entityIcons:
    "https://static.vecteezy.com/system/resources/thumbnails/020/291/021/small/cute-kids-eating-cartoon-vector.jpg",
  minPerEntity: 2,
  maxPerEntity: 4,
  fixedAssignments: [],
  conditions: [
    "Bälle = 3 × Puppen",
    "Autos = Bälle - 4",
  ],
  totalEntities: 3,
  description:
    "Drei Kindergarten-Gruppen bekommen neue Spielsachen. Jede Gruppe bekommt 2-4 Spielzeuge. Wie müssen sie verteilt werden?",
};

// ==================== BOOK DISTRIBUTION ====================
// School library scenario
export const bookPuzzle: PuzzleData = {
  entities: ["Klasse 3A", "Klasse 3B", "Klasse 4A", "Klasse 4B"],
  items: ["Märchenbücher", "Sachbücher", "Comics"],
  itemIcons: [
    "https://static.vecteezy.com/system/resources/thumbnails/024/558/548/small/fairy-tale-book-cartoon-illustration-ai-generative-free-png.png",
    "https://static.vecteezy.com/system/resources/thumbnails/024/558/525/small/encyclopedia-book-cartoon-illustration-ai-generative-free-png.png",
    "https://static.vecteezy.com/system/resources/thumbnails/024/558/504/small/comic-book-cartoon-illustration-ai-generative-free-png.png",
  ],
  entityIcons:
    "https://static.vecteezy.com/system/resources/thumbnails/011/999/370/small/people-team-icon-isolated-contour-symbol-illustration-vector.jpg",
  minPerEntity: 3,
  maxPerEntity: 5,
  fixedAssignments: [
    { entity: "Klasse 3A", items: ["Märchenbücher", "Märchenbücher", "Märchenbücher"] },
  ],
  conditions: [
    "Comics = 2 × Märchenbücher",
    "Sachbücher = Comics + Märchenbücher",
  ],
  totalEntities: 4,
  description:
    "Die Schulbibliothek verteilt neue Bücher an vier Klassen. Jede Klasse bekommt 3-5 Bücher. Klasse 3A hat schon 3 Märchenbücher. Verteile die restlichen Bücher!",
};

// ==================== SPORTS EQUIPMENT ====================
// PE class scenario
export const sportsPuzzle: PuzzleData = {
  entities: ["Station 1", "Station 2", "Station 3", "Station 4", "Station 5"],
  items: ["Basketbälle", "Fußbälle", "Tennisbälle"],
  itemIcons: [
    "https://static.vecteezy.com/system/resources/thumbnails/024/558/522/small/basketball-ball-cartoon-illustration-ai-generative-free-png.png",
    "https://static.vecteezy.com/system/resources/thumbnails/024/558/521/small/soccer-ball-cartoon-illustration-ai-generative-free-png.png",
    "https://static.vecteezy.com/system/resources/thumbnails/024/558/545/small/tennis-ball-cartoon-illustration-ai-generative-free-png.png",
  ],
  entityIcons:
    "https://static.vecteezy.com/system/resources/thumbnails/011/999/370/small/people-team-icon-isolated-contour-symbol-illustration-vector.jpg",
  minPerEntity: 1,
  maxPerEntity: 3,
  fixedAssignments: [
    { entity: "Station 1", items: ["Basketbälle"] },
    { entity: "Station 2", items: ["Fußbälle"] },
  ],
  conditions: [
    "Tennisbälle = Basketbälle + Fußbälle",
  ],
  totalEntities: 5,
  description:
    "Im Sportunterricht werden Bälle an 5 Stationen verteilt. Jede Station bekommt 1-3 Bälle. Station 1 hat einen Basketball, Station 2 einen Fußball. Verteile die Tennisbälle!",
};

// ==================== EXPORT ALL PUZZLES ====================
export const allPuzzles = {
  breadRolls: breadRollPuzzle,
  simpleFruit: simpleFruitPuzzle,
  pizza: pizzaPuzzle,
  toys: toyPuzzle,
  books: bookPuzzle,
  sports: sportsPuzzle,
};

// Default export for convenience
export default breadRollPuzzle;
