export const ProgPages = () => {
    return (
        <>
            <section className="hero-section">
                <div className="container bg-primary">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <h1 className="fw-bold display-5">
                                <i className="bi bi-list-check me-3"></i>Sessões Disponíveis
                            </h1>
                            <p className="lead mb-0">Confira todas as sessões em cartaz e garanta seu ingresso</p>
                        </div>
                        <div className="col-md-4 text-md-end">
                            <a href="index.html" className="btn btn-dark">
                                <i className="bi bi-arrow-left me-2"></i>Voltar ao Início
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        <section className="py-4">
            <div className="container bg-primary p-4 rounded-3">
                <div className="filter-section">
                    <div className="row g-3 align-items-end">
                        <div className="col-md-3">
                            <label className="form-label text-white fw-bold">
                                <i className="bi bi-search me-2"></i>Buscar Filme
                            </label>
                            <input type="text" className="form-control" id="filtroFilme" placeholder="Digite o nome do filme..." />
                        </div>
                        <div className="col-md-2">
                            <label className="form-label text-white fw-bold">
                                <i className="bi bi-calendar me-2"></i>Data
                            </label>
                            <input type="date" className="form-control" id="filtroData"/>
                        </div>
                        <div className="col-md-2">
                            <label className="form-label text-white fw-bold">
                                <i className="bi bi-tags me-2"></i>Gênero
                            </label>
                            <select className="form-select" id="filtroGenero">
                                <option value="">Todos os gêneros</option>
                                <option value="acao">Ação</option>
                                <option value="aventura">Aventura</option>
                                <option value="comedia">Comédia</option>
                                <option value="drama">Drama</option>
                                <option value="ficcao">Ficção Científica</option>
                                <option value="terror">Terror</option>
                                <option value="romance">Romance</option>
                                <option value="suspense">Suspense</option>
                                <option value="animacao">Animação</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-light w-100" >
                                <i className="bi bi-funnel me-2"></i>Filtrar
                            </button>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-outline-light w-100" >
                                <i className="bi bi-arrow-clockwise me-2"></i>Limpar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
            {/* Lista de Sessões */}
            <section className="py-5">
                <div className="container bg-primary p-4">
                    <div className="row mb-4">
                        <div className="col-12">
                            <div className="d-flex justify-content-between align-items-center">
                                <h3 className="fw-bold">
                                    <i className="bi bi-camera-reels me-2" style={{color: "var(--frutiger-blue)"}}></i>
                                    Sessões em Cartaz
                                </h3>
                                <span className="badge bg-primary fs-6" id="totalSessoes">0 sessões</span>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4" id="listaSessoes">
                        {/* Sessões serão carregadas via JavaScript */}
                    </div>

                    {/* Mensagem quando não há sessões */}
                    <div className="text-center py-5" id="mensagemVazio" style={{display: "none"}}>
                        <i className="bi bi-calendar-x display-1 text-muted"></i>
                        <h3 className="text-muted mt-3">Nenhuma sessão disponível</h3>
                        <p className="text-muted">Não há sessões cadastradas ou que correspondam aos filtros aplicados.</p>
                        <a href="cadastro-sessoes.html" className="btn btn-primary mt-3">
                            <i className="bi bi-plus-circle me-2"></i>Cadastrar Sessão
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}