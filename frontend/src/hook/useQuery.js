import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery(key) {
  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  return query.get(key);
}

export default useQuery;
