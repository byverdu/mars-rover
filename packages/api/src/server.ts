import {v4} from 'uuid';

interface LernaTest {
  package: string;
  version: string;
}

class Lerna implements LernaTest {
  package;
  version;
  constructor(pack, ver) {
    this.package = pack;
    this.version = ver;
  }
}

const newLerna = new Lerna('pollo', v4());

console.log(newLerna);