import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top py-2 px-4 rounded-pill border border-2 border-white shadow-sm">
            <a className="navbar-brand nav-logo" href="index.html">
                <i className="bi bi-camera-reels me-2"></i>123 Filmes
            </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="index.html">
                            <i className="bi bi-house me-1"></i>Início
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle bg-transparent  border-0" href="#" role="button" data-bs-toggle="dropdown">
                            <i className="bi bi-gear me-1"></i>Cadastros
                        </a>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="cadastro-filmes.html">
                                <i className="bi bi-film me-2"></i>Cadastro de Filmes
                            </a></li>
                            <li><a className="dropdown-item" href="cadastro-salas.html">
                                <i className="bi bi-building me-2"></i>Cadastro de Salas
                            </a></li>
                            <li><a className="dropdown-item" href="cadastro-sessoes.html">
                                <i className="bi bi-calendar-event me-2"></i>Cadastro de Sessões
                            </a></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="venda-ingressos.html">
                            <i className="bi bi-ticket-perforated me-1"></i>Venda de Ingressos
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="sessoes-disponiveis.html">
                            <i className="bi bi-list-check me-1"></i>Sessões Disponíveis
                        </a>
                    </li>
                </ul>
            </div>
    </nav>
        </>
    );
}