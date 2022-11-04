import { useContext } from "react";
import TarefasContext from "./telas/tarefas/TarefasContext";
import ColunasContext from "./telas/colunas/ColunasContext";

function Home() {

    const { listaObjetos } = useContext(ColunasContext);
    
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
        <div>
            <div className="container">

            {listaObjetos.length === 0 &&
                <h1>Nenhuma coluna encontrada</h1>}
            {listaObjetos.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                            <th scope="col">Código</th>
                            <th scope="col">Título</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map(objeto => (
                            <tr key={objeto.codigo}>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.titulo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            </div>
        </div>
    )

}
export default Home;