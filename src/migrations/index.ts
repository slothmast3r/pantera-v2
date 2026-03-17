import * as migration_20260314_034027 from './20260314_034027';
import * as migration_20260315_163836 from './20260315_163836';

export const migrations = [
  {
    up: migration_20260314_034027.up,
    down: migration_20260314_034027.down,
    name: '20260314_034027',
  },
  {
    up: migration_20260315_163836.up,
    down: migration_20260315_163836.down,
    name: '20260315_163836'
  },
];
