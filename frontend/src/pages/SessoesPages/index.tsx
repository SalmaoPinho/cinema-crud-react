export const SessoesPages = () => {
    return (
        <>
         <section className="hero-section">
        <div className="container bg-primary">
            <div className="row align-items-center">
                <div className="col-md-8">
                    <h1 className="fw-bold display-5">
                        <i className="bi bi-calendar-event me-3"></i>Cadastro de Sessões
                    </h1>
                    <p className="lead mb-0">Programe as sessões dos filmes nas salas disponíveis</p>
                </div>
                <div className="col-md-4 text-md-end">
                    <a href="index.html" className="btn btn-light">
                        <i className="bi bi-arrow-left me-2"></i>Voltar ao Início
                    </a>
                </div>
            </div>
        </div>
    </section>

    {/* Form Section */}
    <section className="py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card form-card">
                        <div className="card-header bg-primary py-4">
                            <h3 className="card-title mb-0 text-center">
                                <i className="bi bi-plus-circle me-2"></i>
                                Nova Sessão
                            </h3>
                        </div>
                        <div className="card-body p-4">
                            <form id="formSessao">
                                <div className="row">
                                    {/* Filme */}
                                    <div className="col-md-6 mb-4">
                                        <label htmlFor="filme" className="form-label">
                                            <i className="bi bi-film me-2" style={{color: 'var(--frutiger-blue)'}}></i>
                                            Filme
                                        </label>
                                        <select className="form-select" id="filme" required>
                                            <option value="">Selecione um filme</option>
                                        </select>
                                        <div className="form-text">Filmes cadastrados no sistema</div>
                                    </div>

                                    {/* Sala */}
                                    <div className="col-md-6 mb-4">
                                        <label htmlFor="sala" className="form-label">
                                            <i className="bi bi-building me-2" style={{color: 'var(--frutiger-green)'}}></i>
                                            Sala
                                        </label>
                                        <select className="form-select" id="sala" required>
                                            <option value="">Selecione uma sala</option>
                                        </select>
                                        <div className="form-text">Salas disponíveis</div>
                                    </div>
                                </div>

                                <div className="row">
                                    {/* Data e Hora */}
                                    <div className="col-md-6 mb-4">
                                        <label htmlFor="dataHora" className="form-label">
                                            <i className="bi bi-calendar me-2" style={{color: 'var(--frutiger-orange)'}}></i>
                                            Data e Hora
                                        </label>
                                        <input type="datetime-local" className="form-control" id="dataHora" required/>
                                    </div>

                                    {/* Preço */}
                                    <div className="col-md-6 mb-4">
                                        <label htmlFor="preco" className="form-label">
                                            <i className="bi bi-currency-dollar me-2" style={{color: 'var(--frutiger-lime)'}}></i>
                                            Preço do Ingresso (R$)
                                        </label>
                                        <input type="number" className="form-control" id="preco" 
                                               placeholder="35.00" min="0" step="0.01" required/>
                                        <div className="form-text">Preço por ingresso</div>
                                    </div>
                                </div>

                                <div className="row">
                                    {/* Idioma */}
                                    <div className="col-md-6 mb-4">
                                        <label htmlFor="idioma" className="form-label">
                                            <i className="bi bi-translate me-2" style={{color: 'var(--frutiger-cyan)'}}></i>
                                            Idioma
                                        </label>
                                        <select className="form-select" id="idioma" required>
                                            <option value="">Selecione o idioma</option>
                                            <option value="dublado">Dublado</option>
                                            <option value="legendado">Legendado</option>
                                        </select>
                                    </div>

                                    {/* Formato */}
                                    <div className="col-md-6 mb-4">
                                        <label htmlFor="formato" className="form-label">
                                            <i className="bi bi-display me-2" style={{color: 'var(--frutiger-blue)'}}></i>
                                            Formato
                                        </label>
                                        <select className="form-select" id="formato" required>
                                            <option value="">Selecione o formato</option>
                                            <option value="2D">2D</option>
                                            <option value="3D">3D</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Botões */}
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                    <button type="button" className="btn btn-secondary me-md-2" onClick={() => {}}>
                                        <i className="bi bi-x-circle me-2"></i>Limpar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        <i className="bi bi-check-circle me-2"></i>Salvar Sessão
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </section>

    {/* Lista de Sessões Cadastradas */}
        <div className="container bg-dark">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 className="fw-bold">
                            <i className="bi bi-list-ul me-2" style={{color: 'var(--frutiger-blue)'}}></i>
                            Sessões Cadastradas
                        </h3>
                        <span className="badge bg-primary fs-6" id="totalSessoes">0 sessões</span>
                    </div>
                    
                    <div className="table-responsive">
                        <table className="table table-hover table-striped">
                            <thead className="table-dark">
                                <tr>
                                    <th>Filme</th>
                                    <th>Sala</th>
                                    <th>Data/Hora</th>
                                    <th>Preço</th>
                                    <th>Idioma</th>
                                    <th>Formato</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody id="listaSessoes">
                                {/* Lista preenchida via JavaScript */}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="text-center mt-4" id="mensagemVazio" style={{display: 'none'}}>
                        <i className="bi bi-inbox display-1 text-muted"></i>
                        <h4 className="text-muted mt-3">Nenhuma sessão cadastrada</h4>
                        <p className="text-muted">Comece cadastrando a primeira sessão usando o formulário acima.</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}