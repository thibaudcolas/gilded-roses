describe("Gilded Rose", function() {

  function addItem (name, sell_in, quality) {
    inventoryModule.addItem(name, sell_in, quality);
  }

  beforeEach(function() {
    inventoryModule.resetItems();
  });

  it("item should decrease in value after update", function() {
    addItem('+1 Oven Mittens', 1, 1);
    inventoryModule.update_quality();
    expect(inventoryModule.getItems()[0].quality).toBe(0);
    expect(inventoryModule.getItems()[0].sell_in).toBe(0);
  });

  it("item should not have negative quality", function() {
    addItem('+1 Oven Mittens', 1, 0);
    inventoryModule.update_quality();
    expect(inventoryModule.getItems()[0].quality).toBe(0);
  });

  it("quality should degrade twice as fast after sell date has passed", function() {
    addItem('+1 Oven Mittens', -5, 5);
    inventoryModule.update_quality();
    expect(inventoryModule.getItems()[0].quality).toBe(3);
  });

  it("Aged brie increases in quality", function() {
    addItem('Aged Brie', 2, 0);
    inventoryModule.update_quality();
    expect(inventoryModule.getItems()[0].quality).toBe(1);
  });

  it("item quality should not increase past 50", function() {
    addItem('Aged Brie', 2, 50);
    inventoryModule.update_quality();
    expect(inventoryModule.getItems()[0].quality).toBe(50);
  });

  it("should not degrade or need selling of Sulfuras", function() {
    addItem('Sulfuras, Hand of Ragnaros', 5, 5);
    inventoryModule.update_quality();
    expect(inventoryModule.getItems()[0].quality).toBe(5);
    expect(inventoryModule.getItems()[0].sell_in).toBe(5);
  });

  it("should degrade conjured item quality twice as fast than normal items", function() {
    addItem('Conjured Mana Cake', 6, 10);
    inventoryModule.update_quality();
    expect(inventoryModule.getItems()[0].quality).toBe(8);
    expect(inventoryModule.getItems()[0].sell_in).toBe(5);
  });

  describe("Backstage passes", function() {

    it("should increase by two when ten days or less", function() {
      addItem('Backstage passes to a TAFKAL80ETC concert', 7, 5);
      inventoryModule.update_quality();
      expect(inventoryModule.getItems()[0].quality).toBe(7);
    });

    it("should increase by three when 5 days or less", function() {
      addItem('Backstage passes to a TAFKAL80ETC concert', 5, 5);
      inventoryModule.update_quality();
      expect(inventoryModule.getItems()[0].quality).toBe(8);
    });

    it("should increase by 1 when more than ten days", function() {
      addItem('Backstage passes to a TAFKAL80ETC concert', 12, 5);
      inventoryModule.update_quality();
      expect(inventoryModule.getItems()[0].quality).toBe(6);
    });

    it("should not increase past 50 in quality when ten days or less", function() {
      addItem('Backstage passes to a TAFKAL80ETC concert', 9, 49);
      inventoryModule.update_quality();
      expect(inventoryModule.getItems()[0].quality).toBe(50);
    });

    it("should not increase past 50 in quality when five days or less", function() {
      addItem('Backstage passes to a TAFKAL80ETC concert', 5, 49);
      inventoryModule.update_quality();
      expect(inventoryModule.getItems()[0].quality).toBe(50);
    });

    it("should not increase past 50 in quality when five days or less", function() {
      addItem('Backstage passes to a TAFKAL80ETC concert', 5, 49);
      inventoryModule.update_quality();
      expect(inventoryModule.getItems()[0].quality).toBe(50);
    });

    it("should have quality zero after sellin date" , function() {
      addItem('Backstage passes to a TAFKAL80ETC concert', -1, 43);
      inventoryModule.update_quality();
      expect(inventoryModule.getItems()[0].quality).toBe(0);
    });

  });

});
