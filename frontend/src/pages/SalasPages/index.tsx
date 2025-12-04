import { useState, useEffect, type FormEvent } from 'react';
import { salasService } from '../../services/sala.service';
import { type ISala } from '../../models/sala.model';

export const SalasPages = () => {
    const [salas, setSalas] = useState<ISala[]>([]);
    const [formData, setFormData] = useState({
        nome: '',
        capacidade: '',
        tipo: '',
        recursos: {
            somDolby: false,
            arCondicionado: false,
            acessibilidade: false,
            lancheria: false
        }
    });
    const [editandoId, setEditandoId] = useState<string | null>(null);

    useEffect(() => {
        carregarSalas();
    }, []);

    const carregarSalas = async () => {
        try {
            const dados = await salasService.findAll();
            setSalas(dados);
        } catch (error) {
            console.error('Erro ao carregar salas:', error);
            alert('Erro ao carregar salas. Verifique a conexão com a API.');
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        try {
            const salaData: Omit<ISala, 'id'> = {
                nome: formData.nome,
                capacidade: parseInt(formData.capacidade),
                tipo: formData.tipo as ISala['tipo'],
                recursos: formData.recursos,
                status: 'ativa'
            };

            if (editandoId) {
                await salasService.update(editandoId, salaData);
                alert('Sala atualizada com sucesso!');
            } else {
                await salasService.create(salaData);
                alert('Sala cadastrada com sucesso!');
            }

            limparFormulario();
            carregarSalas();
        } catch (error) {
            console.error('Erro ao salvar sala:', error);
            alert('Erro ao salvar sala. Verifique os dados e tente novamente.');
        }
    };

    const limparFormulario = () => {
        setFormData({
            nome: '',
            capacidade: '',
            tipo: '',
            recursos: {
                somDolby: false,
                arCondicionado: false,
                acessibilidade: false,
                lancheria: false
            }
        });
        setEditandoId(null);
    };

    const editarSala = (sala: ISala) => {
        setFormData({
            nome: sala.nome,
            capacidade: sala.capacidade.toString(),
            tipo: sala.tipo,
            recursos: sala.recursos
        });
        setEditandoId(sala.id || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const excluirSala = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir esta sala?')) return;

        try {
            await salasService.delete(id);
            alert('Sala excluída com sucesso!');
            carregarSalas();
        } catch (error) {
            console.error('Erro ao excluir sala:', error);
            alert('Erro ao excluir sala.');
        }
    };

    return (
        <>
        <div className="container bg-primary">
            <div className="row align-items-center">
                <div className="col-md-8">
                    <h1 className="fw-bold display-5">
                        <i className="bi bi-building me-3"></i>Cadastro de Salas
                    </h1>
                    <p className="lead mb-0">Configure as salas de exibição do seu cinema</p>
                </div>
                <div className="col-md-4 text-md-end">
                    <a href="index.html" className="btn btn-dark">
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
                            Nova Sala
                        </h3>
                    </div>
                    <div className="card-body p-4">
                        <form id="formSala" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="nomeSala" className="form-label">
                                    <i className="bi bi-building me-2" style={{color: 'var(--frutiger-blue)'}}></i>
                                    Nome da Sala
                                </label>
                                <input 
                                    type="text" 
                                    className="form-control form-control-lg" 
                                    id="nomeSala" 
                                    placeholder="Ex: Sala 1, Sala IMAX, Sala VIP" 
                                    required 
                                    value={formData.nome}
                                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                                />
                                <div className="form-text">Nome identificador da sala</div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="capacidade" className="form-label">
                                        <i className="bi bi-people me-2" style={{color: 'var(--frutiger-green)'}}></i>
                                        Capacidade
                                    </label>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="capacidade" 
                                        placeholder="Ex: 150" 
                                        min="1" 
                                        max="500" 
                                        required 
                                        value={formData.capacidade}
                                        onChange={(e) => setFormData({...formData, capacidade: e.target.value})}
                                    />
                                    <div className="form-text">Número total de assentos</div>
                                </div>

                                <div className="col-md-6 mb-4">
                                    <label htmlFor="tipo" className="form-label">
                                        <i className="bi bi-display me-2" style={{color: 'var(--frutiger-orange)'}}></i>
                                        Tipo de Sala
                                    </label>
                                    <select 
                                        className="form-select" 
                                        id="tipo" 
                                        required
                                        value={formData.tipo}
                                        onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                                    >
                                        <option value="">Selecione o tipo</option>
                                        <option value="STANDARD">2D - Standard</option>
                                        <option value="3D">3D - Estéreo</option>
                                        <option value="IMAX">IMAX - Premium</option>
                                        <option value="4DX">4DX - Experiência</option>
                                        <option value="VIP">VIP - Luxo</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="form-label">
                                    <i className="bi bi-star me-2" style={{color: 'var(--frutiger-lime)'}}></i>
                                    Recursos da Sala
                                </label>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-check">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                id="recursoSom"
                                                checked={formData.recursos.somDolby}
                                                onChange={(e) => setFormData({
                                                    ...formData, 
                                                    recursos: {...formData.recursos, somDolby: e.target.checked}
                                                })}
                                            />
                                            <label className="form-check-label" htmlFor="recursoSom">
                                                Sistema de Som Dolby
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                id="recursoAr"
                                                checked={formData.recursos.arCondicionado}
                                                onChange={(e) => setFormData({
                                                    ...formData, 
                                                    recursos: {...formData.recursos, arCondicionado: e.target.checked}
                                                })}
                                            />
                                            <label className="form-check-label" htmlFor="recursoAr">
                                                Ar Condicionado
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-check">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                id="recursoAcessibilidade"
                                                checked={formData.recursos.acessibilidade}
                                                onChange={(e) => setFormData({
                                                    ...formData, 
                                                    recursos: {...formData.recursos, acessibilidade: e.target.checked}
                                                })}
                                            />
                                            <label className="form-check-label" htmlFor="recursoAcessibilidade">
                                                Acessibilidade
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input 
                                                className="form-check-input" 
                                                type="checkbox" 
                                                id="recursoLancheria"
                                                checked={formData.recursos.lancheria}
                                                onChange={(e) => setFormData({
                                                    ...formData, 
                                                    recursos: {...formData.recursos, lancheria: e.target.checked}
                                                })}
                                            />
                                            <label className="form-check-label" htmlFor="recursoLancheria">
                                                Lancheria Próxima
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                                <button type="button" className="btn btn-secondary me-md-2" onClick={limparFormulario}>
                                    <i className="bi bi-x-circle me-2"></i>Limpar
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    <i className="bi bi-check-circle me-2"></i>
                                    {editandoId ? 'Atualizar Sala' : 'Salvar Sala'}
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
                            <i className="bi bi-list-ul me-2" style={{color: 'var(--frutiger-blue)'}}></i>
                            Salas Cadastradas
                        </h3>
                        <span className="badge bg-primary fs-6">{salas.length} salas</span>
                    </div>
                    
                    {salas.length === 0 ? (
                        <div className="text-center mt-4">
                            <i className="bi bi-inbox display-1 text-muted"></i>
                            <h4 className="text-muted mt-3">Nenhuma sala cadastrada</h4>
                            <p className="text-muted">Comece cadastrando a primeira sala usando o formulário acima.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Nome</th>
                                        <th>Tipo</th>
                                        <th>Capacidade</th>
                                        <th>Recursos</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {salas.map((sala) => (
                                        <tr key={sala.id}>
                                            <td>{sala.nome}</td>
                                            <td>
                                                <span className="badge bg-info">{sala.tipo}</span>
                                            </td>
                                            <td>{sala.capacidade} lugares</td>
                                            <td>
                                                {sala.recursos.somDolby && <span className="badge bg-primary me-1">Dolby</span>}
                                                {sala.recursos.arCondicionado && <span className="badge bg-success me-1">A/C</span>}
                                                {sala.recursos.acessibilidade && <span className="badge bg-warning me-1">Acessível</span>}
                                                {sala.recursos.lancheria && <span className="badge bg-secondary me-1">Lancheria</span>}
                                            </td>
                                            <td>
                                                <button 
                                                    className="btn btn-sm btn-warning me-2"
                                                    onClick={() => editarSala(sala)}
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </button>
                                                <button 
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => sala.id && excluirSala(sala.id)}
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