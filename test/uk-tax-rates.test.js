
import { getFilename, getRates } from '../src/uk-tax-rates';

describe('UK Tax Rates ES5 entry', () => {
  describe('getFilename(section, year)', () => {
    it('should convert a kebab-case section and year to the correct filename', () => {
      expect(getFilename('income-tax', 201718)).toBe('income-tax-201718.yml');
    });

    it('should convert a camelCase section and year to the correct filename', () => {
      expect(getFilename('incomeTax', 201718)).toBe('income-tax-201718.yml');
    });
  });
  describe('getRates(section, year)', () => {
    it('should get the correct rates for a kebab-case section and year', () => {
      const rates = getRates('income-tax', 201718);
      expect(rates.taxYear).toBe('2017-18');
      expect(rates.section).toBe('income-tax');
    });

    it('should get the correct rates for a camelCase section and year', () => {
      const rates = getRates('incomeTax', 201718);
      expect(rates.taxYear).toBe('2017-18');
      expect(rates.section).toBe('income-tax');
    });

    it('should get the correct rates for more than one section and year', () => {
      const rates = getRates(['incomeTax', 'income-tax'], 201718);
      expect(rates.incomeTax.taxYear).toBe('2017-18');
      expect(rates.incomeTax.section).toBe('income-tax');
      expect(rates['income-tax'].taxYear).toBe('2017-18');
      expect(rates['income-tax'].section).toBe('income-tax');
    });
  });
});
