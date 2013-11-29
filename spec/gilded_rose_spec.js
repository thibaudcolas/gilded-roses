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



  describe("Another spec", function() {
    it("is just a function, so it can contain any code", function() {
      var foo = 0;
      foo += 1;

      expect(foo).toEqual(1);
    });
  });

});
