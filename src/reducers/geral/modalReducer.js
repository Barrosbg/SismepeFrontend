const INITIAL_STATE = {
    open: false,
    confirm: false,
    title: "",
    body: "",
    width: "sm",
    labelConfirm: "",
    labelCancel: "",
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'MODAL_OPEN':
      return { ...state, open: action.payload };
    case 'MODAL_FETCHED':
      return { ...state, title: action.payload.title, body: action.payload.body, 
                      width: action.payload.width, labelConfirm: action.payload.labelConfirm, labelCancel: action.payload.labelCancel };
    case 'MODAL_CONFIRM':
      return { ...state, confirm: action.payload };
    default:
      return state;
  }
};
