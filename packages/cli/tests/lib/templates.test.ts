import { getTemplates, getTemplateData, validateTemplate, getTemplatePath } from '../../src/lib/templates';
import fs from 'fs-extra';
import path from 'path';

describe('Templates', () => {
  describe('getTemplates', () => {
    it('should return an array of templates', () => {
      const templates = getTemplates();
      expect(Array.isArray(templates)).toBe(true);
      expect(templates.length).toBeGreaterThan(0);
    });

    it('should return templates with required properties', () => {
      const templates = getTemplates();
      templates.forEach(template => {
        expect(template).toHaveProperty('name');
        expect(template).toHaveProperty('description');
        expect(template).toHaveProperty('features');
        expect(template).toHaveProperty('version');
        expect(Array.isArray(template.features)).toBe(true);
      });
    });

    it('should include basic and advanced templates', () => {
      const templates = getTemplates();
      const templateNames = templates.map(t => t.name);
      expect(templateNames).toContain('basic');
      expect(templateNames).toContain('advanced');
    });
  });

  describe('getTemplateData', () => {
    it('should return template data for valid template name', () => {
      const basicTemplate = getTemplateData('basic');
      expect(basicTemplate.name).toBe('basic');
      expect(basicTemplate.description).toContain('Basic fullstack template');
      expect(basicTemplate.features).toContain('router');
    });

    it('should throw error for invalid template name', () => {
      expect(() => getTemplateData('invalid-template')).toThrow('Template invalid-template not found');
    });
  });

  describe('getTemplatePath', () => {
    it('should return correct path for template', () => {
      const templatePath = getTemplatePath('basic');
      expect(templatePath).toContain('templates');
      expect(templatePath).toContain('basic');
    });
  });

  describe('validateTemplate', () => {
    it('should validate existing template', async () => {
      // Mock fs.pathExists to return true for basic template
      const spy = jest.spyOn(fs, 'pathExists').mockImplementation(async () => true);
      
      const isValid = await validateTemplate('basic');
      expect(isValid).toBe(true);
      
      spy.mockRestore();
    });

    it('should invalidate non-existing template', async () => {
      // Mock fs.pathExists to return false
      const spy = jest.spyOn(fs, 'pathExists').mockImplementation(async () => false);
      
      const isValid = await validateTemplate('non-existing');
      expect(isValid).toBe(false);
      
      spy.mockRestore();
    });
  });
});