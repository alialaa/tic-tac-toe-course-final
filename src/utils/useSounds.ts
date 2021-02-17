import { useRef, useEffect } from "react";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { useSettings } from "@contexts/settings-context";

type SoundType = "pop1" | "pop2" | "win" | "loss" | "draw";

export default function useSounds(): (sound: SoundType) => void {
    const { settings } = useSettings();
    const popSoundRef = useRef<Audio.Sound | null>(null);
    const pop2SoundRef = useRef<Audio.Sound | null>(null);
    const winSoundRef = useRef<Audio.Sound | null>(null);
    const lossSoundRef = useRef<Audio.Sound | null>(null);
    const drawSoundRef = useRef<Audio.Sound | null>(null);

    const playSound = async (sound: SoundType): Promise<void> => {
        const soundsMap = {
            pop1: popSoundRef,
            pop2: pop2SoundRef,
            win: winSoundRef,
            loss: lossSoundRef,
            draw: drawSoundRef
        };
        try {
            const status = await soundsMap[sound].current?.getStatusAsync();
            status &&
                status.isLoaded &&
                settings?.sounds &&
                soundsMap[sound].current?.replayAsync();
            if (settings?.haptics) {
                switch (sound) {
                    case "pop1":
                    case "pop2":
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                        break;
                    case "win":
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                        break;
                    case "loss":
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
                        break;
                    case "draw":
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                        break;
                    default:
                        break;
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        //load sounds
        const popSoundObject = new Audio.Sound();
        const pop2SoundObject = new Audio.Sound();
        const winSoundObject = new Audio.Sound();
        const lossSoundObject = new Audio.Sound();
        const drawSoundObject = new Audio.Sound();

        const loadSounds = async () => {
            /* eslint-disable @typescript-eslint/no-var-requires */
            await popSoundObject.loadAsync(require("@assets/pop_1.wav"));
            popSoundRef.current = popSoundObject;

            await pop2SoundObject.loadAsync(require("@assets/pop_2.wav"));
            pop2SoundRef.current = pop2SoundObject;

            await winSoundObject.loadAsync(require("@assets/win.mp3"));
            winSoundRef.current = winSoundObject;

            await lossSoundObject.loadAsync(require("@assets/loss.mp3"));
            lossSoundRef.current = lossSoundObject;

            await drawSoundObject.loadAsync(require("@assets/draw.mp3"));
            drawSoundRef.current = drawSoundObject;
        };
        loadSounds();
        return () => {
            //unload sounds
            popSoundObject && popSoundObject.unloadAsync();
            pop2SoundObject && pop2SoundObject.unloadAsync();
            winSoundObject && winSoundObject.unloadAsync();
            lossSoundObject && lossSoundObject.unloadAsync();
            drawSoundObject && drawSoundObject.unloadAsync();
        };
    }, []);

    return playSound;
}
