export const IngressosPages = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container bg-primary">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <h1 className="fw-bold display-5">
                                <i className="bi bi-ticket-perforated me-3"></i>Venda de Ingressos
                            </h1>
                            <p className="lead mb-0">Realize a venda de ingressos para as sessões disponíveis</p>
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
                            <div className="card form-card no-print">
                                <div className="card-header bg-primary py-4">
                                    <h3 className="card-title mb-0 text-center">
                                        <i className="bi bi-cart-plus me-2" ></i>
                                        Nova Venda
                                    </h3>
                                </div>
                                <div className="card-body p-4">
                                    <form id="formVenda">
                                        {/* Sessão */}
                                        <div className="mb-4">
                                            <label htmlFor="sessao" className="form-label">
                                                <i className="bi bi-calendar-event me-2" style={{color: "var(--frutiger-blue)"}}></i>
                                                Sessão
                                            </label>
                                            <select className="form-select" id="sessao" required>
                                                <option value="">Selecione uma sessão</option>
                                            </select>
                                            <div className="form-text">Sessões disponíveis para venda</div>
                                        </div>

                                        {/* Informações da Sessão Selecionada */}
                                        <div className="info-sessao" id="infoSessao">
                                            {/* Será preenchido dinamicamente */}
                                        </div>

                                        {/* Preço */}
                                        <div className="mb-4" style={{display: "none"}}>
                                            <label className="form-label">
                                                <i className="bi bi-currency-dollar me-2" style={{color: "var(--frutiger-green)"}}></i>
                                                Preço do Ingresso
                                            </label>
                                            <div className="price-display" id="precoIngresso">R$ 0,00</div>
                                        </div>

                                        <div className="row">
                                            {/* Nome do Cliente */}
                                            <div className="col-md-6 mb-4">
                                                <label htmlFor="nomeCliente" className="form-label">
                                                    <i className="bi bi-person me-2" style={{color: "var(--frutiger-orange)"}}></i>
                                                    Nome do Cliente
                                                </label>
                                                <input type="text" className="form-control" id="nomeCliente" 
                                                       placeholder="Digite o nome completo" required />
                                            </div>

                                            {/* CPF */}
                                            <div className="col-md-6 mb-4">
                                                <label htmlFor="cpfCliente" className="form-label">
                                                    <i className="bi bi-person-badge me-2" style={{color: "var(--frutiger-lime)"}}></i>
                                                    CPF
                                                </label>
                                                <input type="text" className="form-control" id="cpfCliente" 
                                                       placeholder="000.000.000-00" maxLength={14} required />
                                                <div className="form-text">Digite apenas números</div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <img src="src/pages/IngressosPages/assentos.png" className="img-thumbnail rounded" alt="..." />
                                        </div>
                                        <div className="row">
                                            {/* Assento */}
                                            <div className="col-md-6 mb-4">
                                                <label htmlFor="assento" className="form-label">
                                                    <i className="bi bi-geo-alt me-2" style={{color: "var(--frutiger-cyan)"}}></i>
                                                    Assento
                                                </label>
                                                <input type="text" className="form-control" id="assento" 
                                                       placeholder="Ex: A10, B5, C12" required />
                                                <div className="form-text">Formato: Letra + Número (ex: A10)</div>
                                            </div>

                                            {/* Tipo de Pagamento */}
                                            <div className="col-md-6 mb-4">
                                                <label htmlFor="tipoPagamento" className="form-label">
                                                    <i className="bi bi-credit-card me-2" style={{color: "var(--frutiger-blue)"}}></i>
                                                    Tipo de Pagamento
                                                </label>
                                                <select className="form-select" id="tipoPagamento" required>
                                                    <option value="">Selecione o pagamento</option>
                                                    <option value="cartao">Cartão</option>
                                                    <option value="pix">Pix</option>
                                                    <option value="dinheiro">Dinheiro</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Botões */}
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                            <button type="button" className="btn btn-secondary me-md-2" onClick={() => {}}>
                                                <i className="bi bi-x-circle me-2"></i>Limpar
                                            </button>
                                            <button type="submit" className="btn btn-primary">
                                                <i className="bi bi-check-circle me-2"></i>Confirmar Venda
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            {/* Comprovante de Venda */}
                            <div className="comprovante-section" id="comprovanteVenda">
                                {/* Será preenchido dinamicamente */}
                            </div>
                        </div>
                    </div>
            </section>
        </>
    );
}