import { useState, useEffect, type FormEvent } from 'react';
import { lanchesService } from '../../services/lanche.service';
import { type ILanche, lancheSchema } from '../../models/lanche.model';
import { ZodError } from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';

export const LanchesAdminPages = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [lanches, setLanches] = useState<ILanche[]>([]);
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        imagem: ''
    });
    const [editandoId, setEditandoId] = useState<string | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Verificar se é admin
    useEffect(() => {
        if (!user || user.role !== 'gerente') {
            alert('Acesso negado! Apenas administradores podem acessar esta página.');
            navigate(ROUTES.HOME);
        }
    }, [user, navigate]);

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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            const lancheData: Omit<ILanche, 'id'> = {
                nome: formData.nome,
                descricao: formData.descricao,
                preco: parseFloat(formData.preco),
                imagem: formData.imagem
            };

            // Validação com Zod
            lancheSchema.parse(lancheData);

            if (editandoId) {
                await lanchesService.update(editandoId, lancheData);
                alert('Lanche atualizado com sucesso!');
            } else {
                await lanchesService.create(lancheData);
                alert('Lanche cadastrado com sucesso!');
            }

            limparFormulario();
            carregarLanches();
        } catch (error) {
            if (error instanceof ZodError) {
                const fieldErrors: Record<string, string> = {};
                error.issues.forEach((err) => {
                    if (err.path[0]) {
                        fieldErrors[err.path[0] as string] = err.message;
                    }
                });
                setErrors(fieldErrors);
            } else {
                console.error('Erro ao salvar lanche:', error);
                alert('Erro ao salvar lanche. Verifique os dados e tente novamente.');
            }
        }
    };

    const limparFormulario = () => {
        setFormData({
            nome: '',
            descricao: '',
            preco: '',
            imagem: ''
        });
        setEditandoId(null);
        setErrors({});
    };

    const editarLanche = (lanche: ILanche) => {
        setFormData({
            nome: lanche.nome,
            descricao: lanche.descricao,
            preco: lanche.preco.toString(),
            imagem: lanche.imagem
        });
        setEditandoId(lanche.id || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const excluirLanche = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este lanche?')) return;

        try {
            await lanchesService.delete(id);
            alert('Lanche excluído com sucesso!');
            carregarLanches();
        } catch (error) {
            console.error('Erro ao excluir lanche:', error);
            alert('Erro ao excluir lanche.');
        }
    };

    const formatarPreco = (preco: number) => {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <>
            <div className="container bg-primary">
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <h1 className="fw-bold display-5">
                            <i className="bi bi-cup-straw me-3"></i>Gerenciar Lanches
                        </h1>
                        <p className="lead mb-0">Administração da bomboniere</p>
                    </div>
                    <div className="col-md-4 text-md-end">
                        <a href="/home" className="btn btn-dark">
                            <i className="bi bi-arrow-left me-2"></i>Voltar ao Início
                        </a>
                    </div>
                </div>
            </div>

            <section className="py-4 d-flex justify-content-center">
                <div className="col-lg-8">
                    <div className="card form-card">
                        <div className="card-header bg-primary py-4">
                            <h3 className="card-title mb-0 text-center">
                                <i className="bi bi-plus-circle me-2"></i>
                                {editandoId ? 'Editar Lanche' : 'Novo Lanche'}
                            </h3>
                        </div>
                        <div className="card-body p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="nome" className="form-label">
                                        <i className="bi bi-tag me-2"></i>
                                        Nome do Lanche
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control form-control-lg ${errors.nome ? 'is-invalid' : ''}`}
                                        id="nome"
                                        placeholder="Ex: Pipoca Grande, Refrigerante"
                                        required
                                        value={formData.nome}
                                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                    />
                                    {errors.nome && <div className="invalid-feedback d-block">{errors.nome}</div>}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="descricao" className="form-label">
                                        <i className="bi bi-card-text me-2"></i>
                                        Descrição
                                    </label>
                                    <textarea
                                        className={`form-control ${errors.descricao ? 'is-invalid' : ''}`}
                                        id="descricao"
                                        rows={3}
                                        placeholder="Descreva o produto..."
                                        required
                                        value={formData.descricao}
                                        onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                                    />
                                    {errors.descricao && <div className="invalid-feedback d-block">{errors.descricao}</div>}
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <label htmlFor="preco" className="form-label">
                                            <i className="bi bi-currency-dollar me-2"></i>
                                            Preço
                                        </label>
                                        <input
                                            type="number"
                                            className={`form-control ${errors.preco ? 'is-invalid' : ''}`}
                                            id="preco"
                                            placeholder="Ex: 15.90"
                                            step="0.01"
                                            min="0"
                                            required
                                            value={formData.preco}
                                            onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                                        />
                                        {errors.preco && <div className="invalid-feedback d-block">{errors.preco}</div>}
                                    </div>

                                    <div className="col-md-6 mb-4">
                                        <label htmlFor="imagem" className="form-label">
                                            <i className="bi bi-image me-2"></i>
                                            URL da Imagem
                                        </label>
                                        <input
                                            type="url"
                                            className={`form-control ${errors.imagem ? 'is-invalid' : ''}`}
                                            id="imagem"
                                            placeholder="https://..."
                                            required
                                            value={formData.imagem}
                                            onChange={(e) => setFormData({ ...formData, imagem: e.target.value })}
                                        />
                                        {errors.imagem && <div className="invalid-feedback d-block">{errors.imagem}</div>}
                                    </div>
                                </div>

                                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                    <button type="button" className="btn btn-secondary me-md-2" onClick={limparFormulario}>
                                        <i className="bi bi-x-circle me-2"></i>Limpar
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        <i className="bi bi-check-circle me-2"></i>
                                        {editandoId ? 'Atualizar Lanche' : 'Salvar Lanche'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container bg-dark">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3 className="fw-bold">
                                <i className="bi bi-list-ul me-2"></i>
                                Lanches Cadastrados
                            </h3>
                            <span className="badge bg-primary fs-6">{lanches.length} lanches</span>
                        </div>

                        {lanches.length === 0 ? (
                            <div className="text-center mt-4">
                                <i className="bi bi-inbox display-1 text-muted"></i>
                                <h4 className="text-muted mt-3">Nenhum lanche cadastrado</h4>
                                <p className="text-muted">Comece cadastrando o primeiro lanche usando o formulário acima.</p>
                            </div>
                        ) : (
                            <div className="row g-4">
                                {lanches.map((lanche) => (
                                    <div key={lanche.id} className="col-md-6 col-lg-4">
                                        <div className="card h-100">
                                            <img
                                                src={lanche.imagem}
                                                alt={lanche.nome}
                                                className="card-img-top"
                                                style={{ height: '200px', objectFit: 'cover' }}
                                                onError={(e) => {
                                                    e.currentTarget.src = 'https://via.placeholder.com/300x200?text=Sem+Imagem';
                                                }}
                                            />
                                            <div className="card-body">
                                                <h5 className="card-title">{lanche.nome}</h5>
                                                <p className="card-text text-muted small">{lanche.descricao}</p>
                                                <h4 className="text-success">{formatarPreco(lanche.preco)}</h4>
                                            </div>
                                            <div className="card-footer bg-transparent">
                                                <button
                                                    className="btn btn-sm btn-warning me-2"
                                                    onClick={() => editarLanche(lanche)}
                                                >
                                                    <i className="bi bi-pencil"></i> Editar
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => lanche.id && excluirLanche(lanche.id)}
                                                >
                                                    <i className="bi bi-trash"></i> Excluir
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
