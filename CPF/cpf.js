function ValidaCPF(cpfEnviado){
    Object.defineProperty(this, 'cpfLimpo', {
        enumerable: true,
        get: function(){
            return cpfEnviado.replace(/\D+/g, '');
        }
    });
}

ValidaCPF.prototype.valida = function(){
    if(typeof this.cpfLimpo === 'undefined') return false;
    if(this.cpfLimpo.length !== 11) return false;
    if(this.isSequencia()) return false;

    const cpfParcial = this.cpfLimpo.slice(0, -2);
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);

    const novoCpf = cpfParcial + digito1 + digito2;
    return novoCpf === this.cpfLimpo;
};

ValidaCPF.prototype.criaDigito = function(cpfParcial){
    const cpfArray = Array.from(cpfParcial);

    let regressivo = cpfArray.length + 1;
    const total = cpfArray.reduce((ac, val) =>{
        ac += (regressivo * Number(val));
        regressivo--;
        return ac;
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);
};

ValidaCPF.prototype.isSequencia = function(){
    const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
};

document.addEventListener("DOMContentLoaded", function() {
    const cpfInput = document.getElementById("cpf");
    const cpfValidation = document.getElementById("cpf-validation");
    const submitButton = document.getElementById("submit-button");
    const cancelButton = document.getElementById('cancel-button');

    submitButton.addEventListener("click", function() {
        const cpf = new ValidaCPF(cpfInput.value);

        if (cpf.valida()) {
            cpfValidation.textContent = "CPF válido!";
        } else {
            cpfValidation.textContent = "CPF inválido. Digite um CPF válido.";
        }
    });

    cancelButton.addEventListener('click', function(){
        cpfInput.value = '';
        cpfValidation.textContent = '';
    });
});
