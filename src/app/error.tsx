"use client";

import ErrorContainer from "@/components/common/Error/ErrorContainer";
import ErrorContent from "@/components/common/Error/ErrorContent";
import AstronautIcon from "@/components/icons/AstronautIcon";
import CommonLayout from "@/components/Layout/CommonLayout";

export default function Error() {
    return (
        <CommonLayout>
            <ErrorContainer>
                <ErrorContent
                    icon={AstronautIcon}
                    message={"Oops! Something went wrong."}
                    title={"Error"}
                />
            </ErrorContainer>
        </CommonLayout>
    );
}
