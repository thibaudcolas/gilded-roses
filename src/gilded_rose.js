/*jshint globalstrict: true*/
"use strict";

function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = [];

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function update_quality() {
  // should be enumerated constants
  var NORMAL = 'N', AGES = 'A', LEGENDARY = 'L', TICKET = 'T', CONJURED = 'C';
    // Some classification for each item
  var itemClasses = [NORMAL, AGES, NORMAL, LEGENDARY, TICKET, CONJURED];
  items.forEach(function(item, index) {
    // Adjust the quality depending on the class assigned
    switch (itemClasses[index]) {
      case NORMAL:
        item.quality = Math.max(0, item.quality - (item.sell_in >= 0 ? 1 : 2));
        item.sell_in--;
        break;
      case AGES:
        item.sell_in--;
        item.quality = Math.min(50, item.quality + 1);
        break;
      case TICKET:
        if (item.sell_in-- > 0) {
          var qualityDelta = item.sell_in < 11 ? (item.sell_in < 6 ? 3 : 2) : 1;
          item.quality = Math.min(50, item.quality + qualityDelta);
        } else {
          item.quality = 0;
        }
        break;
      case CONJURED:
        item.quality = Math.max(0, item.quality - (item.sell_in >= 0 ? 2 : 4));
        item.sell_in--;
        break;
      case LEGENDARY:
        break;
      default:
        break;
    }
  });
}