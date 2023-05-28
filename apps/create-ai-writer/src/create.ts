import { createProjectBasedOnTemplateInMonoRepo } from './createProjectBasedOnTemplateInMonoRepo';


async function createProject(): Promise<void> {
  // Get the project folder from the command line argument
  const projectFolder = process.argv[2];
  if (!projectFolder) {
    console.log('Missing required argument project-folder.');
    process.exit(1);
  }

  await createProjectBasedOnTemplateInMonoRepo(
    "svdoever",
    "ai-writer",
    "main",
    "apps/ai-writer-examples",
    projectFolder,
    (packageJson) => {
      return packageJson;
    }
  );

  console.log("Done.");
}

void (async () => {
  try {
    createProject();
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

