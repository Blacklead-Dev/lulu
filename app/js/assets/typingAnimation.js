export function createHtmlWritter(element) {
  return {
    write(text) {
      element.innerHTML = text;
    },
  };
}

/**
 * @typedef {Object} TypingAnimationOptions
 * @property {number} [duration] - the duration of the animation in milliseconds
 * @property {{write: Function}} writter - the writter object, responsible for writing text into platform specific way
 *
 * @param {string} value
 * @param {TypingAnimationOptions} options
 */
export function writeString(value, options) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    function writeChunk() {
      const time = Date.now();
      const currentChunkEnd =
        value.length * ((time - startTime) / options.duration);
      const chunk = value.slice(0, currentChunkEnd);

      options.writter.write(chunk);

      if (currentChunkEnd >= value.length) {
        return resolve();
      }

      requestAnimationFrame(writeChunk);
    }

    requestAnimationFrame(writeChunk);
  });
}
