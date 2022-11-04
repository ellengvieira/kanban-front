import jwt_decode from "jwt-decode";

const NOMEAPP = 'API-KANBAN';

const pegaAutenticacao = () => {

    const localStorageAutenticacao = localStorage.getItem(NOMEAPP + '/autenticacao');
    const autenticacao = localStorageAutenticacao ? JSON.parse(localStorageAutenticacao) : null;
    if (autenticacao === null) {
        return null;
    }
    if (autenticacao.auth === false) {
        return null;
    } else {
        var decoded = jwt_decode(autenticacao.token);
        if (decoded.exp <= Math.floor(new Date() / 1000)) {
            logout();
            return null;
        } else {       
            return autenticacao;
        }
    }
}

const gravaAutenticacao = (json) => {
    const decodificado = jwt_decode(json.token);
    json.nome = decodificado.nome;
    localStorage.setItem(NOMEAPP + '/autenticacao', JSON.stringify(json));
}

const logout = () => {
    localStorage.setItem(NOMEAPP + '/autenticacao', JSON.stringify({ "auth": false, "token": "" }));
}

export default {
    pegaAutenticacao, gravaAutenticacao, logout
};
	