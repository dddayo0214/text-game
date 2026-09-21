import { useEffect, useMemo, useState } from "react";
import storyData from "../data/story.json";
import "./Game.css";
import storyImage from "../mertirial/hinano.png";

const fallbackCopy = { start: "夜色落在陌生的山路上。遠方的燈火像是在邀請你，也像是在警告你別靠近。", end: "這段旅程暫時告一段落，但故事總會在下一個選擇重新開始。" };
const readable = (value, fallback) => value && !value.includes("?") ? value : fallback;

export default function Game() {
  const [currentScene, setCurrentScene] = useState("start");
  const [history, setHistory] = useState(["start"]);
  const scene = storyData[currentScene] || storyData.start;
  const isEnding = currentScene.includes("end");
  const sceneText = readable(scene.text, fallbackCopy[currentScene] || "迷霧掩住了前路。停下來聽一聽，然後選擇下一步。");
  const progress = useMemo(() => Math.min(100, Math.max(8, history.length * 11)), [history.length]);
  const choose = (nextScene) => { setCurrentScene(nextScene); setHistory((items) => [...items, nextScene]); };
  const restart = () => { setCurrentScene("start"); setHistory(["start"]); };
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [currentScene]);

  return <section className="adventure" id="adventure" aria-live="polite"><aside className="story-aside"><div><p className="eyebrow">A visual novel</p><p className="issue-number">{String(history.length).padStart(2, "0")}</p></div><div className="aside-bottom"><p>Current chapter</p><strong>{isEnding ? "Epilogue" : "Into the unknown"}</strong></div></aside><div className="story-main"><div className="image-frame"><img src={storyImage} alt="A traveller captured in warm evening light" /><div className="image-caption"><span>Field note</span><span>001—∞</span></div></div><div className="story-content"><div className="chapter-row"><p>Chapter {String(history.length).padStart(2, "0")}</p><div className="progress" aria-label={`${progress}% through current journey`}><span style={{ width: `${progress}%` }} /></div></div><h1>{isEnding ? "The story pauses here." : "Where will you go next?"}</h1><p className="story-text" key={currentScene}>{sceneText}</p>{scene.options.length > 0 ? <div className="options" aria-label="Story choices">{scene.options.map((option, index) => <button className="choice" key={`${option.next}-${index}`} onClick={() => choose(option.next)}><span className="choice-index">0{index + 1}</span><span>{readable(option.text, `Follow path ${index + 1}`)}</span><span className="choice-arrow" aria-hidden="true">↗</span></button>)}</div> : <button className="restart" onClick={restart}>Begin another journey <span>↻</span></button>}</div></div></section>;
}
