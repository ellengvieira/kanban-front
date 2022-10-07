import { useState, useEffect } from "react";
import TarefasContext from "./TarefasContext";
import Tabela from "./Tabela";
import Form from "./Form";

function Tarefas() {

    const [alerta, setAlerta] = useState({ "status": "", "message": "" });
    const [listaObjetoTarefas, setListaObjetoTarefas] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objetoTarefa, setObjetoTarefa] = useState({
        codigo: "", titulo: "", corpo: "", coluna : ""
    });
    const [listaColunas, setListaColunas] = useState([]);

    const recuperar = async codigo => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/tarefas/${codigo}`)
            .then(response => response.json())
            .then(data => setObjetoTarefa(data))
            .catch(err => setAlerta({ "status": "error", "message": err }))
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/tarefas`,
                {
                    method: metodo,
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(objetoTarefa)
                }).then(response => response.json())
                .then(json => {
                    setAlerta({ status: json.status, message: json.message });
                    setObjetoTarefa(json.objeto);
                    if (!editar) {
                        setEditar(true);
                    }
                })
        } catch (err) {
            setAlerta({ "status": "error", "message": err })
        }
        recuperaTarefas();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjetoTarefa({ ...objetoTarefa, [name]: value });
    }

    const recuperaColunas = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/colunas`)
            .then(response => response.json())
            .then(data => setListaColunas(data))
            .catch(err => setAlerta({ "status": "error", "message": err }))
    }

    const recuperaTarefas = async () => {
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/tarefas`)
            .then(response => response.json())
            .then(data => setListaObjetoTarefas(data))
            .catch(err => setAlerta({ "status": "error", "message": err }))
    }    

    const remover = async objetoTarefa => {
        if (window.confirm('Deseja remover este objetoTarefa?')) {
            try {
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/tarefas/${objetoTarefa.codigo}`,
                        { method: "DELETE" })
                        .then(response => response.json())
                        .then(json => setAlerta({
                            "status": json.status,
                            "message": json.message
                        }))
                recuperaTarefas();
            } catch (err) {
                setAlerta({ "status": "error", "message": err })
            }
        }
    }

    useEffect(() => {
        recuperaColunas();
        recuperaTarefas();
    }, []);

    return (
        <TarefasContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetoTarefas, setListaObjetoTarefas,
                recuperaColunas, remover,
                objetoTarefa, setObjetoTarefa,
                editar, setEditar,
                recuperar,
                acaoCadastrar, handleChange, listaColunas
            }
        }>
            <Tabela />
            <Form />

        </TarefasContext.Provider>
    )

}

export default Tarefas;