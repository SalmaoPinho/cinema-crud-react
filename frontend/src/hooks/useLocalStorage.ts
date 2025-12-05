/**
 * Hook para sincronizar estado com localStorage
 * Persiste dados entre sessões do navegador
 */

import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    // Estado para armazenar o valor
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            // Tenta pegar do localStorage
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Erro ao ler localStorage key "${key}":`, error);
            return initialValue;
        }
    });

    // Função para atualizar o valor
    const setValue = (value: T) => {
        try {
            // Salva no estado
            setStoredValue(value);
            // Salva no localStorage
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Erro ao salvar localStorage key "${key}":`, error);
        }
    };

    return [storedValue, setValue];
}
