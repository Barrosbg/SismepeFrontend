const INITIAL_STATE = {
    foto: "",
    blockClick: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'RESET_FOTO':
            return {
                ...state,
                foto: ""
            }
        case 'ADD_FOTO':
            return {
                ...state,
                foto: action.payload
            }
        case 'BLOCK_CLICK':
            return {
                ...state,
                blockClick: action.payload
            }
        default:
            return state;
    }
}