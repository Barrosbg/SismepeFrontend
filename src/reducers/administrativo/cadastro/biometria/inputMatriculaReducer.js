const INITIAL_STATE = {
    pessoas: [],
    pessoaSelecionada: "",
    matricula: "",
    info: {
        nome: "",
        cpf: "",
        sexo: "",
        dataNascimento: "",
        posto: "",
        telefone: "",
    }
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_FROM_MATRICULA':
            return {
                ...state,
                pessoas: action.payload
            }
        case 'SELECIONA_PESSOA':
            return {
                ...state,
                pessoaSelecionada: action.payload
            }
        case 'RESET_PESSOA':
            return INITIAL_STATE;
        case 'ADICIONA_MATRICULA':
            return {
                ...state,
                matricula: action.payload
            }
        case 'GET_INFO':
            return {
                ...state,
                info: action.payload
            }
        case 'MUDAR_TELEFONE':
            return {
                ...state,
                info: { ...state.info, telefone: action.payload }
            }
        case 'CHANGE_FIELD_ENDERECO':
            const field = action.payload.field;
            const value = action.payload.value;

            let infoObj = state.info;

            switch (field) {
                case 'dsLogradouro':
                    infoObj = { ...state.info, endereco: { ...state.info.endereco, dsLogradouro: value } };
                    break;
                case 'nrEndereco':
                    infoObj = { ...state.info, endereco: { ...state.info.endereco, nrEndereco: value } };
                    break;
                case 'dsComplemento':
                    infoObj = { ...state.info, endereco: { ...state.info.endereco, dsComplemento: value } };
                    break;
                case 'nmBairro':
                    infoObj = { ...state.info, endereco: { ...state.info.endereco, nmBairro: value } };
                    break;
                case 'cdUf':
                    infoObj = { ...state.info, endereco: { ...state.info.endereco, cdUf: value } };
                    break;
                case 'cdCidade':
                    infoObj = { ...state.info, endereco: { ...state.info.endereco, cdCidade: value } };
                    break;
                case 'nrCep':
                    infoObj = { ...state.info, endereco: { ...state.info.endereco, nrCep: value } };
                    break;
                default:
                    infoObj = state.info;
            }

            return {
                ...state,
                info: infoObj
            }
        default:
            return state;
    }
}