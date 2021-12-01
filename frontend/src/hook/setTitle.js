import { useEffect } from 'react';
export const useSetTitle = (value) => {
  useEffect(() => {
    document.title = value;
  }, [value]);
};

export default useSetTitle;
