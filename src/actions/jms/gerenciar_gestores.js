export const salvarDados = (pessoa, ome,gestor) =>{
   const cadastro = {
       matricula: pessoa.matricula,
       nome: pessoa.nome,
       ome: ome.descricao,
       gestor:gestor
   }
   const usuario = JSON.stringify(cadastro);
   localStorage.setItem('pessoa', usuario);
}
export const carregarDados = () =>{
    const usuario = JSON.parse(localStorage.getItem('pessoa'));
    return [usuario];
 }