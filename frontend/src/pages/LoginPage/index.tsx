import { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login, user, logout } = useAuth();

    useEffect(() => {
        // Limpar qualquer estado de autenticação inválido ao carregar a página de login
        if (user && (!user.username || !user.role)) {
            logout();
        }
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');

        const success = login(username, password);

        if (success) {
            // Redireciona baseado no role
            const redirectPath = user?.role === 'cliente' ? '/prog' : '/home';
            navigate(redirectPath);
        } else {
            setError('Usuário ou senha inválidos');
        }
    };

    return (
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-4">
                        <div className="card shadow-lg">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <i className="bi bi-camera-reels display-1 text-primary"></i>
                                    <h2 className="mt-3 fw-bold">CineWeb</h2>
                                    <p className="text-muted">Sistema de Gestão de Cinema</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">
                                            <i className="bi bi-person me-2"></i>
                                            Usuário
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${error ? 'is-invalid' : ''}`}
                                            id="username"
                                            placeholder="Digite seu usuário"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="password" className="form-label">
                                            <i className="bi bi-lock me-2"></i>
                                            Senha
                                        </label>
                                        <input
                                            type="password"
                                            className={`form-control ${error ? 'is-invalid' : ''}`}
                                            id="password"
                                            placeholder="Digite sua senha"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        {error && <div className="invalid-feedback d-block">{error}</div>}
                                    </div>

                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary btn-lg">
                                            <i className="bi bi-box-arrow-in-right me-2"></i>
                                            Entrar
                                        </button>
                                    </div>
                                </form>

                                <div className="mt-4 p-3 bg-primary rounded">
                                    <small className="text-muted d-block mb-2"><strong>Usuários de teste:</strong></small>
                                    <small className="d-block"><strong>Cliente:</strong> cliente / 123</small>
                                    <small className="d-block"><strong>Gerente:</strong> gerente / 123</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
    );
};
