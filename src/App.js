import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import './App.css';

function App() {
  const [markdown, setmarkdown] = useState("");
  const [htmlcontent, sethtmlcontent] = useState("");
  
  const addmarkdownsyntax = (syntax) => {
    setmarkdown((prevmarkdown) => prevmarkdown + syntax);
  };
  
  const handlemarkdownchange = (event) => {
    setmarkdown(event.target.value);
  };

  useEffect(() => {
    const renderer = new marked.Renderer();
    renderer.table = (header, body) => {
      return `<table class="markdown-table"><thead>${header}</thead><tbody>${body}</tbody></table>`;
    };
    marked.setOptions({ renderer });
    sethtmlcontent(marked(markdown));
  }, [markdown]);

  return (
    <div className="App">
      <h1 className="website-title">CHERRY+ MARKDOWN EDITOR</h1>
      <div className="toolbar">
        <button onClick={() => addmarkdownsyntax("# ")}>Heading</button>
        <button onClick={() => addmarkdownsyntax("**bold text**")}>Bold</button>
        <button onClick={() => addmarkdownsyntax("_italic text_")}>Italic</button>
        <button onClick={() => addmarkdownsyntax("<u>underline text</u>")}>Underline</button>
        <button onClick={() => addmarkdownsyntax("```\ncode here\n```")}>Code Block</button>
        <button onClick={() => addmarkdownsyntax("`code`")}>Inline Code</button>
        <button onClick={() => addmarkdownsyntax("> Blockquote\n")}>Blockquote</button>
        <button onClick={() => addmarkdownsyntax("- List item\n")}>List</button>
        <button onClick={() => addmarkdownsyntax("![alt text](image_url)\n")}>Image</button>
        <button onClick={() => addmarkdownsyntax("[link text](url)\n")}>Link</button>
        <button onClick={() => addmarkdownsyntax("| Header 1 | Header 2 |\n| --------- | --------- |\n| Row 1    | Data 1   |\n| Row 2    | Data 2   |\n")}>Table</button>
        <button onClick={() => addmarkdownsyntax("- [ ] Checklist item\n")}>Checklist</button>
        <button onClick={() => addmarkdownsyntax("---\n")}>Horizontal Rule</button>
      </div>

      <div className="editor-container">
        <div className="markdown-container">
          <h2 className="section-title">Markdown</h2>
          <textarea
            placeholder="Craft Your Content with Markdown text:)"
            value={markdown}
            onChange={handlemarkdownchange}
          />
          <div className="download-buttons">
            <button onClick={() => downloadfile(markdown, 'text/markdown', 'document.md')}>
              Download Markdown
            </button>
          </div>
        </div>

        <div className="preview-container">
          <h2 className="section-title">Live Preview</h2>
          <div className="preview" dangerouslySetInnerHTML={{ __html: htmlcontent }} />
          <div className="download-buttons">
            <button onClick={() => downloadfile(htmlcontent, 'text/html', 'document.html')}>
              Download HTML
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function downloadfile(content, type, filename) {
  const blob = new Blob([content], { type });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

export default App;
