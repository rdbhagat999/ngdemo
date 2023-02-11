import { DefaultPipe } from './default.pipe';

describe('DefaultPipe', () => {
  fit('create an instance', () => {
    const pipe = new DefaultPipe();
    expect(pipe).toBeTruthy();
  });
});
