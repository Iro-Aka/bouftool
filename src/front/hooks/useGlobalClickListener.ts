import { useEffect, useRef } from "react";

export type TUseGlobalClickListenerArgs = {
  includeTags?: string[];
  excludeTags?: string[];
  onClick?: (evt: PointerEvent, target: HTMLElement) => void;
  onClickAway?: (evt: PointerEvent) => void;
  onRightClick?: (evt: PointerEvent, target: HTMLElement) => void;
  onRightClickAway?: (evt: PointerEvent) => void;
};

const isElementMatchingTags = (element: HTMLElement, tags: string[]): boolean => {
  let currentElement: HTMLElement | null = element;
  while (currentElement) {
    const currentTag = currentElement.getAttribute("data-global-click");
    if (currentTag !== null && tags.includes(currentTag)) {
      return true;
    }
    currentElement = currentElement.parentElement;
  }
  return false;
};

export const useGlobalClickListener = ({
  includeTags,
  excludeTags,
  onClick,
  onClickAway,
  onRightClick,
  onRightClickAway,
}: TUseGlobalClickListenerArgs) => {
  const propsRef = useRef({
    includeTags,
    excludeTags,
    onClick,
    onClickAway,
    onRightClick,
    onRightClickAway,
  });
  propsRef.current = { includeTags, excludeTags, onClick, onClickAway, onRightClick, onRightClickAway };

  useEffect(() => {
    const handleClick = (event: PointerEvent) => {
      const { includeTags, excludeTags, onClick, onClickAway } = propsRef.current;
      const target = event.target;
      if (target instanceof HTMLElement) {
        if (excludeTags && isElementMatchingTags(target, excludeTags)) {
          return;
        } else if (includeTags && isElementMatchingTags(target, includeTags)) {
          onClick?.(event, target);
        } else {
          onClickAway?.(event);
        }
      }
    };
    const handleRightClick = (event: PointerEvent) => {
      const { includeTags, excludeTags, onRightClick, onRightClickAway } = propsRef.current;
      const target = event.target;
      if (target instanceof HTMLElement) {
        if (excludeTags && isElementMatchingTags(target, excludeTags)) {
          return;
        } else if (includeTags && isElementMatchingTags(target, includeTags)) {
          onRightClick?.(event, target);
        } else {
          onRightClickAway?.(event);
        }
      }
    };
    document.addEventListener("click", handleClick, true);
    document.addEventListener("contextmenu", handleRightClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("contextmenu", handleRightClick, true);
    };
  }, []);
};
