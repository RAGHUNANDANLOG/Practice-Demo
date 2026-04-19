import { useState, useRef, useEffect, forwardRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const Combobox = forwardRef(({ options, placeholder, onChange, onBlur, name, value }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes((value || '').toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="combobox-container" ref={containerRef}>
      <div className="input-wrapper">
        <input 
          ref={ref}
          type="text" 
          value={value || ''}
          onChange={onChange}
          onBlur={(e) => {
             // Let the click event of the dropdown item fire first before onBlur triggers validation rules
             setTimeout(() => {
                 if (onBlur) onBlur(e);
             }, 150)
          }}
          name={name}
          placeholder={placeholder}
          onClick={() => setIsOpen(true)}
          className="combobox-input"
          autoComplete="off"
        />
        <ChevronDown 
          className={`combobox-icon ${isOpen ? 'open' : ''}`} 
          size={20} 
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      
      {isOpen && (
        <div className="dropdown-list">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, idx) => (
              <div 
                key={idx} 
                className={`dropdown-item ${opt === value ? 'selected' : ''}`}
                onClick={() => {
                  if (onChange) {
                      onChange({ target: { value: opt, name } });
                  }
                  setIsOpen(false);
                }}
              >
                {opt}
                {opt === value && <Check size={16} className="check-icon" />}
              </div>
            ))
          ) : (
            <div className="dropdown-item no-results">No options found.</div>
          )}
        </div>
      )}
    </div>
  );
});

export default Combobox;
