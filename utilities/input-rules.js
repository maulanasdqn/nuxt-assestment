export const rules = {
  password: /^(?=.*[a-zA-Z])(?=.*[\d])[\w\W]{8,32}$/,
  name: /^(?=.{2,}$)[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
  // eslint-disable-next-line no-useless-escape, prettier/prettier
  email: /^\w+([.-]\w+)*@\w+([.-]\w+)*\.\w{2,3}$/,
  phone: /^(?=.{4,15}$)[0-9]*$/,
  timerange: /^[0-2]\d:[0-5]\d-[0-2]\d:[0-5]\d$/,
  number: /^[+-]?\d*\.\d+$|^[+-]?\d+(\.\d*)?$/,
}

export const messages = {
  wrong_format: 'Format {_field_} tidak sesuai',
  required: (fieldName, { isHidden }) => {
    if (!!isHidden && isHidden === 'hidden') {
      return ' '
    }
    return `${fieldName} harus di isi`
  },
  required_selection: '{_field_} harus di pilih',
  password:
    'Kata sandi yang kuat setidaknya terdiri dari 8 karakter, maksimal 32 karakter, dan mencakup huruf dan angka.',
  confirm_password: 'Konfirmasi password tidak sesuai',
  confirm_value: '{_field_} tidak sesuai',
  email_not_exist: 'Email yang kamu masukan sudah terdaftar',
  only_number: 'Field hanya bisa diisi dengan angka',
}
