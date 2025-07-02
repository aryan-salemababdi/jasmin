import fs from 'fs';
import path from 'path';

export class SnapshotManager {
  constructor(testFilePath) {
    this.testFilePath = testFilePath;
    this.snapFilePath = this._getSnapFilePath();
    this.snapshots = this._loadSnapshots();
    this.updated = false;
  }

  _getSnapFilePath() {
    const snapshotDir = path.join(process.cwd(), '__snapshots__');
    if (!fs.existsSync(snapshotDir)) fs.mkdirSync(snapshotDir);
    const fileName = path.basename(this.testFilePath) + '.snap.json';
    return path.join(snapshotDir, fileName);
  }

  _loadSnapshots() {
    if (!fs.existsSync(this.snapFilePath)) return {};
    try {
      const content = fs.readFileSync(this.snapFilePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return {};
    }
  }

  saveSnapshot(testName, content) {
    this.snapshots[testName] = content;
    this.updated = true;
  }

  compareSnapshot(testName, received) {
    const previous = this.snapshots[testName];

    if (!previous) {
      this.saveSnapshot(testName, received);
      return { match: false, new: true };
    }

    const match = received === previous;
    if (!match) {
      this.saveSnapshot(testName, received); // optionally update snapshot
    }

    return { match, new: false };
  }

  persist() {
    if (this.updated) {
      fs.writeFileSync(
        this.snapFilePath,
        JSON.stringify(this.snapshots, null, 2),
        'utf-8'
      );
    }
  }
}