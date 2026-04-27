import * as migration_20260406_143953_initial_schema_v2 from './20260406_143953_initial_schema_v2';
import * as migration_20260427_000542 from './20260427_000542';

export const migrations = [
  {
    up: migration_20260406_143953_initial_schema_v2.up,
    down: migration_20260406_143953_initial_schema_v2.down,
    name: '20260406_143953_initial_schema_v2',
  },
  {
    up: migration_20260427_000542.up,
    down: migration_20260427_000542.down,
    name: '20260427_000542'
  },
];
