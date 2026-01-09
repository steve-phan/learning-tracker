import LogicDistributionPuzzle from "@/components/LogicDistributionPuzzle";
import { breadRollPuzzle } from "@/data/puzzles";

/**
 * Example page demonstrating the LogicDistributionPuzzle component
 * 
 * This page uses the breadRollPuzzle from the centralized puzzles collection.
 * To use a different puzzle, import it from @/data/puzzles and pass it to the component.
 * 
 * Example:
 *   import { simpleFruitPuzzle } from "@/data/puzzles";
 *   <LogicDistributionPuzzle puzzle={simpleFruitPuzzle} />
 */
export default function Home() {
  return (
    <main>
      <LogicDistributionPuzzle puzzle={breadRollPuzzle} />
    </main>
  );
}
