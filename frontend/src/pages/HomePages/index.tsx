import { useState, useEffect } from 'react';
import { ingressosService } from '../../services/ingresso.service';

export const HomePages = () => {
    const [totalIngressos, setTotalIngressos] = useState(0);
    const [vendasPorDia, setVendasPorDia] = useState<{ dia: string; vendas: number }[]>([]);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const ingressos = await ingressosService.findAll();
            setTotalIngressos(ingressos.length);

            // Agrupar vendas por dia (últimos 7 dias)
            const vendas: { [key: string]: number } = {};
            ingressos.forEach(ingresso => {
                const data = new Date(ingresso.dataPurchase).toLocaleDateString('pt-BR');
                vendas[data] = (vendas[data] || 0) + 1;
            });

            const vendasArray = Object.entries(vendas)
                .map(([dia, vendas]) => ({ dia, vendas }))
                .slice(-7);
            setVendasPorDia(vendasArray);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    };

    const maxVendas = Math.max(...vendasPorDia.map(v => v.vendas), 1);

    return (
        <>
            <section className="hero-section text-center">
                <div className="container bg-primary">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <h1 className="fw-bold">
                                <i className="bi bi-camera-reels me-3" />
                                Sistema de Gerenciamento de Cinema
                            </h1>
                            <p className="lead mb-4">
                                Gerencie seu cinema de forma eficiente com nosso sistema completo.
                                Controle de filmes, salas, sessões e vendas em uma única plataforma.
                            </p>
                            <div className="d-flex gap-3 justify-content-center flex-wrap">
                                <a href="/ingressos" className="btn btn-light btn-lg">
                                    <i className="bi bi-ticket-perforated me-2" />Vender Ingressos
                                </a>
                                <a href="/sessoes" className="btn btn-light btn-lg">
                                    <i className="bi bi-calendar-event me-2" />Gerenciar Sessões
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container bg-primary p-5 rounded-3 border border-2 border-primary">
                    <div className="row mb-5">
                        <div className="col-12 text-center">
                            <h3 className="fw-bold">Funcionalidades do Sistema</h3>
                            <p className="text-muted">Tudo que você precisa para gerenciar seu cinema</p>
                        </div>
                    </div>

                    <div className="row g-4">
                        {/* Cadastro de Filmes */}
                        <div className="col-md-6 col-lg-4">
                            <div className="card feature-card h-100">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <i className="bi bi-film display-4" />
                                    </div>
                                    <h4 className="card-title">Cadastro de Filmes</h4>
                                    <p className="card-text">
                                        Cadastre e gerencie o catálogo de filmes do seu cinema.
                                        Informações completas sobre cada produção.
                                    </p>
                                    <a href="/filmes" className="btn btn-light">
                                        <i className="bi bi-arrow-right me-2" />Acessar
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Cadastro de Salas */}
                        <div className="col-md-6 col-lg-4">
                            <div className="card feature-card h-100">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <i className="bi bi-building display-4" />
                                    </div>
                                    <h4 className="card-title">Cadastro de Salas</h4>
                                    <p className="card-text">
                                        Configure as salas de exibição com capacidade,
                                        tipo de tela e recursos especiais.
                                    </p>
                                    <a href="/salas" className="btn btn-light">
                                        <i className="bi bi-arrow-right me-2" />Acessar
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Cadastro de Sessões */}
                        <div className="col-md-6 col-lg-4">
                            <div className="card feature-card h-100">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <i className="bi bi-calendar-event display-4" />
                                    </div>
                                    <h4 className="card-title">Cadastro de Sessões</h4>
                                    <p className="card-text">
                                        Programe as sessões dos filmes nas salas disponíveis
                                        com horários e datas específicas.
                                    </p>
                                    <a href="/sessoes" className="btn btn-light">
                                        <i className="bi bi-arrow-right me-2" />Acessar
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Venda de Ingressos */}
                        <div className="col-md-6 col-lg-4">
                            <div className="card feature-card h-100">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <i className="bi bi-ticket-perforated display-4" />
                                    </div>
                                    <h4 className="card-title">Venda de Ingressos</h4>
                                    <p className="card-text">
                                        Sistema rápido e eficiente para venda de ingressos
                                        com controle de assentos e tipos de entrada.
                                    </p>
                                    <a href="/ingressos" className="btn btn-light">
                                        <i className="bi bi-arrow-right me-2" />Acessar
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Programação */}
                        <div className="col-md-6 col-lg-4">
                            <div className="card feature-card h-100">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <i className="bi bi-list-check display-4" />
                                    </div>
                                    <h4 className="card-title">Programação</h4>
                                    <p className="card-text mb-0">
                                        Visualize todas as sessões em cartaz com informações
                                        completas sobre horários e disponibilidade.
                                    </p>
                                    <a href="/prog" className="btn btn-light">
                                        <i className="bi bi-arrow-right me-2" />Acessar
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Lanches */}
                        <div className="col-md-6 col-lg-4">
                            <div className="card feature-card h-100">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <i className="bi bi-cup-straw display-4" />
                                    </div>
                                    <h4 className="card-title">Lanches</h4>
                                    <p className="card-text text-emphasis">
                                        Confira o cardápio completo de lanches e bebidas
                                        disponíveis no cinema.
                                    </p>
                                    <a href="/lanches" className="btn btn-light">
                                        <i className="bi bi-arrow-right me-2" />Acessar
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Seção de Relatórios */}
            <section className="py-5 bg-dark text-white">
                    <div className="row mb-4">
                        <div className="col-12 text-center">
                            <h3 className="fw-bold">
                                <i className="bi bi-graph-up me-2"></i>
                                Relatório de Vendas
                            </h3>
                            <p className="text-muted">Acompanhe o desempenho das vendas de ingressos</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-8 mx-auto">
                            <div className="card bg-primary">
                                <div className="card-body p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h5 className="mb-0">Vendas dos Últimos Dias</h5>
                                        <span className="badge bg-primary fs-6">
                                            Total: {totalIngressos} ingressos
                                        </span>
                                    </div>

                                    {vendasPorDia.length === 0 ? (
                                        <div className="text-center py-5">
                                            <i className="bi bi-inbox display-4 text-muted"></i>
                                            <p className="text-muted mt-3">Nenhuma venda registrada ainda</p>
                                        </div>
                                    ) : (
                                        <div className="chart-container" style={{ minHeight: '300px' }}>
                                            {vendasPorDia.map((item, index) => (
                                                <div key={index} className="mb-3">
                                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                                        <small className="text-light">{item.dia}</small>
                                                        <span className="badge bg-success">{item.vendas} vendas</span>
                                                    </div>
                                                    <div className="progress" style={{ height: '30px' }}>
                                                        <div
                                                            className="progress-bar bg-primary"
                                                            role="progressbar"
                                                            style={{ width: `${(item.vendas / maxVendas) * 100}%` }}
                                                            aria-valuenow={item.vendas}
                                                            aria-valuemin={0}
                                                            aria-valuemax={maxVendas}
                                                        >
                                                            {item.vendas > 0 && item.vendas}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
            </section>
        </>
    );
}