export function formatFrameNumber(frame) {
  if (frame < 10) {
    return '00' + frame.toString();
  } else if (frame < 100) {
    return '0' + frame.toString();
  } else {
    return frame.toString();
  }
}
