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

// Simply runs update_item on all elements of the items array.
function update_quality(items) {
  items.map(update_item);
}

// Contains all values used to enforce business rules.
var rule = {
  type: {
    Aging: 'Aged Brie',
    Legendary: 'Sulfuras, Hand of Ragnaros',
    Event: 'Backstage passes to a TAFKAL80ETC concert',
    Conjured: 'Conjured Mana Cake'
  },
  quality: {
    max: 50,
    min: 0
  },
  sell_in: {
    close: 10,
    closer: 5,
    over: 0
  }
};

/*
 * Updates val to never be out of bounds.
 */
Math.clamp = function (min, val, max) {
  return Math.max(Math.min(val, max), min);
};

/*
 * Updates the quality of item with val, and checks for min and max values when doing so.
 */
function modify_quality(item, val) {
  // The modifying value is doubled if the sell_in date has passed.
  val *= (item.sell_in < rule.sell_in.over) ? 2 : 1;
  item.quality = Math.clamp(rule.quality.min, item.quality + val, rule.quality.max);
}


/*
 * Updates one item.
 */
function update_item(item) {
  // sell_in is always reduced.
  item.sell_in--;

  switch (item.name) {
    case rule.type.Legendary:
      // Sulfuras should never be sold.
      item.sell_in = rule.sell_in.over;
      break;

    case rule.type.Aging:
      // Aged Brie gains quality over time.
      modify_quality(item, 1);
      break;

    case rule.type.Conjured:
      // Conjured items degrade twice as fast.
      modify_quality(item, -1);
      modify_quality(item, -1);
      break;

    case rule.type.Event:
      // Executes the same operation multiple times if sell_in is close / closer.
      modify_quality(item, 1);
      modify_quality(item, (item.sell_in < rule.sell_in.close) ? 1 : 0);
      modify_quality(item, (item.sell_in < rule.sell_in.closer) ? 1 : 0);
      if (item.sell_in < rule.sell_in.over) {
        item.quality = rule.quality.min;
      }
      break;

    default:
      // All items lose quality over time.
      modify_quality(item, -1);
      break;
  }
}

module.exports = {
    Item: Item,
    items: items,
    update_quality: update_quality,
};
