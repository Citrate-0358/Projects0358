import { getScreenWidth } from "./helper";
import { BubbleSort } from "../sortFunctions/BubbleSort";
import { SelectionSort } from "../sortFunctions/SelectionSort";
import { InsertionSort } from "../sortFunctions/InsertionSort";
import { QuickSort } from "../sortFunctions/QuickSort";
import { HeapSort } from "../sortFunctions/HeapSort.js";
import { MergeSort } from "../sortFunctions/MergeSort";
import { RadixSort } from "../sortFunctions/RadixSort";
import { BucketSort } from "../sortFunctions/BucketSort";
import { CountingSort } from "../sortFunctions/CountingSort";
import { Sort745 } from "../sortFunctions/Sort745";
import { Sort824 } from "../sortFunctions/Sort824";

// colors setting
export const comparisionColor = "cyan";
export const swapColor = "orange";
export const sortedColor = "limegreen";
export const pivotColor = "purple";

// time setting
export let swapTime = 1000;
export let compareTime = 500;

// init array
export let sortingArray = initArrayForScreenSize();

export const sortingAlgorithms = [
  { component: BubbleSort, title: "Bubble", name: "BubbleSort" },
  { component: SelectionSort, title: "Selection", name: "SelectionSort" },
  { component: InsertionSort, title: "Insertion", name: "InsertionSort" },
  { component: HeapSort, title: "Heap", name: "HeapSort" },
  { component: MergeSort, title: "Merge", name: "MergeSort" },
  { component: QuickSort, title: "Quick", name: "QuickSort" },
  { component: RadixSort, title: "Radix", name: "RadixSort" },
  { component: BucketSort, title: "Bucket", name: "BucketSort" },
  { component: CountingSort, title: "Counting", name: "CountingSort" },
  { component: Sort745, title: "7.4.5", name: "7.4.5Sort" },
  { component: Sort824, title: "8.2.4", name: "8.2.4Sort" },
];
export const algorithmsTimeComplexities = [
  { formula: "O(n^2)", algorithmName: "BubbleSort" },
  { formula: "D(n)", algorithmName: "SelectionSort" },
  { formula: "D(n)", algorithmName: "InsertionSort" },
  { formula: "D(n)", algorithmName: "HeapSort" },
  { formula: "D(n)", algorithmName: "MergeSort" },
  { formula: "D(n)", algorithmName: "QuickSort" },
];


function initArrayForScreenSize() {
  const screenSize = getScreenWidth();
  if (screenSize < 460) return [6, 2, 7, 9];
  else if (screenSize < 720) return [3, 6, 2, 7,34, 67, 12, 31];
  return [2, 1, 40, 12, 18, 23, 35, 19, 2, 6, 1, 7];
}
