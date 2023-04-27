import { useState, useEffect } from "react";
const YOUTUBE_PLAYER_API = "https://www.youtube.com/iframe_api";

export default function useYoutubeScript(scriptId) {
  const [state, setState] = useState({ loaded: false, error: false });

  useEffect(() => {
    if (window.YT) { return [true, false]; }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = YOUTUBE_PLAYER_API;

    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(script, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      onScriptLoad();
    };

    const onScriptLoad = () => {
      setState({ loaded: true, error: false });
    };

    const onScriptError = () => {
      setState({ loaded: true, error: true });
    };

    script.addEventListener("error", onScriptError);
    return () => {
      script.removeEventListener("error", onScriptError);
      const currentYoutubeScript = document.getElementById(scriptId);
      currentYoutubeScript && document.head.removeChild(currentYoutubeScript);
    };
  }, [scriptId]);

  return [state.loaded, state.error];
};