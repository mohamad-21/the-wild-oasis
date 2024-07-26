import { useEffect, useRef } from "react";

export function useOutsideClick(handler, captureListener = true) {

  const ref = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }

    document.addEventListener('click', handleClick, captureListener);

    return () => removeEventListener('click', handleClick, captureListener);
  }, [handler]);

  return ref;
}