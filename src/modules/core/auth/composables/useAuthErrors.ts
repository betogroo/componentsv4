const authError = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/invalid-email':
      return 'O e-mail é inválido.'
    case 'auth/user-not-found':
      return 'O usuário não correponde à nenhuma credencial.'
    case 'auth/wrong-password':
      return 'Senha incorreta.'
    case 'auth/email-already-in-use':
      return 'Este email já é utilizado por outro usuário.'
    case 'auth/weak-password':
      return 'A senha dever ter ao menos 6 caracteres.'
    case 'auth/passwords-do-not-match':
      return 'As senhas não coincidem.'
    case 'auth/blank-blank-password':
      return 'A senha não pode ser em branco.'
    case 'auth/blank-blank-password-confirm':
      return 'É necessário repetir a senha.'
    case 'auth/email-required':
      return 'É necessário fornecer um email válido.'
    case 'auth/displayname-required':
      return 'Informe como quer ser chamado'
    case 'auth/generic-signup-error':
      return 'Não foi possível se cadastrar. Tente novamente em alguns segundos.'
    case 'auth/too-many-requests':
      return 'Tentativas de redefinição de senha excedidas. Tente mais tarde'
    case 'auth/default-error':
      return 'Erro personalizado'
    case 'auth/generic-login-error':
      return 'Não foi possível conectar-se. Tente novamente em alguns segundos.'
    default:
      return 'Ocorreu um erro. Tente novamente em alguns segundos'
  }
}

const useAuthErrors = (): { authError: typeof authError } => {
  return { authError }
}

export default useAuthErrors
