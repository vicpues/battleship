import Ship from "../src/model/ship";

describe("Ship", () => {
    describe("Properties", () => {
        describe("Length", () => {
            it("Must be instantiated with length", () => {
                expect(() => {
                    new Ship();
                }).toThrow(TypeError);
            });
            it("Does not accept values below 1", () => {
                expect(() => {
                    new Ship(0);
                }).toThrow(TypeError);
            });
            it("Deals with NaN", () => {
                expect(() => {
                    new Ship(NaN);
                }).toThrow(TypeError);
            });
            it("Can be read", () => {
                expect(new Ship(1).length).toEqual(1);
            });
            it("Is read-only", () => {
                expect(() => {
                    new Ship(1).length = 2;
                }).toThrow(TypeError);
            });
        });

        describe("Hits", () => {
            it("Starts at 0", () => {
                expect(new Ship(1).hits).toBe(0);
            });
            it("Is read-only", () =>
                expect(() => {
                    new Ship(1).hits = 1;
                }).toThrow(TypeError));
        });
    });

    describe("Is sunk", () => {
        it("Identifies a sunken ship", () => {
            const ship = new Ship(2);
            ship.hit();
            ship.hit();
            expect(ship.isSunk).toBe(true);
        });
        it("Identifies an unsunken ship", () => {
            const ship = new Ship(2);
            ship.hit();
            expect(ship.isSunk).toBe(false);
        });
        it("Is read-only", () => {
            const ship = new Ship(2);
            expect(() => {
                ship.isSunk = true;
            }).toThrow(TypeError);
        });
    });

    describe("Hit", () => {
        it("Registers a hit", () => {
            const ship = new Ship(2);
            ship.hit();
            expect(ship.hits).toBe(1);
        });
        it("Does not increase counter if ship is sunk", () => {
            const ship = new Ship(2);
            ship.hit();
            ship.hit();
            ship.hit();
            expect(ship.hits).toBe(2);
        });
    });
});
