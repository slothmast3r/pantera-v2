import * as migration_20260406_143953_initial_schema_v2 from './20260406_143953_initial_schema_v2';

export const migrations = [
  {
    up: migration_20260406_143953_initial_schema_v2.up,
    down: migration_20260406_143953_initial_schema_v2.down,
    name: '20260406_143953_initial_schema_v2'
  },
];
