export const createUserValidation = {
  username: {
    isLength:{
      options:{
        min: 5,
        max: 32,
      }
    },
    notEmpty: true,
    isString: true,
  },
  displayName: {
    errormessage:"cannot be empty"
  }
}
