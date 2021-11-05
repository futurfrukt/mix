import {useState, useRef, useEffect, useCallback, useMemo} from "react";
import cn from 'classnames';
import throttle from 'lodash.debounce';
import './index.css';
import {DropZone} from "../Dropzone";

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

    const onChange = ({files}) => {
        setStatus(STATUS.loading);
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

    const onPlay = useMemo(
        () => throttle(({id}) => {
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
        [activeId, setActiveId]
    );

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
        return (<DropZone onDrop={onChange}/>);
    }

    if (status === STATUS.loading) {
        return (<div className="loader">loading...</div>);
    }

    if (status === STATUS.ready) {
        return <div className="player" ref={containerRef}>
            {sources.map((source) => (<div
                key={source.id}
                className={cn("item", {item__active: source.id === activeId})}
            >
                <div className="item__title">{source.name}</div>
                <audio
                    ref={onRef}
                    controls
                    data-id={source.id}
                    muted={false}
                    src={source.blob}
                    onMouseOver={() => onPlay({id: source.id})}
                    onPlay={(e) => onPlay({id: source.id})}
                    onSeeked={(e) => onSeeked(e)}
                    onTimeUpdate={(e) => onTimeUpdate({
                        currentTime: e.target.currentTime,
                        id: source.id,
                    })}
                />
            </div>))}
        </div>
    }

    return null;
}