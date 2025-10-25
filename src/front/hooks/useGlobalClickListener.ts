import { useEffect, useRef } from "react";

export type TUseGlobalClickListenerArgs = {
  includeTags?: string[];
  excludeTags?: string[];
  onClick?: (evt: PointerEvent, target: HTMLElement) => void;
  onClickAway?: (evt: PointerEvent) => void;
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
}: TUseGlobalClickListenerArgs) => {
  const propsRef = useRef({
    includeTags,
    excludeTags,
    onClick,
    onClickAway,
  });
  propsRef.current = { includeTags, excludeTags, onClick, onClickAway };

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
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);
};
