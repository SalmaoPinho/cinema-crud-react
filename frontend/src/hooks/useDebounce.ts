/**
 * Hook para debounce de valores
 * Útil para busca em tempo real, evitando requisições excessivas
 */

import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay: number = 500): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Cria um timer que atualiza o valor após o delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Limpa o timer se o valor mudar antes do delay
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
