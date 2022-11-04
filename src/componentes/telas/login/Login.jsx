import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Alerta from '../../Alerta';
import './signin.css';
import jwt_decode from "jwt-decode";
import Autenticacao from '../../seg/Autenticacao';

function Login() {

    const { pegaAutenticacao, gravaAutenticacao } = Autenticacao;

    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [autenticado, setAutenticado] = useState(false);

    const acaoLogin = async e => {

        e.preventDefault();

        try {
            const body = {
                nome: nome,
                senha: senha
            };
            await fetch(`${process.env.REACT_APP_ENDERECO_API}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }).then(response => response.json())
                .then(json => {                    
                    if (json.auth === true) {
                        setAutenticado(true);
                        gravaAutenticacao(json);                        
                    } else {
                        setAlerta({ status: "error", message: "Usuário ou senha inválidos" })
                    }
                });
        } catch (err) {
            console.error(err.message);
        }

        const autenticacao = pegaAutenticacao();
        console.log(autenticacao);
        console.log("token: " + autenticacao.token);
        console.log("decoded: " + JSON.stringify(jwt_decode(autenticacao.token)));


    };

    useEffect(() => {
        const autenticacao = pegaAutenticacao();
        if (autenticacao != null) {           
            if (autenticacao.auth === true) {
                setAutenticado(true);
            }
        }
    }, []);

    if (autenticado === true) {
        return <Navigate to="/privado" />
    }

    return (
        <div>
            <body className="text-center">
                <Alerta alerta={alerta} />
                <main className="form-signin">
                    <form onSubmit={acaoLogin}>
                        <h1 className="h3 mb-3 fw-normal">Login de usuário</h1>

                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInput" placeholder="Nome de usuário"
                                value={nome}
                                name="nome"
                                onChange={e => setNome(e.target.value)} />
                            <label htmlFor="floatingInput">Nome</label>
                        </div>
                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Senha"
                                value={senha}
                                name="senha"
                                onChange={e => setSenha(e.target.value)} />
                            <label htmlFor="floatingPassword">Senha</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Efetuar login</button>
                    </form>
                </main>
            </body>
        </div>
    )

}

export default Login;