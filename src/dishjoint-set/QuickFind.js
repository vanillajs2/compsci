/**
 * @class QuickFind
 * @exports
 */
export class QuickFind {
  /**
   * The identity array
   *
   * @private
   * @type {Map}
   */
  verticies = null;

  /**
   * The number of sets
   *
   * @type {Number}
   */
  count = 0;

  /**
   * @constructs QuickFind
   * @param {*[]} [values]
   */
  constructor (values = []) {
    this.verticies = new Map();
    values.forEach((value, i) => {
      this.verticies.set(value, i);
    });

    this.count = this.verticies.size;
  }

  /**
   * Find the id for a value
   *
   * @param {*} value
   * @returns {Number}
   */
  find (value) {
    const id = this.verticies.get(value);
    if (id === undefined) { throw Error(`Item: ${value} not found in the set`); }

    return id;
  }

  /**
   * Are the 2 verticies connected?
   *
   * @param {*} valueA
   * @param {*} valueB
   * @returns {boolean}
   */
  connected (valueA, valueB) {
    return this.find(valueA) === this.find(valueB);
  }

  /**
   * Join the verticies if not alredy in the same set
   *
   * @param {*} valueA
   * @param {*} valueB
   */
  union (valueA, valueB) {
    if (this.connected(valueA, valueB)) { return; }

    const idA = this.find(valueA);
    const idB = this.find(valueB);

    this.verticies.forEach((id, key) => {
      if (id === idA) {
        this.verticies.set(key, idB);
      }
    });
    this.count--;
  }

  /**
   * Returns a 2D array of the unique sets and the values in those sets
   *
   * @returns [][]
   */
  sets () {
    const verticies = [...this.verticies.entries()];
    const sets = verticies.reduce((acc, curr) => {
      // create the set array if it doesn't exist
      if (acc[curr[1]] === undefined) { acc[curr[1]] = []; }
      acc[curr[1]].push(curr[0]);
      return acc;
    }, {});

    return Object.values(sets);
  }
}
