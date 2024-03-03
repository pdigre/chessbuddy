import { messageService } from './index.service.ts';

describe('MessageService', () => {
  test('initialize should set the resultHolder', () => {
    const callback = jest.fn();
    messageService.initialize(callback);
    expect(messageService.resultHolder).toBe(callback);
  });

  test('display should set show to true and call resultHolder', () => {
    const callback = jest.fn();
    messageService.initialize(callback);
    const message = { name: 'test', title: 'Test', msg: 'This is a test' };
    messageService.display(message);
    expect(messageService.show).toBe(true);
    expect(callback).toHaveBeenCalledWith(message);
  });

  test('standard should set show to true and call resultHolder with the correct message', () => {
    const callback = jest.fn();
    messageService.initialize(callback);
    messageService.standard('about');
    expect(messageService.show).toBe(true);
    expect(callback).toHaveBeenCalledWith({
      name: 'about',
      title: 'About',
      msg: 'about',
      callback: undefined,
    });
  });

  test('aboutAction should call standard with "about"', () => {
    const standardSpy = jest.spyOn(messageService, 'standard');
    messageService.aboutAction();
    expect(standardSpy).toHaveBeenCalledWith('about');
  });

  test('error should call display with the correct message', () => {
    const displaySpy = jest.spyOn(messageService, 'display');
    messageService.error('Error', 'This is an error');
    expect(displaySpy).toHaveBeenCalledWith({
      name: 'error',
      title: 'Error',
      msg: 'This is an error',
    });
  });
});
