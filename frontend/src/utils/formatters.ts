/**
 * Funções utilitárias para formatação
 */

/**
 * Formata valor para moeda brasileira (R$)
 */
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
};

/**
 * Formata data para formato brasileiro (dd/mm/yyyy)
 */
export const formatDate = (date: string | Date): string => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
};

/**
 * Formata data e hora para formato brasileiro
 */
export const formatDateTime = (date: string | Date): string => {
    return new Intl.DateTimeFormat('pt-BR', {
        dateStyle: 'short',
        timeStyle: 'short',
    }).format(new Date(date));
};

/**
 * Formata duração em minutos para horas e minutos
 * @example formatDuration(125) // "2h 5min"
 */
export const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hours === 0) return `${mins}min`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}min`;
};

/**
 * Formata número de telefone brasileiro
 * @example formatPhone("11987654321") // "(11) 98765-4321"
 */
export const formatPhone = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');

    if (cleaned.length === 11) {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }

    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    }

    return phone;
};

/**
 * Formata CPF
 * @example formatCPF("12345678900") // "123.456.789-00"
 */
export const formatCPF = (cpf: string): string => {
    const cleaned = cpf.replace(/\D/g, '');

    if (cleaned.length !== 11) return cpf;

    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9)}`;
};

/**
 * Trunca texto com reticências
 */
export const truncate = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};
