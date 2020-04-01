export const updateAction = (state, payload) => {
  // in case if modifications are needed - work with a cloned state
  // const clonedState = JSON.parse(JSON.stringify(state));
  return {
    ...state,
    data: {
      ...state.data,
      ...payload
    }
  }
}
