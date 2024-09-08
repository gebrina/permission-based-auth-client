import { useEffect, useRef, useState } from "react";

type TProps = {
  element: HTMLElement;
};

export const useOutsideClick = ({
  element,
}: TProps): {
  isOutsideClick: boolean;
  clickedElement: HTMLElement;
} => {
  const [isOutsideClick, setIsOutsideClick] = useState(false);
  const clickedElmentRef = useRef<HTMLElement>(document.body);

  useEffect(() => {
    const handleDocumentClick = (event: Event) => {
      const clickedElement = event.target as HTMLElement;
      clickedElmentRef.current = clickedElement;
      if (element?.contains(clickedElement)) setIsOutsideClick(false);
      else setIsOutsideClick(true);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => document.removeEventListener("click", handleDocumentClick);
  });

  return {
    isOutsideClick,
    clickedElement: clickedElmentRef.current,
  };
};
