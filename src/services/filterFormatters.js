export function formatOptionBeneficiario(option) {
  const digitoOuSequencial = (option?.digito !== null && option?.digito !== undefined)
    ? '-' + option?.digito : '/' + option?.sequencial;
  return option?.nome ? option?.matricula + digitoOuSequencial + ' — ' + option?.nome : ""
}

export function formatOptionMedico(option) {
  console.log(option);
  const fmtConselho = option?.conselho?.uf ? option?.numeroConselho + '/' + option?.conselho?.uf : option?.numeroConselho;
  return option?.numeroConselho && option?.nome ? fmtConselho + ' — ' + option?.nome : '';
}

export function formatOptionCid(option) {
  if (option?.id)
    return option?.id + ' — ' + option?.descricao;

  return '';
}