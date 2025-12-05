import { useState, useEffect } from 'react';
import { sessoesService } from '../../services/sessao.service';
import { filmesService } from '../../services/filme.service';
import { salasService } from '../../services/sala.service';
import { type ISessao } from '../../models/sessao.model';
import { type IFilme } from '../../models/filme.model';
import { type ISala } from '../../models/sala.model';

export const ProgPages = () => {
    const [sessoes, setSessoes] = useState<ISessao[]>([]);
    const [filmes, setFilmes] = useState<IFilme[]>([]);
    const [salas, setSalas] = useState<ISala[]>([]);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const [sessoesData, filmesData, salasData] = await Promise.all([
                sessoesService.findByStatus('ativa'),
                filmesService.findAll(),
                salasService.findAll()
            ]);
            setSessoes(sessoesData);
            setFilmes(filmesData);
            setSalas(salasData);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            alert('Erro ao carregar programação. Verifique a conexão com a API.');
        }
    };

    const getFilme = (filmeId: string) => {
        return filmes.find(f => f.id === filmeId);
    };

    const getSala = (salaId: string) => {
        return salas.find(s => s.id === salaId);
    };

    const formatarDataHora = (dataHora: string) => {
        const data = new Date(dataHora);
        return {
            data: data.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }),
            hora: data.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
            }),
            diaSemana: data.toLocaleDateString('pt-BR', { weekday: 'long' })
        };
    };

    const formatarPreco = (preco: number) => {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const calcularOcupacao = (sessao: ISessao) => {
        const sala = getSala(sessao.salaId);
        if (!sala) return 0;
        const ocupados = sala.capacidade - sessao.assentosDisponiveis;
        return Math.round((ocupados / sala.capacidade) * 100);
    };

    return (
        <>
            <section className="hero-section">
                <div className="container bg-primary">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <h1 className="fw-bold display-5">
                                <i className="bi bi-calendar-week me-3"></i>Programação
                            </h1>
                            <p className="lead mb-0">Confira as sessões em cartaz e programe-se!</p>
                        </div>
                        <div className="col-md-4 text-md-end">
                            <a href="/home" className="btn btn-light">
                                <i className="bi bi-arrow-left me-2"></i>Voltar ao Início
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Carousel de Sessões em Destaque */}
            {sessoes.length > 0 && (
                <section className="py-4 bg-dark">
                    <div className="container bg-primary">
                        <div id="carouselSessoes" className="carousel slide carousel-fade" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                {sessoes.slice(0, 5).map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        data-bs-target="#carouselSessoes"
                                        data-bs-slide-to={index}
                                        className={index === 0 ? 'active' : ''}
                                        aria-current={index === 0 ? 'true' : 'false'}
                                        aria-label={`Slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>

                            <div className="carousel-inner rounded-3 overflow-hidden">
                                {sessoes.slice(0, 5).map((sessao, index) => {
                                    const filme = getFilme(sessao.filmeId);
                                    const sala = getSala(sessao.salaId);
                                    const dataHora = formatarDataHora(sessao.dataHora);

                                    if (!filme || !sala) return null;

                                    return (
                                        <div key={sessao.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                            <div className="row g-0 bg-dark text-white" style={{ minHeight: '450px' }}>
                                                <div className="col-md-4">
                                                    <img
                                                        src={filme.imagem}
                                                        alt={filme.titulo}
                                                        className="d-block w-100 h-100"
                                                        style={{
                                                            objectFit: 'cover',
                                                            aspectRatio: '2/3'
                                                        }}
                                                        onError={(e) => {
                                                            e.currentTarget.src = 'https://via.placeholder.com/400x600?text=Sem+Poster';
                                                        }}
                                                    />
                                                </div>

                                                <div className="col-md-8 d-flex align-items-center">
                                                    <div className="p-5">
                                                        <span className="badge bg-danger mb-3 px-3 py-2">EM DESTAQUE</span>
                                                        <h2 className="display-4 fw-bold mb-3">{filme.titulo}</h2>
                                                        <p className="lead mb-4">{filme.descricao.substring(0, 150)}...</p>

                                                        <div className="row mb-4">
                                                            <div className="col-auto">
                                                                <div className="d-flex align-items-center mb-2">
                                                                    <i className="bi bi-calendar3 me-2 text-primary fs-4"></i>
                                                                    <div>
                                                                        <small className="text-muted d-block">Data</small>
                                                                        <strong>{dataHora.data}</strong>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="d-flex align-items-center mb-2">
                                                                    <i className="bi bi-clock me-2 text-warning fs-4"></i>
                                                                    <div>
                                                                        <small className="text-muted d-block">Horário</small>
                                                                        <strong>{dataHora.hora}</strong>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-auto">
                                                                <div className="d-flex align-items-center mb-2">
                                                                    <i className="bi bi-building me-2 text-info fs-4"></i>
                                                                    <div>
                                                                        <small className="text-muted d-block">Sala</small>
                                                                        <strong>{sala.nome}</strong>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex gap-2 mb-4">
                                                            <span className="badge bg-primary fs-6 px-3 py-2">{sessao.formato}</span>
                                                            <span className="badge bg-info fs-6 px-3 py-2">{sessao.idioma}</span>
                                                            <span className="badge bg-secondary fs-6 px-3 py-2">
                                                                <i className="bi bi-clock me-1"></i>{filme.duracao} min
                                                            </span>
                                                            <span className="badge bg-warning text-dark fs-6 px-3 py-2">
                                                                {filme.classificacao} anos
                                                            </span>
                                                        </div>

                                                        <div className="d-flex align-items-center gap-3">
                                                            <div>
                                                                <small className="text-muted d-block">A partir de</small>
                                                                <h3 className="text-success mb-0">{formatarPreco(sessao.preco)}</h3>
                                                            </div>
                                                            <button className="btn btn-primary btn-lg">
                                                                <i className="bi bi-ticket-perforated me-2"></i>
                                                                Comprar Ingresso
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselSessoes" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Anterior</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselSessoes" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Próximo</span>
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Sessões em Destaque */}
            <section className="py-5">
                <div className="container bg-primary">
                    <h2 className="mb-4 fw-bold">
                        <i className="bi bi-star-fill me-2 text-warning"></i>
                        Todas as Sessões
                    </h2>

                    {sessoes.length === 0 ? (
                        <div className="text-center mt-5">
                            <i className="bi bi-inbox display-1 text-muted"></i>
                            <h4 className="text-muted mt-3">Nenhuma sessão disponível</h4>
                            <p className="text-muted">Volte em breve para conferir a programação.</p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {sessoes.map((sessao) => {
                                const filme = getFilme(sessao.filmeId);
                                const sala = getSala(sessao.salaId);
                                const dataHora = formatarDataHora(sessao.dataHora);
                                const ocupacao = calcularOcupacao(sessao);

                                if (!filme || !sala) return null;

                                return (
                                    <div key={sessao.id} className="col-lg-6 col-xl-4">
                                        <div className="card h-100 shadow-sm hover-shadow">
                                            <div className="row g-0 h-100">
                                                <div className="col-5">
                                                    <img
                                                        src={filme.imagem}
                                                        alt={filme.titulo}
                                                        className="img-fluid h-100"
                                                        style={{
                                                            objectFit: 'cover',
                                                            aspectRatio: '2/3'
                                                        }}
                                                        onError={(e) => {
                                                            e.currentTarget.src = 'https://via.placeholder.com/200x300?text=Sem+Poster';
                                                        }}
                                                    />
                                                </div>

                                                <div className="col-7">
                                                    <div className="card-body d-flex flex-column h-100 p-3">
                                                        <h5 className="card-title fw-bold mb-2" style={{ fontSize: '1rem' }}>
                                                            {filme.titulo}
                                                        </h5>

                                                        <div className="mb-2">
                                                            <span className="badge bg-primary me-1">{sessao.formato}</span>
                                                            <span className="badge bg-info">{sessao.idioma}</span>
                                                        </div>

                                                        <div className="small mb-2">
                                                            <div className="mb-1">
                                                                <i className="bi bi-calendar3 me-1 text-primary"></i>
                                                                <strong>{dataHora.diaSemana}</strong>
                                                            </div>
                                                            <div className="mb-1">
                                                                <i className="bi bi-calendar-date me-1 text-success"></i>
                                                                {dataHora.data}
                                                            </div>
                                                            <div className="mb-1">
                                                                <i className="bi bi-clock me-1 text-warning"></i>
                                                                {dataHora.hora}
                                                            </div>
                                                            <div className="mb-1">
                                                                <i className="bi bi-building me-1 text-info"></i>
                                                                {sala.nome}
                                                            </div>
                                                        </div>

                                                        <div className="mt-auto">
                                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                                <small className="text-muted">
                                                                    <i className="bi bi-people me-1"></i>
                                                                    {sessao.assentosDisponiveis} lugares
                                                                </small>
                                                                <small className="text-muted">{ocupacao}% ocupado</small>
                                                            </div>

                                                            <div className="progress mb-2" style={{ height: '5px' }}>
                                                                <div
                                                                    className={`progress-bar ${ocupacao < 50 ? 'bg-success' :
                                                                            ocupacao < 80 ? 'bg-warning' :
                                                                                'bg-danger'
                                                                        }`}
                                                                    style={{ width: `${ocupacao}%` }}
                                                                ></div>
                                                            </div>

                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <span className="h5 mb-0 text-success">
                                                                    {formatarPreco(sessao.preco)}
                                                                </span>
                                                                <button className="btn btn-sm btn-primary">
                                                                    <i className="bi bi-ticket-perforated me-1"></i>
                                                                    Comprar
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            <style>{`
                .hover-shadow {
                    transition: box-shadow 0.3s ease;
                }
                .hover-shadow:hover {
                    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
                }
                .carousel-item {
                    transition: transform 0.6s ease-in-out;
                }
            `}</style>
        </>
    );
}