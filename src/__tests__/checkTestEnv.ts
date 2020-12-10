describe('Check test ENV', () => {
  it('CHECK_TEST_ENV', () => {
    expect(process.env.CHECK_TEST_ENV).toBe('true');
  });
});
