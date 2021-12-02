const { default: doctest } = require('@supabase/doctest-js');
const Lab = require('@hapi/lab');
const { describe, it } = exports.lab = Lab.script();
const { expect } = require('@hapi/code');

const doctestOptions = {
    testingFunction: (actual, expected, doctest) => {
        it(`doctest: ${doctest.resultString}`, () => {
            expect(actual.result).to.equal(expected.result);
        });
    }
};

describe('Solutions', () => {
    doctest('lib/day01.js', doctestOptions);
    doctest('lib/day02.js', doctestOptions);
});
