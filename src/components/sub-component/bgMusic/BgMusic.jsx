import React, { useEffect, useMemo } from 'react'
import nationalSong from '../../../assets/audio/instrumental.mp3'

export const BgMusic = () => {
  const audio = useMemo(() => new Audio(nationalSong), []);
  audio.loop = true;
  audio.autoplay = true;

  useEffect(() => {
    Calling();
  }, []);

  function Calling() {
    audio.play();
  }
  return (
    <>
    </>
  )
}

export default React.memo(BgMusic);