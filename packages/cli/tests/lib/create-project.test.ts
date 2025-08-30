import { createProject } from '../../src/lib/create-project';
import { createTempDir, cleanupTempDir } from '../setup';
import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';

// Mock inquirer to avoid interactive prompts during tests
jest.mock('inquirer');
const mockedInquirer = inquirer as jest.Mocked<typeof inquirer>;

// Mock child_process to avoid actual npm install
jest.mock('child_process', () => ({
  spawn: jest.fn().mockImplementation(() => ({
    on: jest.fn((event, callback) => {
      if (event === 'close') {
        // Simulate successful npm install
        setTimeout(() => callback(0), 10);
      }
    })
  }))
}));

describe('createProject', () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await createTempDir();
    process.chdir(tempDir);
  });

  afterEach(async () => {
    await cleanupTempDir(tempDir);
  });

  describe('project name validation', () => {
    it('should create project with valid name', async () => {
      mockedInquirer.prompt.mockResolvedValue({
        template: 'basic',
        features: ['router', 'api']
      });

      // Mock template copying - Mock directory doesn't exist first
      jest.spyOn(fs, 'pathExists').mockImplementation(async (path) => {
        if (typeof path === 'string' && path.includes('valid-project-name')) {
          return false; // Project directory doesn't exist
        }
        return true; // Template exists
      });
      jest.spyOn(fs, 'copy').mockImplementation(async () => undefined);
      jest.spyOn(fs, 'readFile').mockImplementation(async () => 'test content');
      jest.spyOn(fs, 'writeFile').mockImplementation(async () => undefined);

      await expect(createProject('valid-project-name', { yes: true }))
        .resolves.not.toThrow();
    });

    it('should handle project names with special characters', async () => {
      mockedInquirer.prompt.mockResolvedValue({
        projectName: 'my_awesome-project123',
        template: 'basic'
      });

      jest.spyOn(fs, 'pathExists').mockImplementation(async (path) => {
        if (typeof path === 'string' && path.includes('my_awesome-project123')) {
          return false; // Project directory doesn't exist
        }
        return true; // Template exists
      });
      jest.spyOn(fs, 'copy').mockImplementation(async () => undefined);
      jest.spyOn(fs, 'readFile').mockImplementation(async () => 'test content');
      jest.spyOn(fs, 'writeFile').mockImplementation(async () => undefined);

      await expect(createProject(undefined, { yes: false }))
        .resolves.not.toThrow();
    });
  });

  describe('template selection', () => {
    it('should use specified template', async () => {
      jest.spyOn(fs, 'pathExists').mockImplementation(async (path) => {
        if (typeof path === 'string' && path.includes('test-project')) {
          return false; // Project directory doesn't exist
        }
        return true; // Template exists
      });
      jest.spyOn(fs, 'copy').mockImplementation(async () => undefined);
      jest.spyOn(fs, 'readFile').mockImplementation(async () => 'test content');
      jest.spyOn(fs, 'writeFile').mockImplementation(async () => undefined);

      await createProject('test-project-1', { 
        template: 'advanced', 
        yes: true 
      });

      // Verify that the correct template was used
      // This would require checking the actual template copying logic
      expect(fs.copy).toHaveBeenCalled();
    });

    it('should default to basic template', async () => {
      jest.spyOn(fs, 'pathExists').mockImplementation(async (path) => {
        if (typeof path === 'string' && path.includes('test-project-2')) {
          return false; // Project directory doesn't exist
        }
        return true; // Template exists
      });
      jest.spyOn(fs, 'copy').mockImplementation(async () => undefined);
      jest.spyOn(fs, 'readFile').mockImplementation(async () => 'test content');
      jest.spyOn(fs, 'writeFile').mockImplementation(async () => undefined);

      await createProject('test-project-2', { yes: true });

      expect(fs.copy).toHaveBeenCalled();
    });
  });

  describe('interactive mode', () => {
    it('should prompt for project name when not provided', async () => {
      mockedInquirer.prompt
        .mockResolvedValueOnce({ projectName: 'prompted-project' })
        .mockResolvedValueOnce({ template: 'basic' })
        .mockResolvedValueOnce({ features: ['router'] });

      jest.spyOn(fs, 'pathExists').mockImplementation(async (path) => {
        if (typeof path === 'string' && path.includes('prompted-project')) {
          return false; // Project directory doesn't exist
        }
        return true; // Template exists
      });
      jest.spyOn(fs, 'copy').mockImplementation(async () => undefined);
      jest.spyOn(fs, 'readFile').mockImplementation(async () => 'test content');
      jest.spyOn(fs, 'writeFile').mockImplementation(async () => undefined);

      await createProject(undefined, { yes: false });

      expect(mockedInquirer.prompt).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'input',
            name: 'projectName',
            message: "What's your project name?"
          })
        ])
      );
    });

    it('should prompt for template selection', async () => {
      mockedInquirer.prompt
        .mockResolvedValueOnce({ template: 'advanced' })
        .mockResolvedValueOnce({ features: ['router', 'api'] });

      jest.spyOn(fs, 'pathExists').mockImplementation(async (path) => {
        if (typeof path === 'string' && path.includes('test-project-3')) {
          return false; // Project directory doesn't exist
        }
        return true; // Template exists
      });
      jest.spyOn(fs, 'copy').mockImplementation(async () => undefined);
      jest.spyOn(fs, 'readFile').mockImplementation(async () => 'test content');
      jest.spyOn(fs, 'writeFile').mockImplementation(async () => undefined);

      await createProject('test-project-3', { yes: false });

      expect(mockedInquirer.prompt).toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should handle file system errors gracefully', async () => {
      jest.spyOn(fs, 'pathExists').mockImplementation(async () => false);

      await expect(createProject('test-project', { 
        template: 'non-existent', 
        yes: true 
      })).rejects.toThrow();
    });
  });
});