import { useState, useEffect } from "react";
import TarefasContext from "./TarefasContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Home from "../../Home";
import WithAuth from "../../seg/WithAuth";
import Autenticacao from "../../seg/Autenticacao";
import { useNavigate } from "react-router-dom";


function Tarefas() {

    const [alerta, setAlerta] = useState({ "status": "", "message": "" });
    const [listaObjetoTarefas, setListaObjetoTarefas] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objetoTarefa, setObjetoTarefa] = useState({
        codigo: "", titulo: "", corpo: "", coluna: ""
    });
    const [listaColunas, setListaColunas] = useState([]);

    let navigate = useNavigate();

    const recuperar = async codigo => {
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/tarefas/${codigo}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro código: ' + response.status);
                })
                .then(data => setObjetoTarefa(data))
                .catch(err => setAlerta({ "status": "error", "message": err }))
        }
        catch (err) {
            console.log('caiu no erro do recuperar por codigo: ' + err);
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/tarefas`,
                {
                    method: metodo,
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token
                    },
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
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/colunas`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro código: ' + response.status)
                })
                .then(data => setListaColunas(data))
                .catch(err => setAlerta({ "status": "error", "message": err }))
        } catch (err) {
            setAlerta({ "status": "error", "message": err })
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaTarefas = async () => {
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/tarefas`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": Autenticacao.pegaAutenticacao().token
                }
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Erro código: ' + response.status)
                })
                .then(data => setListaObjetoTarefas(data))
                .catch(err => setAlerta({ "status": "error", "message": err }))
        } catch (err) {
            setAlerta({ "status": "error", "message": err })
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const remover = async objetoTarefa => {
        if (window.confirm('Deseja remover este objetoTarefa?')) {
            try {
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/tarefas/${objetoTarefa.codigo}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                                "x-access-token": Autenticacao.pegaAutenticacao().token
                            }
                        })
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
            <Home />

        </TarefasContext.Provider>
    )

}

export default WithAuth(Tarefas)