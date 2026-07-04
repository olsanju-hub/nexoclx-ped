export function PediatricAgeInput({ years, months, minYears = 0, maxYears = 18, onChange }) {
  return (
    <div className="pediatric-age-input">
      <span className="tool-input-wrap">
        <input
          inputMode="numeric"
          min={minYears}
          max={maxYears}
          type="number"
          value={years}
          onChange={(event) => onChange('ageYears', event.target.value)}
        />
        <small>años</small>
      </span>
      <span className="tool-input-wrap">
        <input
          inputMode="numeric"
          min="0"
          max="11"
          type="number"
          value={months}
          onChange={(event) => onChange('ageExtraMonths', event.target.value)}
        />
        <small>meses</small>
      </span>
    </div>
  );
}
