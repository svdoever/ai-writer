import path from "path";
import * as logger from "loglevel";
import { Command, Option } from "commander";
import shell from "shelljs";
// import dotenv from "dotenv";

// dotenv.config({ path: path.join(__dirname, "../.env") });

interface ProgramOptions {
  verbose: boolean;
  debug: boolean;
  dryRun: boolean;
}

function buildVerboseDebugArguments(options: ProgramOptions): string {
  let args = "";
  if (options.verbose) {
    args += " --verbose";
  }
  if (options.debug) {
    args += " --debug";
  }
  return args;
}

function buildVerboseDebugDryRunArguments(options: ProgramOptions): string {
  let args = "";
  if (options.verbose) {
    args += " --verbose";
  }
  if (options.debug) {
    args += " --debug";
  }
  if (options.dryRun) {
    args += " --dry-run";
  }
  return args;
}

function blsContentWriter(options: ProgramOptions): void {
  const storagePath = path.resolve(path.join(__dirname, "../storage/bls"));

  const argsVerboseDebug = buildVerboseDebugArguments(options);
  const argsVerboseDryRunDebug = buildVerboseDebugDryRunArguments(options);
  logger.info("BLS Content Writer");
  process.chdir(__dirname); // do everything relative from the script folder
//   shell.exec(`npx tsx extract.ts ${argsVerboseDebug}`);
//   shell.exec(`npx tsx transform.ts ${argsVerboseDebug}`);
//   shell.exec(
//     `npx tsx ../../../scripts/ingest-hnswlib.ts --skip-chunking --source '${documentsPath}' --database ${databasePath} ${argsVerboseDryRunDebug}`
//   );
//   if (!options.dryRun) {
//     shell.exec(
//       `npx tsx ../../../scripts/publish.ts --source ../storage --destination vitaalverzekerd ${argsVerboseDebug}`
//     );
//   }
}

function createProgram(): Command {
  const program = new Command();
  program.version("1.0.0");
  program.description("BLS Marketing Content Writer");

  program.addOption(new Option("--brand <brand>", "the vehicle brand, * for all, otherwise matching *brand*"));
  program.addOption(new Option("--model <model>", "the vehicle model, * for all, otherwise matching *model*"));
  program.addOption(new Option("--bls-vehicle-id <id>", "execute _bls-vehicle-type-description recipe for vehicle"));
  program.addOption(new Option("--data-only", "only retrieve vehicle data, do not execute recipe"));
  program.addOption(new Option("--verbose", "show verbose output"));
  program.addOption(new Option("--debug", "show debug output"));
  program.addOption(new Option("--dry-run", "do not send prompt to LLM"));
  program.action(async (options: ProgramOptions) => {
    if (options.verbose) {
      logger.setLevel("info");
    }
    if (options.debug) {
      logger.setLevel("debug");
    }
    blsContentWriter(options);
  });
  return program;
}

void (async () => {
  try {
    const program = createProgram();
    program.parse(process.argv);
  } catch (e) {
    logger.error(e);
    process.exit(1);
  }
})();
