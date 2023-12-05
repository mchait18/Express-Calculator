
const { changeToNums, getMean, getMode, getMedian } = require('./app');

describe('test Express Calculator', function () {

    test('getMean', function () {
        let mean = getMean([2, 4, 6, 8, 345])
        expect(mean).toEqual(73)

    })
    test('getMode', function () {
        let mode = getMode([2, 2, 2, 1, 8, 4, 1, 8])
        expect(mode).toBe("2")

    })
    test('getMedian', function () {
        let median = getMedian([2, 4, 6, 8, 345])
        expect(median).toEqual(6)
        let median2 = getMedian([2, 4, 6, 8, 345, 9])
        expect(median2).toEqual(7)

    })
    it("finds the median of an even set", function () {
        expect(getMedian([1, -1, 4, 2])).toEqual(1.5)
    })
    it("finds the median of an odd set", function () {
        expect(getMedian([1, -1, 4])).toEqual(1)
    })
    it("finds the mean of an empty array", function () {
        expect(getMean([])).toEqual(0)
    })
    it("finds the mean of an array of numbers", function () {
        expect(getMean([1, -1, 4, 2])).toEqual(1.5)
    })
})