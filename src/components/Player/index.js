import {useState, useRef, useEffect} from "react";
import cn from 'classnames';
import './index.css';

const STATUS = {
    empty: "empty",
    loading: "loading",
    ready: "ready",
}

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
export const Player = () => {
    const [status, setStatus] = useState(STATUS.empty);
    const [sources, setSources] = useState([]);
    const [count, setCount] = useState(0);
    const [activeId, setActiveId] = useState(undefined);
    const [currentTime, setCurrentTime] = useState(0);
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

    useEffect(() => {
        console.log('>>', playersRef);
    }, [activeId]);

    const onPlay = ({ id }) => {
        console.log('>> onPlay', { id, activeId });
        for (let audio of playersRef.current) {
            const audioId = audio.dataset.id;
            if (audioId === id) {
                if (audioId !== activeId && audio.duration >= currentTime) {
                    audio.currentTime = currentTime;
                    if (audio.paused) {
                        audio.play();
                    }
                }
            } else {
                audio.pause();
            }
        }
        setActiveId(id);
    }

    const onTimeUpdate = ({currentTime, id}) => {
        console.log('>> onTimeUpdate', id, activeId, currentTime);
        if (id !== activeId) {
            return;
        }
        setCurrentTime(currentTime);
        // TODO
        // if (id !== activeId) {
        //     onPlay({ id });
        // }
    }

    const onSeeked = ({ target }) => {
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
                className={cn({ disabled: source.id !== activeId })}
                ref={onRef}
                controls
                data-id={source.id}
                muted={false}
                key={source.id}
                src={source.blob}
                onMouseOver={() => onPlay({ id: source.id })}
                onPlay={(e) => onPlay({ id: source.id })}
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