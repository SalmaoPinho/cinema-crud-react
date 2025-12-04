import { useState, useEffect } from "react";
import { salasService } from "../../services/sala.service";
import { filmesService } from "../../services/filme.service";
import { ingressosService } from "../../services/ingresso.service";
import { sessoesService } from "../../services/sessao.service";


export default function Footer() {
    const [totalFilmes, setTotalFilmes] = useState(0);
    const [totalSalas, setTotalSalas] = useState(3); // Valor inicial de 3 salas
    const [totalSessoes, setTotalSessoes] = useState(0);
    const [totalIngressos, setTotalIngressos] = useState(0);

    useEffect(() => {
        // Carregar dados do servidor
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            // Carregar total de salas da API
            const salas = await salasService.findAll();
            setTotalSalas(salas.length);
            setTotalFilmes((await filmesService.findAll()).length);
            setTotalSessoes((await sessoesService.findAll()).length);
            setTotalIngressos((await ingressosService.findAll()).length);
        } catch (error) {
            console.error('Erro ao carregar estatísticas:', error);
            // Manter valores padrão em caso de erro
        }
    };

    return (
        <>
            <div className="container bg-dark outline-secondary rounded-3 my-4 p-4 bg-opacity-10">
                <div className="row g-4">
                    <div className="col-md-3 col-6">
                        <div className="card stats-card text-center">
                            <div className="card-body">
                                <i className="bi bi-film display-6 mb-3" />
                                <h3>{totalFilmes}</h3>
                                <p className="mb-0">Filmes em Cartaz</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="card stats-card text-center">
                            <div className="card-body">
                                <i className="bi bi-building display-6 mb-3" />
                                <h3>{totalSalas}</h3>
                                <p className="mb-0">Salas Disponíveis</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="card stats-card text-center">
                            <div className="card-body">
                                <i className="bi bi-calendar-event display-6 mb-3" />
                                <h3>{totalSessoes}</h3>
                                <p className="mb-0">Sessões Hoje</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-6">
                        <div className="card stats-card text-center">
                            <div className="card-body">
                                <i className="bi bi-people display-6 mb-3" />
                                <h3>{totalIngressos}</h3>
                                <p className="mb-0">Ingressos Vendidos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}