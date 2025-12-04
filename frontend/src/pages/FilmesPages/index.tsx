export const FilmesPages = () => {
    return (
        <>
        <section className="hero-section">
                <div className="container bg-primary">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <h1 className="fw-bold display-5">
                                <i className="bi bi-film me-3"></i>Cadastro de Filmes
                            </h1>
                            <p className="lead mb-0">Cadastre e gerencie o catálogo de filmes do seu cinema</p>
                        </div>
                        <div className="col-md-4 text-md-end">
                            <a href="index.html" className="btn btn-dark">
                                <i className="bi bi-arrow-left me-2"></i>Voltar ao Início
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card form-card">
                                <div className="card-header py-4 bg-primary">
                                    <h3 className="card-title mb-0 text-center">
                                        <i className="bi bi-plus-circle me-2"></i>
                                        Novo Filme
                                    </h3>
                                </div>
                                <div className="card-body p-4">
                                    <form id="formFilme">
                                        <div className="row">
                                            <div className="col-md-4 mb-4">
                                                <div className="sticky-top" style={{top: "20px"}}>
                                                    <div className="mb-4">
                                                        <label htmlFor="imagemFilme" className="form-label">
                                                            <i className="bi bi-image me-2" style={{color: "var(--frutiger-blue)"}}></i>
                                                            Poster do Filme
                                                        </label>
                                                        <input type="file" className="form-control" id="imagemFilme" 
                                                            accept="image/*" />
                                                        <div className="form-text aspect-ratio-info">
                                                            Recomendado: 300x450px (aspect ratio 2:3)
                                                        </div>
                                                    </div>

                                                    <div className="image-preview-container text-center" id="imagePreviewContainer">
                                                        <img id="imagePreview" className="image-preview" alt="Preview do poster"/>
                                                        <div className="mt-2">
                                                            <button type="button" className="btn btn-sm btn-outline-danger" id="removeImageButton">
                                                                <i className="bi bi-trash me-1"></i>Remover
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Placeholder quando não há imagem */}
                                                    <div className="text-center text-muted" id="imagePlaceholder">
                                                        <i className="bi bi-image display-1"></i>
                                                        <p className="mt-2">Nenhuma imagem selecionada</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Coluna do Formulário */}
                                            <div className="col-md-8">
                                                {/* Título */}
                                                <div className="mb-4">
                                                    <label htmlFor="titulo" className="form-label">
                                                        <i className="bi bi-card-heading me-2" style={{color: "var(--frutiger-blue)"}}></i>
                                                        Título do Filme
                                                    </label>
                                                    <input type="text" className="form-control form-control-lg" id="titulo" 
                                                        placeholder="Digite o título do filme" required/>
                                                    <div className="form-text">Título completo do filme</div>
                                                </div>

                                                {/* Descrição */}
                                                <div className="mb-4">
                                                    <label htmlFor="descricao" className="form-label">
                                                        <i className="bi bi-text-paragraph me-2" style={{color: "var(--frutiger-green)"}}></i>
                                                        Descrição
                                                    </label>
                                                    <textarea className="form-control" id="descricao" rows={4} placeholder="Sinopse do filme..." required></textarea>
                                                    <div className="form-text">Breve descrição ou sinopse do filme</div>
                                                </div>

                                                <div className="row">
                                                    {/* Gênero */}
                                                    <div className="col-md-6 mb-4">
                                                        <label htmlFor="genero" className="form-label">
                                                            <i className="bi bi-tags me-2" style={{color: "var(--frutiger-orange)"}}></i>
                                                            Gênero
                                                        </label>
                                                        <select className="form-select" id="genero" required>
                                                            <option value="">Selecione um gênero</option>
                                                            <option value="acao">Ação</option>
                                                            <option value="aventura">Aventura</option>
                                                            <option value="comedia">Comédia</option>
                                                            <option value="drama">Drama</option>
                                                            <option value="ficcao">Ficção Científica</option>
                                                            <option value="terror">Terror</option>
                                                            <option value="romance">Romance</option>
                                                            <option value="suspense">Suspense</option>
                                                            <option value="animacao">Animação</option>
                                                            <option value="documentario">Documentário</option>
                                                            <option value="fantasia">Fantasia</option>
                                                            <option value="musical">Musical</option>
                                                        </select>
                                                    </div>

                                                    <div className="col-md-6 mb-4">
                                                        <label htmlFor="classificacao" className="form-label">
                                                            <i className="bi bi-exclamation-triangle me-2" style={{color: "var(--frutiger-lime)"}}></i>
                                                            Classificação Indicativa
                                                        </label>
                                                        <select className="form-select" id="classificacao" required>
                                                            <option value="">Selecione a classificação</option>
                                                            <option value="L">L - Livre</option>
                                                            <option value="10">10 anos</option>
                                                            <option value="12">12 anos</option>
                                                            <option value="14">14 anos</option>
                                                            <option value="16">16 anos</option>
                                                            <option value="18">18 anos</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    {/* Duração */}
                                                    <div className="col-md-6 mb-4">
                                                        <label htmlFor="duracao" className="form-label">
                                                            <i className="bi bi-clock me-2" style={{color: "var(--frutiger-cyan)"}}></i>
                                                            Duração (minutos)
                                                        </label>
                                                        <input type="number" className="form-control" id="duracao" placeholder="120" min="1" max="300" required/>
                                                        <div className="form-text">Duração em minutos</div>
                                                    </div>

                                                    {/* Data de Estreia */}
                                                    <div className="col-md-6 mb-4">
                                                        <label htmlFor="dataEstreia" className="form-label">
                                                            <i className="bi bi-calendar-date me-2" style={{color: "var(--frutiger-blue)"}}></i>
                                                            Data de Estreia
                                                        </label>
                                                        <input type="date" className="form-control" id="dataEstreia" required/>
                                                    </div>
                                                </div>

                                                {/* Botões */}
                                                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                                    <button type="button" className="btn btn-secondary me-md-2">
                                                        <i className="bi bi-x-circle me-2"></i>Limpar
                                                    </button>
                                                    <button type="submit" className="btn btn-primary">
                                                        <i className="bi bi-check-circle me-2"></i>Salvar Filme
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>

                <div className="container bg-dark">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fw-bold">
                                    <i className="bi bi-list-ul me-2" style={{color: "var(--frutiger-blue)"}}></i>
                                    Filmes Cadastrados
                                </h3>
                                <span className="badge bg-primary fs-6" id="totalFilmes">0 filmes</span>
                            </div>
                            
                            <div className="table-responsive">
                                <table className="table table-hover table-striped">
                                    <thead className="table-dark">
                                        <tr>
                                            <th style={{width: "80px"}}>Poster</th>
                                            <th>Título</th>
                                            <th>Gênero</th>
                                            <th>Classificação</th>
                                            <th>Duração</th>
                                            <th>Estreia</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody id="listaFilmes">
                                        {/* Lista preenchida via JavaScript */}
                                    </tbody>
                                </table>
                            </div>
                            
                            <div className="text-center mt-4" id="mensagemVazio" style={{display: "none"}}>
                                <i className="bi bi-inbox display-1 text-muted"></i>
                                <h4 className="text-muted mt-3">Nenhum filme cadastrado</h4>
                                <p className="text-muted">Comece cadastrando o primeiro filme usando o formulário acima.</p>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    );
}