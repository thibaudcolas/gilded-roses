describe("Gilded Rose", function() {
  var foo;

  beforeEach(function() {
    foo = 0;
    foo += 1;
  });

  afterEach(function() {
    foo = 0;
  });

  it("should do something", function() {

  });

  it("is a syntax example", function() {
    expect(true).toBe(true);
  });

  it("can have a negative case", function() {
    expect(false).not.toBe(true);
  });

});
