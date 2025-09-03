import { execSync, spawn } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import { createTempDir, cleanupTempDir } from '../setup';

describe('CLI Integration Tests', () => {
  let tempDir: string;
  let cliPath: string;

  beforeAll(async () => {
    // Build the CLI first
    try {
      execSync('npm run build', { 
        cwd: path.join(__dirname, '../..'),
        stdio: 'pipe'
      });
    } catch (error) {
      console.warn('Build failed, CLI might not be available for testing');
    }
    
    cliPath = path.join(__dirname, '../../dist/index.js');
  });

  beforeEach(async () => {
    tempDir = await createTempDir();
  });

  afterEach(async () => {
    await cleanupTempDir(tempDir);
  });

  describe('CLI Help and Version', () => {
    it('should show help when --help is used', (done) => {
      const child = spawn('node', [cliPath, '--help'], {
        cwd: tempDir,
        stdio: 'pipe'
      });

      let output = '';
      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.on('close', (code) => {
        expect(code).toBe(0);
        expect(output).toContain('create-tanstack-hono-start');
        expect(output).toContain('TanStack');
        done();
      });
    }, 10000);

    it('should show version when --version is used', (done) => {
      const child = spawn('node', [cliPath, '--version'], {
        cwd: tempDir,
        stdio: 'pipe'
      });

      let output = '';
      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.on('close', (code) => {
        expect(code).toBe(0);
        expect(output).toMatch(/\d+\.\d+\.\d+/); // Version number pattern
        done();
      });
    }, 10000);
  });

  describe('Template Listing', () => {
    it('should list available templates', (done) => {
      const child = spawn('node', [cliPath, 'list'], {
        cwd: tempDir,
        stdio: 'pipe'
      });

      let output = '';
      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.on('close', (code) => {
        expect(code).toBe(0);
        expect(output).toContain('basic');
        expect(output).toContain('advanced');
        done();
      });
    }, 10000);
  });

  describe('Project Creation', () => {
    it('should create project with basic template', (done) => {
      const projectName = 'test-basic-project';
      const projectPath = path.join(tempDir, projectName);

      const child = spawn('node', [
        cliPath, 
        projectName, 
        '--template', 'basic', 
        '--yes'
      ], {
        cwd: tempDir,
        stdio: 'pipe'
      });

      let output = '';
      let errorOutput = '';

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      child.on('close', async (code) => {
        if (code !== 0) {
          console.log('stdout:', output);
          console.log('stderr:', errorOutput);
        }

        expect(code).toBe(0);
        
        // Check if project was created
        const projectExists = await fs.pathExists(projectPath);
        expect(projectExists).toBe(true);

        // Check essential files exist
        if (projectExists) {
          const packageJsonExists = await fs.pathExists(
            path.join(projectPath, 'package.json')
          );
          expect(packageJsonExists).toBe(true);
        }

        done();
      });
    }, 30000);

    it('should handle invalid template gracefully', (done) => {
      const child = spawn('node', [
        cliPath, 
        'test-project', 
        '--template', 'invalid-template',
        '--yes'
      ], {
        cwd: tempDir,
        stdio: 'pipe'
      });

      let errorOutput = '';
      child.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });

      child.on('close', (code) => {
        expect(code).not.toBe(0);
        expect(errorOutput).toContain('invalid-template');
        done();
      });
    }, 10000);
  });
});