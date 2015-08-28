var expect = require('chai').expect;
var rose = require('../src/gilded_rose_solution');

var Item = rose.Item;
var items = rose.items;
var update_quality = rose.update_quality;

describe("Gilded Rose Solution", function() {

  describe("API", function() {

    // However, do not alter the Item class or Items property as those belong to the goblin
    it("has an Item constructor", function() {
      expect(Item).to.be.a('function');
    });

    // - All items have a SellIn value which denotes the number of days we have to sell the item
    // - All items have a Quality value which denotes how valuable the item is
    it("gives three properties to each item", function() {
      var testItem = new Item('name', 10, 10);
      expect(testItem.name).to.equal('name');
      expect(testItem.sell_in).to.equal(10);
      expect(testItem.quality).to.equal(10);
    });

    it("has an update function", function() {
      expect(update_quality).to.be.a('function');
    });

    it("should set a global array", function() {
      expect(items instanceof Array).to.be.true;
    });

    it("should contain data", function() {
      expect(items.length).to.be.greaterThan(0);
    });

    it("is simply an array", function() {
      var oldLength = items.length;

      items.push(new Item('Test item', 5, 10));
      expect(items.length).to.equal(oldLength + 1);
      items.pop();
      expect(items.length).to.equal(oldLength);
    });
  });

  describe("value update", function() {

    // Reset global array before each test case.
    beforeEach(function() {
      items = [
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
    });

    it("never adds or removes items", function() {
      var length = items.length;
      update_quality(items);
      expect(items.length).to.equal(length);
    });

    it("never alters item names", function() {
      var names = items.map(function (e) {
        return e.name;
      });
      update_quality(items);
      for (var i = 0; i < items.length; i++) {
        expect(items[i].name).to.equal(names[i]);
      }
    });

    // - At the end of each day our system lowers both values for every item
    it("lowers sell_in value each day", function() {
      var sell_in = items[0].sell_in;
      update_quality(items);
      expect(items[0].sell_in).to.be.lessThan(sell_in);
    });

    // - At the end of each day our system lowers both values for every item
    it("lowers quality value each day", function() {
      var quality = items[0].quality;
      update_quality(items);
      expect(items[0].quality).to.be.lessThan(quality);
    });
  });

  describe("common cases", function() {

    beforeEach(function() {
      items = [
        new Item('+5 Dexterity Vest', 10, 20),
        new Item('Aged Brie', 2, 0),
        new Item('Elixir of the Mongoose', 5, 7),
        new Item('Sulfuras, Hand of Ragnaros', 0, 80),
        new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
        new Item('Conjured Mana Cake', 3, 6)
      ];
    });

    it("can have a smaller sell_in than 0", function() {
      for (var i = 0; i < items[0].sell_in + 20; i++) {
        update_quality(items);
      }
      expect(items[0].sell_in).to.be.lessThan(0);
    });

    // - The Quality of an item is never negative
    it("cannot have a smaller quality than 0", function() {
      for (var i = 0; i < items[0].quality + 20; i++) {
        update_quality(items);
      }
      expect(items[0].quality).to.equal(0);
    });

    // - Once the sell by date has passed, Quality degrades twice as fast
    it("degrades its quality twice as fast when sell_in is below 0", function() {
      items.push(new Item('low quality test', 0, 10));
      update_quality(items);
      expect(items[items.length - 1].quality).to.equal(8);
    });

    // - The Quality of an item is never more than 50
    it("cannot have a quality greater than 50", function() {
      for (var i = 0; i < 100; i++) {
        update_quality(items);
      }
      expect(items[1].quality).to.equal(50);
    });
  });

  describe("special cases", function() {

    beforeEach(function() {
      items = [
        new Item('+5 Dexterity Vest', 10, 20),
        new Item('Aged Brie', 2, 0),
        new Item('Elixir of the Mongoose', 5, 7),
        new Item('Sulfuras, Hand of Ragnaros', 0, 80),
        new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
        new Item('Conjured Mana Cake', 3, 6)
      ];
    });

    // - "Aged Brie" actually increases in Quality the older it gets
    it("increases quality for Aged Brie", function() {
      var quality = 0;

      expect(items[1].name).to.match(/^Aged*/);

      for (var i = 0; i < 20; i++) {
        quality = items[1].quality;
        update_quality(items);
        expect(items[1].quality).to.be.greaterThan(quality);
      }
    });

    // - "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
    it("does not update quality for Sulfuras", function() {
      var quality = 0;

      expect(items[3].name).to.match(/^Sulfuras*/);

      for (var i = 0; i < 20; i++) {
        quality = items[3].quality;
        update_quality(items);
        expect(items[3].quality).to.equal(quality);
      }
    });

    // - "Backstage passes", like aged brie, increases in Quality as it's SellIn value approaches;
    it("increases quality for Backstage passes", function() {
      var quality = 0;

      expect(items[4].name).to.match(/^Backstage*/);

      for (var i = 0; i < 3; i++) {
        quality = items[4].quality;
        update_quality(items);
        expect(items[4].quality).to.be.greaterThan(quality);
      }
    });

    // Quality increases by 2 when there are 10 days or less
    it("increases faster (by 2) when the concert approaches", function() {
      var quality = 0;

      expect(items[4].name).to.match(/^Backstage*/);

      for (var i = 0; i < 5; i++) {
        update_quality(items);
      }

      for (var i = 0; i < 5; i++) {
        quality = items[4].quality;
        update_quality(items);
        expect(items[4].quality).to.equal(quality + 2);
      }
    });


    // and by 3 when there are 5 days or less
    it("increases even faster (by 3) when the concert approaches", function() {
      var quality = 0;

      expect(items[4].name).to.match(/^Backstage*/);

      for (var i = 0; i < 10; i++) {
        update_quality(items);
      }

      for (var i = 0; i < 5; i++) {
        quality = items[4].quality;
        update_quality(items);
        expect(items[4].quality).to.equal(quality + 3);
      }
    });

    // but Quality drops to 0 after the concert
    it("drops to 0 when the concert is over", function() {
      var quality = 0;

      expect(items[4].name).to.match(/^Backstage*/);

      for (var i = 0; i < 16; i++) {
        update_quality(items);
      }

      expect(items[4].quality).to.equal(0);
    });

    // - "Conjured" items degrade in Quality twice as fast as normal items
    it("degrades twice as fast if conjured", function() {
      var quality = items[5].quality;

      expect(items[5].name).to.match(/^Conjured*/);

      update_quality(items);
      expect(items[5].quality).to.equal(quality - 2);
    });
  });

});
