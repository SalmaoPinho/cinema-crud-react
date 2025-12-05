import { useState, useEffect, type FormEvent } from 'react';
import { ingressosService } from '../../services/ingresso.service';
import { sessoesService } from '../../services/sessao.service';
import { filmesService } from '../../services/filme.service';
import { salasService } from '../../services/sala.service';
import { lanchesService } from '../../services/lanche.service';
import { type IIngresso } from '../../models/ingresso.model';
import { type ISessao } from '../../models/sessao.model';
import { type IFilme } from '../../models/filme.model';
import { type ISala } from '../../models/sala.model';
import { type ILanche } from '../../models/lanche.model';

interface LancheQuantidade {
    lanche: ILanche;
    quantidade: number;
}

export const IngressosPages = () => {
    const [ingressos, setIngressos] = useState<IIngresso[]>([]);
    const [sessoes, setSessoes] = useState<ISessao[]>([]);
    const [filmes, setFilmes] = useState<IFilme[]>([]);
    const [salas, setSalas] = useState<ISala[]>([]);
    const [lanches, setLanches] = useState<ILanche[]>([]);
    const [lanchesSelecionados, setLanchesSelecionados] = useState<Map<string, number>>(new Map());
    const [sessaoSelecionada, setSessaoSelecionada] = useState<ISessao | null>(null);
    const [formData, setFormData] = useState({
        sessaoId: '',
        nomeCliente: '',
        cpfCliente: '',
        assento: '',
        tipoPagamento: ''
    });
    const [comprovanteVisivel, setComprovanteVisivel] = useState(false);
    const [ultimoIngresso, setUltimoIngresso] = useState<IIngresso | null>(null);
    const [ultimosLanches, setUltimosLanches] = useState<LancheQuantidade[]>([]);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const [sessoesData, ingressosData, filmesData, salasData, lanchesData] = await Promise.all([
                sessoesService.findByStatus('ativa'),
                ingressosService.findAll(),
                filmesService.findAll(),
                salasService.findAll(),
                lanchesService.findAll()
            ]);
            setSessoes(sessoesData);
            setIngressos(ingressosData);
            setFilmes(filmesData);
            setSalas(salasData);
            setLanches(lanchesData);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            alert('Erro ao carregar dados. Verifique a conexão com a API.');
        }
    };

    const handleSessaoChange = (sessaoId: string) => {
        const sessao = sessoes.find(s => s.id === sessaoId);
        setSessaoSelecionada(sessao || null);
        setFormData({ ...formData, sessaoId });
    };

    const handleLancheQuantidade = (lancheId: string, quantidade: number) => {
        const novoMap = new Map(lanchesSelecionados);
        if (quantidade > 0) {
            novoMap.set(lancheId, quantidade);
        } else {
            novoMap.delete(lancheId);
        }
        setLanchesSelecionados(novoMap);
    };

    const calcularTotalLanches = () => {
        let total = 0;
        lanchesSelecionados.forEach((quantidade, lancheId) => {
            const lanche = lanches.find(l => l.id === lancheId);
            if (lanche) {
                total += lanche.preco * quantidade;
            }
        });
        return total;
    };

    const calcularTotalGeral = () => {
        const precoIngresso = sessaoSelecionada?.preco || 0;
        const totalLanches = calcularTotalLanches();
        return precoIngresso + totalLanches;
    };

    const formatarCPF = (valor: string) => {
        const numeros = valor.replace(/\D/g, '');
        if (numeros.length <= 11) {
            return numeros
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }
        return valor;
    };

    const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatarCPF(e.target.value);
        setFormData({ ...formData, cpfCliente: formatted });
    };

    const limparFormulario = () => {
        setFormData({
            sessaoId: '',
            nomeCliente: '',
            cpfCliente: '',
            assento: '',
            tipoPagamento: ''
        });
        setSessaoSelecionada(null);
        setLanchesSelecionados(new Map());
        setComprovanteVisivel(false);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!sessaoSelecionada) {
            alert('Selecione uma sessão');
            return;
        }

        try {
            const totalGeral = calcularTotalGeral();

            const ingressoData: Omit<IIngresso, 'id'> = {
                sessaoId: formData.sessaoId,
                nomeComprador: formData.nomeCliente,
                emailComprador: `${formData.nomeCliente.toLowerCase().replace(/\s+/g, '')}@email.com`,
                assentoNumero: formData.assento,
                preco: totalGeral,
                statusPagamento: 'pago',
                tipoBilhete: 'inteiro',
                dataPurchase: new Date().toISOString()
            };

            const novoIngresso = await ingressosService.create(ingressoData);

            const lanchesComprados: LancheQuantidade[] = [];
            lanchesSelecionados.forEach((quantidade, lancheId) => {
                const lanche = lanches.find(l => l.id === lancheId);
                if (lanche) {
                    lanchesComprados.push({ lanche, quantidade });
                }
            });

            setUltimoIngresso(novoIngresso);
            setUltimosLanches(lanchesComprados);
            setComprovanteVisivel(true);

            alert('Ingresso vendido com sucesso!');
            carregarDados();

            setTimeout(() => {
                document.getElementById('comprovanteVenda')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } catch (error) {
            console.error('Erro ao vender ingresso:', error);
            alert('Erro ao vender ingresso. Tente novamente.');
        }
    };

    const getFilmeNome = (filmeId: string) => {
        return filmes.find(f => f.id === filmeId)?.titulo || 'Filme não encontrado';
    };

    const getSalaNome = (salaId: string) => {
        return salas.find(s => s.id === salaId)?.nome || 'Sala não encontrada';
    };

    const formatarDataHora = (dataHora: string) => {
        return new Date(dataHora).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
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
                                <i className="bi bi-ticket-perforated me-3"></i>Venda de Ingressos
                            </h1>
                            <p className="lead mb-0">Venda ingressos e lanches para as sessões disponíveis</p>
                        </div>
                        <div className="col-md-4 text-md-end">
                            <a href="/home" className="btn btn-light">
                                <i className="bi bi-arrow-left me-2"></i>Voltar ao Início
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card shadow">
                                <div className="card-header bg-primary text-white py-3">
                                    <h3 className="mb-0 text-center">
                                        <i className="bi bi-cart-plus me-2"></i>
                                        Nova Venda
                                    </h3>
                                </div>
                                <div className="card-body p-4">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label htmlFor="sessao" className="form-label fw-bold">
                                                <i className="bi bi-film me-2 text-primary"></i>
                                                Selecione a Sessão
                                            </label>
                                            <select
                                                className="form-select form-select-lg"
                                                id="sessao"
                                                required
                                                value={formData.sessaoId}
                                                onChange={(e) => handleSessaoChange(e.target.value)}
                                            >
                                                <option value="">Escolha uma sessão...</option>
                                                {sessoes.map(sessao => {
                                                    const filme = filmes.find(f => f.id === sessao.filmeId);
                                                    const sala = salas.find(s => s.id === sessao.salaId);
                                                    return (
                                                        <option key={sessao.id} value={sessao.id}>
                                                            {filme?.titulo} - {sala?.nome} - {formatarDataHora(sessao.dataHora)}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                        </div>

                                        {sessaoSelecionada && (
                                            <div className="alert alert-info mb-4">
                                                <h5 className="alert-heading">
                                                    <i className="bi bi-info-circle me-2"></i>
                                                    Detalhes da Sessão
                                                </h5>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <p className="mb-1"><strong>Filme:</strong> {getFilmeNome(sessaoSelecionada.filmeId)}</p>
                                                        <p className="mb-1"><strong>Sala:</strong> {getSalaNome(sessaoSelecionada.salaId)}</p>
                                                        <p className="mb-1"><strong>Data/Hora:</strong> {formatarDataHora(sessaoSelecionada.dataHora)}</p>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <p className="mb-1"><strong>Idioma:</strong> {sessaoSelecionada.idioma}</p>
                                                        <p className="mb-1"><strong>Formato:</strong> {sessaoSelecionada.formato}</p>
                                                        <p className="mb-1"><strong>Preço do Ingresso:</strong> <span className="text-success fw-bold">{formatarPreco(sessaoSelecionada.preco)}</span></p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="row mb-4">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="nomeCliente" className="form-label fw-bold">
                                                    <i className="bi bi-person me-2 text-success"></i>
                                                    Nome do Cliente
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="nomeCliente"
                                                    required
                                                    value={formData.nomeCliente}
                                                    onChange={(e) => setFormData({ ...formData, nomeCliente: e.target.value })}
                                                    placeholder="Digite o nome completo"
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="cpfCliente" className="form-label fw-bold">
                                                    <i className="bi bi-card-text me-2 text-warning"></i>
                                                    CPF
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="cpfCliente"
                                                    required
                                                    value={formData.cpfCliente}
                                                    onChange={handleCPFChange}
                                                    placeholder="000.000.000-00"
                                                    maxLength={14}
                                                />
                                            </div>
                                        </div>

                                        <div className="row mb-4">
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="assento" className="form-label fw-bold">
                                                    <i className="bi bi-geo-alt me-2 text-danger"></i>
                                                    Assento
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control text-uppercase"
                                                    id="assento"
                                                    required
                                                    value={formData.assento}
                                                    onChange={(e) => setFormData({ ...formData, assento: e.target.value.toUpperCase() })}
                                                    placeholder="Ex: A10, B5, C12"
                                                />
                                            </div>
                                            <div className="col-md-6 mb-3">
                                                <label htmlFor="tipoPagamento" className="form-label fw-bold">
                                                    <i className="bi bi-credit-card me-2 text-info"></i>
                                                    Forma de Pagamento
                                                </label>
                                                <select
                                                    className="form-select"
                                                    id="tipoPagamento"
                                                    required
                                                    value={formData.tipoPagamento}
                                                    onChange={(e) => setFormData({ ...formData, tipoPagamento: e.target.value })}
                                                >
                                                    <option value="">Selecione...</option>
                                                    <option value="Cartão">Cartão</option>
                                                    <option value="Pix">Pix</option>
                                                    <option value="Dinheiro">Dinheiro</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Seleção de Lanches COM IMAGENS */}
                                        <div className="mb-4">
                                            <h5 className="fw-bold mb-3">
                                                <i className="bi bi-cup-straw me-2 text-warning"></i>
                                                Adicionar Lanches (Opcional)
                                            </h5>
                                            <div className="row g-3">
                                                {lanches.map(lanche => (
                                                    <div key={lanche.id} className="col-md-6 col-lg-4">
                                                        <div className="card h-100 shadow-sm">
                                                            <div style={{ height: '150px', overflow: 'hidden', backgroundColor: '#f8f9fa' }}>
                                                                <img
                                                                    src={lanche.imagem}
                                                                    alt={lanche.nome}
                                                                    className="card-img-top h-100 w-100"
                                                                    style={{
                                                                        objectFit: 'contain',
                                                                        padding: '10px'
                                                                    }}
                                                                    onError={(e) => {
                                                                        e.currentTarget.src = 'https://via.placeholder.com/150x150?text=Sem+Imagem';
                                                                    }}
                                                                />
                                                            </div>

                                                            <div className="card-body">
                                                                <h6 className="card-title fw-bold mb-1">{lanche.nome}</h6>
                                                                <small className="text-muted d-block mb-3">{lanche.descricao}</small>

                                                                <div className="d-flex justify-content-between align-items-center">
                                                                    <span className="badge bg-success fs-6">{formatarPreco(lanche.preco)}</span>
                                                                    <div className="d-flex align-items-center gap-2">
                                                                        <label className="small fw-bold mb-0">Qtd:</label>
                                                                        <input
                                                                            type="number"
                                                                            className="form-control form-control-sm"
                                                                            style={{ width: '70px' }}
                                                                            min="0"
                                                                            max="10"
                                                                            value={lanchesSelecionados.get(lanche.id || '') || 0}
                                                                            onChange={(e) => handleLancheQuantidade(lanche.id || '', parseInt(e.target.value) || 0)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {sessaoSelecionada && (
                                            <div className="alert alert-success">
                                                <h5 className="alert-heading">
                                                    <i className="bi bi-calculator me-2"></i>
                                                    Resumo do Pedido
                                                </h5>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <p className="mb-1">Ingresso: {formatarPreco(sessaoSelecionada.preco)}</p>
                                                        <p className="mb-1">Lanches: {formatarPreco(calcularTotalLanches())}</p>
                                                    </div>
                                                    <div className="col-md-6 text-md-end">
                                                        <h4 className="mb-0">
                                                            Total: <span className="text-success">{formatarPreco(calcularTotalGeral())}</span>
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <button type="button" className="btn btn-secondary" onClick={limparFormulario}>
                                                <i className="bi bi-x-circle me-2"></i>Limpar
                                            </button>
                                            <button type="submit" className="btn btn-primary btn-lg">
                                                <i className="bi bi-check-circle me-2"></i>Finalizar Venda
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
            </section>

            {comprovanteVisivel && ultimoIngresso && (
                <section className="py-4" id="comprovanteVenda">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="card shadow-lg border-success">
                                    <div className="card-header bg-success text-white text-center py-3">
                                        <h3 className="mb-0">
                                            <i className="bi bi-check-circle me-2"></i>
                                            Venda Realizada com Sucesso!
                                        </h3>
                                    </div>
                                    <div className="card-body p-4">
                                        <div className="text-center mb-4">
                                            <i className="bi bi-ticket-detailed display-1 text-success"></i>
                                        </div>

                                        <h5 className="fw-bold mb-3">Informações do Ingresso:</h5>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <p><strong>Cliente:</strong> {ultimoIngresso.nomeComprador}</p>
                                                <p><strong>Assento:</strong> <span className="badge bg-primary">{ultimoIngresso.assentoNumero}</span></p>
                                                <p><strong>Sessão:</strong> {getFilmeNome(sessoes.find(s => s.id === ultimoIngresso.sessaoId)?.filmeId || '')}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <p><strong>Sala:</strong> {getSalaNome(sessoes.find(s => s.id === ultimoIngresso.sessaoId)?.salaId || '')}</p>
                                                <p><strong>Data/Hora:</strong> {formatarDataHora(sessoes.find(s => s.id === ultimoIngresso.sessaoId)?.dataHora || '')}</p>
                                                <p><strong>Pagamento:</strong> <span className="badge bg-success">Pago</span></p>
                                            </div>
                                        </div>

                                        {ultimosLanches.length > 0 && (
                                            <>
                                                <h5 className="fw-bold mb-3 mt-4">Lanches Incluídos:</h5>
                                                <ul className="list-group mb-3">
                                                    {ultimosLanches.map((item, index) => (
                                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                            {item.lanche.nome} x {item.quantidade}
                                                            <span className="badge bg-primary rounded-pill">
                                                                {formatarPreco(item.lanche.preco * item.quantidade)}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}

                                        <div className="alert alert-info mb-0">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <h4 className="mb-0">Valor Total:</h4>
                                                <h1 className="mb-0 text-success">{formatarPreco(ultimoIngresso.preco)}</h1>
                                            </div>
                                        </div>

                                        <div className="d-grid gap-2 d-md-flex justify-content-md-center mt-4">
                                            <button className="btn btn-primary" onClick={() => window.print()}>
                                                <i className="bi bi-printer me-2"></i>Imprimir
                                            </button>
                                            <button className="btn btn-secondary" onClick={() => setComprovanteVisivel(false)}>
                                                <i className="bi bi-x-circle me-2"></i>Fechar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </section>
            )}

            <section className="py-5">
                <div className="container bg-dark">
                    <h3 className="fw-bold mb-4">
                        <i className="bi bi-list-ul me-2"></i>
                        Ingressos Vendidos
                        <span className="badge bg-primary ms-2">{ingressos.length}</span>
                    </h3>

                    {ingressos.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="bi bi-inbox display-1 text-muted"></i>
                            <h4 className="text-muted mt-3">Nenhum ingresso vendido ainda</h4>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <th>ID</th>
                                        <th>Cliente</th>
                                        <th>Assento</th>
                                        <th>Sessão</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Data</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ingressos.map(ingresso => {
                                        const sessao = sessoes.find(s => s.id === ingresso.sessaoId);
                                        return (
                                            <tr key={ingresso.id}>
                                                <td><small>{ingresso.id?.substring(0, 8)}...</small></td>
                                                <td>{ingresso.nomeComprador}</td>
                                                <td><span className="badge bg-info">{ingresso.assentoNumero}</span></td>
                                                <td>
                                                    <small>
                                                        {getFilmeNome(sessao?.filmeId || '')} - {getSalaNome(sessao?.salaId || '')}
                                                    </small>
                                                </td>
                                                <td><strong className="text-success">{formatarPreco(ingresso.preco)}</strong></td>
                                                <td>
                                                    <span className={`badge ${ingresso.statusPagamento === 'pago' ? 'bg-success' :
                                                            ingresso.statusPagamento === 'pendente' ? 'bg-warning' :
                                                                'bg-danger'
                                                        }`}>
                                                        {ingresso.statusPagamento}
                                                    </span>
                                                </td>
                                                <td><small>{new Date(ingresso.dataPurchase).toLocaleDateString('pt-BR')}</small></td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}