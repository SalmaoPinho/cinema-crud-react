export const HomePages = () => {
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
                                    <i className="bi bi-eye me-2" />Ver Sessões
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
                                    <a href="#" className="btn btn-light">
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
                                    <a href="#" className="btn btn-light">
                                        <i className="bi bi-arrow-right me-2" />Acessar
                                    </a>
                                </div>
                            </div>
                        </div>

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
                                    <a href="#" className="btn btn-light">
                                        <i className="bi bi-arrow-right me-2" />Acessar
                                    </a>
                                </div>
                            </div>
                        </div>

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
                                    <a href="#" className="btn btn-light">
                                        <i className="bi bi-arrow-right me-2" />Acessar
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4">
                            <div className="card feature-card h-100">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <i className="bi bi-list-check display-4" />
                                    </div>
                                    <h4 className="card-title">Sessões Disponíveis</h4>
                                    <p className="card-text mb-0">
                                        Visualize todas as sessões em cartaz com informações
                                        completas sobre horários e disponibilidade.
                                    </p>
                                    <a href="#" className="btn btn-light">
                                        <i className="bi bi-arrow-right me-2" />Acessar
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Relatórios */}
                        <div className="col-md-6 col-lg-4">
                            <div className="card feature-card h-100">
                                <div className="card-body text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <i className="bi bi-graph-up display-4" />
                                    </div>
                                    <h4 className="card-title">Relatórios</h4>
                                    <p className="card-text text-emphasis">
                                        Acompanhe o desempenho do cinema com relatórios
                                        detalhados de vendas e ocupação.
                                    </p>
                                    <a href="#" className="btn btn-light">
                                        <i className="bi bi-arrow-right me-2" />Acessar
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}