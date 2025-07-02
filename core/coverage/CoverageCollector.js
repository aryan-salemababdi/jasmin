import pkg from 'istanbul-lib-coverage';
const { createCoverageMap } = pkg;


export class CoverageCollector {
  constructor() {
    this.coverageMap = createCoverageMap({});
  }

  addCoverage(coverage) {
    if (coverage && typeof coverage === 'object') {
      this.coverageMap.merge(coverage);
    }
  }

  getCoverageMap() {
    return this.coverageMap;
  }
}