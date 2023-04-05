export function checkPermission(permission){
    if(permission === '/home' || permission === '/configuracoes'){
        return true;
    } else {
        let perms = JSON.parse(localStorage.getItem("_sismepe_permissions_path"));
        if(perms && perms.length){
            return perms.some((p) => p === formatPath(permission) );
        } else {
            return false;
        }
    }
}

function formatPath(path){
    let lista = path.split(/([0-9]+)/);
    let texto = lista.filter((e) => isNaN(e));
    let pathClean = texto.join('').replace("//", "/");
    return pathClean.endsWith("/") ? pathClean.slice(0, -1) : pathClean;  
}

