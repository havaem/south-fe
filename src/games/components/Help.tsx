const Help: React.FC = () => {
    return (
        <div className="absolute right-0 top-0 bg-white p-[1.5vw]">
            <div className="select-none gap-[1.5vw] text-[1vw] flex-center">
                <div className="gap-[1vw] flex-center">
                    <div className="shadow-button p-[0.2vw]">
                        <p className="font-game">E</p>
                    </div>
                    <p>Interact</p>
                </div>
                <div className="gap-[1vw] flex-center">
                    <div className="shadow-button p-[0.2vw]">
                        <p className="font-game">Enter</p>
                    </div>
                    <p>Confirm</p>
                </div>
            </div>
        </div>
    );
};
export default Help;
