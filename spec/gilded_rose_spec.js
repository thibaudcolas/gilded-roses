describe("Gilded Rose", function() {

  it("should do something", function() {
    update_quality
  });

  it("constructor's attributes", function(){
    var i = new Item('+5 Dexterity Vest', 10, 20);
    expect(i.name).toEqual('+5 Dexterity Vest');
    expect(i.sell_in).toEqual(10);
    expect(i.quality).toEqual(20);
  });

  it("At the end of each day our system lowers both values for every item", function(){
    var item = new Item("cheese", 2, 5);
    items.push(item);
    update_quality();
    expect(item.sell_in).toEqual(1)
    expect(item.quality).toEqual(4)
  });

  it("Once the sell_in days is less then zero, quality degrades twice as fast", function(){
    var item = new Item("cheese", -1, 5);
    items.push(item);
    update_quality();
    expect(item.quality).toEqual(3)
    });

  it("The quality of an item is never negative", function(){
    var item = new Item("cheese", 0, 1);
    items.push(item);
    update_quality();
    expect(item.quality).toEqual(0)
  });

  it("'Aged Brie' actually increases in quality the older it gets", function(){
    var item = new Item('Aged Brie', 1, 1);
    items.push(item);
    update_quality();
    expect(item.quality).toEqual(2)
  });

  it("The quality of an item is never more than 50", function(){
    var item = new Item('Aged Brie', 1, 50);
    items.push(item);
    update_quality();
    expect(item.quality).toEqual(50)
  });

  it("'Sulfuras, Hand of Ragnaros', being a legendary item, never has to be sold nor does it decrease in quality", function(){
    var item = new Item('Sulfuras, Hand of Ragnaros', 1, 20);
    items.push(item);
    update_quality();
    expect(item.sell_in).toEqual(1);
    expect(item.quality).toEqual(20);
  });

  it("The quality of Sulfuras, is always 80", function(){
    var item = new Item('Sulfuras, Hand of Ragnaros', 1, 80);
    items.push(item);
    update_quality();
    expect(item.quality).toEqual(80);
  });


  it("Backstage passes like aged brie, increases in quality as it's sell_in value decreases", function(){
    var item = new Item('Backstage passes to a TAFKAL80ETC concert', 20, 1);
    items.push(item);
        update_quality();
        expect(item.quality).toEqual(2)
   });

  it("Backstage passes like aged brie, increases in quality by 2 when sell_in is less than 10", function(){
    var item = new Item('Backstage passes to a TAFKAL80ETC concert', 10, 1);
    items.push(item);
    update_quality();
    expect(item.quality).toEqual(3)
  });

  it("Backstage passes like aged brie, increases in quality by 3 when sell_in is less than 5", function(){
    var item = new Item('Backstage passes to a TAFKAL80ETC concert', 4, 1);
    items.push(item);
    update_quality();
    expect(item.quality).toEqual(4)
  });

  it("when Backstage passes - quality drops to 0 after the concert", function(){
    var item = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20);
    items.push(item);
    update_quality();
    expect(item.quality).toEqual(0)
  });

 });
