import { RulesService } from './rules.service';

describe('Test RulesService', () => {
  let service: RulesService;

  beforeEach(() => {
    service = new RulesService();
  });

  test('isEndMove should return true for end game moves', () => {
    expect(service.isEndMove('1-0')).toBe(true);
    expect(service.isEndMove('0-1')).toBe(true);
    expect(service.isEndMove('1/2-1/2')).toBe(true);
    expect(service.isEndMove('Qa1#')).toBe(true);
  });

  test('isEndMove should return false for non-end game moves', () => {
    expect(service.isEndMove('e4')).toBe(false);
    expect(service.isEndMove('Nf3')).toBe(false);
  });
});
