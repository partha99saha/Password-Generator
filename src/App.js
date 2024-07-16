import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copyText, setCopyText] = useState("Copy");
  const timeoutRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTWXYZabcdefghijklmnopqrstwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "~@#$%&*?";
    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopyText("Copied");
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setCopyText("Copy");
      passwordGenerator();
    }, 1000);
  };

  return (
    <div className="w-full max-w-md mx-auto shadow-xl rounded-lg p-6 my-8 bg-gray-900">
      <h1 className="text-center text-2xl text-white mb-4">Password Generator</h1>
      <div className="flex items-center shadow rounded-2xl overflow-hidden mb-4 bg-gray-800">
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          className="w-full p-2 text-orange-400 bg-gray-800 border-none focus:outline-none"
        />
        <button
          className="px-4 py-2 text-sm text-white bg-purple-600 hover:bg-purple-700"
          onClick={handleCopy}
        >
          {copyText}
        </button>
      </div>
      <div className="flex items-center text-sm text-white space-x-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="length" className="text-orange-400">Length: {length}</label>
          <input
            type="range"
            min={8}
            max={32}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={numberAllowed}
            id="numberInput"
            className="cursor-pointer"
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={charAllowed}
            id="characterInput"
            className="cursor-pointer"
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
