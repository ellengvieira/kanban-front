import { useContext } from "react";
import Alerta from "../../Alerta";
import TarefasContext from "./TarefasContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import Dialogo from "../../comuns/Dialogo";

function Form() {

    const { objetoTarefa, handleChange, acaoCadastrar, alerta, listaColunas } =
        useContext(TarefasContext);

    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        const forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
    })()

    return (
        <Dialogo id="modalEdicao" titulo="Tarefas" idform="formulario"
            acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                name="codigo" value={objetoTarefa.codigo}
                onchange={handleChange} requerido={false}
                readonly={true} tamanho={5}
                msgvalido=""
                msginvalido="" />
             <CampoEntrada id="txtTitulo" label="Título" tipo="text"
                name="titulo" value={objetoTarefa.titulo}
                onchange={handleChange} requerido={true}
                readonly={false} tamanho={40}
                msgvalido="Campo título OK"
                msginvalido="Campo título é obrigatório" />
            <CampoEntrada id="txtCorpo" label="Corpo" tipo="text"
                name="corpo" value={objetoTarefa.corpo}
                onchange={handleChange} requerido={true}
                readonly={false} tamanho={40}
                msgvalido="Campo corpo OK"
                msginvalido="Campo corpo é obrigatório" />
            <div className="form-group">
                <label htmlFor="selectColuna" className="form-label">
                    Prédio
                </label>
                <select required className="form-control"
                    name="coluna" value={objetoTarefa.coluna} id="selectColuna"
                    onChange={handleChange}>
                    <option disable="true" value="">
                        (Selecione o estado)
                    </option>
                    {listaColunas.map((coluna) => (
                        <option
                            key={coluna.codigo} value={coluna.codigo}>
                            {coluna.titulo}
                        </option>
                    ))
                    }
                </select>
                <div className="valid-feedback">
                    Campo estado OK
                </div>
                <div className="invalid-feedback">
                    Selecione um estado
                </div>
            </div>
        </Dialogo>
    )
}

export default Form;