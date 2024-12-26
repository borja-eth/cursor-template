const formatAsCurrency = (value: number | string, decimalPlaces?: number) => {
    const language = "en";

    return Intl.NumberFormat(language, {
        notation: "standard",
        maximumFractionDigits: decimalPlaces,
        minimumFractionDigits: decimalPlaces,
    }).format(typeof value === "string" ? Number(value) : value);
};

export default formatAsCurrency;
