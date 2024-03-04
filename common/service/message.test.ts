import { messageService } from './index.service.ts';
import { reaction, runInAction } from 'mobx';

describe('MessageService', () => {
  reaction(
    () => messageService.show,
    () => {
      console.log('show:' + messageService.show);
    }
  );
  const close = () => {
    runInAction(() => {
      messageService.show = false;
    });
    //    await Bun.sleep(1000);
  };

  test('display should set show to true and call resultHolder', () => {
    const callback = jest.fn();
    messageService.initialize(callback);
    const message = { name: 'test', title: 'Test', msg: 'This is a test' };
    runInAction(() => {
      messageService.display(message);
    });
    expect(messageService.show).toBe(true);
    close();
    expect(callback).toHaveBeenCalledWith(message);
  });

  test('standard should set show to true and call resultHolder with the correct message', () => {
    const callback = jest.fn();
    messageService.initialize(callback);
    runInAction(() => {
      messageService.standard('about');
    });
    expect(messageService.show).toBe(true);
    close();
    expect(callback).toHaveBeenCalledWith({
      name: 'about',
      title: 'About',
      msg: 'about',
    });
  });

  test('aboutAction should call standard with "about"', () => {
    const callback = jest.fn();
    messageService.initialize(callback);
    const standardSpy = jest.spyOn(messageService, 'standard');
    runInAction(() => {
      messageService.aboutAction();
    });
    close();
    expect(standardSpy).toHaveBeenCalledWith('about');
  });

  test('error should call display with the correct message', () => {
    const callback = jest.fn();
    messageService.initialize(callback);
    const displaySpy = jest.spyOn(messageService, 'display');
    runInAction(() => {
      messageService.error('Error', 'This is an error');
    });
    close();
    expect(displaySpy).toHaveBeenCalledWith({
      name: 'error',
      title: 'Error',
      msg: 'This is an error',
    });
  });
});
