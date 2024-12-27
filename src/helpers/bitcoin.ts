const PRECISION = {
    BTC_VALUE: 8,
    SATS_VALUE: 0,
};

export const parseBitcoin = (value: number) => {
    return value.toFixed(PRECISION.BTC_VALUE);
};

export const satsToBitcoin = (value: number) => {
    return (value / Math.pow(10, PRECISION.BTC_VALUE)).toFixed(
        PRECISION.BTC_VALUE,
    );
};

export const bitcoinToSats = (value: number) => {
    return (value * Math.pow(10, PRECISION.BTC_VALUE)).toFixed(0);
};

export const removeTrailingZeros = (
    num: number,
    decimalPlaces: number,
): string => {
    return parseFloat(num.toFixed(decimalPlaces)).toString();
};
