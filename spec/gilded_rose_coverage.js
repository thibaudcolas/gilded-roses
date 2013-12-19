describe("Gilded Rose", function() {

  describe("API", function () {

    // However, do not alter the Item class or Items property as those belong to the goblin
    it("has an Item constructor", function() {
      expect(typeof Item).toBe('function');
    });

    // - All items have a SellIn value which denotes the number of days we have to sell the item
    // - All items have a Quality value which denotes how valuable the item is
    it("gives three properties to each item", function() {
      var testItem = new Item('name', 10, 10);
      expect(testItem.name).toBe('name');
      expect(testItem.sell_in).toBe(10);
      expect(testItem.quality).toBe(10);
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

  describe("general value update", function () {
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

    // - At the end of each day our system lowers both values for every item
    it("lowers sell_in value each day", function () {
      var sell_in = items[0].sell_in;
      update_quality();
      expect(items[0].sell_in).toBeLessThan(sell_in);
    });

    // - At the end of each day our system lowers both values for every item
    it("lowers quality value each day", function () {
      var quality = items[0].quality;
      update_quality();
      expect(items[0].quality).toBeLessThan(quality);
    });
  });

  describe("special cases", function () {
    var testItems = [
      new Item('+5 Dexterity Vest', 10, 20),
      new Item('Aged Brie', 2, 0),
      new Item('Elixir of the Mongoose', 5, 7),
      new Item('Sulfuras, Hand of Ragnaros', 0, 80),
      new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
      new Item('Conjured Mana Cake', 3, 6)
    ];

    beforeEach(function () {
      items = testItems;
    });

    it("can have a smaller sell_in than 0", function () {
      for (var i = 0; i < items[0].sell_in + 20; i++) {
        update_quality();
      }
      expect(items[0].sell_in).toBeLessThan(0);
    });

    // - The Quality of an item is never negative
    it("cannot have a smaller quality than 0", function () {
      for (var i = 0; i < items[0].quality + 10; i++) {
        update_quality();
      }
      expect(items[0].quality).toEqual(0);
    });

    // - Once the sell by date has passed, Quality degrades twice as fast
    it("degrades its quality twice as fast when sell_in is below 0", function () {
      items.push(new Item('low quality test', 0, 10));
      update_quality();
      expect(items[items.length - 1].quality).toEqual(8);
    });

    // an item can never have its Quality increase above 50
    it("cannot have a quality greater than 50", function () {
      for (var i = 0; i < 100; i++) {
        update_quality();
      }
      expect(items[1].quality).toEqual(50);
    });
  });

});
