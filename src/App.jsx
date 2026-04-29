import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, OPTIONS } from "./validation";
import Combobox from "./components/Combobox";
import HindiInput from "./components/HindiInput";

function App() {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",         // Validation triggers ONLY on submit
    reValidateMode: "onSubmit", // Ensures no validation while deleting letters after an error
    defaultValues: {
      framework: "",
    }
  });

  const onSubmit = (data) => {
    console.log("Form Submitted Successfully:", data);
    alert(`Success! You selected: ${data.framework}`);
  };

  return (
    <div className="app-container">
      <div className="form-card">
        <h1>Validation Demo</h1>
        <p className="subtitle">Zod & React Hook Form Example</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label>Favorite Framework</label>
            <Controller
              name="framework"
              control={control}
              render={({ field }) => (
                <Combobox
                  options={OPTIONS}
                  placeholder="Type anything or select from dropdown..."
                  {...field}
                  onChange={(e) => {
                    field.onChange(e); // Update react-hook-form state
                    const val = e.target.value;
                    // If it's empty or valid, manually clear the error
                    if (val === "" || OPTIONS.includes(val)) {
                      clearErrors("framework");
                    }
                  }}
                />
              )}
            />
            {errors.framework && (
              <p className="error-text">
                {errors.framework.message}
              </p>
            )}
            <p className="helper-text">Try typing 'abcd' or leaving empty to see validation on submit only.</p>
          </div>

          <button type="submit" className="submit-btn">Continue to Next Step</button>
        </form>
      </div>

      {/* ── Hindi Transliteration Card ── */}
      <div className="form-card" style={{ marginTop: "24px", maxWidth: "440px", width: "100%" }}>
        <h1>Hindi Typing</h1>
        <p className="subtitle">Type in English — see Hindi instantly ✨</p>
        <HindiInput
          label="Type & Transliterate"
          placeholder="e.g. namaste, bharat, desh..."
        />
      </div>
    </div>
  );
}

export default App;
