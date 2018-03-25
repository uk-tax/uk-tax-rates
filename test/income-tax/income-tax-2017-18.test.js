let testData = require('../../src/data/2017-18/income-tax-2017-18.json');

import { KeyLogger } from '../helpers.js';

describe('Income Tax 2017-18', () => {

  const data = new KeyLogger(testData);

  it('should be for 2017-18', () => {
    const item = data.taxYear;
    expect(item).toBe('2017-18');
  });

  /*
  "unit": "GBP",
  "values": {
    "personalAllowance": 11500,
    "personalAllowanceIncomeLimit": 100000,
    "marriedCouplesIncomeLimit": 28000,
    "marriedCouplesAllowanceMax": 8445,
    "marriedCouplesAllowanceMin": 3260,
    "marriageAllowance": 1150,
    "blindPersonsAllowance": 2320,
    "dividendAllowance": 5000,
    "personalSavingsAllowanceBasicRate": 1000,
    "personalSavingsAllowanceHigherRate": 500
  },
  "names": {
    "personalAllowance": "personal allowance",
    "personalAllowanceIncomeLimit": "income limit for personal allowance",
    "marriedCouplesIncomeLimit": "income limit for Married couple’s allowance",
    "marriedCouplesAllowanceMax": "maximum amount of married couple’s allowance",
    "marriedCouplesAllowanceMin": "minimum amount of married couple’s allowance",
    "marriageAllowance": "marriage allowance",
    "blindPersonsAllowance": "blind person’s allowance",
    "dividendAllowance": "dividend allowance",
    "personalSavingsAllowanceBasicRate": "personal savings allowance for basic rate taxpayers",
    "personalSavingsAllowanceHigherRate": "personal savings allowance for higher rate taxpayers"
  }
  */
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

    describe('Personal Allowance', () => {
      const value = values.personalAllowance;
      const name = names.personalAllowance;
      it('should be £11,500', () => {
        expect(value).toBe(11500);
      });

      it('should have a name', () => {
        expect(typeof name).toBe('string');
        expect(name.length).toBeGreaterThan(10);
      });
    });

    describe('Married couples allowance - maximum', () => {
      const value = values.marriedCouplesAllowanceMax;
      const name = names.marriedCouplesAllowanceMax;
      it('should be £8,445', () => {
        expect(value).toBe(8445);
      });

      it('should have a name', () => {
        expect(typeof name).toBe('string');
        expect(name.length).toBeGreaterThan(10);
      });
    });

    describe('Married couples allowance - minimum', () => {
      const value = values.marriedCouplesAllowanceMin;
      const name = names.marriedCouplesAllowanceMin;
      it('should be £3,260', () => {
        expect(value).toBe(3260);
      });

      it('should have a name', () => {
        expect(typeof name).toBe('string');
        expect(name.length).toBeGreaterThan(10);
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
      expect(item.names[0]).toBe("basic rate");
      expect(item.names[1]).toBe("higher rate");
      expect(item.names[2]).toBe("additional rate");
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
      expect(item.names[0]).toBe("default basic rate");
      expect(item.names[1]).toBe("default higher rate");
      expect(item.names[2]).toBe("default additional rate");
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
      expect(item.names[0]).toBe("starting rate for savings");
      expect(item.names[1]).toBe("savings basic rate");
      expect(item.names[2]).toBe("savings higher rate");
      expect(item.names[3]).toBe("savings additional rate");
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
      expect(item.names[0]).toBe("dividend ordinary rate");
      expect(item.names[1]).toBe("dividend upper rate");
      expect(item.names[2]).toBe("dividend additional rate");
    });

    it('should have properties {names, unit, values} only', () => {
      expect(Object.keys(item).sort()).toEqual(['names', 'unit', 'values']);
    });

  });

  it('should only have properties that are tested', () => {
    expect(data.getKeysNotAccessed()).toEqual([]);
  });

});
