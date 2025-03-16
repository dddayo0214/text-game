import { useState, useEffect } from "react";
import storyData from "../data/story.json";
import './Game.css'; // 引入 CSS 動畫樣式

export default function Game() {
    const [currentScene, setCurrentScene] = useState("start");
    const [transitioning, setTransitioning] = useState(false); // 控制過渡動畫
    const scene = storyData[currentScene];

    // 用來控制場景過渡的效果
    const handleOptionClick = (nextScene) => {
        setTransitioning(true);
        setCurrentScene(nextScene);
        // setTimeout(() => {
        setTransitioning(false);
        // }, 1000);
    };

    useEffect(() => {
        const textElement = document.querySelector('.animate-text');
        if (textElement) {
            textElement.classList.remove('animate-text');
            void textElement.offsetWidth;
            textElement.classList.add('animate-text');
        }
    }, [currentScene]);

    return (
        <div
            className={`game-container ${transitioning ? 'fade-out' : 'fade-in'}`}
        >
            <p className="animate-text">{scene.text}</p>
            <div className="options">
                {scene.options.map((option, index) => (
                    <button key={index} onClick={() => handleOptionClick(option.next)}>
                        {option.text}
                    </button>
                ))}
            </div>

            {/* 若遊戲結束，顯示重新開始選項 */}
            {currentScene === "end" && (
                <button className="restart" onClick={() => setCurrentScene("start")}>
                    重新開始
                </button>
            )}
        </div>
    );
}
