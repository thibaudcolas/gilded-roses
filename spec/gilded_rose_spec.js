xdescribe("First Day", function() {
	update_quality();
	it("should update a normal quality item correctly", function() {
		expect(items[0].quality).toBe(19);
		expect(items[0].sell_in).toBe(9);
		expect(items[2].quality).toBe(6);
		expect(items[2].sell_in).toBe(4);
	});
	it("should age the brie", function() {
		expect(items[1].quality).toBe(1);
		expect(items[1].sell_in).toBe(1);
	});
	it("should not update legendary items", function() {
		expect(items[3].quality).toBe(80);
		expect(items[3].sell_in).toBe(0);
	});
	it("should increase the concert ticket quality", function() {
		expect(items[4].quality).toBe(21);
		expect(items[4].sell_in).toBe(14);
	});
	it('should degrade the mana cake by 2', function() {
		expect(items[5].quality).toBe(4);
		expect(items[5].sell_in).toBe(2);
	});
});

describe("Before the TAFKAL80ETC gig", function() {
	for (var i = 0; i < 16; i++) {
		update_quality();
	}
	xit("the ticket should have quality 37 5 days before the gig", function() {
		expect(items[4].quality).toBe(37);
		expect(items[4].sell_in).toBe(5);
	});
	xit("the ticket should have quality 49 1 day before the gig", function() {
		expect(items[4].quality).toBe(49);
		expect(items[4].sell_in).toBe(1);
	});
	xit("the ticket should have quality 50 on the day of the gig", function() {
		expect(items[4].quality).toBe(50);
		expect(items[4].sell_in).toBe(0);
	});
	it("the ticket should be worthless after the gig", function() {
		expect(items[4].quality).toBe(0);
		expect(items[4].sell_in).toBe(-1);
	});
});

xdescribe("The distant future, the year 2000", function() {
	for (var i = 0; i < 10000; i++) {
		update_quality();
	}
	it("should not touch Sulfuras", function() {
		expect(items[3].quality).toBe(80);
		expect(items[3].sell_in).toBe(0);
	});
	it("normal items should have quality 0 and be beyond their sell by date", function() {
		expect(items[0].quality).toBe(0);
		expect(items[0].sell_in < 0).toBe(true);
		expect(items[2].quality).toBe(0);
		expect(items[2].sell_in < 0).toBe(true);
	});
	it("the brie should have quality 50", function() {
		expect(items[1].quality).toBe(50);
		expect(items[1].sell_in < 0).toBe(true);
	});
	it("no-one needs that TAFKAL80ETC ticket any more", function() {
		expect(items[4].quality).toBe(0);
		expect(items[4].sell_in < 0).toBe(true);
	});
	it('the mana cake has vanished', function() {
		expect(items[5].quality).toBe(0);
		expect(items[5].sell_in < 0).toBe(true);
	});
});