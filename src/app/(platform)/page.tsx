import Logo from "@/components/common/Brand/Logo";
import { withPermissionPage } from "@/lib/middlewares/withPermissionPage";

const HomePage = () => {
    return (
        <div className="size-full flex flex-col items-center justify-center gap-2">
            <Logo className="w-36 h-36 rotate-90 hover:rotate-0 transition-all duration-200" />
            <h1 className="font-semibold  text-2xl">Welcome Roxomite!</h1>
            <p>What are you waiting to build your next fucking amazing tool?</p>
        </div>
    );
};

export default withPermissionPage(HomePage, {
    permissions: [],
});
