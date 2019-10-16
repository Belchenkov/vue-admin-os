var rules = {
  data: function () {
    return {
      rules: {
        required: value => !!value || 'Обязательное поле',
        email: value => /.+@.+/.test(value) || "E-mail должен быть верным",
        min: value => value.length > 5 || 'More then 5 symbols',
        agree: value => value == true || "Dont accept",
      },
    }
  }
}

export default rules;