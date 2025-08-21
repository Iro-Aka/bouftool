import { closestCenter, DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useLayoutEffect, useState } from "react";
import type { WakfuStats } from "src/wakfu/types/action";
import { BuildDetailsPreferencesSortableItem } from "./sortableItem";

export type TBuildDetailsMasteryPreferencesProps<T extends WakfuStats> = {
  value: [T, T, T, T];
  onChange: (value: [T, T, T, T]) => void;
};

export const BuildDetailsPreferences = <T extends WakfuStats>({
  value,
  onChange,
}: TBuildDetailsMasteryPreferencesProps<T>) => {
  const [localValue, setLocalValue] = useState(value);

  useLayoutEffect(() => {
    setLocalValue(value);
  }, [value]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = Number(active.id) as T;
    const overId = over !== null ? (Number(over.id) as T) : null;
    if (overId !== null && activeId !== overId) {
      const oldIndex = value.indexOf(activeId);
      const newIndex = value.indexOf(overId);
      if (oldIndex !== -1 && newIndex !== -1) {
        const newValue = [...value] as [T, T, T, T];
        newValue.splice(oldIndex, 1);
        newValue.splice(newIndex, 0, activeId);
        setLocalValue(newValue);
        onChange(newValue);
      }
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={localValue} strategy={horizontalListSortingStrategy}>
        {localValue.map((stat) => (
          <BuildDetailsPreferencesSortableItem key={stat} id={stat} />
        ))}
      </SortableContext>
    </DndContext>
  );
};
