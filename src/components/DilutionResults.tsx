import styled from "styled-components"
import { CocktailAttributes } from "../types/CocktailAttributes"

interface cocktailAttributesProps{
    cocktailAttributes: CocktailAttributes
}

export default function DilutionResults({ cocktailAttributes }: cocktailAttributesProps) {

    const inRange = (number: number, low: number, high: number) => {
        if(number > high){
            return "Too High"
        } else if (number < low) {
            return "Too Low"
        } else{
            return "Perfect"
        }
    }

  return (
    <Wrapper>
    <Table>
        <Caption>Dilution Results</Caption>
        <TableHeader>
            <TableRow className='table-head'>
                <TableHeaderCell>Attribute</TableHeaderCell>
                <TableHeaderCell>Result</TableHeaderCell>
                <TableHeaderCell>Assessment</TableHeaderCell>
            </TableRow>
        </TableHeader>
        <tbody>
            <TableRow>
                <TableHeaderCell>Dilution (%)</TableHeaderCell>
                <TableCell>{((cocktailAttributes.dilution as number) * 100).toFixed(2)}%</TableCell>
                <TableCell style={inRange(cocktailAttributes.dilution as number, 0.51, 0.60) === "Perfect" ? {backgroundColor: "green"} : {backgroundColor: "red"}}>
                    {inRange(cocktailAttributes.dilution as number, 0.51, 0.60)}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableHeaderCell>Final Volume (oz)</TableHeaderCell>
                <TableCell>{cocktailAttributes.finalVolume.toFixed(2)}</TableCell>
                <TableCell style={inRange(cocktailAttributes.finalVolume, 5.28, 6.02) === "Perfect" ? {backgroundColor: "green"} : {backgroundColor: "red"}}>{inRange(cocktailAttributes.finalVolume, 5.28, 6.02)}</TableCell>
            </TableRow>
            <TableRow>
                <TableHeaderCell>ABV (%)</TableHeaderCell>
                <TableCell>{(cocktailAttributes.abv * 100).toFixed(2)}%</TableCell>
                <TableCell style={inRange(cocktailAttributes.abv, .15, .20) === "Perfect" ? {backgroundColor: "green"} : {backgroundColor: "red"}}>{inRange(cocktailAttributes.abv, .15, .20)}</TableCell>
            </TableRow>
            <TableRow>
                <TableHeaderCell>Sugar (g/100ml)</TableHeaderCell>
                <TableCell>{cocktailAttributes.sugarConcentration.toFixed(2)}</TableCell>
                <TableCell style={inRange(cocktailAttributes.sugarConcentration, 5, 8.9) === "Perfect" ? {backgroundColor: "green"} : {backgroundColor: "red"}}>{inRange(cocktailAttributes.sugarConcentration, 5, 8.9)}</TableCell>
            </TableRow>
            <TableRow>
                <TableHeaderCell>Acid (%)</TableHeaderCell>
                <TableCell>{cocktailAttributes.acid.toFixed(2)}%</TableCell>
                <TableCell style={inRange(cocktailAttributes.acid, 0.76, 0.94) === "Perfect" ? {backgroundColor: "green"} : {backgroundColor: "red"}}>{inRange(cocktailAttributes.acid, 0.76, 0.94)}</TableCell>
            </TableRow>
            <TableRow>
                <TableHeaderCell>Sugar-Acid ratio</TableHeaderCell>
                <TableCell>{cocktailAttributes.sugarAcid.toFixed(2)}</TableCell>
                <TableCell style={inRange(cocktailAttributes.sugarAcid, 7.5, 11.0) === "Perfect" ? {backgroundColor: "green"} : {backgroundColor: "red"}}>{inRange(cocktailAttributes.sugarAcid, 7.5, 11.0)}</TableCell>
            </TableRow>
        </tbody>
    </Table>
    </Wrapper>
  )
}

const Wrapper = styled.div`
    background-color: #838383;
    width: 100%;
    grid-area: results;
`;

const Caption = styled.caption`
    font-size: 1.1em;
    color: white;
    font-weight: bold;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 2px solid #23272a;
  color: white;
  table-layout: fixed;
`;

const TableHeader = styled.thead`
  background-color: rgb(244, 154, 115);
`;

const TableHeaderCell = styled.th`
  border: 1px solid #23272a;
  padding: 8px;
  text-align: left;
`;

const TableCell = styled.td`
  border: 1px solid #23272a;
  padding: 8px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #23272a;
  }
`;