/**
 * Constantes gerais da aplicação
 */

// Status de filmes
export const FILME_STATUS = {
    EM_CARTAZ: 'em-cartaz',
    EM_BREVE: 'em-breve',
    FORA_CARTAZ: 'fora-cartaz',
} as const;

// Tipos de sala
export const TIPOS_SALA = {
    NORMAL: 'normal',
    VIP: 'vip',
    IMAX: 'imax',
    '3D': '3d',
} as const;

// Status de sessão
export const STATUS_SESSAO = {
    DISPONIVEL: 'disponível',
    ESGOTADA: 'esgotada',
    CANCELADA: 'cancelada',
} as const;

// Mensagens de erro padrão
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Erro de conexão. Verifique sua internet.',
    NOT_FOUND: 'Recurso não encontrado.',
    UNAUTHORIZED: 'Você não tem permissão para acessar este recurso.',
    SERVER_ERROR: 'Erro no servidor. Tente novamente mais tarde.',
    VALIDATION_ERROR: 'Dados inválidos. Verifique os campos.',
} as const;

// Mensagens de sucesso
export const SUCCESS_MESSAGES = {
    CREATE: 'Criado com sucesso!',
    UPDATE: 'Atualizado com sucesso!',
    DELETE: 'Excluído com sucesso!',
} as const;

// Configurações de paginação
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
} as const;

// Configurações de validação
export const VALIDATION = {
    MIN_PASSWORD_LENGTH: 6,
    MAX_TITULO_LENGTH: 100,
    MIN_DURACAO: 1,
    MAX_DURACAO: 300, // 5 horas em minutos
} as const;
