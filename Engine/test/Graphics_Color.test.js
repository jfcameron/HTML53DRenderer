import Color from '../src/Engine/Graphics/Color.js'

test("Creates black using Color's default ctor", () => 
{
    const color = new Color();

    expect(color).toBe(0);
    expect(color.g).toBe(0);
    expect(color.b).toBe(0);
    expect(color.a).toBe(0);
});
