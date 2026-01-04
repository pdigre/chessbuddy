import { Clock, type TimeRule } from './clock';

describe('Clock', () => {
  describe('string2time', () => {
    it('parses comma-delimited rules into objects', () => {
      const result = Clock.string2time('10+2/5,20+3/10');
      expect(result).toStrictEqual<TimeRule[]>([
        { from: 10, plus: 2, each: 5 },
        { from: 20, plus: 3, each: 10 },
      ]);
    });
  });

  describe('getAllowed', () => {
    it('calculates minutes for a single string rule', () => {
      const clock = new Clock('string-time', '+5/0');
      expect(clock.getAllowed(10)).toBe(5 * 60);
    });

    it('uses the last applicable rule when multiple entries apply', () => {
      const rules: TimeRule[] = [
        { from: 0, plus: 1, each: 2 },
        { from: 5, plus: 2, each: 3 },
      ];
      const clock = new Clock('array-time', rules);
      expect(clock.getAllowed(7)).toBe(2 * 60 + 3 * (7 - 5));
    });

    it('returns 0 minutes when no rules apply', () => {
      const clock = new Clock('future-time', '10+1/5');
      expect(clock.getAllowed(3)).toBe(0);
    });
  });
});
