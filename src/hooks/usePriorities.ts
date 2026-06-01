import { useEffect, useState } from 'react';

import { getPriorities } from '@/services/priorities/getPriorities';
import type { Priority } from '@/types/Priority';

interface UsePrioritiesResult {
  priorities: Priority[];
  loading: boolean;
  error: string | null;
}

export function usePriorities(): UsePrioritiesResult {
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getPriorities()
      .then((data) => { if (!cancelled) setPriorities(data); })
      .catch((err: any) => { if (!cancelled) setError(err.message ?? 'Failed to load priorities'); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  return { priorities, loading, error };
}
