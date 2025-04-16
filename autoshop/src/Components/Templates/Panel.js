function PanelComponent({onChange, onKeyDown, value}) {
    return (<div className="search-field">
        <p>Enter value to filter cars:</p>
        <input type="text" onChange={onChange} onKeyDown={onKeyDown} value={value}></input>
    </div>);
}

export default PanelComponent;