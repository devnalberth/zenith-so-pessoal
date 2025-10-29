import { useState, useEffect } from 'react';

/**
 * Hook customizado para sincronizar estado com localStorage
 * @param key - Chave do localStorage
 * @param initialValue - Valor inicial se não houver nada no localStorage
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Estado para armazenar o valor
  // Passa a função de inicialização para useState para que a lógica seja executada apenas uma vez
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      // Busca do localStorage pela chave
      const item = window.localStorage.getItem(key);
      // Parseia o JSON armazenado ou retorna initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Retorna uma versão envolvida da função setValue do useState que
  // persiste o novo valor no localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permite que value seja uma função, assim temos a mesma API do useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Salva estado
      setStoredValue(valueToStore);
      // Salva no localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        // Dispara evento customizado para sincronizar entre abas
        window.dispatchEvent(new Event('local-storage'));
      }
    } catch (error) {
      console.warn(`Error saving localStorage key "${key}":`, error);
    }
  };

  // Sincroniza entre abas/janelas
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = window.localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.warn(`Error syncing localStorage key "${key}":`, error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('local-storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
}
