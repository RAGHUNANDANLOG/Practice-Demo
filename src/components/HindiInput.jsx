import { useState } from "react";
import Sanscript from "@indic-transliteration/sanscript";

const HindiInput = ({ placeholder = "Type here...", ...props }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const newVal = e.target.value;
    const oldVal = value;

    // Check if the user just typed a space
    if (newVal.endsWith(" ") && !oldVal.endsWith(" ")) {
      const convertedWords = newVal.split(" ").map(word => {
        if (!word) return "";
        // Only convert English words
        if (/^[a-zA-Z]+$/.test(word)) {
          // Convert using itrans scheme
          let hindiWord = Sanscript.t(word, "itrans", "devanagari");
          // Remove the trailing halant (्)
          hindiWord = hindiWord.replace(/्$/, "");
          return hindiWord;
        }
        return word;
      });
      setValue(convertedWords.join(" "));
    } else {
      // Just update normally if they are still typing a word
      setValue(newVal);
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      spellCheck={false}
      {...props}
    />
  );
};

export default HindiInput;
