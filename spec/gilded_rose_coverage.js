describe("Gilded Rose", function() {

  it("has an Item constructor", function() {
    expect(typeof Item).toBe('function');
  });

  it("should set a global array", function() {
    expect(items instanceof Array).toBe(true);
  });

  it("should contain data", function() {
    expect(items.length).toBeGreaterThan(0);
  });

  it("has an update function", function() {
    expect(typeof update_quality).toBe('function');
  });

});
