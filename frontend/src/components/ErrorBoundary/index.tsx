/**
 * ErrorBoundary - Componente para capturar erros de renderização
 */

import { Component, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('ErrorBoundary capturou erro:', error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="container mt-5">
                    <div className="alert alert-danger" role="alert">
                        <h4 className="alert-heading">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            Ops! Algo deu errado
                        </h4>
                        <p>Ocorreu um erro inesperado na aplicação.</p>
                        <hr />
                        <p className="mb-0">
                            <strong>Erro:</strong> {this.state.error?.message}
                        </p>
                        {import.meta.env.DEV && this.state.errorInfo && (
                            <details className="mt-3">
                                <summary>Detalhes técnicos (apenas em desenvolvimento)</summary>
                                <pre className="mt-2" style={{ fontSize: '0.8rem' }}>
                                    {this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}
                        <button
                            className="btn btn-primary mt-3"
                            onClick={() => window.location.reload()}
                        >
                            <i className="bi bi-arrow-clockwise me-2"></i>
                            Recarregar Página
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
