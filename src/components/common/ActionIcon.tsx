import clsx from "clsx";
import { FC, HTMLAttributes, PropsWithChildren } from "react";

type ActionIconProps = Omit<HTMLAttributes<HTMLInputElement>, "onChange"> & {
    onChange: NonNullable<HTMLAttributes<HTMLInputElement>["onChange"]>;
    name: string;
    checked: boolean;
};

const ActionIcon: FC<PropsWithChildren<ActionIconProps>> = ({
    name,
    onChange,
    children,
    checked,
    className,
    ...props
}) => {
    return (
        <div className="relative flex justify-center ml-3">
            <input
                checked={checked}
                className={clsx(
                    "absolute top-0 left-0 w-full h-full z-10 opacity-0 cursor-pointer",
                    className,
                )}
                name={name}
                type="checkbox"
                onChange={onChange}
                {...props}
            />
            {children}
        </div>
    );
};

export default ActionIcon;
