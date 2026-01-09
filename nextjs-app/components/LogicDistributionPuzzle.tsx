"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import Confetti from "react-confetti";

// ==================== TYPE DEFINITIONS ====================

/**
 * Interface for a fixed assignment in the puzzle
 */
interface FixedAssignment {
  entity: string;
  items: string[];
}

/**
 * Main puzzle configuration interface
 * This defines the structure of puzzles passed to the component
 */
export interface PuzzleData {
  entities: string[]; // List of people/entities (e.g., children names)
  items: string[]; // Categories of items (e.g., types of bread rolls)
  itemIcons: string[]; // Array of icon URLs for each item type
  entityIcons: string; // Icon URL for entities (or placeholder)
  minPerEntity: number; // Minimum items per entity
  maxPerEntity: number; // Maximum items per entity
  fixedAssignments: FixedAssignment[]; // Pre-assigned items that can't be moved
  conditions: string[]; // Mathematical conditions to validate
  totalEntities: number; // Total number of entities
  description?: string; // Optional task description
}

/**
 * Internal state for tracking assignments
 */
interface EntityAssignment {
  entity: string;
  items: string[];
  fixed: boolean;
}

// ==================== HELPER FUNCTIONS ====================

/**
 * Parse and evaluate conditions
 * Safely evaluates mathematical expressions for the puzzle conditions
 */
function evaluateCondition(
  condition: string,
  counts: Record<string, number>
): { valid: boolean; message: string } {
  try {
    // Replace item names with their counts
    let expression = condition;
    Object.keys(counts).forEach((itemName) => {
      const regex = new RegExp(itemName, "g");
      expression = expression.replace(regex, counts[itemName].toString());
    });

    // Parse simple mathematical expressions
    // Support: =, ×, -, +, numbers
    const parts = expression.split("=").map((s) => s.trim());
    if (parts.length !== 2) {
      return { valid: false, message: "Invalid condition format" };
    }

    const left = evaluateExpression(parts[0]);
    const right = evaluateExpression(parts[1]);

    const valid = Math.abs(left - right) < 0.001; // Account for floating point
    return {
      valid,
      message: valid
        ? `✓ ${condition}`
        : `✗ ${condition} (${left} ≠ ${right})`,
    };
  } catch {
    return { valid: false, message: `Error evaluating: ${condition}` };
  }
}

/**
 * Evaluate a simple mathematical expression safely
 * Only supports basic arithmetic: +, -, *, /
 */
function evaluateExpression(expr: string): number {
  // Replace × with *
  expr = expr.replace(/×/g, "*").trim();
  
  // Remove all spaces
  expr = expr.replace(/\s/g, "");
  
  // Validate that expression only contains numbers and allowed operators
  if (!/^[\d+\-*/().\s]+$/.test(expr)) {
    return 0;
  }
  
  try {
    // Parse and evaluate using a simple recursive descent parser
    const tokens = tokenize(expr);
    return parseExpression(tokens);
  } catch {
    return 0;
  }
}

/**
 * Tokenize a mathematical expression
 */
function tokenize(expr: string): string[] {
  const tokens: string[] = [];
  let currentNumber = "";
  
  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    if (char >= "0" && char <= "9" || char === ".") {
      currentNumber += char;
    } else {
      if (currentNumber) {
        tokens.push(currentNumber);
        currentNumber = "";
      }
      if (char !== " ") {
        tokens.push(char);
      }
    }
  }
  
  if (currentNumber) {
    tokens.push(currentNumber);
  }
  
  return tokens;
}

/**
 * Simple expression parser
 */
function parseExpression(tokens: string[]): number {
  let result = parseTerm(tokens);
  
  while (tokens.length > 0 && (tokens[0] === "+" || tokens[0] === "-")) {
    const op = tokens.shift()!;
    const term = parseTerm(tokens);
    result = op === "+" ? result + term : result - term;
  }
  
  return result;
}

/**
 * Parse a term (multiplication and division)
 */
function parseTerm(tokens: string[]): number {
  let result = parseFactor(tokens);
  
  while (tokens.length > 0 && (tokens[0] === "*" || tokens[0] === "/")) {
    const op = tokens.shift()!;
    const factor = parseFactor(tokens);
    result = op === "*" ? result * factor : result / factor;
  }
  
  return result;
}

/**
 * Parse a factor (number or parenthesized expression)
 */
function parseFactor(tokens: string[]): number {
  const token = tokens.shift();
  
  if (!token) {
    return 0;
  }
  
  if (token === "(") {
    const result = parseExpression(tokens);
    tokens.shift(); // Remove closing )
    return result;
  }
  
  return parseFloat(token) || 0;
}

/**
 * Count items by category across all assignments
 */
function countItems(
  assignments: EntityAssignment[]
): Record<string, number> {
  const counts: Record<string, number> = {};
  assignments.forEach((assignment) => {
    assignment.items.forEach((item) => {
      counts[item] = (counts[item] || 0) + 1;
    });
  });
  return counts;
}

// ==================== ENTITY PLATE COMPONENT ====================

interface EntityPlateProps {
  entity: string;
  items: string[];
  maxItems: number;
  entityIcon: string;
  itemIcons: Record<string, string>;
  isFixed: boolean;
  onDropItem: (item: string) => void;
  onRemoveItem: (index: number) => void;
}

function EntityPlate({
  entity,
  items,
  maxItems,
  entityIcon,
  itemIcons,
  isFixed,
}: EntityPlateProps) {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-4 shadow-lg border-4 border-blue-300 min-w-[160px]">
      {/* Entity name and icon */}
      <div className="text-center mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={entityIcon}
          alt={entity}
          className="w-12 h-12 mx-auto mb-2 rounded-full object-cover border-2 border-blue-400"
        />
        <p className="font-bold text-lg text-blue-800">{entity}</p>
      </div>

      {/* Drop zone for items */}
      <div className="bg-white rounded-xl p-3 min-h-[100px] flex flex-wrap gap-2 justify-center items-center">
        {items.length === 0 && (
          <p className="text-gray-400 text-sm">Ziehe Brötchen hierher</p>
        )}
        {items.map((item, index) => (
          <div key={`${entity}-${item}-${index}`} className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={itemIcons[item]}
              alt={item}
              className="w-16 h-16 object-cover rounded-lg shadow-md border-2 border-green-300"
            />
            {isFixed && (
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-bl">
                🔒
              </div>
            )}
          </div>
        ))}
        {items.length < maxItems && (
          <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-2xl">
            +
          </div>
        )}
      </div>

      {/* Item count indicator */}
      <div className="mt-2 text-center text-sm">
        <span
          className={`font-semibold ${items.length >= 1 && items.length <= maxItems ? "text-green-600" : "text-red-600"}`}
        >
          {items.length}/{maxItems}
        </span>
      </div>
    </div>
  );
}

// ==================== MAIN COMPONENT ====================

export default function LogicDistributionPuzzle({
  puzzle,
}: {
  puzzle: PuzzleData;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [puzzleKey, setPuzzleKey] = useState(0);

  // Create item icon mapping
  const itemIconMap = useMemo(() => {
    const map: Record<string, string> = {};
    puzzle.items.forEach((item, index) => {
      map[item] = puzzle.itemIcons[index] || "";
    });
    return map;
  }, [puzzle]);

  // Initialize assignments from puzzle data
  const initialAssignments = useMemo(() => {
    return puzzle.entities.map((entity) => {
      const fixedAssignment = puzzle.fixedAssignments.find(
        (fa) => fa.entity === entity
      );
      return {
        entity,
        items: fixedAssignment ? [...fixedAssignment.items] : [],
        fixed: !!fixedAssignment,
      };
    });
    // puzzleKey is intentionally included to reset assignments
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [puzzle.entities, puzzle.fixedAssignments, puzzleKey]);

  const [assignments, setAssignments] = useState<EntityAssignment[]>(initialAssignments);

  // Reset assignments when puzzle changes
  useEffect(() => {
    setAssignments(initialAssignments);
  }, [initialAssignments]);

  // Calculate validation results using useMemo
  const validationResults = useMemo(() => {
    const counts = countItems(assignments);
    return puzzle.conditions.map((condition) =>
      evaluateCondition(condition, counts)
    );
  }, [assignments, puzzle.conditions]);

  const allConditionsMet = useMemo(() => {
    return validationResults.every((r) => r.valid);
  }, [validationResults]);

  // Show confetti when conditions are met - use a ref to avoid setState in effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (allConditionsMet && validationResults.length > 0) {
      setShowConfetti(true);
      timer = setTimeout(() => setShowConfetti(false), 5000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [allConditionsMet, validationResults.length]);

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag start
  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  // Handle drag end
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Parse the drag/drop information
    const activeId = active.id as string;
    const overId = over.id as string;

    // Determine what was dragged and where it was dropped
    const [activeSource, activeItem] = activeId.split(":");
    const [overSource, overEntity] = overId.split(":");

    // Only handle drops onto entity plates from storage
    if (overSource === "entity" && activeSource === "storage") {
      // Dropped onto an entity plate
      const targetAssignment = assignments.find((a) => a.entity === overEntity);
      if (!targetAssignment || targetAssignment.fixed) return;

      // Check if entity already has max items
      if (targetAssignment.items.length >= puzzle.maxPerEntity) return;

      // Add item to entity
      const newAssignments = assignments.map((a) => {
        if (a.entity === overEntity) {
          return {
            ...a,
            items: [...a.items, activeItem],
          };
        }
        return a;
      });
      setAssignments(newAssignments);
    }
  }

  // Remove item from entity (drag back to storage or click to remove)
  function removeItemFromEntity(entityName: string, itemIndex: number) {
    const assignment = assignments.find((a) => a.entity === entityName);
    if (!assignment || assignment.fixed) return;

    const newAssignments = assignments.map((a) => {
      if (a.entity === entityName) {
        const newItems = [...a.items];
        newItems.splice(itemIndex, 1);
        return { ...a, items: newItems };
      }
      return a;
    });
    setAssignments(newAssignments);
  }

  // Reset puzzle
  // Reset puzzle
  function resetPuzzle() {
    setPuzzleKey((prev) => prev + 1);
    setShowConfetti(false);
  }

  // Calculate item counts for live display
  const itemCounts = useMemo(() => countItems(assignments), [assignments]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50 p-4 md:p-8">
      {showConfetti && <Confetti />}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-purple-700 mb-4">
            🎯 Logik-Rätsel: Verteilung
          </h1>
          {puzzle.description && (
            <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
              {puzzle.description}
            </p>
          )}
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Item Storage (Left/Top) */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-green-100 to-teal-100 rounded-3xl shadow-xl p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
                  📦 Vorrat
                </h2>
                <div className="flex flex-wrap gap-4 justify-center">
                  {puzzle.items.map((item, index) => (
                    <SortableContext
                      key={item}
                      items={[`storage:${item}`]}
                    >
                      <div
                        id={`storage:${item}`}
                        className="cursor-pointer"
                        onClick={() => {
                          // Click to add to first available entity
                          const firstAvailable = assignments.find(
                            (a) =>
                              !a.fixed &&
                              a.items.length < puzzle.maxPerEntity
                          );
                          if (firstAvailable) {
                            const newAssignments = assignments.map((a) => {
                              if (a.entity === firstAvailable.entity) {
                                return {
                                  ...a,
                                  items: [...a.items, item],
                                };
                              }
                              return a;
                            });
                            setAssignments(newAssignments);
                          }
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={puzzle.itemIcons[index]}
                          alt={item}
                          className="w-20 h-20 object-cover rounded-xl shadow-lg border-4 border-green-300 hover:scale-110 transition-transform cursor-pointer"
                        />
                        <p className="text-center text-sm font-semibold mt-2 text-green-800">
                          {item}
                        </p>
                      </div>
                    </SortableContext>
                  ))}
                </div>

                {/* Live Item Counts */}
                <div className="mt-6 bg-white rounded-xl p-4">
                  <h3 className="font-bold text-lg mb-2 text-center text-gray-700">
                    📊 Anzahl
                  </h3>
                  {puzzle.items.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center justify-between mb-2"
                    >
                      <div className="flex items-center gap-2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={puzzle.itemIcons[index]}
                          alt={item}
                          className="w-8 h-8 rounded"
                        />
                        <span className="text-sm font-medium">{item}:</span>
                      </div>
                      <span className="text-xl font-bold text-blue-600">
                        {itemCounts[item] || 0}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Entity Plates (Center) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
                  👥 Kinder ({puzzle.totalEntities})
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {assignments.map((assignment) => (
                    <div
                      key={assignment.entity}
                      id={`entity:${assignment.entity}`}
                    >
                      <EntityPlate
                        entity={assignment.entity}
                        items={assignment.items}
                        maxItems={puzzle.maxPerEntity}
                        entityIcon={puzzle.entityIcons}
                        itemIcons={itemIconMap}
                        isFixed={assignment.fixed}
                        onDropItem={(item) => {
                          if (
                            !assignment.fixed &&
                            assignment.items.length < puzzle.maxPerEntity
                          ) {
                            const newAssignments = assignments.map((a) => {
                              if (a.entity === assignment.entity) {
                                return {
                                  ...a,
                                  items: [...a.items, item],
                                };
                              }
                              return a;
                            });
                            setAssignments(newAssignments);
                          }
                        }}
                        onRemoveItem={(index) =>
                          removeItemFromEntity(assignment.entity, index)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Validation Panel (Right/Bottom) */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-pink-100 to-red-100 rounded-3xl shadow-xl p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-pink-700 mb-4 text-center">
                  ✓ Bedingungen
                </h2>

                {/* Condition checks */}
                <div className="space-y-3 mb-6">
                  {validationResults.map((result, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-xl ${
                        result.valid
                          ? "bg-green-200 border-2 border-green-400"
                          : "bg-red-200 border-2 border-red-400"
                      }`}
                    >
                      <p
                        className={`text-sm font-semibold ${
                          result.valid ? "text-green-800" : "text-red-800"
                        }`}
                      >
                        {result.message}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Success message */}
                {allConditionsMet && validationResults.length > 0 && (
                  <div className="bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-xl p-4 mb-4 animate-pulse">
                    <p className="text-2xl text-center font-bold">
                      🎉 Super! Das passt!
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="space-y-3">
                  <button
                    onClick={resetPuzzle}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all hover:scale-105 text-lg"
                  >
                    🔄 Neustart
                  </button>
                </div>

                {/* Instructions */}
                <div className="mt-6 bg-white rounded-xl p-4">
                  <h3 className="font-bold text-sm mb-2 text-gray-700">
                    📝 Anleitung:
                  </h3>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>
                      • Ziehe Brötchen aus dem Vorrat auf die Kinderteller
                    </li>
                    <li>
                      • Jedes Kind bekommt {puzzle.minPerEntity}-
                      {puzzle.maxPerEntity} Brötchen
                    </li>
                    <li>• 🔒 = Feste Zuordnung (nicht änderbar)</li>
                    <li>• Erfülle alle Bedingungen oben!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <DragOverlay>
            {activeId ? (
              <div className="cursor-grabbing">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={itemIconMap[activeId.split(":")[1]]}
                  alt="Dragging"
                  className="w-20 h-20 object-cover rounded-xl shadow-2xl border-4 border-yellow-400"
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
