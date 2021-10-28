import {useState, useRef, useEffect, useCallback} from "react";
import cn from 'classnames';
import throttle from 'lodash.debounce';
import './index.css';

const STATUS = {
    empty: "empty",
    loading: "loading",
    ready: "ready",
}

export const Player = () => {
    const [status, setStatus] = useState(STATUS.empty);
    const [sources, setSources] = useState([]);
    const [count, setCount] = useState(0);
    const [activeId, setActiveId] = useState(undefined);
    const time = useRef(0);
    const containerRef = useRef();
    const playersRef = useRef(new Set());

    const onRef = (player) => {
        if (player) {
            playersRef.current.add(player);
        }
    }

    const onChange = (inputEvent) => {
        setStatus(STATUS.loading);
        const {files} = inputEvent.target;
        setCount(files.length);
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = (readerEvent) => {
                setSources((prevSources) => ([
                    ...prevSources,
                    {
                        id: String(i),
                        name: file.name,
                        blob: URL.createObjectURL(new Blob([readerEvent.target.result], {type: file.type}))
                    }
                ]));
            };
            reader.readAsArrayBuffer(files[i]);
        }
    }

    useEffect(() => {
        if (count > 0 && sources.length === count) {
            setStatus(STATUS.ready);
        }
    }, [sources, count]);

    const onPlay = useCallback(
        throttle(({id}) => {
            console.log('>> onPlay', {id, activeId});
            for (let audio of playersRef.current) {
                const audioId = audio.dataset.id;
                if (audioId === id) {
                    if (audioId !== activeId && audio.duration >= time.current) {
                        audio.currentTime = time.current;
                        if (audio.paused) {
                            audio.play();
                        }
                    }
                } else {
                    audio.pause();
                }
            }
            setActiveId(id);
        }, 100),
        [activeId]
    )

    const onTimeUpdate = ({currentTime, id}) => {
        if (id !== activeId) {
            return;
        }
        time.current = currentTime;
    }

    const onSeeked = ({target}) => {
        if (target.paused) {
            target.play();
        }
    }

    if (status === STATUS.empty) {
        return (<input
            type="file"
            accept="audio/*"
            multiple
            onChange={onChange}
        />);
    }

    if (status === STATUS.loading) {
        return (<div className="loader">loading...</div>);
    }

    if (status === STATUS.ready) {
        return <div className="player" ref={containerRef}>
            {sources.map((source) => (<audio
                className={cn({disabled: source.id !== activeId})}
                ref={onRef}
                controls
                data-id={source.id}
                muted={false}
                key={source.id}
                src={source.blob}
                onMouseOver={() => onPlay({id: source.id})}
                onPlay={(e) => onPlay({id: source.id})}
                onSeeked={(e) => onSeeked(e)}
                onTimeUpdate={(e) => onTimeUpdate({
                    currentTime: e.target.currentTime,
                    id: source.id,
                })}
            />))}
        </div>
    }

    return null;
}