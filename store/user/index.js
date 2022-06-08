export const state = () => ({
  test: 'Test',
})

export const getters = {
  getTest(state) {
    return state.test
  },
}
