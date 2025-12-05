import { useState, useEffect, type FormEvent } from 'react';
import { filmesService } from '../../services/filme.service';
import { type IFilme } from '../../models/filme.model';

export const FilmesPages = () => {
    const [filmes, setFilmes] = useState<IFilme[]>([]);
    const [formData, setFormData] = useState({
        titulo: '',
        descricao: '',
        genero: '',
        classificacao: '',
        duracao: '',
        dataEstreia: '',
        imagem: ''
    });
    const [editandoId, setEditandoId] = useState<string | null>(null);

    useEffect(() => {
        carregarFilmes();
    }, []);

    const carregarFilmes = async () => {
        try {
            const dados = await filmesService.findAll();
            setFilmes(dados);
        } catch (error) {
            console.error('Erro ao carregar filmes:', error);
            alert('Erro ao carregar filmes. Verifique a conexão com a API.');
        }
    };

    const limparFormulario = () => {
        setFormData({
            titulo: '',
            descricao: '',
            genero: '',
            classificacao: '',
            duracao: '',
            dataEstreia: '',
            imagem: ''
        });
        setEditandoId(null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const filmeData: Omit<IFilme, 'id'> = {
                titulo: formData.titulo,
                descricao: formData.descricao,
                genero: formData.genero as IFilme['genero'],
                classificacao: formData.classificacao as IFilme['classificacao'],
                duracao: parseInt(formData.duracao),
                dataEstreia: formData.dataEstreia,
                imagem: formData.imagem,
                status: 'em-cartaz'
            };

            if (editandoId) {
                await filmesService.update(editandoId, filmeData);
                alert('Filme atualizado com sucesso!');
            } else {
                await filmesService.create(filmeData);
                alert('Filme cadastrado com sucesso!');
            }

            limparFormulario();
            carregarFilmes();
        } catch (error) {
            console.error('Erro ao salvar filme:', error);
            alert('Erro ao salvar filme. Verifique os dados e tente novamente.');
        }
    };

    const editarFilme = (filme: IFilme) => {
        setFormData({
            titulo: filme.titulo,
            descricao: filme.descricao,
            genero: filme.genero,
            classificacao: filme.classificacao,
            duracao: filme.duracao.toString(),
            dataEstreia: filme.dataEstreia,
            imagem: filme.imagem
        });
        setEditandoId(filme.id || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const excluirFilme = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este filme?')) return;

        try {
            await filmesService.delete(id);
            alert('Filme excluído com sucesso!');
            carregarFilmes();
        } catch (error) {
            console.error('Erro ao excluir filme:', error);
            alert('Erro ao excluir filme.');
        }
    };

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
                            <a href="/home" className="btn btn-dark">
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
                                    {editandoId ? 'Editar Filme' : 'Novo Filme'}
                                </h3>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-4 mb-4">
                                            <div className="mb-4">
                                                <label htmlFor="imagem" className="form-label">
                                                    <i className="bi bi-image me-2" style={{ color: "var(--frutiger-blue)" }}></i>
                                                    URL do Poster
                                                </label>
                                                <input
                                                    type="url"
                                                    className="form-control"
                                                    id="imagem"
                                                    placeholder="https://exemplo.com/poster.jpg"
                                                    required
                                                    value={formData.imagem}
                                                    onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                                                />
                                                <div className="form-text">
                                                    Recomendado: aspect ratio 2:3 (ex: 300x450px)
                                                </div>
                                            </div>

                                            {formData.imagem && (
                                                <div className="text-center">
                                                    <img
                                                        src={formData.imagem}
                                                        alt="Preview"
                                                        className="img-fluid rounded"
                                                        style={{
                                                            maxWidth: '100%',
                                                            aspectRatio: '2/3',
                                                            objectFit: 'cover'
                                                        }}
                                                        onError={(e) => {
                                                            e.currentTarget.src = 'https://via.placeholder.com/300x450?text=Imagem+Indisponível';
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-md-8">
                                            <div className="mb-4">
                                                <label htmlFor="titulo" className="form-label">
                                                    <i className="bi bi-card-heading me-2" style={{ color: "var(--frutiger-blue)" }}></i>
                                                    Título do Filme
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    id="titulo"
                                                    placeholder="Digite o título do filme"
                                                    required
                                                    value={formData.titulo}
                                                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label htmlFor="descricao" className="form-label">
                                                    <i className="bi bi-text-paragraph me-2" style={{ color: "var(--frutiger-green)" }}></i>
                                                    Descrição
                                                </label>
                                                <textarea
                                                    className="form-control"
                                                    id="descricao"
                                                    rows={4}
                                                    placeholder="Sinopse do filme..."
                                                    required
                                                    value={formData.descricao}
                                                    onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                                                ></textarea>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <label htmlFor="genero" className="form-label">
                                                        <i className="bi bi-tags me-2" style={{ color: "var(--frutiger-orange)" }}></i>
                                                        Gênero
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        id="genero"
                                                        required
                                                        value={formData.genero}
                                                        onChange={(e) => setFormData({ ...formData, genero: e.target.value })}
                                                    >
                                                        <option value="">Selecione um gênero</option>
                                                        <option value="acao">Ação</option>
                                                        <option value="drama">Drama</option>
                                                        <option value="ficcao">Ficção Científica</option>
                                                        <option value="comedia">Comédia</option>
                                                        <option value="thriller">Thriller</option>
                                                        <option value="romance">Romance</option>
                                                        <option value="infantil">Infantil</option>
                                                    </select>
                                                </div>

                                                <div className="col-md-6 mb-4">
                                                    <label htmlFor="classificacao" className="form-label">
                                                        <i className="bi bi-exclamation-triangle me-2" style={{ color: "var(--frutiger-lime)" }}></i>
                                                        Classificação Indicativa
                                                    </label>
                                                    <select
                                                        className="form-select"
                                                        id="classificacao"
                                                        required
                                                        value={formData.classificacao}
                                                        onChange={(e) => setFormData({ ...formData, classificacao: e.target.value })}
                                                    >
                                                        <option value="">Selecione a classificação</option>
                                                        <option value="0">Livre</option>
                                                        <option value="6">6 anos</option>
                                                        <option value="10">10 anos</option>
                                                        <option value="12">12 anos</option>
                                                        <option value="14">14 anos</option>
                                                        <option value="16">16 anos</option>
                                                        <option value="18">18 anos</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6 mb-4">
                                                    <label htmlFor="duracao" className="form-label">
                                                        <i className="bi bi-clock me-2" style={{ color: "var(--frutiger-cyan)" }}></i>
                                                        Duração (minutos)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="duracao"
                                                        placeholder="120"
                                                        min="1"
                                                        max="300"
                                                        required
                                                        value={formData.duracao}
                                                        onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
                                                    />
                                                </div>

                                                <div className="col-md-6 mb-4">
                                                    <label htmlFor="dataEstreia" className="form-label">
                                                        <i className="bi bi-calendar-date me-2" style={{ color: "var(--frutiger-blue)" }}></i>
                                                        Data de Estreia
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="dataEstreia"
                                                        required
                                                        value={formData.dataEstreia}
                                                        onChange={(e) => setFormData({ ...formData, dataEstreia: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                                <button type="button" className="btn btn-secondary me-md-2" onClick={limparFormulario}>
                                                    <i className="bi bi-x-circle me-2"></i>Limpar
                                                </button>
                                                <button type="submit" className="btn btn-primary">
                                                    <i className="bi bi-check-circle me-2"></i>
                                                    {editandoId ? 'Atualizar Filme' : 'Salvar Filme'}
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
                                <i className="bi bi-list-ul me-2" style={{ color: "var(--frutiger-blue)" }}></i>
                                Filmes Cadastrados
                            </h3>
                            <span className="badge bg-primary fs-6">{filmes.length} filmes</span>
                        </div>

                        {filmes.length === 0 ? (
                            <div className="text-center mt-4">
                                <i className="bi bi-inbox display-1 text-muted"></i>
                                <h4 className="text-muted mt-3">Nenhum filme cadastrado</h4>
                                <p className="text-muted">Comece cadastrando o primeiro filme usando o formulário acima.</p>
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-striped">
                                    <thead className="table-dark">
                                        <tr>
                                            <th style={{ width: "80px" }}>Poster</th>
                                            <th>Título</th>
                                            <th>Gênero</th>
                                            <th>Classificação</th>
                                            <th>Duração</th>
                                            <th>Estreia</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filmes.map((filme) => (
                                            <tr key={filme.id}>
                                                <td>
                                                    <img
                                                        src={filme.imagem}
                                                        alt={filme.titulo}
                                                        className="img-thumbnail"
                                                        style={{
                                                            width: '60px',
                                                            aspectRatio: '2/3',
                                                            objectFit: 'cover'
                                                        }}
                                                        onError={(e) => {
                                                            e.currentTarget.src = 'https://via.placeholder.com/60x90?text=?';
                                                        }}
                                                    />
                                                </td>
                                                <td>{filme.titulo}</td>
                                                <td>
                                                    <span className="badge bg-info">{filme.genero}</span>
                                                </td>
                                                <td>{filme.classificacao} anos</td>
                                                <td>{filme.duracao} min</td>
                                                <td>{new Date(filme.dataEstreia).toLocaleDateString('pt-BR')}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-sm btn-warning me-2"
                                                        onClick={() => editarFilme(filme)}
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => filme.id && excluirFilme(filme.id)}
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