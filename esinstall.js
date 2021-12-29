import { install } from 'esinstall';
install(
  [
    'three',
    'three/examples/jsm/controls/OrbitControls',
    'three/examples/jsm/loaders/TGALoader',
    'three/examples/jsm/libs/stats.module.js',
  ],
  {
    polyfillNode: false,
    /*options*/
    // cwd: string;
    // alias: Record<string, string>;
    // lockfile?: ImportMap;
    // logger: AbstractLogger;
    // verbose?: boolean;
    // dest: string;
    // env: EnvVarReplacements;
    // treeshake?: boolean;
    // polyfillNode: boolean;
    // sourceMap?: boolean | 'inline';
    // externalPackage: string[];
    // externalPackageEsm: string[];
    // packageLookupFields: string[];
    // packageExportLookupFields: string[];
    // namedExports: string[];
    // rollup: {
    //   context?: string;
    //   plugins?: RollupPlugin[];
    //   dedupe?: string[];
  }
);
