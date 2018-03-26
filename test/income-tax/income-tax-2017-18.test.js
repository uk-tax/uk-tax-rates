// 1 [The Income Tax (Indexation) Order 2016](http://www.legislation.gov.uk/uksi/2016/1175/made)

import { KeyLogger } from '../helpers';

const testData = require('../../src/data/2017-18/income-tax-2017-18.json');

describe('Income Tax 2017-18', () => {
  const data = new KeyLogger(testData);

  it('should be for 2017-18', () => {
    const item = data.taxYear;
    expect(item).toBe('2017-18');
  });

  describe('Allowances', () => {
    const item = data.allowances;
    const names = new KeyLogger(item.names);
    const values = new KeyLogger(item.values);

    it('should be in £', () => {
      expect(item.unit).toBe('GBP');
    });

    it('should have properties {unit, names, values} only', () => {
      expect(Object.keys(item).sort()).toEqual(['names', 'unit', 'values']);
    });

    describe('Personal allowance', () => {
      const value = values.personalAllowance;
      const name = names.personalAllowance;
      const correctName = 'personal allowance';

      it('should be £11,500', () => {
        expect(value).toBe(11500);
      });

      it(`should be called '${correctName}'`, () => {
        expect(name).toBe(correctName);
      });
    });

    describe('Personal savings allowance', () => {
      const value = values.personalSavingsAllowance;
      const name = names.personalSavingsAllowance;
      const correctName = 'personal savings allowance';

      it('should be £1,000', () => {
        expect(value).toBe(1000);
      });

      it(`should be called '${correctName}'`, () => {
        expect(name).toBe(correctName);
      });
    });

    describe('Personal savings allowance (higher rate taxpayers)', () => {
      const value = values.personalSavingsAllowanceHigherRate;
      const name = names.personalSavingsAllowanceHigherRate;
      const correctName = 'personal savings allowance (higher rate taxpayers)';

      it('should be £500', () => {
        expect(value).toBe(500);
      });

      it(`should be called '${correctName}'`, () => {
        expect(name).toBe(correctName);
      });
    });

    describe('Income limit for personal allowance', () => {
      const value = values.personalAllowanceIncomeLimit;
      const name = names.personalAllowanceIncomeLimit;
      it('should be £100,000', () => {
        expect(value).toBe(100000);
      });

      it('should have a name', () => {
        expect(typeof name).toBe('string');
        expect(name.length).toBeGreaterThan(10);
      });
    });

    describe('Blind persons allowance (ITIO2016 2(a))', () => {
      const value = values.blindPersonsAllowance;
      const name = names.blindPersonsAllowance;
      const correctName = 'blind person\'s allowance';
      it('should be £2,320', () => {
        expect(value).toBe(2320);
      });

      it(`should be called '${correctName}'`, () => {
        expect(name).toBe(correctName);
      });
    });

    describe('Married couples allowance - minimum (ITIO2016 2(b))', () => {
      const value = values.marriedCouplesAllowanceMin;
      const name = names.marriedCouplesAllowanceMin;
      // Note this is the spelling in the legislation.
      const correctName = 'married couple\'s allowance - minimum';
      it('should be £3,260', () => {
        expect(value).toBe(3260);
      });

      it(`should be called '${correctName}'`, () => {
        expect(name).toBe(correctName);
      });
    });

    describe('Married couples allowance - maximum (ITIO2016 2(c,d))', () => {
      const value = values.marriedCouplesAllowanceMax;
      const name = names.marriedCouplesAllowanceMax;
      const correctName = 'married couple\'s allowance - maximum';

      it('should be £8,445', () => {
        expect(value).toBe(8445);
      });

      it(`should be called '${correctName}'`, () => {
        expect(name).toBe(correctName);
      });
    });

    describe('Income limit for married couples allowance (ITIO2016 2(e))', () => {
      const value = values.marriedCouplesAllowanceIncomeLimit;
      const name = names.marriedCouplesAllowanceIncomeLimit;
      const correctName = 'income limit for married couple\'s allowance';

      it('should be £28,000', () => {
        expect(value).toBe(28000);
      });

      it(`should be called '${correctName}'`, () => {
        expect(name).toBe(correctName);
      });
    });

    describe('Dividend allowance', () => {
      const value = values.dividendAllowance;
      const name = names.dividendAllowance;
      const correctName = 'dividend allowance';

      it('should be £5,000', () => {
        expect(value).toBe(5000);
      });

      it(`should be called '${correctName}'`, () => {
        expect(name).toBe(correctName);
      });
    });

    describe('Marriage allowance', () => {
      const value = values.marriageAllowance;
      const name = names.marriageAllowance;
      const correctName = 'marriage allowance';

      it('should be £1,150', () => {
        expect(value).toBe(1150);
      });

      it(`should be called '${correctName}'`, () => {
        expect(name).toBe(correctName);
      });
    });

    it('all names and values should be tested', () => {
      expect(names.getKeysNotAccessed()).toEqual([]);
      expect(values.getKeysNotAccessed()).toEqual([]);
    });
  });

  describe('Thresholds', () => {
    const item = data.thresholds;

    it('should be 0, £33,500 and £150,000', () => {
      expect(item.unit).toBe('GBP');
      expect(item.values).toHaveLength(3);
      expect(item.values[0]).toBe(0);
      expect(item.values[1]).toBe(33500);
      expect(item.values[2]).toBe(150000);
    });

    it('should have properties {unit, values} only', () => {
      expect(Object.keys(item).sort()).toEqual(['unit', 'values']);
    });
  });

  describe('Rates (main rates)', () => {
    const item = data.rates;

    it('should be 20%, 40% and 45%', () => {
      expect(item.unit).toBe('percent');
      expect(item.values).toHaveLength(3);
      expect(item.values[0]).toBe(20);
      expect(item.values[1]).toBe(40);
      expect(item.values[2]).toBe(45);
    });

    it('should have the right names', () => {
      expect(item.names).toHaveLength(3);
      expect(item.names[0]).toBe('basic rate');
      expect(item.names[1]).toBe('higher rate');
      expect(item.names[2]).toBe('additional rate');
    });

    it('should have properties {names, unit, values} only', () => {
      expect(Object.keys(item).sort()).toEqual(['names', 'unit', 'values']);
    });
  });

  describe('Default Rates', () => {
    const item = data.defaultRates;

    it('should be 20%, 40% and 45%', () => {
      expect(item.unit).toBe('percent');
      expect(item.values).toHaveLength(3);
      expect(item.values[0]).toBe(20);
      expect(item.values[1]).toBe(40);
      expect(item.values[2]).toBe(45);
    });

    it('should have the right names', () => {
      expect(item.names).toHaveLength(3);
      expect(item.names[0]).toBe('default basic rate');
      expect(item.names[1]).toBe('default higher rate');
      expect(item.names[2]).toBe('default additional rate');
    });

    it('should have properties {names, unit, values} only', () => {
      expect(Object.keys(item).sort()).toEqual(['names', 'unit', 'values']);
    });
  });

  describe('Savings Rates', () => {
    const item = data.savingsRates;

    it('should be 0, 20%, 40% and 45%', () => {
      expect(item.unit).toBe('percent');
      expect(item.values).toHaveLength(4);
      expect(item.values[0]).toBe(0);
      expect(item.values[1]).toBe(20);
      expect(item.values[2]).toBe(40);
      expect(item.values[3]).toBe(45);
    });

    it('should have the right names', () => {
      expect(item.names).toHaveLength(4);
      expect(item.names[0]).toBe('starting rate for savings');
      expect(item.names[1]).toBe('savings basic rate');
      expect(item.names[2]).toBe('savings higher rate');
      expect(item.names[3]).toBe('savings additional rate');
    });

    it('should have properties {names, unit, values} only', () => {
      expect(Object.keys(item).sort()).toEqual(['names', 'unit', 'values']);
    });
  });

  describe('Starting rate limit for savings', () => {
    const item = data.startingRateLimitForSavings;

    it('should be £5,000', () => {
      expect(item.unit).toBe('GBP');
      expect(item.value).toBe(5000);
    });

    it('should have properties {unit, value} only', () => {
      expect(Object.keys(item).sort()).toEqual(['unit', 'value']);
    });
  });

  describe('Dividend Rates', () => {
    const item = data.dividendRates;

    it('should be 7.5%%, 32.5% and 38.1%', () => {
      expect(item.unit).toBe('percent');
      expect(item.values).toHaveLength(3);
      expect(item.values[0]).toBe(7.5);
      expect(item.values[1]).toBe(32.5);
      expect(item.values[2]).toBe(38.1);
    });

    it('should have the right names', () => {
      expect(item.names).toHaveLength(3);
      expect(item.names[0]).toBe('dividend ordinary rate');
      expect(item.names[1]).toBe('dividend upper rate');
      expect(item.names[2]).toBe('dividend additional rate');
    });

    it('should have properties {names, unit, values} only', () => {
      expect(Object.keys(item).sort()).toEqual(['names', 'unit', 'values']);
    });
  });

  it('should only have properties that are tested', () => {
    expect(data.getKeysNotAccessed()).toEqual([]);
  });
});
