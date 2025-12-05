/**
 * Sistema simples de Toast/Notificações
 */

import { createContext, useContext, useState, type ReactNode, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
    showSuccess: (message: string) => void;
    showError: (message: string) => void;
    showWarning: (message: string) => void;
    showInfo: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast deve ser usado dentro de ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substring(7);
        const newToast: Toast = { id, message, type };

        setToasts((prev) => [...prev, newToast]);

        // Remove automaticamente após 5 segundos
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 5000);
    }, []);

    const showSuccess = useCallback((message: string) => showToast(message, 'success'), [showToast]);
    const showError = useCallback((message: string) => showToast(message, 'error'), [showToast]);
    const showWarning = useCallback((message: string) => showToast(message, 'warning'), [showToast]);
    const showInfo = useCallback((message: string) => showToast(message, 'info'), [showToast]);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const getToastClass = (type: ToastType) => {
        const classes = {
            success: 'bg-success',
            error: 'bg-danger',
            warning: 'bg-warning',
            info: 'bg-info',
        };
        return classes[type];
    };

    const getToastIcon = (type: ToastType) => {
        const icons = {
            success: 'bi-check-circle-fill',
            error: 'bi-x-circle-fill',
            warning: 'bi-exclamation-triangle-fill',
            info: 'bi-info-circle-fill',
        };
        return icons[type];
    };

    return (
        <ToastContext.Provider value={{ showToast, showSuccess, showError, showWarning, showInfo }}>
            {children}

            {/* Container de Toasts */}
            <div
                className="toast-container position-fixed top-0 end-0 p-3"
                style={{ zIndex: 9999 }}
            >
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`toast show ${getToastClass(toast.type)} text-white`}
                        role="alert"
                    >
                        <div className="toast-header">
                            <i className={`bi ${getToastIcon(toast.type)} me-2`}></i>
                            <strong className="me-auto">
                                {toast.type === 'success' && 'Sucesso'}
                                {toast.type === 'error' && 'Erro'}
                                {toast.type === 'warning' && 'Atenção'}
                                {toast.type === 'info' && 'Informação'}
                            </strong>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => removeToast(toast.id)}
                            ></button>
                        </div>
                        <div className="toast-body">{toast.message}</div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
