export function handleZoom(state, delta) {
  let zoom = state.zoom + delta;

  if (zoom < 1) zoom = 1;
  if (zoom > 10) zoom = 10;

  return { ...state, zoom };
}

export function handlePan(state, dx) {
  return {
    ...state,
    offset: state.offset + dx
  };
}