export default function DilutionResults({cocktailAttributes}) {

    const inRange = (number, low, high) => {
        if(number > high){
            return "Too High"
        } else if (number < low) {
            return "Too Low"
        } else{
            return "Perfect"
        }
    }
  return (
    <table className='dilution-results'>
        <caption>Results: </caption>
        <thead>
        <tr className='table-head'>
            <th>Attribute</th>
            <th>Result</th>
            <th>Assessment</th>
        </tr>
        </thead>
        <tbody>
            <tr>
                <th>Dilution (%)</th>
                <td>{(cocktailAttributes.dilution* 100).toFixed(2) }%</td>
                <td style={inRange(cocktailAttributes.dilution, 0.51, 0.60) === "Perfect" ? {backgroundColor: "green"} : {backgroundColor: "red"}}>{inRange(cocktailAttributes.dilution, 0.51, 0.60)}</td>
            </tr>
            <tr>
                <th>Final Volume (oz)</th>
                <td>{cocktailAttributes.finalVolume.toFixed(2)}</td>
                <td style={inRange(cocktailAttributes.finalVolume, 5.28, 6.02) === "Perfect" ? {backgroundColor: "green"} : {backgroundColor: "red"}}>{inRange(cocktailAttributes.finalVolume, 5.28, 6.02)}</td>
            </tr>
            <tr>
                <th>ABV (%)</th>
                <td>{(cocktailAttributes.abv * 100).toFixed(2)}%</td>
                <td style={inRange(cocktailAttributes.abv, .15, .20) === "Perfect" ? {backgroundColor: "green"} : {backgroundColor: "red"}}>{inRange(cocktailAttributes.abv, .15, .20)}</td>
            </tr>
            <tr>
                <th>Sugar (g/100ml)</th>
                <td>{cocktailAttributes.sugarConcentration.toFixed(2)}</td>
                <td style={inRange(cocktailAttributes.sugarConcentration, 5, 8.9) === "Perfect" ? {backgroundColor: "green"} : {backgroundColor: "red"}}>{inRange(cocktailAttributes.sugarConcentration, 5, 8.9)}</td>
            </tr>
            <tr>
                <th>Acid (%)</th>
                <td>{cocktailAttributes.acid.toFixed(2)}%</td>
                <td style={inRange(cocktailAttributes.acid, 0.76, 0.94) === "Perfect" ? {backgroundColor: "green"} : {backgroundColor: "red"}}>{inRange(cocktailAttributes.acid, 0.76, 0.94)}</td>
            </tr>
            <tr>
                <th>Sugar-Acid ratio</th>
                <td>{cocktailAttributes.sugarAcid.toFixed(2)}</td>
                <td style={inRange(cocktailAttributes.sugarAcid, 7.5, 11.0) === "Perfect" ? {backgroundColor: "green"} : {backgroundColor: "red"}}>{inRange(cocktailAttributes.sugarAcid, 7.5, 11.0)}</td>
            </tr>
        </tbody>
    </table>
  )
}