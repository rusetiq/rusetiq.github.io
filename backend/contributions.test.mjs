import test from 'node:test';
import assert from 'node:assert/strict';
import {parseCalendar} from './contributions.mjs';

// GitHub's current table markup: dates are in weekday rows, not chronological order.
const fixture=`<td data-date="2026-10-11" id="day-sun" data-level="2"></td>
<tool-tip for="day-sun">8 contributions on October 11th.</tool-tip>
<td data-level='0' id='day-sat' data-date='2026-10-10'></td>
<tool-tip for='day-sat'>No contributions on October 10th.</tool-tip>
<td data-date="2026-10-09" data-level="4" id="day-fri"></td>
<tool-tip for="day-fri">1,234 contributions on October 9th.</tool-tip>
<td class="ContributionCalendar-label">fri</td>`;

test('pairs tooltips with dates, sorts weekday rows, and sums exactly the shown days',()=>{
  const data=parseCalendar(fixture);
  assert.deepEqual(data.days,[{date:'2026-10-09',count:1234,level:4},{date:'2026-10-10',count:0,level:0},{date:'2026-10-11',count:8,level:2}]);
  assert.equal(data.total,1242);assert.equal(data.from,'2026-10-09');assert.equal(data.to,'2026-10-11');
});
test('does not silently turn missing or changed GitHub data into zero contributions',()=>{
  assert.throws(()=>parseCalendar(fixture.replace('No contributions on October 10th.','Unknown tooltip')));
  assert.throws(()=>parseCalendar('<html>please sign in</html>'));
  assert.throws(()=>parseCalendar(fixture.replace('data-level="2"','data-level="8"')));
  assert.throws(()=>parseCalendar(fixture+fixture));
});
