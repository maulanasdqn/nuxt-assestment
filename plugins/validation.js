import { extend, setInteractionMode } from 'vee-validate'
import { rules, messages } from '@/utilities/input-rules'

setInteractionMode('aggressive')

export default ({ store }) => {
  extend('required', {
    validate(value) {
      return {
        required: true,
        // eslint-disable-next-line unicorn/prefer-includes
        valid: ['', null, undefined].indexOf(value) === -1,
      }
    },
    computesRequired: true,
    message: messages.required,
  })

  extend('required_boolean', {
    validate(value) {
      return {
        required: true,
        allowFalse: false,
        // eslint-disable-next-line unicorn/prefer-includes
        valid: ['', null, undefined, false].indexOf(value) === -1,
      }
    },
    computesRequired: true,
    message: messages.required,
  })

  extend('required_selection', {
    validate(value) {
      return {
        required: true,
        allowFalse: false,
        // eslint-disable-next-line unicorn/prefer-includes
        valid: ['', null, undefined, false].indexOf(value) === -1,
      }
    },
    computesRequired: true,
    message: messages.required_selection,
  })

  extend('email', {
    validate: (value) => value.match(rules.email),
    message: messages.wrong_format,
  })

  extend('password', {
    validate: (value) => value.match(rules.password),
    message: messages.password,
  })

  extend('confirm_password', {
    params: ['target'],
    validate(value, { target }) {
      return value === target
    },
    message: messages.confirm_password,
  })

  extend('confirm_value', {
    params: ['target'],
    validate(value, { target }) {
      return value === target
    },
    message: messages.confirm_value,
  })

  extend('email_not_exist', {
    validate(value) {
      return store.dispatch('user/checkEmail', value)
    },
    message() {
      return store.getters['user/getEmailExistMsg']
    },
  })

  extend('no_emoji', {
    validate: (value) => !/\p{Extended_Pictographic}/u.test(value),
    message: 'Emoji tidak diperbolehkan',
  })
}
