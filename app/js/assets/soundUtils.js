export function loadHowlerSounds(sounds) {
    const soundLoadingObjects = sounds.map((sound) => {
        return new Promise((resolve, reject) => {
            const loadActiveStates = ["loading", "loaded"];

            if (!loadActiveStates.includes(sound.state())) {
                sound.load();
            }

            sound.once("load", resolve).once("loaderror", reject);
        });
    });

    return Promise.all(soundLoadingObjects);
}

function secToMs(seconds) {
    return seconds * 1000;
}

export function playSound(sound, options = {}) {
    let id = null;

    if ('sprite' in options) {
        sound.stop();
        id = sound.play(options.sprite);
    } else {
        id = sound.play();
    }

    if ('volume' in options) {
        sound.volume(options.volume, id);
    }

    if ('loop' in options && !('fade' in options)) {
        sound.loop(options.loop, id);
    }

    if ('rate' in options) {
        sound.rate(options.rate, id);
    }

    if ('fade' in options) {
        const duration = sound.duration(id);
        const fadeInEndPointMs = secToMs(duration * (options.fade.inPercent / 100));

        // console.log({
        //     duration,
        //     fadeInEndPointMs,
        //     fadeOutStartPointMs,
        //     fadeOutDurationMs,
        //     durationMs: secToMs(duration),
        // });

        sound.fade(0, 1, fadeInEndPointMs, id);

        if (options.fade.outPercent) {
            const fadeOutDurationMs = secToMs(duration * (options.fade.outPercent / 100));
            const fadeOutStartPointMs = secToMs(duration) - fadeOutDurationMs;
            setTimeout(() => {
                sound.fade(1, 0, fadeOutDurationMs, id);
            }, fadeOutStartPointMs);
        }

        if (options.loop) {
            sound.once("end", async () => {
                // await new Promise((resolve) => setTimeout(resolve, 1000));
    
                playSound(sound, options);
            });
        }
    }

    return sound;
}