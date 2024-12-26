const GradientLine = () => {
    return (
        <div className="flex h-0.5">
            <div className="flex-1 bg-gradient-to-r from-transparent to-purple-500 to-20%" />
            <div className="flex-1 bg-gradient-to-r from-purple-500 via-orange-500" />
        </div>
    );
};

export default GradientLine;
