import { useContext } from "react";
import TarefasContext from "./TarefasContext";
import Alerta from "../../Alerta";
import Titulo from "../../comuns/Titulo";

function Tabela() {

    const { setObjetoTarefa, alerta, setAlerta, listaObjetoTarefas, remover,
        setEditar, recuperar } = useContext(TarefasContext);

    return (
        <div style={{ padding: '20px' }}>            
            <Titulo texto="Tarefa"/>
            <button className="btn btn-primary"
                data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => {
                    setObjetoTarefa({
                        codigo: 0, titulo: "", corpo: "", coluna : ""
                    })
                    setEditar(false);
                    setAlerta({ status: "", message: "" });
                }}> 
                <i className="bi bi-file-earmark-plus"></i> Novo
            </button>
            <Alerta alerta={alerta} />
            {listaObjetoTarefas.length === 0 &&
                <h1>Nenhum estado encontrado</h1>}
            {listaObjetoTarefas.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            <th scope="col">Código</th>
                            <th scope="col">Título</th>
                            <th scope="col">Corpo</th>
                            <th scope="col">Coluna</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetoTarefas.map(objetoTarefa => (
                            <tr key={objetoTarefa.codigo}>
                                <td align="center">
                                    <button className="btn btn-info"
                                        data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                        onClick={() => {
                                            recuperar(objetoTarefa.codigo);
                                            setEditar(true);
                                            setAlerta({ status: "", message: "" });
                                        }}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                    <button className="btn btn-danger" title="Remover"
                                        onClick={() => { remover(objetoTarefa); }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                                <td>{objetoTarefa.codigo}</td>
                                <td>{objetoTarefa.titulo}</td>
                                <td>{objetoTarefa.corpo}</td>
                                <td>{objetoTarefa.titulocoluna}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Tabela;