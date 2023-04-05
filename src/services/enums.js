export function situacaoAtendimentoFromEnum(type){
    switch(type){
        case 1:
            return "Paciente chegou";
        case 2:
            return "Em atendimento";
        case 3:
            return "Cancelado";
        case 4:
            return "Finalizado";
        case 5:
            return "Reavaliar";
        case 6:
            return "Evasão";
        default:
            return "Não especificado";
    }
}

export function situacaoAtendimentoToEnum(type){
    switch(type){
        case "ABERTO":
            return 1;
        case "EM_ATENDIMENTO":
            return 2;
        case "CANCELADO":
            return 3;
        case "FINALIZADO":
            return 4;
        case "REAVALIAR":
            return 5;
        case "EVASAO":
            return 6;
        default:
            return "Não especificado";
    }
}




export function parentescoFromEnum(type){
    switch(type){
        case 1:
            return "FILHO(A)";
        case 2:
            return "TUTELADO";
        case 3:
            return "CONJUGE";
        case 4:
            return "MAE";
        case 5:
            return "COMPANHEIRO(A)";
        case 6:
            return "PAI";
        case 7:
            return "SOGRA";
        case 8:
            return "IRMÃO";
        case 9:
            return "AVÔ(Ó)";
        case 10:
            return "ENTEADO";
        case 22:
            return "ESPOSA";
        default:
            return "NÃO ESPECIFICADO";
    }
}