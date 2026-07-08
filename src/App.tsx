import { Clock } from "./Clock";
import { toggleMuted, useAppDispatch, useAppSelector } from "./store";

export function App() {
  const muted = useAppSelector((state) => state.settings.soundMuted);
  const dispatch = useAppDispatch();

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-sky-400 via-sky-500 to-green-600">
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="window" style={{ width: 420, maxWidth: "100%" }}>
          <div className="title-bar">
            <div className="title-bar-text">Aaron Brooks — Portfolio</div>
            <div className="title-bar-controls">
              <button aria-label="Minimize" />
              <button aria-label="Maximize" />
              <button aria-label="Close" />
            </div>
          </div>
          <div className="window-body">
            <h1 className="text-lg font-bold">Full Stack Software Engineer</h1>
            <p>
              This site is under construction. A Windows XP–themed portfolio is
              on its way.
            </p>
            <p>
              <button type="button" onClick={() => dispatch(toggleMuted())}>
                {muted ? "Sound: Off" : "Sound: On"}
              </button>
            </p>
          </div>
        </div>
      </main>

      <footer
        aria-label="Taskbar"
        className="flex items-center justify-between bg-blue-800 px-2 py-1 text-white"
      >
        <button type="button" className="font-bold">
          start
        </button>
        <div className="rounded bg-blue-700 px-3 py-1 text-sm">
          <Clock />
        </div>
      </footer>
    </div>
  );
}
