
class KeyLogger {
  constructor(object) {
    const keysAccessed = {};

    this.getKeysNotAccessed = () => {
      function mapAccesses(notAccessed, key) {
        if (!keysAccessed[key]) {
          notAccessed.push(key);
        }
        return notAccessed;
      }
      return Object.keys(object).reduce(mapAccesses, []);
    };

    // Define getters for each key.
    Object.keys(object).forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => {
          keysAccessed[key] = true;
          return object[key];
        },
      });
    });
  }
}

export default KeyLogger;
