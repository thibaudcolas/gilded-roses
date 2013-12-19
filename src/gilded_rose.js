function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

items.push(new Item('+5 Dexterity Vest', 10, 20));
items.push(new Item('Aged Brie', 2, 0));
items.push(new Item('Elixir of the Mongoose', 5, 7));
items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
items.push(new Item('Conjured Mana Cake', 3, 6));

function update_quality() {
  items.map(update_item);
}

// Contains all values used to enforce business rules.
var rule = {
  type: {
    Aging: 'Aged Brie',
    Legendary: 'Sulfuras, Hand of Ragnaros',
    Event: 'Backstage passes to a TAFKAL80ETC concert'
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
 * Updates one item.
 */
function update_item(item) {
  if (item.name === rule.type.Legendary) {
    return;
  }

  if (item.name !== rule.type.Aging && item.name !== rule.type.Event) {
    if (item.quality > rule.quality.min) {
      item.quality--;
    }
  }
  else {
    if (item.quality < rule.quality.max) {
      item.quality++;
      if (item.name == rule.type.Event) {
        if (item.sell_in <= rule.sell_in.close) {
          if (item.quality < rule.quality.max) {
            item.quality++;
          }
        }
        if (item.sell_in <= rule.sell_in.closer) {
          if (item.quality < rule.quality.max) {
            item.quality++;
          }
        }
      }
    }
  }

  item.sell_in--;

  if (item.sell_in < rule.sell_in.over) {
    if (item.name !== rule.type.Aging) {
      if (item.name !== rule.type.Event) {
        if (item.quality > rule.quality.min) {
          item.quality--;
        }
      } else {
        item.quality = rule.quality.min;
      }
    } else {
      if (item.quality < rule.quality.max) {
        item.quality++;
      }
    }
  }
}
