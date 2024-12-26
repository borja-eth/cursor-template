const CenteredContentLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="dark:bg-background">
            <div className="container p-1 mx-auto grid min-h-screen grid-rows-[auto,1fr,auto] md:px-4 font-sans antialiased">
                <main>{children}</main>
            </div>
        </div>
    );
};

export default CenteredContentLayout;
