function createBidirectionalMap(pairs) {
    const obfToReadable = {};
    const readableToObf = {};

    for (const [obf, readable] of Object.entries(pairs)) {
        obfToReadable[obf] = readable;
        readableToObf[readable] = obf;
    }

    return {
        obfToReadable,
        readableToObf,
        getReadable: (key) => obfToReadable[key] || key,
        getObfuscated: (key) => readableToObf[key] || key,
    };
}


const OutMethodMap = createBidirectionalMap({
    $: "opcode",
    S: "p1",
    Z: "p2",
    dd: "p3",
    d8: "p4"
});

const InMethodMap = createBidirectionalMap({
    dC: "g1",
    dg: "g1b",
    dF: "g2",
    dT: "g2b",
    dm: "g4",
    dQ: "gjstr",
    dX: "g8",
    V: "gbit"
});

