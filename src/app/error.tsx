"use client";

import ErrorContainer from "@/components/common/Error/ErrorContainer";
import ErrorContent from "@/components/common/Error/ErrorContent";
import AstronautIcon from "@/components/icons/AstronautIcon";

export default function Error() {
    return (
        <ErrorContainer>
            <ErrorContent
                icon={AstronautIcon}
                message={"Oops! Something went wrong."}
                title={"Error"}
            />
        </ErrorContainer>
    );
}
