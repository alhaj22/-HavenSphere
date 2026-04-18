import { useEffect, useState } from "react";
import { getProperties } from "../services/api/propertyService";

export const useProperties = (params = {}) => {
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const response = await getProperties(params);
        if (mounted) {
          // Support both old format (array) and new format ({data, pagination})
          if (Array.isArray(response)) {
            setProperties(response);
          } else {
            setProperties(response.data || []);
            setPagination(response.pagination || null);
          }
        }
      } catch {
        if (mounted) setError("Unable to load properties right now.");
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return { properties, pagination, isLoading, error };
};
