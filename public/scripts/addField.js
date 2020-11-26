// Procurar o botao
document.querySelector("#add-time")
.addEventListener('click', cloneField)
// quando clicar no botao
// executar uma ação
function cloneField() {
    const newFieldContainer = document.querySelector(".schedule-item").cloneNode(true)
    // duplicação do html

    const fields = newFieldContainer.querySelectorAll("input")
    // busca dos inputs
    fields.forEach(function(field){

        field.value = ""
    })
    // função que limpa o valor dos inputs

    document.querySelector('#schedule-items').appendChild(newFieldContainer)
    // adicionando tudo na pagina
}

