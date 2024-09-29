const TerminalBlock = () => {
    const lines = [
        "Welcome to my personal blog!",
        "I'm Mohammad Abdul Quadeer, a tech enthusiast exploring the world of Algorithms, Linux🐧, and Machine Learning.",
        "Feel free to browse through my posts and projects."
    ];

    return (
        <div className="bg-black text-white font-mono rounded-md mb-8 border border-gray-800 bg-opacity-85">
            <div className="flex items-center bg-gray-900 p-2 rounded-t-md">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div className="flex-grow text-center text-gray-400">Terminal</div>
            </div>
            <div className="p-4">
                {lines.map((line, index) => (
                    <p key={index}>
                        <span className="text-gray-500">{index + 1}</span> {line}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default TerminalBlock;