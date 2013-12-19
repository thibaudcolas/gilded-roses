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

var type = {
  Aging: 'Aged Brie',
  Legendary: 'Sulfuras, Hand of Ragnaros',
  Event: 'Backstage passes to a TAFKAL80ETC concert'
};

function update_item(item) {
  if (item.name === type.Legendary) {
    return;
  }

  if (item.name !== type.Aging && item.name !== type.Event) {
    if (item.quality > 0) {
      item.quality--;
    }
  }
  else {
    if (item.quality < 50) {
      item.quality++;
      if (item.name == type.Event) {
        if (item.sell_in < 11) {
          if (item.quality < 50) {
            item.quality++;
          }
        }
        if (item.sell_in < 6) {
          if (item.quality < 50) {
            item.quality++;
          }
        }
      }
    }
  }

  item.sell_in--;

  if (item.sell_in < 0) {
    if (item.name !== type.Aging) {
      if (item.name !== type.Event) {
        if (item.quality > 0) {
          item.quality--;
        }
      } else {
        item.quality = 0
      }
    } else {
      if (item.quality < 50) {
        item.quality++;
      }
    }
  }
}
