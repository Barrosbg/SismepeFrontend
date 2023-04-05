

export function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function validateCPF(cpf){
    let soma = 0;
    let resto;
    let i;
    cpf = cpf.replace(/\D/g,"");

    if (cpf == "00000000000"
        || cpf == "11111111111"
        || cpf == "22222222222"
        || cpf == "33333333333"
        || cpf == "44444444444"
        || cpf == "55555555555"
        || cpf == "66666666666"
        || cpf == "77777777777"
        || cpf == "88888888888"
        || cpf == "99999999999"
    ) return false;
    if (cpf.length !== 11) return false;

    for (i=1; i<=9; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(cpf.substring(9, 10)) ) return false;

    soma = 0;

    for (i = 1; i <= 10; i++) soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11))  resto = 0;
    if (resto != parseInt(cpf.substring(10, 11) ) ) return false;
    return true;

}


export function validatePassword(password){
    
    let isValid = true;
    let warnings = [];

    if(password.length < 8){
        warnings.push('A senha deve conter no mínimo 8 caracteres!');
        isValid = false;
    }
        
    let re = /[0-9]/;
    if(!re.test(password)) {
        warnings.push('A senha deve conter pelo menos um número!');
        isValid = false;
    }

    return { status: isValid, warnings: warnings };
}

export function validateConfirmPassword(password, confirmPassword){
    
    let isValid = true;
    let warnings = [];

    if(password.length > 0){   
        
        if(confirmPassword !== password){
            warnings.push('As senha estão diferentes!');
            isValid = false;
        }

        if(confirmPassword.length < 8){
            warnings.push('A senha deve conter no mínimo 8 caracteres!');
            isValid = false;
        }
            
        let re = /[0-9]/;
        if(!re.test(confirmPassword)) {
            warnings.push('A senha deve conter pelo menos um número!');
            isValid = false;
        }
    }

    return { status: isValid, warnings: warnings };
}