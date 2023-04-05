handleClickOpenCadastro = () => {
    const usuarioLogado = this.props.usuario
    usuarioLogado.find((element) =>{
          if(element.siglaPermissao == "JMS_CADASTRO_JUNTA"){
              this.setState({textFieldTroca:true})
          }else{
            this.setState({textFieldTroca:false})
          }
    })