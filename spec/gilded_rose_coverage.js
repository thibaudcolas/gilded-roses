describe("Gilded Rose", function() {

  describe("API", function () {
    it("has an Item constructor", function() {
      expect(typeof Item).toBe('function');
    });

    it("has an update function", function() {
      expect(typeof update_quality).toBe('function');
    });

    it("should set a global array", function() {
      expect(items instanceof Array).toBe(true);
    });

    it("should contain data", function() {
      expect(items.length).toBeGreaterThan(0);
    });

    it("is simply an array", function() {
      var oldLength = items.length;

      items.push(new Item('Test item', 5, 10));
      expect(items.length).toEqual(oldLength + 1);
      items.pop();
      expect(items.length).toEqual(oldLength);
    });
  });

  describe("value update", function () {
    var testItems = [
      new Item('Test item', 10, 20),
      new Item('Test item 2', 2, 30),
      new Item('Test item 3', 5, 7),
      new Item('+5 Dexterity Vest', 10, 20),
      new Item('Aged Brie', 2, 0),
      new Item('Elixir of the Mongoose', 5, 7),
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
      new Item('Conjured Mana Cake', 3, 6)
    ];

    // Reset global array before each test case.
    beforeEach(function () {
      items = testItems;
    });

    it("never adds or removes items", function () {
      update_quality();
      expect(items.length).toEqual(testItems.length);
    });

    it("never alters item names", function () {
      update_quality();
      for (var i = 0; i < items.length; i++) {
        expect(items[i].name).toEqual(testItems[i].name);
      }
    });

  });

});
