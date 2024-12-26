import { z } from "zod";

export const truncateNumber = (value: number, decimals: number): number => {
    const multiplier = Math.pow(10, decimals);

    return Math.floor(value * multiplier) / multiplier;
};

export const roundUpNumber = (value: number, decimals: number): number => {
    const multiplier = Math.pow(10, decimals);

    return Math.ceil(value * multiplier) / multiplier;
};

export const getMinimumValue = (decimals: number): string => {
    const min = Math.pow(10, -decimals);

    return min.toFixed(decimals);
};

const partialNumericStringRegex = /^[0-9]+(\.[0-9]*|\,[0-9]*)?$/;
const numericStringRegex = /^[0-9]+(\.[0-9]+|\,[0-9]+)?$/;

/**
 *
 * @param value A string representing a number (can contain only one decimal point or comma)
 * @param partial If true, the string can contain a decimal point or comma at the end (to be used in case we need to validate a number while is being written)
 * @returns true if the string is number and false otherwise
 *
 */
export const isNumericString = (
    value: string,
    partial: boolean = false,
): boolean => {
    return partial
        ? partialNumericStringRegex.test(value) // * means 0 or more occurrences of the preceding pattern
        : numericStringRegex.test(value); // + means 1 or more occurrences of the preceding pattern
};

/**
 * Zod field schema validation.
 *
 * Note: The inferred type of this schema is string, if you want to transform it to Number,
 * you can apply `.transform((x) => Number(replaceDecimals(x)));` when used.
 *
 * @param precision The number of decimals to be considered
 * @param messages Zod error messages (optional)
 * @returns A zod field schema validation
 */
export const zNumericString = (
    precision: number,
    messages?: {
        invalid_regex_error?: string;
        required_error?: string;
        invalid_type_error?: string;
        invalid_precision_error?: string;
    },
) => {
    const {
        invalid_regex_error,
        required_error,
        invalid_type_error,
        invalid_precision_error,
    } = messages ?? {};

    return z
        .string({
            invalid_type_error,
            required_error,
        })
        .regex(numericStringRegex, invalid_regex_error)
        .refine(
            (x) => {
                const n = replaceDecimals(x);

                if (n.includes(".")) {
                    return n.split(".")[1].length <= precision;
                }

                return true;
            },
            invalid_precision_error ??
                `Must be a multiple of ${getMinimumValue(precision)}`,
        );
};

export const replaceDecimals = (value: string) => value.replaceAll(",", ".");
export const replaceAndConvertDecimals = (value: string) =>
    Number(replaceDecimals(value));
