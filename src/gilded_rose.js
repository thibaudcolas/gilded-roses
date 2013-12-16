function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var inventoryModule = (function () {

  var items = [],
  backstagePass = 'Backstage passes to a TAFKAL80ETC concert',
  sulfuras = 'Sulfuras, Hand of Ragnaros',
  agedBrie = 'Aged Brie',
  conjured = 'Conjured Mana Cake';

  function handleBackStagePass (i) {
    if (items[i].sell_in < 11) {
      changeQuality(i, 1);
    }
    if (items[i].sell_in < 6) {
      changeQuality(i, 1);
    }
    changeQuality(i, 1);
    if (items[i].sell_in < 0) {
      items[i].quality = items[i].quality - items[i].quality;
    }
  }

  function handleAgedBrie (i) {
    if (items[i].sell_in < 0) {
      changeQuality(i, 2);
    } else {
      changeQuality(i, 1);
    }
  }

  function handleConjured (i) {
    if (items[i].sell_in < 0) {
      changeQuality(i, -4);
    } else {
      changeQuality(i, -2);
    }
  }

  function handleNormalItem (i) {
    if (items[i].sell_in < 0) {
      changeQuality(i, -2);
    } else {
      changeQuality(i, -1);
    }
  }

  function decrementSellIn (i) {
    if (items[i].name != sulfuras) {
      items[i].sell_in = items[i].sell_in - 1;
    }
  }

  function changeQuality (i, modifier) {
    if (modifier < 0) {
      if (items[i].quality > 0) {
        items[i].quality = items[i].quality + modifier;
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + modifier;
      }
    }
  }

  function update_quality() {
    for (var i = 0; i < items.length; i++) {
      decrementSellIn(i);
      if (items[i].name == backstagePass) { handleBackStagePass(i); }
      else if (items[i].name == agedBrie) { handleAgedBrie(i); }
      else if (items[i].name == sulfuras) {}
      else if (items[i].name == conjured) { handleConjured(i);}
      else {  handleNormalItem(i); }
    }
  }

  return {
    addItem: function(name, sell_in, quality) {
      items.push(new Item(name, sell_in, quality));
    },
    getItems: function() {
      return items;
    },
    resetItems: function () {
      items = [];
    },
    update_quality: update_quality
  };
}());

inventoryModule.addItem('+5 Dexterity Vest', 10, 20);
inventoryModule.addItem('Aged Brie', 2, 0);
inventoryModule.addItem('Elixir of the Mongoose', 5, 7);
inventoryModule.addItem('Sulfuras, Hand of Ragnaros', 0, 80);
inventoryModule.addItem('Backstage passes to a TAFKAL80ETC concert', 15, 20);
inventoryModule.addItem('Conjured Mana Cake', 3, 6);


