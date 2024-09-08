import { useEffect, useState } from "react";

type TProps = {
  element: HTMLElement;
};

export const useOutsideClick = ({
  element,
}: TProps): {
  isOutsideClick: boolean;
  clickedElement?: HTMLElement;
} => {
  const [isOutsideClick, setIsOutsideClick] = useState(false);
  const [clickedElement, setClickeElement] = useState<HTMLElement>();

  useEffect(() => {
    const handleDocumentClick = (event: Event) => {
      const clickedElement = event.target as HTMLElement;
      setClickeElement(clickedElement);
      if (element?.contains(clickedElement)) setIsOutsideClick(() => false);
      else setIsOutsideClick(() => true);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => document.removeEventListener("click", handleDocumentClick);
  }, [element]);

  return {
    isOutsideClick,
    clickedElement,
  };
};
