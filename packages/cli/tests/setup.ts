import fs from 'fs-extra';
import path from 'path';
import os from 'os';

// Global test configuration
export const TEST_TIMEOUT = 30000;

// Helper to create temporary directory for tests
export const createTempDir = async (): Promise<string> => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'cli-test-'));
  return tempDir;
};

// Helper to clean up temporary directories
export const cleanupTempDir = async (dir: string): Promise<void> => {
  if (await fs.pathExists(dir)) {
    await fs.remove(dir);
  }
};

// Global setup
beforeEach(() => {
  // Reset any mocks
  jest.clearAllMocks();
});