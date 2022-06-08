import snakeCase from 'lodash/snakeCase'
import camelCase from 'lodash/camelCase'
import pick from 'lodash/pick'

/**
 * Utilities
 * ===
 * ### Accept Only Number on keypress
 * Prevent user to input other than number
 * @param {Event} evt - Event input
 */
export const onlyNumberOnKeypress = (evt) => {
  const charCode = evt.which ? evt.which : evt.keyCode
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    evt.preventDefault()
  }
  return true
}

/**
 * Helpers
 * ===
 * ### Convert String to Slug
 * Converting String to Slug
 * @param {String} text - Value that need to be converted
 */

/**
 * Helpers
 * ===
 * ### Remap Property key
 * Remap The Object Property to `SET_[property]` (PASCAL ALL CAPS) for to be used on mutations
 *
 * @param {Object} state - The state to remapped
 * @param {Array} string - Selected Array of String state name want to remap
 */
export function mapMutationsHelper(stateObj, selected) {
  const ret = selected ? pick(stateObj, selected) : stateObj
  // eslint-disable-next-line array-callback-return
  Object.keys(ret).map((key) => {
    ret[`SET_${snakeCase(key)}`.toUpperCase()] = (state, payload) => {
      state[key] = payload
    }
    delete ret[key]
  })
  return ret
}

/**
 * Helpers
 * ===
 * ### Remap Property key
 * Remap The Object Property to `set[property]` (camelCase) for to be used on getters
 *
 * @param {Object} state - The state to remapped
 * @param {Array} string - Selected Array of String state name want to remap
 */
export const mapGettersHelper = (stateObj, selected) => {
  const ret = selected ? pick(stateObj, selected) : stateObj
  // eslint-disable-next-line array-callback-return
  Object.keys(ret).map((key) => {
    ret[camelCase(`get ${key}`)] = (state) => state[key]
    delete ret[key]
  })
  return ret
}

/**
 * Utilities
 * ===
 * ### Accept Only Number on keypress
 * Prevent user to input other than number
 * @param {Event} evt - Event input
 */
