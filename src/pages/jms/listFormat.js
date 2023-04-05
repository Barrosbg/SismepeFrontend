import { ListarLicenca } from '../../actions/jms/actions'
import { ListarPrestador } from '../../actions/jms/actions'
import { toast } from 'react-toastify';
export async function  FormatarListaDeLicencas(lista, editar, excluir){
    let licencas = [];
    let formatLicense=[]
    let prestador = []
    let conselho = null;
    console.log(lista.matricula)
    licencas = await ListarLicenca(lista.matricula,lista.corporacao)
    console.log(licencas)
    if(licencas && licencas.length){
       
        // return licencas
             

    }else{
        toast.warn('Nenhuma licença encontrada para este usuário!')
    }
    
}