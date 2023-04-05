
export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

export function formatDateToBr(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('/');
}

export function formatDateToBrWithHHMMSS(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = '' + d.getHours(),
        minutes = '' + d .getMinutes(),
        seconds = '' + d.getSeconds();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    if (hours.length < 2) 
        hours = '0' + hours;
    if (minutes.length < 2) 
        minutes = '0' + minutes;
    if (seconds.length < 2) 
        seconds = '0' + seconds;

    const ddmmyyyy = [day, month, year].join('/');
    const hhmmss = [hours, minutes, seconds].join(':');

    return [ddmmyyyy, hhmmss].join(' ');
}

export function dateBrToUsWithOneMoreDay(date){
    let day = parseInt(date.split('/')[0])+1;
    let month = date.split('/')[1];
    let year = date.split('/')[2];
    return [year, month, day].join('-')
}

export function dateBrToUs(date){
    let day = date.split('/')[0];
    let month = date.split('/')[1];
    let year = date.split('/')[2];
    return [year, month, day].join('-')
}

export function cellphoneMask (v) {
    if (!v) {
        return v;
    }

    var r = v.replace(/\D/g,"");
    r = r.replace(/^0/,"");
    if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/,"($1) $2-$3");
    } else if (r.length > 9) {
        r = r.replace(/^(\d)(\d{0,5})(\d{0,4})/,"($1) $2-$3");
    } else if (r.length > 8) {
        r = r.replace(/^(\d{0,5})(\d{0,5})/,"$1-$2");
    } else if (r.length > 6) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/,"($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/,"($1) $2");
    } else if (r.length > 0){
        r = r.replace(/^(\d*)/, "($1");
    } else {
        r = r.replace(/^(\d*)/, "$1");
    }
    return r;
}

export function cellphoneWithoutMask (v) {
    return v ? v.toString().replace(/\D/g,"") : v;
}

export function timeIsGreaterOrEqual(timeMax, timeOther){
    let tMax = parseInt(timeMax.toString().replace(/\D/g,""));
    let tOther = parseInt(timeOther.toString().replace(/\D/g,""));
    return tMax >= tOther;
}

export function cpfMask (v) {

    if (!v) {
        return v;
    }

    var r = v.toString().replace(/\D/g,"");

    if(r.length > 9){
        r = r.replace(/^(\d{3})(\d{3})(\d{3})(\d{0,2}).*/, "$1.$2.$3-$4");
    } else if (r.length > 6){
        r = r.replace(/^(\d{3})(\d{3})(\d{0,3}).*/, "$1.$2.$3");
    } else if (r.length > 3){
        r = r.replace(/^(\d{3})(\d{0,3}).*/, "$1.$2");
    } else {
        r = r.replace(/^(\d{0,3}).*/, "$1");
    }
    
    return r;        

}

export function cpfWithoutMask(cpf) {
    return cpf ? cpf.toString().replace(/\D/g,"") : cpf;
}

export function cepMask (v) {
    if (!v) {
        return v;
    }

    var r = v.replace(/\D/g,"");

    if(r.length > 5){
        r = r.replace(/^(\d{5})(\d{0,3}).*/, "$1-$2");
    } else {
        r = r.replace(/^(\d{0,5}).*/, "$1");
    }
    
    return r;        

}

export function cepWithoutMask(cep) {
    return cep ? cep.toString().replace(/\D/g,"") : cep;
}

export function moneyWithMask (v) {
    var r = v.toString().replace(/\D/g,"");
    var val = "";

    if(r.length > 2){
        r = r[0] === '0' ? r.substring(1, r.length) : r;
        let count = (r.length - 2)/3;
        
        if(count > 1){
            let x = ""
            let m = (r.length - 2)%3;

            if(count >= 2){
                for(let i = 0; i < parseInt(count); i++){
                    x += r.substring((i*3)+m, ((i+1)*3)+m) + '.';
                }  

                x = x[x.length - 1] === '.' ? x.substring(0, x.length-1) : x;
                x = m === 0 ? x + r.substring(r.length - 2, r.length) : r.substring(0, m) + '.' + x  + r.substring(r.length - 2, r.length);
            } else {
                x += r.substring(0, m) + '.' + r.substring(m, r.length)
            }

           val = `${x.substring(0, x.length-2)},${x.substring(x.length-2, x.length)}`;

        } else {
            val = `${r.substring(0, r.length-2)},${r.substring(r.length-2, r.length)}`; 
        }
        
    } else {
        val = `0,${r}`;
    }

    return val;
}

export function moneyWithoutMask (v) {
    v = v.toString().replaceAll('.', '');
    v = v.replaceAll(',', '.');
    return parseFloat(v);
}

export function moneyWithDecimalDigits (v) {
    let val = v.toString().split('.');

    if(val.length > 1){
        if(val[1].length > 1){
            v = `${val[0]}${val[1]}`;
        } else {
            v = `${val[0]}${val[1]}0`;
        }
    } else {
        v = `${v}00`;
    }

    // v = v.toString().replaceAll('.', '');
    // v = v.replaceAll(',', '.');
    // return parseFloat(v);
    return v;
}