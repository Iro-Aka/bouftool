import { closestCenter, DndContext, type DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useLayoutEffect, useState } from "react";
import type { TElementalPreferences, TWakfuStatElementalMastery } from "src/wakfu/stats/types";
import { BuildDetailsPreferencesSortableItem } from "./sortableItem";

export type TBuildDetailsMasteryPreferencesProps = {
  value: TElementalPreferences;
  onChange: (value: TElementalPreferences) => void;
  disabled?: boolean;
};

export const BuildDetailsPreferencesSortable = ({
  value,
  onChange,
  disabled,
}: TBuildDetailsMasteryPreferencesProps) => {
  const [localValue, setLocalValue] = useState(value);

  useLayoutEffect(() => {
    setLocalValue(value);
  }, [value]);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeId = active.id as TWakfuStatElementalMastery;
    const overId = over !== null ? (over.id as TWakfuStatElementalMastery) : null;
    if (overId !== null && activeId !== overId) {
      const oldIndex = value.indexOf(activeId);
      const newIndex = value.indexOf(overId);
      if (oldIndex !== -1 && newIndex !== -1) {
        const newValue = [...value] as TElementalPreferences;
        newValue.splice(oldIndex, 1);
        newValue.splice(newIndex, 0, activeId);
        setLocalValue(newValue);
        onChange(newValue);
      }
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={localValue} strategy={horizontalListSortingStrategy} disabled={disabled}>
        {localValue.map((stat) => (
          <BuildDetailsPreferencesSortableItem key={stat} id={stat} />
        ))}
      </SortableContext>
    </DndContext>
  );
};
