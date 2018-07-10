$(document).ready( function () {
                // ADD SLIDEDOWN ANIMATION TO DROPDOWN //
    $('.dropdown').on('show.bs.dropdown', function (e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
    });

                    // ADD SLIDEUP ANIMATION TO DROPDOWN //
    $('.dropdown').on('hide.bs.dropdown', function (e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
    });

    $(".salvar").click( function () {
        //alert("Salvo com sucesso!!");
    });

});


function limpa_formulário_cep() {
    // Limpa valores do formulário de cep.
    $("#Logradouro").val("...");
    $("#Bairro").val("...");
}

function buscarCep(codigoPostal){
    var cep = $(this).val().replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

                        //Preenche os campos com "..." enquanto consulta webservice.
            $("#Logradouro").val("...");
            $("#Bairro").val("...");
                        //Consulta o webservice viacep.com.br/
            $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                if (!("erro" in dados)) {
                    //Atualiza os campos com os valores da consulta.
                    $("#Logradouro").val(dados.logradouro);
                    $("#Bairro").val(dados.bairro);
                } //end if.
                else {
                    //CEP pesquisado não foi encontrado.
                    limpa_formulário_cep();
                    alert("CEP não encontrado.");
                }
            });
        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
                    //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }    
}
//Quando o campo cep perde o foco.
           // $("#Cep").blur(function() {

                //Nova variável "cep" somente com dígitos.
                
           // });