import { useState, useEffect } from 'react';
import { lanchesService } from '../../services/lanche.service';
import { type ILanche } from '../../models/lanche.model';

export const LanchesPages = () => {
    const [lanches, setLanches] = useState<ILanche[]>([]);

    useEffect(() => {
        carregarLanches();
    }, []);

    const carregarLanches = async () => {
        try {
            const dados = await lanchesService.findAll();
            setLanches(dados);
        } catch (error) {
            console.error('Erro ao carregar lanches:', error);
            alert('Erro ao carregar lanches. Verifique a conexão com a API.');
        }
    };

    const formatarPreco = (preco: number) => {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <>
            <section className="hero-section">
                <div className="container bg-primary">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <h1 className="fw-bold display-5">
                                <i className="bi bi-cup-straw me-3"></i>Bomboniere
                            </h1>
                            <p className="lead mb-0">Confira nossos deliciosos lanches e bebidas!</p>
                        </div>
                        <div className="col-md-4 text-md-end">
                            <a href="/home" className="btn btn-dark">
                                <i className="bi bi-arrow-left me-2"></i>Voltar ao Início
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Grade de Produtos */}
            <section className="py-5">
                <div className="container bg-primary">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="fw-bold mb-0">
                            <i className="bi bi-basket me-2 text-warning"></i>
                            Produtos Disponíveis
                        </h1>
                        <span className="badge bg-success fs-6">{lanches.length} itens</span>
                    </div>

                    {lanches.length === 0 ? (
                        <div className="text-center mt-5 py-5">
                            <i className="bi bi-inbox display-1 text-muted"></i>
                            <h4 className="text-muted mt-3">Nenhum produto disponível</h4>
                            <p className="text-muted">Volte em breve para conferir nossos lanches.</p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {lanches.map((lanche) => (
                                <div key={lanche.id} className="col-md-6 col-lg-4 col-xl-3">
                                    <div className="card h-100 shadow-sm hover-card">
                                        {/* Imagem do Produto */}
                                        <div className="position-relative overflow-hidden" style={{ height: '250px' }}>
                                            <img
                                                src={lanche.imagem}
                                                alt={lanche.nome}
                                                className="card-img-top h-100 w-100"
                                                style={{
                                                    objectFit: 'contain',
                                                    padding: '15px',
                                                    backgroundColor: '#f8f9fa'
                                                }}
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://via.placeholder.com/300x250?text=Sem+Imagem';
                                                }}
                                            />

                                        </div>

                                        {/* Informações do Produto */}
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title fw-bold mb-2">{lanche.nome}</h5>
                                            <p className="card-text text-muted small mb-3 flex-grow-1">
                                                {lanche.descricao}
                                            </p>

                                            <div className="d-flex justify-content-between align-items-center mt-auto">
                                                <div>
                                                    <small className="text-muted d-block">Preço</small>
                                                    <h4 className="text-success mb-0">{formatarPreco(lanche.preco)}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>


            <style>{`
                .hover-card {
                    transition: all 0.3s ease;
                }
                .hover-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.2) !important;
                }
            `}</style>
        </>
    );
}
