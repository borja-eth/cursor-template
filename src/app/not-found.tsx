import ErrorContainer from "@/components/common/Error/ErrorContainer";
import ErrorContent from "@/components/common/Error/ErrorContent";
import { Routes } from "@/routes";

const NotFound = () => {
    return (
        <ErrorContainer>
            <ErrorContent
                buttonText="Go to Home"
                message="The page you are looking for doesn't exist."
                redirectPath={Routes.HOME}
                title="Page Not Found"
            />
        </ErrorContainer>
    );
};

export default NotFound;
