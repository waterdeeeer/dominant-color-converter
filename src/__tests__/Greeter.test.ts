import {Greeter} from '../index';

test('My Greeter',()=>{
	expect(Greeter('Ben')).toBe('Hello Ben');
})
