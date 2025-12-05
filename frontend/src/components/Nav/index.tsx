import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function Nav() {
    const { user, logout, isGerente, isCliente } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Se não tem usuário ou dados inválidos, redirecionar para login
        if (!user || !user.username || !user.role) {
            logout();
            navigate('/login', { replace: true });
        }
    }, [user, logout, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top py-2 px-4 rounded-pill border border-2 border-white shadow-sm">
                <a className="navbar-brand nav-logo" href={isCliente ? "/prog" : "/home"}>
                    <i className="bi bi-camera-reels me-2"></i>123 Filmes
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {/* Menu para Cliente */}
                        {isCliente && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/prog">
                                        <i className="bi bi-film me-1"></i>Programação
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/lanches">
                                        <i className="bi bi-cup-straw me-1"></i>Lanches
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/ingressos">
                                        <i className="bi bi-ticket-perforated me-1"></i>Comprar Ingressos
                                    </a>
                                </li>
                            </>
                        )}

                        {/* Menu para Gerente */}
                        {isGerente && (
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/home">
                                        <i className="bi bi-house me-1"></i>Início
                                    </a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle bg-transparent border-0" href="#" role="button" data-bs-toggle="dropdown">
                                        <i className="bi bi-gear me-1"></i>Cadastros
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="/filmes">
                                            <i className="bi bi-film me-2"></i>Cadastro de Filmes
                                        </a></li>
                                        <li><a className="dropdown-item" href="/salas">
                                            <i className="bi bi-building me-2"></i>Cadastro de Salas
                                        </a></li>
                                        <li><a className="dropdown-item" href="/sessoes">
                                            <i className="bi bi-calendar-event me-2"></i>Cadastro de Sessões
                                        </a></li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/ingressos">
                                        <i className="bi bi-ticket-perforated me-1"></i>Venda de Ingressos
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/lanches">
                                        <i className="bi bi-cup-straw me-1"></i>Lanches
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/sessoes">
                                        <i className="bi bi-list-check me-1"></i>Sessões Disponíveis
                                    </a>
                                </li>
                            </>
                        )}

                        {/* Menu do usuário */}
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle bg-transparent border-0" href="#" role="button" data-bs-toggle="dropdown">
                                <i className="bi bi-person-circle me-1"></i>{user?.username}
                            </a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><span className="dropdown-item-text"><strong>Role:</strong> {user?.role}</span></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><button className="dropdown-item text-danger" onClick={handleLogout}>
                                    <i className="bi bi-box-arrow-right me-2"></i>Sair
                                </button></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}