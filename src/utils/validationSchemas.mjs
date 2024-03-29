const createUserValidation = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
    },
    notEmpty: true,
    isString: true,
  },
  displayName: {
    notEmpty: true,
  },
  password:{
    notEmpty: true,
  }
};

export default createUserValidation;
