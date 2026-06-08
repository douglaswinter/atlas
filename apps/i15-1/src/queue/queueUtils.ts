import type { MRT_Row } from "material-react-table";
import type { QueueTableData } from "./tableData";

export function calculateNewPosition(
  draggedRow: MRT_Row<QueueTableData>,
  targetRow: Partial<MRT_Row<QueueTableData>>,
): number | undefined {
  const oldIndex = draggedRow.index;
  const newIndex = targetRow.index;

  if (newIndex === undefined || draggedRow.original.position === null) return;

  const newPosition = Math.max(
    draggedRow.original.position + (newIndex - oldIndex),
    0,
  );

  return newPosition;
}
