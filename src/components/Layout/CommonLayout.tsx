import Header from "../common/Header";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="dark:bg-neutral-13 mx-auto grid min-h-screen grid-rows-[auto,1fr,auto] font-sans antialiased">
            <Header />
            <main className="flex dark:bg-neutral-13">{children}</main>
        </div>
    );
};

export default CommonLayout;
