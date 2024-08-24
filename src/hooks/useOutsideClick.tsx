import { FC, useEffect, useState } from "react";

type TProps = {
  element: HTMLElement;
};

export const useOutsideClick: FC<TProps> = ({ element }): boolean => {
  const [isOutsideClick, setIsOutsideClick] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (event: Event) => {
      const clickedElement = event.target as HTMLElement;
      if (element.contains(clickedElement)) setIsOutsideClick(false);
      else setIsOutsideClick(true);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => document.removeEventListener("click", handleDocumentClick);
  });

  return isOutsideClick;
};
