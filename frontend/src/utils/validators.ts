/**
 * Funções utilitárias para validação
 */

/**
 * Valida email
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Valida CPF
 */
export const isValidCPF = (cpf: string): boolean => {
    const cleaned = cpf.replace(/\D/g, '');

    if (cleaned.length !== 11) return false;

    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1{10}$/.test(cleaned)) return false;

    // Validação dos dígitos verificadores
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cleaned.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cleaned.charAt(9))) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cleaned.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit >= 10) digit = 0;
    if (digit !== parseInt(cleaned.charAt(10))) return false;

    return true;
};

/**
 * Valida telefone brasileiro
 */
export const isValidPhone = (phone: string): boolean => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 || cleaned.length === 11;
};

/**
 * Valida se string não está vazia
 */
export const isNotEmpty = (value: string): boolean => {
    return value.trim().length > 0;
};

/**
 * Valida se número está dentro de um range
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
};

/**
 * Valida URL
 */
export const isValidURL = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Valida se data é futura
 */
export const isFutureDate = (date: string | Date): boolean => {
    return new Date(date) > new Date();
};

/**
 * Valida se data é passada
 */
export const isPastDate = (date: string | Date): boolean => {
    return new Date(date) < new Date();
};
