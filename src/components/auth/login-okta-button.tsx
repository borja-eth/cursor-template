"use client";
import { signIn } from "next-auth/react";
import { Button, ButtonProps } from "@roxom-markets/spark-ui";
import React, { FC } from "react";
import { Routes } from "@/routes";

const LoginOktaButton: FC<ButtonProps> = (props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { onClick, ...rest } = props;

    return (
        <Button
            {...rest}
            onClick={() =>
                signIn("okta", {
                    redirect: true,
                    redirectTo: Routes.HOME,
                })
            }
        >
            Sign in with <strong className="ml-1">okta</strong>
        </Button>
    );
};

export default LoginOktaButton;
