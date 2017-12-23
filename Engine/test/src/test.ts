import { expect } from 'chai';

import Vector3 from "Engine/Math/Vector3"

describe('Hello function', () => 
{
    it('should return hello world', () => 
    {
        const vec = new Vector3();

        expect(vec.x).to.equal(0);
    });
});
