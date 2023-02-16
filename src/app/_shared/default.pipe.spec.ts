import { DefaultPipe } from './default.pipe';

describe('DefaultPipe', () => {
  it('create an instance', () => {
    const pipe = new DefaultPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns the url passed', () => {
    const pipe = new DefaultPipe();
    expect(pipe.transform('https://example.com')).toBe('https://example.com');
  });

  it('returns the default url', () => {
    const pipe = new DefaultPipe();
    expect(pipe.transform()).toBe('/assets/dreamy_nights.jpg');
  });
});
