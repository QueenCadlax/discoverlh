import { useCallback, useEffect, useState } from "react";

const savedPropertiesStorageKey = "discover:saved-properties:v1";

export function useSavedProperties() {
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored: unknown = JSON.parse(localStorage.getItem(savedPropertiesStorageKey) ?? "[]");
      if (Array.isArray(stored) && stored.every((id): id is string => typeof id === "string")) {
        setSavedPropertyIds(stored);
      }
    } catch (error) {
      console.error("Could not load saved property listings.", error);
    }
  }, []);

  const toggleSavedProperty = useCallback(
    (id: string) => {
      const nextIds = savedPropertyIds.includes(id)
        ? savedPropertyIds.filter((savedId) => savedId !== id)
        : [...savedPropertyIds, id];
      try {
        localStorage.setItem(savedPropertiesStorageKey, JSON.stringify(nextIds));
        setSavedPropertyIds(nextIds);
      } catch (error) {
        console.error("Could not save this property listing.", error);
      }
    },
    [savedPropertyIds],
  );

  return { savedPropertyIds, toggleSavedProperty };
}
