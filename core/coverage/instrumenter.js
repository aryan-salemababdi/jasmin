import { createInstrumenter } from 'istanbul-lib-instrument';

const instrumenter = createInstrumenter();

export function instrumentCode(code, filename) {
  return instrumenter.instrumentSync(code, filename);
}