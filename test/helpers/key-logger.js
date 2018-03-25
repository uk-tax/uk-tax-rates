
class KeyLogger {
  constructor(object) {
    const keysAccessed = {};

    this.getKeysNotAccessed = () => {
      return Object.keys(object).reduce((notAccessed, key) => {
        if (!keysAccessed[key]) {
          notAccessed.push(key);
        }
        return notAccessed;
      }, []);
    }
  
    // Define getters for each key.
    Object.keys(object).forEach((key) => {
      Object.defineProperty(this, key, { get: () => {
        keysAccessed[key] = true;
        return object[key];
      } });
    });
  }

};

export default KeyLogger;
