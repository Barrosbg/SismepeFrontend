const INITIAL_STATE = {
  data: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GRUPO_MENU_FETCHED':
      if(action.error){
        return { ...state };      
      } 
      else if (action.payload){
        if(action.payload.data){
          renderPermissions(action.payload.data);
          return { ...state, data: action.payload.data };    
        } else {
          renderPermissions([]);
          return { ...state, data: [] };
        }
      } else {
        localStorage.removeItem("_sismepe_permissions_path");
        return { ...state, data: [] };
      }    

    default:
      return state;
  }
};


function renderPermissions(data){
  
  let perms = []

  if(data && data.length){
    data.map((item) => {
      item.menus.map((menu) => {
        menu.leaf ? perms.push(menu.path) : null
        loadChildrens(perms, menu.children)
      })
    })
  }

  localStorage.setItem("_sismepe_permissions_path", JSON.stringify(perms));
}

function loadChildrens(list, childrens){
  childrens.map((child) => {
    child.leaf ? list.push(child.path) : null
    if(child.children.length){
      loadChildrens(list, child.children)
    }
  })
}
