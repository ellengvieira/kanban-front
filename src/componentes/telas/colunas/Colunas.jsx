import { useState, useEffect } from "react";
import ColunasContext from "./ColunasContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Home from "../../Home";
import WithAuth from "../../seg/WithAuth";

function Colunas() {

    const [alerta, setAlerta] = useState({ "status": "", "message": "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "", titulo: ""
    });

    const recuperar = async codigo => {
        try {
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/colunas/${codigo}`,
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
                .then(data => setObjeto(data))
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
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/colunas`,
                {
                    method: metodo,
                    headers:{
                        "Content-Type": "application/json",
                        "x-access-token": Autenticacao.pegaAutenticacao().token},
                    body: JSON.stringify(objeto)
                }).then(response => response.json())
                .then(json => {
                    setAlerta({ status: json.status, message: json.message });
                    setObjeto(json.objeto);
                    if (!editar) {
                        setEditar(true);
                    }
                })
        } catch (err) {
            setAlerta({ "status": "error", "message": err })
            window.location.reload();
            navigate("/login", { replace: true });  
        }
        recuperaColunas();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
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
                    .then(data => setListaObjetos(data))
                    .catch(err => setAlerta({ "status": "error", "message": err }))
            } catch (err) {
                setAlerta({ "status": "error", "message": err })
                window.location.reload();
                navigate("/login", { replace: true });
            }
    }

    const remover = async objeto => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                await
                    fetch(`${process.env.REACT_APP_ENDERECO_API}/colunas/${objeto.codigo}`,
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
                recuperaColunas();
            } catch (err) {
                setAlerta({ "status": "error", "message": err })
            }
        }
    }

    useEffect(() => {
        recuperaColunas();
    }, []);

    return (
        <ColunasContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                recuperaColunas, remover,
                objeto, setObjeto,
                editar, setEditar,
                recuperar,
                acaoCadastrar, handleChange
            }
        }>
            <Tabela />
            <Form />
            <Home />

        </ColunasContext.Provider>
    )

}

export default WithAuth(Colunas);