const numberToCompactNotation = (value: number | string) => {
    const language = "en";

    return Intl.NumberFormat(language, { notation: "compact" }).format(
        Number(value),
    );
};

export default numberToCompactNotation;
