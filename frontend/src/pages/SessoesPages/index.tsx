import { useState, useEffect, type FormEvent } from 'react';
import { sessoesService } from '../../services/sessao.service';
import { filmesService } from '../../services/filme.service';
import { salasService } from '../../services/sala.service';
import { type ISessao } from '../../models/sessao.model';
import { type IFilme } from '../../models/filme.model';
import { type ISala } from '../../models/sala.model';

export const SessoesPages = () => {
    const [sessoes, setSessoes] = useState<ISessao[]>([]);
    const [filmes, setFilmes] = useState<IFilme[]>([]);
    const [salas, setSalas] = useState<ISala[]>([]);
    const [formData, setFormData] = useState({
        filmeId: '',
        salaId: '',
        dataHora: '',
        preco: '',
        idioma: '',
        formato: ''
    });
    const [editandoId, setEditandoId] = useState<string | null>(null);

    useEffect(() => {
        carregarDados();
    }, []);

    const carregarDados = async () => {
        try {
            const [sessoesData, filmesData, salasData] = await Promise.all([
                sessoesService.findAll(),
                filmesService.findAll(),
                salasService.findAll()
            ]);
            setSessoes(sessoesData);
            setFilmes(filmesData);
            setSalas(salasData);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            alert('Erro ao carregar dados. Verifique a conexão com a API.');
        }
    };

    const limparFormulario = () => {
        setFormData({
            filmeId: '',
            salaId: '',
            dataHora: '',
            preco: '',
            idioma: '',
            formato: ''
        });
        setEditandoId(null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const sala = salas.find(s => s.id === formData.salaId);

            const sessaoData: Omit<ISessao, 'id'> = {
                filmeId: formData.filmeId,
                salaId: formData.salaId,
                dataHora: new Date(formData.dataHora).toISOString(),
                preco: parseFloat(formData.preco),
                idioma: formData.idioma as ISessao['idioma'],
                formato: formData.formato as ISessao['formato'],
                assentosDisponiveis: sala?.capacidade || 0,
                status: 'ativa'
            };

            if (editandoId) {
                await sessoesService.update(editandoId, sessaoData);
                alert('Sessão atualizada com sucesso!');
            } else {
                await sessoesService.create(sessaoData);
                alert('Sessão cadastrada com sucesso!');
            }

            limparFormulario();
            carregarDados();
        } catch (error) {
            console.error('Erro ao salvar sessão:', error);
            alert('Erro ao salvar sessão. Verifique os dados e tente novamente.');
        }
    };

    const editarSessao = (sessao: ISessao) => {
        const dataHoraLocal = new Date(sessao.dataHora).toISOString().slice(0, 16);

        setFormData({
            filmeId: sessao.filmeId,
            salaId: sessao.salaId,
            dataHora: dataHoraLocal,
            preco: sessao.preco.toString(),
            idioma: sessao.idioma,
            formato: sessao.formato
        });
        setEditandoId(sessao.id || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const excluirSessao = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir esta sessão?')) return;

        try {
            await sessoesService.delete(id);
            alert('Sessão excluída com sucesso!');
            carregarDados();
        } catch (error) {
            console.error('Erro ao excluir sessão:', error);
            alert('Erro ao excluir sessão.');
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
                                <i className="bi bi-calendar-event me-3"></i>Cadastro de Sessões
                            </h1>
                            <p className="lead mb-0">Programe as sessões dos filmes nas salas disponíveis</p>
                        </div>
                        <div className="col-md-4 text-md-end">
                            <a href="/home" className="btn btn-dark">
                                <i className="bi bi-arrow-left me-2"></i>Voltar ao Início
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card form-card">
                            <div className="card-header bg-primary py-4">
                                <h3 className="card-title mb-0 text-center">
                                    <i className="bi bi-plus-circle me-2"></i>
                                    {editandoId ? 'Editar Sessão' : 'Nova Sessão'}
                                </h3>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <label htmlFor="filme" className="form-label">
                                                <i className="bi bi-film me-2" style={{ color: 'var(--frutiger-blue)' }}></i>
                                                Filme
                                            </label>
                                            <select
                                                className="form-select"
                                                id="filme"
                                                required
                                                value={formData.filmeId}
                                                onChange={(e) => setFormData({ ...formData, filmeId: e.target.value })}
                                            >
                                                <option value="">Selecione um filme</option>
                                                {filmes.map(filme => (
                                                    <option key={filme.id} value={filme.id}>
                                                        {filme.titulo}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="form-text">Filmes cadastrados no sistema</div>
                                        </div>

                                        <div className="col-md-6 mb-4">
                                            <label htmlFor="sala" className="form-label">
                                                <i className="bi bi-building me-2" style={{ color: 'var(--frutiger-green)' }}></i>
                                                Sala
                                            </label>
                                            <select
                                                className="form-select"
                                                id="sala"
                                                required
                                                value={formData.salaId}
                                                onChange={(e) => setFormData({ ...formData, salaId: e.target.value })}
                                            >
                                                <option value="">Selecione uma sala</option>
                                                {salas.map(sala => (
                                                    <option key={sala.id} value={sala.id}>
                                                        {sala.nome} - Cap: {sala.capacidade}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="form-text">Salas disponíveis</div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <label htmlFor="dataHora" className="form-label">
                                                <i className="bi bi-calendar me-2" style={{ color: 'var(--frutiger-orange)' }}></i>
                                                Data e Hora
                                            </label>
                                            <input
                                                type="datetime-local"
                                                className="form-control"
                                                id="dataHora"
                                                required
                                                value={formData.dataHora}
                                                onChange={(e) => setFormData({ ...formData, dataHora: e.target.value })}
                                            />
                                        </div>

                                        <div className="col-md-6 mb-4">
                                            <label htmlFor="preco" className="form-label">
                                                <i className="bi bi-currency-dollar me-2" style={{ color: 'var(--frutiger-lime)' }}></i>
                                                Preço do Ingresso (R$)
                                            </label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="preco"
                                                placeholder="35.00"
                                                min="0"
                                                step="0.01"
                                                required
                                                value={formData.preco}
                                                onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                                            />
                                            <div className="form-text">Preço por ingresso</div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <label htmlFor="idioma" className="form-label">
                                                <i className="bi bi-translate me-2" style={{ color: 'var(--frutiger-cyan)' }}></i>
                                                Idioma
                                            </label>
                                            <select
                                                className="form-select"
                                                id="idioma"
                                                required
                                                value={formData.idioma}
                                                onChange={(e) => setFormData({ ...formData, idioma: e.target.value })}
                                            >
                                                <option value="">Selecione o idioma</option>
                                                <option value="dublado">Dublado</option>
                                                <option value="legendado">Legendado</option>
                                            </select>
                                        </div>

                                        <div className="col-md-6 mb-4">
                                            <label htmlFor="formato" className="form-label">
                                                <i className="bi bi-display me-2" style={{ color: 'var(--frutiger-blue)' }}></i>
                                                Formato
                                            </label>
                                            <select
                                                className="form-select"
                                                id="formato"
                                                required
                                                value={formData.formato}
                                                onChange={(e) => setFormData({ ...formData, formato: e.target.value })}
                                            >
                                                <option value="">Selecione o formato</option>
                                                <option value="2D">2D</option>
                                                <option value="3D">3D</option>
                                                <option value="IMAX">IMAX</option>
                                                <option value="4DX">4DX</option>
                                                <option value="STANDARD">Standard</option>
                                                <option value="VIP">VIP</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                        <button type="button" className="btn btn-secondary me-md-2" onClick={limparFormulario}>
                                            <i className="bi bi-x-circle me-2"></i>Limpar
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            <i className="bi bi-check-circle me-2"></i>
                                            {editandoId ? 'Atualizar Sessão' : 'Salvar Sessão'}
                                        </button>
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
                                <i className="bi bi-list-ul me-2" style={{ color: 'var(--frutiger-blue)' }}></i>
                                Sessões Cadastradas
                            </h3>
                            <span className="badge bg-primary fs-6">{sessoes.length} sessões</span>
                        </div>

                        {sessoes.length === 0 ? (
                            <div className="text-center mt-4">
                                <i className="bi bi-inbox display-1 text-muted"></i>
                                <h4 className="text-muted mt-3">Nenhuma sessão cadastrada</h4>
                                <p className="text-muted">Comece cadastrando a primeira sessão usando o formulário acima.</p>
                            </div>
                        ) : (
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
                                            <th>Status</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sessoes.map((sessao) => (
                                            <tr key={sessao.id}>
                                                <td>{getFilmeNome(sessao.filmeId)}</td>
                                                <td>{getSalaNome(sessao.salaId)}</td>
                                                <td>{formatarDataHora(sessao.dataHora)}</td>
                                                <td>{formatarPreco(sessao.preco)}</td>
                                                <td>
                                                    <span className="badge bg-info">{sessao.idioma}</span>
                                                </td>
                                                <td>
                                                    <span className="badge bg-secondary">{sessao.formato}</span>
                                                </td>
                                                <td>
                                                    <span className={`badge ${sessao.status === 'ativa' ? 'bg-success' :
                                                            sessao.status === 'cancelada' ? 'bg-danger' :
                                                                'bg-warning'
                                                        }`}>
                                                        {sessao.status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-warning me-2"
                                                        onClick={() => editarSessao(sessao)}
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => sessao.id && excluirSessao(sessao.id)}
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}